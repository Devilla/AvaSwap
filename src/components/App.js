import React, { Component } from "react";
import Web3 from "web3";
import DevToken from "../abis/DevToken.json";
import LinkToken from "../abis/LinkToken.json";
import Dai from "../abis/Dai.json";
import EthSwap from "../abis/EthSwap.json";
import Navbar from "./Navbar";
import Main from "./Main";
import "./App.css";

class App extends Component {
	async componentDidMount() {
		await this.loadWeb3();
		await this.loadBlockchainData(this.state.tokens[0]);
	}

	async loadBlockchainData(selectedToken) {
		const web3 = window.web3;

		// Load Network ID
		const networkId = await web3.eth.net.getId();
		console.log(networkId);
		// get account
		const accounts = await web3.eth.getAccounts();
		this.setState({ account: accounts[0] });

		// Set EthSwap balance
		const ethBalance = await web3.eth.getBalance(this.state.account);
		this.setState({ ethBalance });

		// Load Token
		if (selectedToken.address && networkId === 42) {
			const token = new web3.eth.Contract(selectedToken.name==='LINK'? LinkToken.abi
			:selectedToken.name==='DAI'? Dai.abi
			:DevToken.abi, selectedToken.address);
			this.setState({ token });
			let tokenBalance = await token.methods.balanceOf(this.state.account).call();
			this.setState({ tokenBalance: tokenBalance.toString() });
		} else {
			window.alert("Kovan Test Network not detected");
		}

		// Load EthSwap
		if (selectedToken.ethSwapAddress) {
			const ethSwap = new web3.eth.Contract(EthSwap.abi, selectedToken.ethSwapAddress);
			this.setState({ ethSwap });
		} else {
			window.alert("EthSwap Network not detected");
		}

		// Loading is done, to set loading == false
		this.setState({ loading: false });
	}

	async loadWeb3() {
		// Modern dapp browsers...
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		}
		// Non-dapp browsers...
		else {
			window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
		}
	}

	fetchMinedTransactionReceipt = (transactionHash) => {

  return new Promise((resolve, reject) => {

    const { web3 } = window;

    var timer = setInterval(()=> {
      web3.eth.getTransactionReceipt(transactionHash, (err, receipt)=> {
        if(!err && receipt){
          clearInterval(timer);
          resolve(receipt);
        }
      });
    }, 2000)

  })
}

	// Buy tokens @desc take input some amount of wei
	buyTokens = async (etherAmount) => {
		this.setState({ loading: true });
		this.state.ethSwap.methods
			.buyTokens()
			.send({ value: etherAmount, from: this.state.account })
			.on("transactionHash", async (transactionHash) => {
					const receipt = await this.fetchMinedTransactionReceipt(transactionHash);
					if(receipt){
						this.setState({ loading: false });
						this.loadBlockchainData(this.state.selectedToken)
					}
			})
	};

	sellTokens = async (tokenAmount) => {
		this.setState({ loading: true });
		this.state.token.methods
			.approve(this.state.ethSwap.address, tokenAmount)
			.send({ from: this.state.account})
			.on("transactionHash", async (hash) => {
				const approveReceipt = await this.fetchMinedTransactionReceipt(hash);
				if(approveReceipt)
					this.state.ethSwap.methods
						.sellToken(tokenAmount)
						.send({ from: this.state.account })
						.on("transactionHash", async (transactionHash) => {
							const receipt = await this.fetchMinedTransactionReceipt(transactionHash);
							if(receipt){
								this.setState({ loading: false });
								this.loadBlockchainData(this.state.selectedToken)
							}
						});
			});
	};

	handleTokenChange = async (token) => {
		const { tokens } = this.state;
		const selectedToken = token===tokens[0].name ? tokens[0]:token===tokens[1].name ? tokens[1]:tokens[2];
		this.setState({ selectedToken : selectedToken });
		this.loadBlockchainData(selectedToken);
	}

	// react state
	constructor(props) {
		super(props);
		this.state = {
			account: "",
			token: {},
			ethSwap: {},
			selectedToken:{
				name : 'LINK',
				address : '0x235426ce11a3E23EA30f77cf6Dcbc7Fcd31E5a60',
				ethSwapAddress : '0xECEa9e401a648F08ff7680996Bd2ebe2Cc5112Bd'
			},
			tokenAddress: '0x43b23072b895a342e464C4116D4fb8d3aaF53c78',
			tokenBalance: "0",
			ethBalance: "0",
			loading: true,
			tokens: [
			{
				name : 'LINK',
				address : '0x235426ce11a3E23EA30f77cf6Dcbc7Fcd31E5a60',
				ethSwapAddress : '0xECEa9e401a648F08ff7680996Bd2ebe2Cc5112Bd'
			},
			{
				name : 'DAI',
				address : '0x7858355eBC5708ce10494875BC065bD32a88ac0d',
				ethSwapAddress : '0x81977DdCc672a4795BD7Eea7B0bb03A4787e2372'
			},
			{
				name : 'DEV',
				address : '0x68B04a6Ce5083DE24a6B6c9362DD38bd9F8A85cA',
				ethSwapAddress : '0x7B9237158d64009838f1789ca05EC2683D023d30'
			},
		]
		};
	}

	render() {
		let content;
		if (this.state.loading)
			content = (
				<p id="loader" className="text-center">
					Loading...
				</p>
			);
		else
			content = (
				<Main
					selectedToken =  {this.state.selectedToken}
					ethBalance={this.state.ethBalance}
					tokenBalance={this.state.tokenBalance}
					buyTokens={this.buyTokens}
					sellTokens={this.sellTokens}
					handleTokenChange = {this.handleTokenChange}
				/>
			);
		return (
			<div>
				<Navbar account={this.state.account} />
				<div className="container-fluid mt-5">
					<div className="row eth-swap">
						<main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: "600px" }}>
							<div className="content mr-auto ml-auto">{content}</div>
						</main>
					</div>
				</div>
			</div>
		);
	}
}

export default App;

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
	async componentWillMount() {
		await this.loadWeb3();
		await this.loadBlockchainData();
	}

	async loadBlockchainData() {
		const web3 = window.web3;

		// get account
		const accounts = await web3.eth.getAccounts();
		this.setState({ account: accounts[0] });

		// Set EthSwap balance
		const ethBalance = await web3.eth.getBalance(this.state.account);
		this.setState({ ethBalance });

		// Load Token
		const linkAddress = '0x235426ce11a3E23EA30f77cf6Dcbc7Fcd31E5a60'
		if (linkAddress) {
			const token = new web3.eth.Contract(LinkToken.abi, linkAddress);
			this.setState({ token });
			let tokenBalance = await token.methods.balanceOf(this.state.account).call();
			console.log(this.state.tokenBalance);
			this.setState({ tokenBalance: tokenBalance.toString() });
		} else {
			window.alert("Token Network not detected");
		}

		// Load EthSwap
		const ethSwapAddress = '0xECEa9e401a648F08ff7680996Bd2ebe2Cc5112Bd'
		if (ethSwapAddress) {
			const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapAddress);
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

	// Buy tokens @desc take input some amount of wei
	buyTokens = async (etherAmount) => {
		this.setState({ loading: true });
		this.state.ethSwap.methods
			.buyTokens()
			.send({ value: etherAmount, from: this.state.account })
			.on("transactionHash", (hash) => {
				this.setState({ loading: false });
			}).then(()=>{
				window.location.reload();
			});
	};

	sellTokens = async (tokenAmount) => {
		this.setState({ loading: true });
		this.state.token.methods
			.approve(this.state.ethSwap.address, tokenAmount)
			.send({ from: this.state.account})
			.on("transactionHash", (hash) => {
				this.state.ethSwap.methods
					.sellToken(tokenAmount)
					.send({ from: this.state.account })
					.on("transactionHash", (hash) => {
						this.setState({ loading: false });
					});
			});
	};

	// react state
	constructor(props) {
		super(props);
		this.state = {
			account: "",
			token: {},
			ethSwap: {},
			tokenBalance: "0",
			ethBalance: "0",
			loading: true,
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
					ethBalance={this.state.ethBalance}
					tokenBalance={this.state.tokenBalance}
					buyTokens={this.buyTokens}
					sellTokens={this.sellTokens}
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

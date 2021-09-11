import React, { Component } from "react";
import avaxLogo from "../avax-logo.png";
import tokenLogo from "../token-logo.png";
import daiLogo from '../dai-logo.png';
import chainLinkLogo from "../chainlink-link-logo.png";

class BuyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// isLoaded: false,
			output: "0",
			rate: 100,
			selected: props.selectedToken.name
		};
	}

	// componentDidMount() {
  //   fetch("https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=link")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
	// 				console.log(result);
  //         this.setState({
  //           // isLoaded: true,
  //           rate: result.["avalanche-2"].link
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

	handleChange = (event) => {
		this.setState({ selected: event.target.value });
		this.props.handleTokenChange(event.target.value);
	}

	render() {
		let { selected, rate } = this.state;
		return (
			<form
				className="mb-5"
				onSubmit={(event) => {
					event.preventDefault();
					let etherAmount;
					etherAmount = this.input.value.toString();
					etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
					this.props.buyTokens(etherAmount);
				}}
			>
				<div>
					<label className="float-left">
						<b>Input</b>
					</label>
					<span className="float-right text-muted">
						Balance: {window.web3.utils.fromWei(this.props.ethBalance, "Ether")}
					</span>
				</div>
				<div className="input-group mb-4">
					<input
						type="number"
						onChange={(event) => {
							const etherAmount = this.input.value.toString();
							this.setState({
								output: etherAmount * rate,
							});
						}}
						ref={(input) => {
							this.input = input;
						}}
						placeholder="0"
						className="form-control form-control-lg"
						required
					/>
					<div className="input-group-append">
						<div className="input-group-text">
							&nbsp;&nbsp;&nbsp;
							<img src={avaxLogo} height="32" alt="" />
							&nbsp;&nbsp;&nbsp; AVAX
							&nbsp;&nbsp;&nbsp;
						</div>
					</div>
				</div>
				<div>
					<label className="float-left">
						<b>Output</b>
					</label>
					<span className="float-right text-muted">
						Balance: {window.web3.utils.fromWei(this.props.tokenBalance, "Ether")}
					</span>
				</div>
				<div className="input-group mb-2">
					<input
						value={this.state.output}
						type="text"
						placeholder="0"
						className="form-control form-control-lg"
						disabled
					/>
					<div className="input-group-append">
						<div className="input-group-text">
							<img src={selected === 'LINK' ? chainLinkLogo
								: selected === 'DAI' ? daiLogo
									: tokenLogo} height="32" alt="" />
							&nbsp;
							<select onChange={this.handleChange}>
								<option defaultValue={selected}>LINK</option>
								<option defaultValue={selected}>DEV</option>
								<option defaultValue={selected}>DAI</option>
							</select>
						</div>
					</div>
				</div>
				<div className="mb-5">
					<span className="float-left text-muted">
						<b>Exchange Rate</b>
					</span>
					<span className="float-right text-muted">1 AVAX = {rate} {selected}</span>
				</div>
				<button type="submit" className="btn btn-primary btn-block btn-lg">
					SWAP!
				</button>
			</form>
		);
	}
}

export default BuyForm;

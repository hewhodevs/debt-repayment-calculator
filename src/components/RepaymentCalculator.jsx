import React, { Component } from "react";
import "./RepaymentCalculator.css";

class RepaymentCalculator extends Component {
  state = {
    principle: "",
    loanTerm: "",
    interestRate: "",
    paymentsPerYear: 52,
    repayment: ""
  };

  /*
   * Calculates how much your repayment will be for
   * the given loan amount, term, interst rate and payment frequency
   *
   * P = principal loan amount
   * r = interest rate (i.e. 3.99% = 0.0399)
   * t = loan term in years
   * n = number of payments per year (12 = monthly repayments, 52 = weekly repayments)
   *
   * Payment = [P x (r / n) x (1 + r / n)^n(t)] / [(1 + r / n)^n(t) - 1]
   */
  calculateRepayments = (p, r, t, n) => {
    // Pre-Calculations
    const periodicInterest = r / n; // (r / n)
    const totalNumberOfPayments = n * t; // n(t)
    const val = Math.pow(1 + periodicInterest, totalNumberOfPayments); // (1 + r / n)^n(t)

    // Payment Calculation
    const numerator = p * periodicInterest * val; // [P x (r / n) x (1 + r / n)^n(t)]
    const demoninator = val - 1; // [(1 + r / n)^n(t) - 1]
    const repayments = Math.ceil(numerator / demoninator);

    return repayments;
  };

  // Event Handlers
  handlePrincipleOnChange = (e) => {
    this.setState({
      principle: e.target.value
    });
  };

  handleLoanTermOnChange = (e) => {
    this.setState({
      loanTerm: e.target.value
    });
  };

  handleInterestRateOnChange = (e) => {
    this.setState({
      interestRate: e.target.value
    });
  };

  handlePaymentFrequencyOnChange = (e) => {
    let paymentsPerYear = 52; // Deault selected value is weekly, 52 weeks in a year
    switch (e.target.value) {
      case "weekly":
        paymentsPerYear = 52;
        break;
      case "fortnightly":
        paymentsPerYear = 26;
        break;
      case "monthly":
        paymentsPerYear = 12;
        break;
      case "yearly":
        paymentsPerYear = 1;
        break;
      default:
        paymentsPerYear = 52;
        break;
    }
    this.setState({
      paymentsPerYear: paymentsPerYear
    });
  };

  handleCalculateRepaymentOnClick = () => {
    const p = this.state.principle;
    const r = this.state.interestRate;
    const t = this.state.loanTerm;
    const n = this.state.paymentsPerYear;
    const repayment = this.calculateRepayments(p, r, t, n);

    this.setState({
      repayment: repayment
    });
  };

  render() {
    return (
      <div className="RepaymentCalculator">
        <form action="">
          {/* principle */}
          <label htmlFor="principle">Principle Amount</label>
          <input
            type="text"
            name="principle"
            onChange={this.handlePrincipleOnChange}
          />
          <br />
          {/* loan term */}
          <label htmlFor="loanterm">Loan Term (years)</label>
          <input
            type="text"
            name="loanterm"
            onChange={this.handleLoanTermOnChange}
          />
          <br />
          {/* interest rate */}
          <label htmlFor="interestRate">Interest Rate</label>
          <input
            type="text"
            name="interestRate"
            onChange={this.handleInterestRateOnChange}
          />
          <br />
          {/* payment frequency */}
          <label htmlFor="repaymentFrequency">Repayment Frequency:</label>
          <select
            name="repaymentFrequency"
            onChange={this.handlePaymentFrequencyOnChange}
          >
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <br />
        </form>
        {/* Calculate Repayments */}
        <button onClick={this.handleCalculateRepaymentOnClick}>
          Calculate Repayment
        </button>
        <br />
        <span className="repayment">Repayment: {this.state.repayment}</span>
      </div>
    );
  }
}

export default RepaymentCalculator;

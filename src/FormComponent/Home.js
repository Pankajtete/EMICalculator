import React, { useState } from "react";
import { Pie } from 'react-chartjs-2';
import "../FormComponent/Home.css"

const Home = () => {
  const [loanData, setLoanData] = useState({
    loanAmount: '',
    numberOfYears: '',
    interestRate: '',
  });

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [yearlyPayment, setYearlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const calculateEMI = () => {
    const { loanAmount, numberOfYears, interestRate } = loanData;
    const principle = parseFloat(loanAmount);
    const years = parseFloat(numberOfYears);
    const rate = parseFloat(interestRate) / 100 / 12;

    const monthlyPayment = (principle * rate * Math.pow(1 + rate, years * 12)) / (Math.pow(1 + rate, years * 12) - 1);
    setMonthlyPayment(monthlyPayment.toFixed(2));

    const yearlyPayment = monthlyPayment * 12;
    setYearlyPayment(yearlyPayment.toFixed(2));

    const totalPayment = monthlyPayment * years * 12;
    setTotalPayment(totalPayment.toFixed(2));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    calculateEMI();
  };

  const chartData = {
    labels: ['Monthly Payment', 'Yearly Payment', 'Total Payment'],
    datasets: [
      {
        label: 'Payment Breakdown',
        data: [monthlyPayment, yearlyPayment, totalPayment],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <>
      <div className="main-con container-fluid d-flex justify-content-center align-items-center h-100vh">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: "lightblue" }}>
            <div className="card-body">
              <h1>Loan EMI Calculator</h1>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="loanAmount">Loan Amount:</label>
                  <input type="text" id="loanAmount" name="loanAmount" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="numberOfYears">Number of Years:</label>
                  <input type="text" id="numberOfYears" name="numberOfYears" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="interestRate">Interest Rate:</label>
                  <input type="text" id="interestRate" name="interestRate" className="form-control" onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Calculate</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body w-50 h-50">
            {monthlyPayment > 0 && (
              <Pie data={chartData} />
            )}
          </div>
        </div>
      </div>

      <div className="col-md-12 ">
        <div className=" d-flex justify-content-evenly">
          <h2>Monthly Pay: {monthlyPayment}</h2>
          <h2>Yearly Pay: {yearlyPayment}</h2>
          <h2>Total Payment with Interest: {totalPayment}</h2>
        </div>
      </div>
  




    </>
  );
};

export default Home;

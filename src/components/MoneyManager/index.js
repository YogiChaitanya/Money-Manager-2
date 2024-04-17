import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    listOfTransaction: [],
    transferType: transactionTypeOptions[0].optionId,
    income: 0,
    expenses: 0,
    balance: 0,
  }

  // whenver click the add button what will happen
  // doubt 2 how to update balance, income, expenses values whenever click the add button
  addTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, transferType, income, expenses, balance} =
      this.state
    const typeOption = transactionTypeOptions.find(
      eachTranscation => eachTranscation.optionId === transferType,
    )
    const {displayText} = typeOption

    this.setState(prevState => ({
      income: prevState.income + (transferType === 'INCOME' ? amountInput : 0),
    }))

    this.setState(prevState => ({
      expenses:
        prevState.expenses + (transferType === 'EXPENSES' ? amountInput : 0),
    }))

    this.setState({
      balance: income - expenses,
    })

    const newTransaction = {
      id: v4(),
      titleInput,
      amount: parseInt(amountInput),
      text: displayText,
    }

    this.setState(prevState => ({
      listOfTransaction: [...prevState.listOfTransaction, newTransaction],
      titleInput: '',
      amountInput: '',
      transferType: transactionTypeOptions[0].optionId,
    }))
  }

  deleteBtn = id => {
    const {listOfTransaction} = this.state
    const updatedArray = listOfTransaction.filter(
      eachTransfer => eachTransfer.id !== id,
    )

    this.setState({
      listOfTransaction: updatedArray,
    })
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeAmountInput = event => {
    this.setState({
      amountInput: event.target.value,
    })
  }

  onChangeAmountType = event => {
    this.setState({
      transferType: event.target.value,
    })
  }

  render() {
    const {titleInput, amountInput, listOfTransaction} = this.state
    const {income, expenses, balance} = this.state
    const {transferType} = this.state
    console.log(transferType)

    return (
      <div className="bg-container">
        <div className="card1">
          <h1>Hi, Yogi</h1>
          <p>
            Welcome back to your
            <span className="paragraph1"> Money Manager</span>
          </p>
        </div>

        <MoneyDetails balance={balance} income={income} expenses={expenses} />

        <div className="card12">
          <form
            className="form-control card12-1"
            onSubmit={this.addTransaction}
          >
            <h1>Add Transaction</h1>
            <label htmlFor="titleId">TITLE</label>
            <input
              id="titleId"
              type="text"
              className="title-input"
              placeholder="TITLE"
              value={titleInput}
              onChange={this.onChangeTitleInput}
            />
            <label htmlFor="amountId">AMOUNT</label>
            <input
              id="amountId"
              type="text"
              className="amount-input"
              placeholder="AMOUNT"
              value={amountInput}
              onChange={this.onChangeAmountInput}
            />
            <label htmlFor="typeId">TYPE</label>
            <select
              onChange={this.onChangeAmountType}
              value={transferType}
              id="typeId"
              className="type-select-btn"
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1>History</h1>
            <div className="history-sub-titles">
              <p className="paragraph4">Title</p>
              <p className="paragraph4">Amount</p>
              <p className="paragraph4">Type</p>
              <p className="paragraph4">delete</p>
            </div>

            <ul className="list-container">
              {listOfTransaction.map(eachTransfer => (
                <TransactionItem
                  key={eachTransfer.id}
                  transferDetails={eachTransfer}
                  deleteBtn={this.deleteBtn}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

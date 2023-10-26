import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avarage = (good - bad) / total;
  const positivePercantage = good / total * 100
  if (good || bad || neutral) {
    return (
      <table>
        <thead>
          <tr>
            <td colSpan="2"><h1>statistics</h1></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>avarage</td>
            <td>{avarage}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positivePercantage} %</td>
          </tr>
        </tbody>        
      </table>
    )
  } else {
    return ( 
      <p>The monkeys are unable to provide any other feedback except that 0% of the feedback is positive. Give monkeys good bananas to make larger percantage of monkeys positive</p>
    ) 
  }   
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log('good click')
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log('neutral click')
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log('bad click')
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
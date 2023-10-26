import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avarage = (good - bad) / total;
  const positivePercantage = good / total * 100
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>{(!isNaN(avarage)) ? 'avarage ' + avarage : 'the monkeys are unable to provide valid avarage, pls provide good or bad bananas'}</p>
      <p>positive {(isNaN(positivePercantage)) ? 0 : positivePercantage} %</p>
    </div>
  )
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
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
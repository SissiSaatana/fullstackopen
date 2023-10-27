import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const AnecdoteVotes = ({votes}) => <p>has {votes} votes</p>

const HighestVotedAnecdote = ({anecdotes, votes}) => {
  const highestVotedAnecdote = anecdotes[votes.indexOf(Math.max(...votes))]
  console.log(highestVotedAnecdote)
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{highestVotedAnecdote}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'The monkeys work better if given good bananas',
    'If it works it works, but the monkeys prefer well formatted bananas that passes linting requirements'
  ]
  
  //const points = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const getRandomInt = (max) => Math.floor(Math.random() * max)

  const getNewTimelessTruth = () => setSelected(getRandomInt(anecdotes.length))

  const vote = (selected) => {
    const newPoints = [...points]
    newPoints[selected]++
    setPoints(newPoints)
  }

  // setSelected(getRandomInt(anecdotes.length))

  return (
    <div>
      <Button handleClick={() => vote(selected)} text='vote' /> 
      <Button handleClick={getNewTimelessTruth} text='next anecdote' />
      <p>{anecdotes[selected]}</p>
      <AnecdoteVotes votes={points[selected]} />
      <HighestVotedAnecdote anecdotes={anecdotes} votes={points} />
    </div>
  )
}

export default App
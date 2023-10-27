const Course = ({course}) => 
  <>
    <Header courseName={course.name}/>
    <Content parts={course.parts} />
  </>  



const Header = ({courseName}) => <h1>{courseName}</h1>



const Content = ({parts}) => 
  <>
    {parts.map(part => 
      (<Part key={part.id} name={part.name} exercises={part.exercises}/>)
    )}
    <Total parts={parts} />
  </>



const Part = ({name, exercises}) => <p>{name} {exercises}</p>



const Total = ({parts}) => 
  <b>
    <p>Total of exercises {parts.reduce((acc, obj) => acc + obj.exercises, 0)}</p>
  </b>




const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Fundamentals of the banana',
        exercises: 10,
        id: 4
      },
      {
        name: 'Writin programs for bananas',
        exercises: 1,
        id: 5
      },
      {
        name: 'State of the banana',
        exercises: 14,
        id: 6
      }
    ]
  }

  return <Course course={course} />
}

export default App
const Course = ({courses}) => 
  <>
    {courses.map(course =>                        
      <Content key={course.id} parts={course.parts} header={course.name} />      
    )}    
  </>  



const Header = ({courseName}) => <h1>{courseName}</h1>



const Content = ({parts, header}) => 
  <>
    <Header courseName={header} />
    {parts.map(part => 
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
    )}
    <Total parts={parts} />
  </>



const Part = ({name, exercises}) => <p>{name} {exercises}</p>



const Total = ({parts}) => 
  <b>
    <p>Total of exercises {parts.reduce((acc, obj) => acc + obj.exercises, 0)}</p>
  </b>




const App = () => {
  const courses = [
    {
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
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'Developing stack of bananas',
      id: 3,
      parts: [
        {
          name: 'Fundamentals of the banana',
          exercises: 10,
          id: 1
        },
        {
          name: 'Writin programs for bananas',
          exercises: 1,
          id: 2
        },
        {
          name: 'State of the banana',
          exercises: 14,
          id: 3
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App
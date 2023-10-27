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

export default Course
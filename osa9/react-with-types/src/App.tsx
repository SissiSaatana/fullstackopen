

const Header = ({courseName}: { courseName: string }) => (
  <h1>{courseName}</h1>
);

const Content = ({courseParts}: { courseParts: Array<{ name: string, exerciseCount: number }> }) => (
  <>
    {courseParts.map(part => (
      <p key={part.name}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
  </>
);

const Total = ({totalExercises}: { totalExercises: number }) => (
  <p>Number of exercises {totalExercises}</p>
)

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;

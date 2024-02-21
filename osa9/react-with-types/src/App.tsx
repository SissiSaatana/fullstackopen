import { CoursePart } from "./types";


const Header = ({courseName}: { courseName: string }) => (
  <h1>{courseName}</h1>
);

const Part = ({part}: { part: CoursePart }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
        </>
      );
    case "group":
      return (
        <>
          <h2> 
            {part.name} {part.exerciseCount}
          </h2>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <h2> 
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      );
    case "special":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </>
      );
    default:
      return assertNever(part);
  }
}

const Content = ({courseParts}: { courseParts: Array<CoursePart> }) => (
  <>
    {courseParts.map(part => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

const Total = ({totalExercises}: { totalExercises: number }) => (
  <p>Number of exercises {totalExercises}</p>
)

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
      <br />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;

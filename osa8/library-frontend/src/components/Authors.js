import SetAuthorBirthYear from "./SetAuthorBirthYear";

const Authors = ({ authors }) => {
  if (!authors) {
    return null;
  }
  // const authors = []
  console.log("authors: ", authors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetAuthorBirthYear authors={authors} />
    </div>
  );
};

export default Authors;

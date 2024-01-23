import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import Select from "react-select";

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
const SetAuthorBirthYear = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [birthYear, setBirthYear] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name: selectedAuthor, setBornTo: +birthYear } });
    setSelectedAuthor(null);
    setBirthYear("");
  };

  return (
    <div className="setAuthorBirthYear-form">
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.value)}
          options={authors.map((author) => {
            return { value: author.name, label: author.name };
          })}
        />
        <div>
          Born
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetAuthorBirthYear;

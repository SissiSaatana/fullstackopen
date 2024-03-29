import { useEffect, useState } from "react";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import axios from "axios";

const DiaryEntries = ({ entries }: { entries: NonSensitiveDiaryEntry[] }) => {
  return (
    <>
      <h2>Diary entries</h2>
      {entries.map((entry, i) => (
        <div key={i}>
          <h2>{entry.date}</h2>
          <p>visibility {entry.visibility}</p>
          <p>weather {entry.weather}</p>
        </div>
      ))}
    </>
  );
};

const EntryForm = ({createEntry }: {createEntry:(entry: NewDiaryEntry) => void}) => {
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] =  useState<Visibility | string>("");
  const [newWeather, setNewWeather] = useState("" as Weather);
  const [newComment, setNewComment] = useState("");

  const toEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date: newDate,
      visibility: newVisibility  as Visibility,
      weather: newWeather,
      comment: newComment,
    });
    setNewDate("");
    setNewVisibility("" as Visibility);
    setNewWeather("" as Weather);
    setNewComment("");
  };

  return (
    <form onSubmit={toEntry} >
      Date <input value={newDate} onChange={(event) => setNewDate(event.target.value)} />
      Visibility <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)} />
      Weather <input value={newWeather} onChange={(event) => setNewWeather(event.target.value as Weather)} />
      Comment <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
      <button type='submit'>add</button>
    </form>
  );
};


const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  
  const postEntry = (entry: DiaryEntry) => {
    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", entry)
      .then((response) => {
        setDiaryEntries(diaryEntries.concat(response.data));
      });
  };

   useEffect(() => {
     axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((response) => {
       setDiaryEntries(response.data);
     });
   }, []);

   

  return (
    <>
      <EntryForm createEntry={postEntry} />
      <DiaryEntries entries={diaryEntries} />
    </>
  )
}

export default App

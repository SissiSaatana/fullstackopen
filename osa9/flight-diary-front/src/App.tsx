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

const ErrorMsg = ( {msg} ) => {
  if (!msg) {
    return
  }
  return (
    <p>You have a error: {msg}</p>
  )
} 

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
    <form onSubmit={toEntry}>
      Date{" "}
      <input
        type="date"
        value={newDate}
        onChange={(event) => setNewDate(event.target.value)}
      />
      <br />
      Visibility{" "}
      <input
        type="radio"
        id="great"
        name="visibility"
        value="great"
        checked
        onChange={(event) => setNewVisibility(event.target.value)}
      />
      <label for="great">Great</label>
      <input
        type="radio"
        id="good"
        name="visibility"
        value="good"
        onChange={(event) => setNewVisibility(event.target.value)}
      />
      <label for="good">Good</label>
      <input
        type="radio"
        id="ok"
        name="visibility"
        value="ok"
        onChange={(event) => setNewVisibility(event.target.value)}
      />
      <label for="ok">Ok</label>
      <input
        type="radio"
        id="poor"
        name="visibility"
        value="poor"
        onChange={(event) => setNewVisibility(event.target.value)}
      />
      <label for="poor">Poor</label>
      {/* <input
        value={newVisibility}
        onChange={(event) => setNewVisibility(event.target.value)}
      /> */}
      <br />
      Weather{" "}
      <input
        type="radio"
        id="sunny"
        name="weather"
        value="sunny"
        checked
        onChange={(event) => setNewWeather(event.target.value as Weather)}        
      />
      <label for="sunny">Sunny</label>
      <input
        type="radio"
        id="rainy"
        name="weather"
        value="rainy"
        onChange={(event) => setNewWeather(event.target.value as Weather)}
      />
      <label for="rainy">Rainy</label>
      <input
        type="radio"
        id="cloudy"
        name="weather"
        value="cloudy"
        onChange={(event) => setNewWeather(event.target.value as Weather)}
      />
      <label for="cloudy">Cloudy</label>
      <input
        type="radio"
        id="stormy"
        name="weather"
        value="stormy"
        onChange={(event) => setNewWeather(event.target.value as Weather)}
      />
      <label for="stormy">Stormy</label>
      <input
        type="radio"
        id="windy"
        name="weather"
        value="windy"
        onChange={(event) => setNewWeather(event.target.value as Weather)}
      />
      <label for="windy">Windy</label>
      <br />
      Comment{" "}
      <input
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
      />
      <br />
      <button type="submit">add</button>
      <br />
    </form>
  );
};


const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  const postEntry = async (entry: DiaryEntry) => {
    try {
      const response = await axios.post<DiaryEntry>("http://localhost:3000/api/diaries", entry);
      console.log(response);
      setDiaryEntries(diaryEntries.concat(response.data));
      setErrorMsg('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        setErrorMsg(error.response!.data);
        console.log('axios error')
        // Do something with this error...
      } else {
        console.error(error);
      }
    }

    // axios
    //   .post<DiaryEntry>("http://localhost:3000/api/diaries", entry)
    //   .then((response) => {
    //     setDiaryEntries(diaryEntries.concat(response.data));
    //   });
  };

   useEffect(() => {
     axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((response) => {
       setDiaryEntries(response.data);
     });
   }, []);

  return (
    <>
      <h2>Adding new entry</h2>
      <ErrorMsg msg={errorMsg}></ErrorMsg>
      <EntryForm createEntry={postEntry} />
      <DiaryEntries entries={diaryEntries} />
    </>
  );
}

export default App

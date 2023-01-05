import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const a = [1, 2, 3, 4, "satyam"];
  const [userData, setuserData] = useState()
  const handleClick = async(e) => {
   // alert(e.target.innerText);
    const id = e.target.innerText;
    const url = "https://reqres.in/api/users/"+id;
    const data = await fetch(url);
    const json = await data.json();
    setuserData(json.data);
    //console.log(json.data);
  };
  const getData = async () => {
    const url = "https://reqres.in/api/users?page=1";
    const data = await fetch(url);
    const json = await data.json();
    setData(json.total);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {Array(data)
        .fill(0)
        .map((_, i) => (
          <button onClick={handleClick} >{i + 1}</button>
        ))}
       {JSON.stringify(userData)}
    </div>
  );
}

export default App;

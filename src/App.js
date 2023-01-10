import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=83dbcc190fda6550b3317f505d8415fb`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        ></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            {data.main ? <h1>{data.main.temp.toFixed()} C</h1> : null}
          </div>
          
          <div className="desc">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
            {data.weather ? <img alt="icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}></img> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feel">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()}mph</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import React from "react";

let firstUrl = "http://www.bluesuncorp.co.uk/cgi-bin/people.cgi";
let secondUrl = "http://www.bluesuncorp.co.uk/cgi-bin/places.cgi";

function People({ places, people, setPlaces, setPeople }) {
  React.useEffect(() => {
    fetch(firstUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!people.length) {
          setPeople(data);
        }
      });
  }, []);

  return people.map((person) => {
    return (
      <div>
        {person.name} {person.title}{" "}
        {person.name === "Cugel" ? "of Almery" : null}
        {person.name === "Iucounu" ? "Of Cutz" : null}
        {person.name === "Firx" ? "of The Overworld" : null}
      </div>
    );
  });
}
function Places({ places, people, setPlaces, setPeople }) {
  React.useEffect(() => {
    fetch(secondUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!places.length) {
          setPlaces(data);
        }
      });
  }, []);
  return places.map((place) => {
    return <div>{place.name}</div>;
  });
}

function CountFromNum({ num = 0 }) {
  const [number, setNumber] = React.useState(num);
  React.useEffect(() => {
    let mounted = true;
    let interval = setInterval(() => {
      if (mounted) {
        setNumber((val) => {
          console.log(val);
          return val + 1;
        });
      }
    }, 1000);
    return function cleanUp() {
      clearInterval(interval);
    };
  }, []);

  return <div>{number}</div>;
}

function App() {
  const [show, setShow] = React.useState(true);
  const [places, setPlaces] = React.useState([]);
  const [people, setPeople] = React.useState([]);
  return (
    <div className="App">
      <People
        places={places}
        people={people}
        setPlaces={setPlaces}
        setPeople={setPeople}
      ></People>
      {/* <Places
        places={places}
        people={people}
        setPlaces={setPlaces}
        setPeople={setPeople}
      ></Places> */}
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        what does this do???
      </button>
      {show ? <CountFromNum></CountFromNum> : null}
    </div>
  );
}

export default App;

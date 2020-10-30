import "./App.css";
import React from "react";

let firstUrl = "http://www.bluesuncorp.co.uk/cgi-bin/people.cgi";
let secondUrl = "http://www.bluesuncorp.co.uk/cgi-bin/places.cgi";

function People({ places, people, setPlaces, setPeople }) {
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
  console.log(people, places);
  console.log("worn out faces, worn out places");
  console.log("and I find it kind of funny and I find it kind of sad");
  return people.map((person) => {
    return (
      <div>
        {person.name} {person.title}
        {" of "}
        {places.length
          ? places.find((place) => {
              return place.id === person.origin_id;
            }).name
          : null}
        {/* {places.map((place) => {
          return person.origin_id === place.id ? place.name : null;
        })} */}
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

function StopWatch() {
  const [time, setTime] = React.useState(0);
  const [start, setStart] = React.useState(false);
  console.log(start);
  React.useEffect(() => {
    let timer = setInterval(() => {
      if (start) {
        setTime((tenth) => {
          return (tenth += 0.1);
        });
      }
    }, 100);
    return function cleanUp() {
      clearInterval(timer);
    };
  }, [start]);
  return (
    <div>
      {" "}
      <div>
        {Math.floor(time * 10) / 10}
        {(Math.floor(time * 10) / 10) % 1 === 0 ? ".0" : null}
      </div>
      <button
        onClick={() => {
          setStart(!start);
        }}
      >
        START/PAUSE
      </button>
      <button
        onClick={() => {
          setTime(0);
        }}
      >
        RESET
      </button>
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <div>COUNT:{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add One
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Subtract One
      </button>
      <button
        onClick={() => {
          setCount(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

function countReducer(state, action) {
  if (action === "add") {
    return { count: state.count + 1 };
  } else if (action === "subtract") {
    return { count: state.count - 1 };
  } else if (action === "reset") {
    return { count: 0 };
  }
}

function CountCountula() {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
  return (
    <div>
      <div>COUNT:{state.count}</div>
      <button
        onClick={() => {
          dispatch("add");
        }}
      >
        Add One
      </button>
      <button
        onClick={() => {
          dispatch("subtract");
        }}
      >
        Subtract One
      </button>
      <button
        onClick={() => {
          dispatch("reset");
        }}
      >
        Reset
      </button>
    </div>
  );
}

function CountFromNum({ num = 0 }) {
  const [number, setNumber] = React.useState(num);
  React.useEffect(() => {
    let mounted = true;
    setInterval(() => {
      if (mounted) {
        setNumber((val) => {
          console.log(val);
          return val + 1;
        });
      }
    }, 1000);
    return function cleanUp() {
      mounted = false;
    };
  }, []);

  return <div>{number}</div>;
}

function App() {
  const [show, setShow] = React.useState(false);
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
      <StopWatch></StopWatch>
      <Counter></Counter>
      <CountCountula></CountCountula>
    </div>
  );
}

export default App;

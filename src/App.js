import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Register from "./pages/Register";
import BarChart from "./pages/BarChart";
import { useState } from "react";

;


const Page404 = () => {
  return <h1>Pagenot Found</h1>;
};

function App() {
  const [num, setNum] = useState(2);


  const data = [
    { xAxisValue: "India", yAxisValue: 50 },
    { xAxisValue: "America", yAxisValue: 30 },
    { xAxisValue: "Australia", yAxisValue: 40 },
    { xAxisValue: "Pakistan", yAxisValue: 25 },
    { xAxisValue: "China", yAxisValue: 20 },
    { xAxisValue: "Russia", yAxisValue: 10 },
    { xAxisValue: "Africa", yAxisValue: 30 },
  ];
  const newArr = data.map((item) => {
    const container = {};
    container.xAxisValue = item.xAxisValue;
    container.yAxisValue = item.yAxisValue * num;
  
    return container;
  });
  console.log("hello", newArr)

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleClick = () => {
    setNum(randomNumberInRange(1, 5));
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />}></Route>
          <Route
            exact
            path="/barchart"
            element={
              <BarChart
                width={775}
                height={244}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                onChangenumber={handleClick}
                data={newArr}
              />
            }
          ></Route>


          <Route exact path="*" element={<Page404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

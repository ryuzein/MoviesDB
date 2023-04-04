import "./App.css";
import "./styles/style.css";
import "react-awesome-slider/dist/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import View from "./components/View";
import Home from "./components/Home";
import Person from "./components/Person";
import Genre from "./components/genre/Genre";
import ListGenre from "./components/genre/ListGenre";
import Top from "./components/Top";
import Upcoming from "./components/Upcoming";
import TrendingMain from "./components/trending/TrendingMain";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search/:movie" component={Search} />
          <Route path="/view/:id" component={View} />
          <Route path="/person/:id" component={Person} />
          <Route path="/genre/:name/:genrename" component={Genre} />
          <Route path="/genre" component={ListGenre} />
          <Route path="/top" component={Top} />
          <Route path="/upcoming" component={Upcoming} />
          <Route path="/trending" component={TrendingMain} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

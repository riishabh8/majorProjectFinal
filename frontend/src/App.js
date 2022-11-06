import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import { MovieProvider } from "../src/context/MovieContext";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  return (
    <MovieProvider>
      <>
        <Router>
          <Header user={user} setUser={setUser} />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/movies/:id" element={<MovieDetails user={user} />}></Route>
            <Route path="/login" element={<Login setUser={setUser} />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </Router>
      </>
    </MovieProvider>
  );
}

export default App;

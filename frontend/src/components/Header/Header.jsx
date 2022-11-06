import React, { useState } from "react";
import "./header.css";
import searchSvg from "./search-24px.svg";
import { useContext } from "react";
import MovieContext from "../../context/MovieContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedMovie, setSearchedMovie] = useState([]);

  const { setMovie } = useContext(MovieContext);

  async function fetchSearchText(params) {
    if (searchText === "") {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=1b6c5548b651ca79c1b54bb8139164dc&page=1&language=en-US&page=${1}`
        );
        const data = await response.json();
        setSearchedMovie(data.results);
        console.log("api called");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=1b6c5548b651ca79c1b54bb8139164dc&page=1&language=en-US&query=${searchText}&page=1&include_adult=false`
        );
        const data = await response.json();
        setSearchedMovie(data.results);
        console.log("api called");
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (searchedMovie.length !== 0) {
    setMovie(searchedMovie);
  }

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const data = {};
  const { user, setUser } = props;

  const HandleClick = () => {
    const url = "/api/sessions/me";

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const DeleteSession = () => {
      fetch(url, requestOptions)
        .then((response) => {
          if (response.status === 204) {
            setUser("");
            navigate("/session/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    DeleteSession();
  };

  const GetStatus = () => {
    const url = "http://localhost:3001/api/sessions/currentSession";

    fetch(url).then((response) => {
      if (response.status === 200) {
        setLoginStatus(!loginStatus);
      } else if (response.status === 204) {
        setLoginStatus(!loginStatus);
      }
    });
  };

  // setInterval(GetStatus(), 1000);

  return (
    <>
      <div className="headerWrapper">
        <div className="headerHeading">
          <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
            Click&Check
          </NavLink>
        </div>
        <div className="headerSearch">
          <input
            className="inputField"
            type="text"
            placeholder="Search for movies"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <img
            onClick={fetchSearchText}
            src={searchSvg}
            alt=""
            className="searchImg"
          />
        </div>
        <div className="item">
          <p>{user}</p>
        </div>
        <div className="headerLogin">
          <a href="/signup" style={{ color: "white", textDecoration: "none" }}>
            <i onClick={HandleClick} class="fa-solid fa-user"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;

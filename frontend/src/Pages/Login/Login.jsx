import React from "react";
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

function Login(props) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const {setUser } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    let data = {
      username,
      password,
    };
    console.log(data);
    axios.post("http://localhost:3001/api/users/session", data).then((res) => {
      console.log(res);
      setUser(username);
      navigate("/")
    });
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit} className="container-signup">
        <label htmlFor="username">username:</label>
        <input
          id="username"
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => {
            setusername(e.target.value);
            console.log(username);
          }}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => {
            setpassword(e.target.value);
            console.log(password);
          }}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;

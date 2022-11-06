import React from "react";
import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [gmail, setgmail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(gmail);
    let data = {
      gmail,
      password,
      username,
      firstname,
      lastname,
    };
    console.log(data);
    axios.post("http://localhost:3001/api/users/user", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      Signup
      <form onSubmit={handleSubmit} className="container-signup"  >
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
        <label htmlFor="firstname">firstname:</label>
        <input
          id="firstname"
          type="text"
          placeholder="firstname"
          name="firstname"
          onChange={(e) => {
            setfirstname(e.target.value);
            console.log(firstname);
          }}
        />
        <br />
        <label htmlFor="lastname">lastname:</label>
        <input
          id="lastname"
          type="text"
          placeholder="lastname"
          name="lastname"
          onChange={(e) => {
            setlastname(e.target.value);
            console.log(lastname);
          }}
        />
        <br />
        <label htmlFor="gmail">gmail:</label>
        <input
          id="gmail"
          type="email"
          placeholder="gmail"
          name="gmail"
          onChange={(e) => {
            setgmail(e.target.value);
            console.log(gmail);
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
      <p>
        New User ?{" "}
        <button
          id="clickHere"
          onClick={() => {
            navigate(`/login`);
          }}
        >
          Click Here
        </button>
      </p>
    </div>
  );
}

export default Signup;

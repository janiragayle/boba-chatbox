import "./styles/loginRegister.css";
import Link from "next/link";
import { useState } from "react";
import axios from "../utils/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Error logging in");
    }
  };

  return (
    <div>
      <div className="header">
        <Link href="homepage"><h1 className="logo">Boba Broskis</h1></Link>
      </div>
      <div className="wrapper">
      <div className="container">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="formBox">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="swap">
          <p>New customer?</p>
          <Link href="/register" className="swapLink"> Click here to register!</Link>
        </div>
        </div>
      </div>
    </div>
  );
}

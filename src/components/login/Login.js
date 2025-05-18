import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context";
import Button from "../common/Button/Button";
import "./Login.css";
const Login = () => {
  const { setIsAuth } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Starts empty
  const [password, setPassword] = useState(""); // Starts empty
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://expressjs-auth.onrender.com/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      if (error.response) {
        // alert(error.response.data.message || "Login failed");
      } else {
        // alert("Server error");
      }
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://expressjs-auth.onrender.com/api/auth/register",
        { email, password },
        {
          withCredentials: true,
        }
      );
      //   alert("Registration successful. You can now log in.");
      setIsRegistering(false);
    } catch (error) {
      if (error.response) {
        // alert(error.response.data.message || "Registration failed");
      } else {
        // alert("Server error");
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={isRegistering ? handleRegister : handleLogin}
          loading={loading}
          text={isRegistering ? "Register" : "Login"}
        />
        <p>
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegistering((prev) => !prev)}>
            {isRegistering ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

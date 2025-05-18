import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context";
import Button from "./common/Button/Button";

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://expressjs-auth.onrender.com/api/auth/logout",
        {},
        {
          withCredentials: true, // ✅ send the cookie
        }
      );
      setIsAuth(false);
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
      console.error(error);
    }
    setLoading(false);
  };

  return <Button onClick={handleLogout} loading={loading} text="Logout" />;
};

export default Logout;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import { authContext } from "./context";
// Protected Route wrapper
function PrivateRoute({ isAuth, children }) {
  if (isAuth === null) return <div>Loading...</div>; // Optional loading fallback
  return isAuth ? children : <Navigate to="/login" replace />;
}

// Public Route wrapper to redirect logged-in users away from login page
function PublicRoute({ isAuth, children }) {
  if (isAuth === null) return <div>Loading...</div>; // Optional loading fallback
  return !isAuth ? children : <Navigate to="/" replace />;
}

function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("https://expressjs-auth.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading authentication status...</div>;
  }
  const authValue = { isAuth, setIsAuth };
  return (
    <authContext.Provider value={authValue}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Public Login route */}
          <Route
            path="/login"
            element={
              <PublicRoute isAuth={isAuth}>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </authContext.Provider>
  );
}

export default App;

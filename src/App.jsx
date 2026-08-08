import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.users.currentUser);
  return (
    <div className="App">
      <div
        className="blur"
        style={{ top: "-16%", right: "0" }}
      ></div>
      <div
        className="blur"
        style={{ top: "34%", left: "-8rem" }}
      ></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        {/* <Home /> */}
        {/* <Profile /> */}
        {/* <Auth /> */}
      </Routes>
    </div>
  );
}

export default App;

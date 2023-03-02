import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Authentications from "./pages/Authentications";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login" element={<Authentications/>} />
          <Route path="/signup" element={<Authentications/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

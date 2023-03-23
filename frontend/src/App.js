import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" exact element={<Home/>} />
//           <Route path="/profile" element={<Profile/>} />
//           <Route path="/login" element={<Authentications/>} />
//           <Route path="/signup" element={<Authentications/>} />
//         </Routes>
//       </Router>
      
//     </div>
//   );
// }


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <NavBar/> 
        <Alert message="Anurag is a good boy"/>
        <div className="container"> 
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './conponent/Navbar';
import { Home } from './conponent/Home';
import { About } from './conponent/About';
import NoteState from './context/notes/NoteState';
import Alert from './conponent/Alert'
import Signin from './conponent/Signin';
import Signup from './conponent/Signup';
import { useState } from 'react';
function App() {


  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">


            <Routes>
              <Route path="/about" element={<About />}>

              </Route>
              <Route path="/" element={<Home showAlert={showAlert}/>}>

              </Route>
              <Route path="/signin" element={<Signin showAlert={showAlert}/>}>

              </Route>
              <Route path="/signup" element={<Signup showAlert={showAlert}/>}>

              </Route>
            </Routes>

          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

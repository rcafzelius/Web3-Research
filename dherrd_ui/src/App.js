import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Feed from './Feed';
import Login from './Login';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//add login logic
function App() {
  return(
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Feed/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

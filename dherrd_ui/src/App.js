import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Feed from './Feed';
import Login from './Login';
import ConnectWallet from './ConnectWallet';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

//add login logic
function App() {
  const [accounts, setAccounts] = useState('');
  const [verified, setVerified] = useState(false);
  function PrivateRoute({children}){
    if (!verified){
      return(
        <Navigate to="/login" replace />
      )
    }
    return children;
  }
  return(
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Header
          accounts={accounts}
        />
        <main>
          <Routes>
            <Route path="login" element={<Login
              verified={verified}
              setVerified={setVerified}
            />}/>
            <Route path="connect" element={<ConnectWallet
              accounts={accounts}
              setAccounts={setAccounts}
            />}/>
            <Route path="/" element={
              <PrivateRoute path="/">
                <Feed/>
              </PrivateRoute>
            }/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

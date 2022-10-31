import {UserContext} from './contexts/UserContext';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import { Newsfeed } from './components/Newsfeed';

function App()
{
  const [user, setUser] = useState({username:"bob"});
  const [theme, setTheme] = useState('light');
  
  return <UserContext.Provider value={user}>
  <Router>
    <Routes>
    
    </Routes>
  </Router>
  <Newsfeed/>
</UserContext.Provider>
}

export default App;
import {UserContext} from './contexts/UserContext';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import { Home } from './components/Home';
import { Newsfeed } from './components/Newsfeed';
import { NotFound } from './components/NotFound';

function App()
{
  const [user, setUser] = useState({username:"grumpy19"});

  return <UserContext.Provider value={user}>
    <Router>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/topic/:slug' element={<Newsfeed/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  </UserContext.Provider>
}

export default App;
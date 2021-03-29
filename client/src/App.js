import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Progress from './components/progress';
import Nav from './components/nav';

export default function App() {
  const [progress, setProgress] = useState('');

  useEffect(() => {
    setProgress('d-none')
  }, [])

  return (
    <div className="App">
      <Router>
        <Progress progress={progress} />
        <Nav setProgress={setProgress} />
        <Switch>

          <Route exact path="/">
            <Home setProgress={setProgress} />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

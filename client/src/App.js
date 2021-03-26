import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Progress from './components/progress';

export default function App() {
  const [loading, setLoading] = useState('');

  useEffect(() => {
    setLoading('d-none')
  }, [])

  return (
    <div className="App">
      <Router>
        <Progress loading={loading} />
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

const queryCache = new QueryCache();

function App() {
  return (
    <Router>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      </ReactQueryCacheProvider>
    </Router>
  );
}

export default App;

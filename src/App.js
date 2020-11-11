import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      </Router>
    </ReactQueryCacheProvider>
  );
}

export default App;

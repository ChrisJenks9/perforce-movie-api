import React, { Fragment} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Home from './pages/Home';
import Sidebar from "./components/common/sidebar";
import Header from "./components/common/header";


const App = () => {
  return (
    <Fragment>
      <MovieProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </MovieProvider>
    </Fragment>
  );
};

export default App;

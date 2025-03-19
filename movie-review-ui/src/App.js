import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Sidebar from "./components/common/sidebar";
import AddMovie from "./pages/AddMovie";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Sidebar />
        <Routes>
          <Route path="/add-movie" element={<AddMovie />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;

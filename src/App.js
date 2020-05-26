import React from "react";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import LoginPage from "./components/LoginPage/LoginPage";
import GlobalStyle from "./components/GlobalStyles/GlobalStyles";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/chat" component={Chat} />

      <GlobalStyle />
    </Router>
  );
};

export default App;

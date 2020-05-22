import React from "react";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import GlobalStyle from "./components/GlobalStyles/GlobalStyles";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <GlobalStyle />
    </Router>
  );
};

export default App;

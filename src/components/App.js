import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

const PageOne = () => {
  return (
    <div>
      Page one
      <Link to="/pagetwo">Link to page two</Link>
    </div>
  );
};

const pageTwo = () => {
  return (
    <div>
      Page Two
      <input type="button" value="testing" />
      <Link to="/">Link to page one</Link>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={PageOne} />
        <Route path="/pagetwo" exact component={pageTwo} />
      </div>
    </BrowserRouter>
  );
};

export default App;

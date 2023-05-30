import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import Comments from "./components/Comments";
import Profile from "./components/profile";
import Register from "./components/Register";
import Login from "./components/login";
import NotFound from "./components/notFound";
import Protected from "./components/protected";
import Restaurant from "./components/restaurant";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comments" component={Comments} />
          <Protected exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/restaurant" component={Restaurant} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;

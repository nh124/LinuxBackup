import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

export default function Protected({ component: Component, ...rest }) {
  const [user, setUser] = useState("");
  const getCurrUser = () => {
    fetch("/user").then((response) =>
      response.json().then((data) => {
        setUser(data);
      })
    );
  };
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user !== "Unauthorized") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

import React from "react";
import { useRouteError, Link } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h1>Oops! 😢</h1>
      <h2>Something went wrong.</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" style={{ color: "blue" }}>Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;

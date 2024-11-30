import React from "react";

const ErrorPage = ({ message, error }) => {
  return (
    <div>
      <h1>{message}</h1>
      <h2>{error?.status}</h2>
      <pre>{error?.stack}</pre>
    </div>
  );
};

export default ErrorPage;

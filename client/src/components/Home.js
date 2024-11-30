import React from "react";

const Home = ({ title, user }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Welcome to {title}</p>

      {user && (
        <a href="/createTask" className="btn btn-primary">
          Create New Task
        </a>
      )}
    </div>
  );
};

export default Home;

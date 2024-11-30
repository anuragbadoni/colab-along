import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-signin">
      <h2 className="form-signin-heading text-center">Login</h2>
      <br />
      <input
        type="email"
        className="form-control"
        name="email"
        placeholder="Email"
        required
        autoFocus
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        className="form-control"
        name="password"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <button type="submit" className="btn btn-lg btn-primary btn-block">
        Sign In
      </button>
      <br />
      {/* Uncomment the following for additional options */}
      {/* <h4 className="text-center">Or</h4>
            <br />
            <a href="/auth/facebook" className="btn btn-lg btn-success btn-block">
                Sign In With Facebook
            </a> */}
    </form>
  );
};

export default Login;

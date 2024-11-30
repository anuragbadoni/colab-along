import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];

    // Example validation (add more logic as needed)
    if (formData.password !== formData.confirmPassword) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      // Handle form submission logic (e.g., API call)
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-signin">
      {errorMessages.length > 0 &&
        errorMessages.map((error, index) => (
          <div key={index} className="alert alert-danger">
            {error.msg}
          </div>
        ))}

      <h2 className="form-signin-heading text-center">New Account</h2>
      <br />

      <input
        type="text"
        name="name"
        className="form-control"
        placeholder="Name"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        className="form-control"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="password"
        className="form-control"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="confirmPassword"
        className="form-control"
        placeholder="Confirm Password"
        required
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <br />
      <button type="submit" className="btn btn-lg btn-primary btn-block">
        Sign Up
      </button>
      <br />
      {/* Uncomment the following for additional options */}
      {/* <h4 className="text-center">Or</h4>
            <br />
            <a href="/auth/facebook" className="btn btn-lg btn-success btn-block">
                Sign Up With Facebook
            </a> */}
    </form>
  );
};

export default SignupForm;

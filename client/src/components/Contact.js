import React, { useState } from "react";

const Contact = ({ errorMessages = [], initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    message: initialData.message || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <h1 className="text-center">Contact Us</h1>

      <form className="col-md-6 col-md-offset-3" onSubmit={handleSubmit}>
        {errorMessages.map((error, index) => (
          <div key={index} className="alert alert-danger">
            {error.msg}
          </div>
        ))}

        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            className="form-control"
            rows="3"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

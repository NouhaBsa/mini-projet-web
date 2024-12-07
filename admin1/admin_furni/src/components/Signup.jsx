import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    console.log('Submitted form data:', formData);


    try {
      const response = await fetch('https://meuble-backend.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          role: 'admin', 
          address: formData.address, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! You can now log in.');
        setError('');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          
        });
      } else {
        setError(data.message || 'An error occurred.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Server error. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12">
          <div className="card shadow-sm rounded-3 p-4">
            <h3 className="text-center mb-4">Create an Account</h3>

           
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="first-name" className="text-muted">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="last-name" className="text-muted">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Your last name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="text-muted">Enter your email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="text-muted">Enter your password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Your password"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="confirm-password" className="text-muted">Confirm your password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Confirm your password"
                  required
                />
              </div>
             
              <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
                Sign Up
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted">Already have an account?</p>
              <Link to="/login" className="btn btn-secondary btn-sm px-4 py-2">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

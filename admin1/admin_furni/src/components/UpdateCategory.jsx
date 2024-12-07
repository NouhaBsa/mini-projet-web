import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCategory() {
  const { categoryName } = useParams(); 
  const [newCategoryName, setNewCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    setNewCategoryName(categoryName);
  }, [categoryName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    console.log("Token being sent: ", token);
    if (!newCategoryName) {
      setErrorMessage('New category name is required');
      return;
    }
  
    try {
        const response = await axios.put(
            `https://meuble-backend.onrender.com/category/${categoryName}`,
            { name: newCategoryName },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
              },
            }
          );
      if (response.status === 200) {
        navigate("/categories");
      }
    } catch (error) {
      setErrorMessage('Error updating category');
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12">
          <div className="card shadow-lg rounded-3 p-5">
            <h3 className="text-center mb-4 text-primary">Update Category</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="categoryName" className="text-muted">Current Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  className="form-control form-control-lg"
                  value={categoryName}
                  disabled
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="newCategoryName" className="text-muted">New Category Name</label>
                <input
                  type="text"
                  id="newCategoryName"
                  className="form-control form-control-lg"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                />
              </div>

              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <button
                type="submit"
                className="btn btn-success w-100 py-2 mt-3"
              >
                Update Category
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted">Go back to</p>
              <button
                  onClick={() => navigate('/categories')}
                  class="btn btn-secondary me-2"
                >
                  Categories
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;

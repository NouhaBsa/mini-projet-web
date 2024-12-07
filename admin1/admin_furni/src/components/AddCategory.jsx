import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    console.log("Token being sent: ", token);

    if (!categoryName) {
      setErrorMessage('Category name is required.');
      return;
    }

    try {
      // Vous pouvez appeler votre API ici pour ajouter la catégorie.
      // Par exemple :
      const response = await fetch(`https://meuble-backend.onrender.com/category/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        
        navigate('/categories');
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (error) {
        console.error('Error details:', error);
      setErrorMessage('Error creating category. Please try again.');
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="card shadow-lg rounded-3 p-5">
              <h3 className="text-center mb-4 text-primary">Add New Category</h3>
              <form onSubmit={handleSubmit}>
               
                <div className="form-group mb-4">
                  <label htmlFor="categoryName" className="text-muted">Category Name</label>
                  <input
                    type="text"
                    id="categoryName"
                    className="form-control form-control-lg"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </div>

                
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

               
                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 mt-3"
                >
                  Add Category
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
    </>
  );
}

export default AddCategory;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(''); 

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`https://meuble-backend.onrender.com/category`); 
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  
  const handleDelete = async (categoryName) => {
    try {
        
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("User is not authenticated");
          return;
        }
    
        console.log("Token being sent: ", token);
      const response = await axios.delete(`https://meuble-backend.onrender.com/category/${categoryName}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.status === 200) {
        
        setCategories(categories.filter(category => category.name !== categoryName));
      } else {
        setErrorMessage('Error deleting category. Please try again.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      setErrorMessage('Error deleting category. Please try again.');
    }
  };

  return (
    <div className="table-container">
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <Link to="/add-category" className="btn add-btn">
          Add Category
        </Link>
      </div>

      
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <table>
        <thead>
          <tr>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td> 
              <td>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDelete(category.name)} 
                >
                  Delete
                </button>
                <Link
                  to={`/update-category/${category.name}`} 
                  className="btn update-btn"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;

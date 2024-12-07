import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import { Chart as ChartJS, PointElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PieController, BarController, LineController, LineElement } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  BarController,
  LineController,
  LineElement, 
  PointElement
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const authToken = localStorage.getItem('authToken'); 

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://meuble-backend.onrender.com/product', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [authToken]);

  
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://meuble-backend.onrender.com/product/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setProducts(products.filter(product => product.id !== id));
      navigate('/products'); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  
  const createChart = (canvasId, type, data, options) => {
    if (document.getElementById(canvasId)) {
      new ChartJS(document.getElementById(canvasId), {
        type: type,
        data: data,
        options: options,
      });
    }
  };

  const productCategoryData = {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    datasets: [{
      label: 'Products by Category',
      data: [12, 19, 3],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  const userRoleData = {
    labels: ['Admin', 'User', 'Guest'],
    datasets: [{
      label: 'Users by Role',
      data: [5, 8, 2],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Monthly Sales',
      data: [50, 100, 150],
      backgroundColor: '#FF6347',
    }],
  };

  useEffect(() => {
    if (!loading) {
      
      createChart('productCategoriesChart', 'pie', productCategoryData, {
        responsive: true,
        plugins: { legend: { position: 'top' } },
      });

      createChart('userRoleChart', 'bar', userRoleData, {
        responsive: true,
        plugins: { legend: { position: 'top' } },
      });

      createChart('salesChart', 'line', salesData, {
        responsive: true,
        plugins: { legend: { position: 'top' } },
      });
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>

      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.cost}</td>
              <td>{product.stock}</td>
              <td>
                <button className="btn delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div style={{ marginTop: '30px' }}>
        <canvas id="productCategoriesChart" style={{ width: '400px', height: '300px' }}></canvas>
        <canvas id="userRoleChart" style={{ width: '400px', height: '300px' }}></canvas>
        <canvas id="salesChart" style={{ width: '400px', height: '300px' }}></canvas>
      </div>
    </div>
  );
};

export default Products;

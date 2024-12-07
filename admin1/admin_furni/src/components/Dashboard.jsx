import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PieController, BarController, LineController } from 'chart.js'; // Import necessary components

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
  LineController 
);

function Dashboard() {
  const [productsData, setProductsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const authToken = localStorage.getItem('authToken'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, usersResponse] = await Promise.all([
          axios.get('https://meuble-backend.onrender.com/product', {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            }
          }),
          axios.get('https://meuble-backend.onrender.com/user/all', {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            }
          })
        ]);
        setProductsData(productsResponse.data);
        setUsersData(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);  

 
  const productCategories = productsData.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  
  const userRoles = usersData.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  
  const userRoleData = {
    labels: Object.keys(userRoles),
    datasets: [{
      label: 'Users by Role',
      data: Object.values(userRoles),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6347'],
    }]
  };

  
  const productCategoryData = {
    labels: Object.keys(productCategories),
    datasets: [{
      label: 'Products by Category',
      data: Object.values(productCategories),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6347'],
    }]
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

  useEffect(() => {
    if (!loading) {
      createChart('productCategoriesChart', 'pie', productCategoryData, {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      });

      createChart('userRoleChart', 'bar', userRoleData, {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      });
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>Product Categories</h3>
        <canvas id="productCategoriesChart" style={{ width: '300px', height: '200px' }}></canvas> 
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Users by Role</h3>
        <canvas id="userRoleChart" style={{ width: '300px', height: '200px' }}></canvas> 
      </div>
    </div>
  );
}

export default Dashboard;

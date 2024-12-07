import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Orders = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem('authToken'); 

  useEffect(() => {
    
    const fetchDeals = async () => {
      try {
        const response = await axios.get('https://meuble-backend.onrender.com/orders', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setDeals(response.data);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [authToken]);

  const createChart = (canvasId, data, options) => {
    if (document.getElementById(canvasId)) {
      new ChartJS(document.getElementById(canvasId), {
        type: 'bar', 
        data: data,
        options: options,
      });
    }
  };

  useEffect(() => {
    if (!loading && deals.length > 0) {
      const chartData = {
        labels: deals.map(deal => deal.email), 
        datasets: [
          {
            label: 'Transaction Amounts',
            data: deals.map(deal => deal.totalAmount), 
            backgroundColor: '#FF6347',
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };

      createChart('transactionsChart', chartData, chartOptions);
    }
  }, [loading, deals]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transactions</h2>

     
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {deals.map(deal => (
            <tr key={deal.id}>
              <td>{deal.email}</td>
              <td>{deal.totalAmount}</td>
              <td>{deal.paymentMethod}</td>
              <td>{deal.paymentStatus}</td>
              <td>{new Date(deal.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div style={{ marginTop: '30px' }}>
        <canvas id="transactionsChart" style={{ width: '600px', height: '400px' }}></canvas>
      </div>
    </div>
  );
};

export default Orders;

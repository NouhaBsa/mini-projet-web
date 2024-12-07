import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserBoard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('You are not authenticated.');
          console.error('Auth token is missing.');
          return;
        }

        const response = await axios.get('https://meuble-backend.onrender.com/user/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (email) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You are not authenticated.');
        console.error('Auth token is missing.');
        return;
      }

      const response = await axios.delete(`https://meuble-backend.onrender.com/user/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUsers(users.filter((user) => user.email !== email));
      } else {
        setError('Failed to delete the user.');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete the user. Please try again.');
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn delete-btn" onClick={() => handleDelete(user.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UserBoard;

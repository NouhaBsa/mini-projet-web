import Footer from './Footer.jsx';
import Header from './Header.jsx';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




import Login from './Login.jsx';

import Signup from './Signup.jsx';
import Users from './Users.jsx';
import Dashboard from './Dashboard.jsx';
import Orders from './Orders.jsx';
import Products from './Products.jsx';
import Categories from './Categories.jsx';
import AddCategory from './AddCategory.jsx';
import UpdateCategory from './UpdateCategory.jsx';


function App() {
  

  return (
  <>
   <Router>
      <Header /> 
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/update-category/:categoryName" element={<UpdateCategory />} />
       </Routes>
    </Router>
    <Footer/>
  </>
  
  
  );
}

export default App

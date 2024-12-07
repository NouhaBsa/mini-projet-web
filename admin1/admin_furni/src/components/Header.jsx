import { Link, useLocation } from 'react-router-dom';



function Header() {
    const location = useLocation();
 
    return (
   

        <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark" aria-label="Furni navigation bar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Admin/Furni<span>.</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/categories' ? 'active' : ''}`}>
                <Link className="nav-link" to="/categories">
                  Categories
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/users' ? 'active' : ''}`}>
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/products' ? 'active' : ''}`}>
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/orders' ? 'active' : ''}`}>
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
            </ul>
          </div>
      
          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            <li>
              <Link className="nav-link" to="/login">
                <img src="images/user.svg" alt="User Icon" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
  );
}

export default Header;

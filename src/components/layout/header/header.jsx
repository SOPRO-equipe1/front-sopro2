import React from 'react';
import { Link } from 'react-router-dom'; //
import './header.css'
import soproLogo from "../../../assets/icons/logo.png";

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
       
        <Link to="/" className="logo-link">
          <img src={soproLogo} className="header-logo" alt="SOPRO Logotipo" />
        </Link>
        
        <nav className="nav-menu">
          <ul className="nav-list">
            <li><Link to="/" className="nav-item">INÍCIO</Link></li>
            <li><Link to="/sobrenos" className="nav-item">SOBRE NÓS</Link></li>
            <li><Link to="/suporte" className="nav-item">SUPORTE</Link></li>
            <li><Link to="/produto" className="nav-item">PRODUTO</Link></li>
            <li><Link to="/planos" className="nav-item">PLANOS</Link></li>
            <li><Link to="/login" className="nav-item btn-login">LOGIN</Link></li>
            
            
         
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
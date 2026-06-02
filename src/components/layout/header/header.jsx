import React from 'react';
import { Link } from 'react-router-dom'; 
import './header.css'
import soproLogo from "../../../assets/icons/logo.png";
import { useState } from 'react';
import menuSanduiche from '../../../assets/icons/menu_sanduiche.svg'
import botaofechar from '../../../assets/images/chatbot/botao_fechar.svg'

const Header = () => {

  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">
       
        <Link to="/" className="logo-link">
          <img src={soproLogo} alt="SOPRO Logotipo" className="sopro-logo" />
        </Link>

        <button className="menu_lateral" onClick={() => setMenuAberto(!menuAberto)}>
           <img src={menuSanduiche} alt="Menu Lateral" />
        </button>
      
  
        <nav className={`nav-menu ${menuAberto ? "aberto" : ""}`}>
        <div className="menu_topo">
            <img src={soproLogo} alt="SOPRO Logotipo" className="sopro-logo-menu" />
            <img src={botaofechar} alt="SOPRO Logotipo" className="btn-fechar" onClick={() => setMenuAberto(false)} />
        </div>
          <ul className="nav-list">
            <li><Link to="/" className="nav-item">INÍCIO</Link></li>
            <li><Link to="/sobrenos" className="nav-item">SOBRE NÓS</Link></li>
            <li><Link to="/suporte" className="nav-item">SUPORTE</Link></li>
            <li><Link to="/produto" className="nav-item">PRODUTO</Link></li>
            <li><Link to="/planos" className="nav-item">PLANOS</Link></li>
            <li><div className="btn-login-wrapper"><Link to="/login" className="nav-item btn-login">LOGIN</Link></div></li>
            
            
    
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
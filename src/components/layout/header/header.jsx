import React from 'react';
import { Link } from 'react-router-dom'; 
import './header.css'
import soproLogo from "../../../assets/icons/logo.png";
import soproLogoBranca from "../../../assets/icons/logobranc.png";
import { useState } from 'react';
import menuSanduiche from '../../../assets/icons/menu_sanduiche.svg'
import botaofechar from '../../../assets/images/chatbot/botao_fechar.svg'
import { createPortal } from 'react-dom';
import { useAuth } from '../../../context/auth/authContext.jsx'
import { useA11y } from '../../../context/AccessibilityContext.jsx'
import SoprinhoImg from '../../../assets/images/perfil/soprinho_perfil.svg'

import { AnimatePresence } from 'framer-motion';

const Header = () => {
 
  const [menuAberto, setMenuAberto] = useState(false);
  const { estaLogado, usuario, logout } = useAuth(); 
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const { highContrast } = useA11y();
  const logoAtual = highContrast ? soproLogoBranca : soproLogo;
  

  return (
    <header className="main-header">
      <div className="header-container">
       
        <Link to="/" className="logo-link">
          <img src={logoAtual} alt="SOPRO Logotipo" className="sopro-logo" />
        </Link>

        <button className="menu_lateral" onClick={() => setMenuAberto(!menuAberto)}>
           <img src={menuSanduiche} alt="Menu Lateral" />
        </button>
      
  
        <nav className={`nav-menu ${menuAberto ? "aberto" : ""}`}>
        <div className="menu_topo">
            <img src={logoAtual} alt="SOPRO Logotipo" className="sopro-logo-menu" />
            <img src={botaofechar} alt="SOPRO Logotipo" className="btn-fechar" onClick={() => setMenuAberto(false)} />
        </div>
          <ul className="nav-list">
            <li><Link to="/" className="nav-item">INÍCIO</Link></li>
            <li><Link to="/sobrenos" className="nav-item">SOBRE NÓS</Link></li>
            <li><Link to="/suporte" className="nav-item">SUPORTE</Link></li>
            <li><Link to="/produto" className="nav-item">PRODUTO</Link></li>
            <li><Link to="/planos" className="nav-item">PLANOS</Link></li>

           {estaLogado ? (
              <li className="user-menu-item" style={{ position: 'relative' }}>
                <img 
                  src={usuario?.photoURL || SoprinhoImg} 
                  alt="Foto de perfil"
                  onError={(e) => { e.currentTarget.src = SoprinhoImg; }}
                  onPointerDown={() => {
                  console.log('clicou!');
                  setDropdownAberto(!dropdownAberto);
                  }}
                  style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  cursor: 'pointer'
                  }} 
                />
                
                {dropdownAberto && (
                  window.innerWidth > 768 ? (

                    createPortal(
                      <div style={{
                        position: 'fixed',
                        top: '70px',
                        right: '20px',
                        background: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        minWidth: '160px',
                        zIndex: 999999
                      }}>
                      <Link to="/perfil" onClick={() => setDropdownAberto(false)} style={{ display: 'block', padding: '10px 16px', textDecoration: 'none', color: '#111' }}>
                          Minha Conta
                      </Link>
                        <button onClick={async () => { await logout(); setDropdownAberto(false); }} style={{
                          display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '16px', color: '#e53935'
                        }}>
                          Sair
                        </button>
                      </div>,
                      document.body

                    )
                  ) : (

                    <div className="dropdown-mobile-ajustado">
                       <Link to="/perfil" onClick={() => { setDropdownAberto(false); setMenuAberto(false); }} style={{ display: 'block', padding: '12px 16px', textDecoration: 'none', color: '#111', fontSize: '16px', textAlign: 'center' }}>
                             Minha Conta
                        </Link>
                      <button onClick={async () => { await logout(); setDropdownAberto(false); setMenuAberto(false); }} style={{
                          display: 'block', width: '100%', padding: '12px 16px', background: 'none', border: 'none', borderTop: '1px solid #f0f0f0', textAlign: 'center', cursor: 'pointer', fontSize: '16px', color: '#e53935'
                      }}>
                        Sair
                      </button>
                    </div>
                  )
                )}
              </li>

            ) : (

              <li>
                <div className="btn-login-wrapper">
                  <Link to="/login" className="nav-item btn-login" onClick={() => setMenuAberto(false)}>LOGIN</Link>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
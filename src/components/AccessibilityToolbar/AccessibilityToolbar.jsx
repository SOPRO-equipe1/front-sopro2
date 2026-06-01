import React, { useState, useEffect, useRef } from 'react';
import { useA11y } from '../../context/AccessibilityContext';
import { speakText, stopSpeaking } from '../../service/SpeechService.js';
import './AccessibilityToolbar.css';
import iconeacessibilidade from '../../../src/assets/icons/denteLeao.png'

const AccessibilityToolbar = () => {
  const { 
    setFontSize, fontSize, 
    setHighContrast, highContrast,
    cognitiveFocus, setCognitiveFocus,
    screenReaderActive, setScreenReaderActive
  } = useA11y();

  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const lastSpokenText = useRef(""); 
  
  // Efeito do Modo Foco TDAH
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cognitiveFocus) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    if (cognitiveFocus) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cognitiveFocus]);

  
  useEffect(() => {
    if (!screenReaderActive) {
      stopSpeaking();
      lastSpokenText.current = "";
      return;
    }

    const handleMouseOver = (e) => {
     
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      if (e.target.classList.contains('focus-overlay')) return;

     
      const textToSpeak = (e.target.innerText || e.target.ariaLabel || e.target.alt || "").trim();
      
      
      if (textToSpeak.length > 0 && textToSpeak !== lastSpokenText.current) {
        e.stopPropagation(); 
        
        lastSpokenText.current = textToSpeak;
        speakText(textToSpeak);
      }
    };

    const handleMouseLeave = (e) => {
      
      if (e.target === document.body || e.target === document.documentElement) {
        stopSpeaking();
        lastSpokenText.current = "";
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseLeave);
      stopSpeaking();
      lastSpokenText.current = "";
    };
  }, [screenReaderActive]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {cognitiveFocus && (
        <div 
          className="focus-overlay" 
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, transparent 100%, ${highContrast ? 'rgba(0, 0, 0, 0.99)' : 'rgba(0, 0, 0, 0.93)'} 100%)`
          }}
        />
      )}

      <div className="a11y-container" ref={menuRef}>
        <button 
          className="dandelion-trigger" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu de acessibilidade"
        >
          <img src={iconeacessibilidade} alt="Acessibilidade SOPRO" />
        </button>

        {isOpen && (
          <div className="a11y-menu">
            <h3>Acessibilidade SOPRO</h3>
            
            <button className="btn-font" onClick={() => setFontSize(fontSize + 2)}>
              Aumentar Texto
            </button>
            
            <button className="btn-reset" onClick={() => setFontSize(16)}>
              Resetar Fonte
            </button>
            
            <button className={`btn-contrast ${highContrast ? 'active' : ''}`} onClick={() => setHighContrast(!highContrast)}>
              {highContrast ? "Modo Normal" : "Alto Contraste"}
            </button>

            <button 
              className={`btn-focus ${cognitiveFocus ? 'active' : ''}`} 
              onClick={() => setCognitiveFocus(!cognitiveFocus)}
            >
              {cognitiveFocus ? "Mostrar Tudo " : "Modo Foco TDAH "}
            </button>

            <button 
              className={`btn-reader ${screenReaderActive ? 'active' : ''}`} 
              onClick={() => setScreenReaderActive(!screenReaderActive)}
            >
              {screenReaderActive ? "Desativar Leitor 🔈" : "Leitor de Tela 🔊"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AccessibilityToolbar;
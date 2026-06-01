import React from 'react';
import './hero.css';
import { Link } from 'react-router-dom';

// Importamos apenas a linha branca, que é usada como uma tag <img> no conteúdo
import linhaBranca from '../../assets/icons/linhaBranca.svg';

const Hero = () => {
    return (
        // A classe "hero" vai puxar a imagem de fundo automaticamente pelo CSS
        <section className="hero">
            <div className="titulo_hero">
                <h1>Sua voz, sem barreiras</h1>
                
                {/* Linha decorativa abaixo do título */}
                <img src={linhaBranca} alt="Linha Decorativa" />
                
                <p>IA e design para transformar seu sopro em voz</p>
                
                <Link to="/produto" style={{ textDecoration: 'none' }}>
                    <button className="saibaMaisHero">SAIBA MAIS</button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
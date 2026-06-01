import React from 'react';
import './hero.css';
import { Link } from 'react-router-dom';
import linhaBranca from '../../assets/icons/linhaBranca.svg';
import imgHero from '../../assets/images/home/imgSection1.png';

const Hero = () => {
    return (
        <section className="hero" style={{ backgroundImage: `url(${imgHero})` }}>
            <div className="titulo_hero">
                <h1>Sua voz, sem barreiras</h1>
                <img src={linhaBranca} alt="Linha Decorativa" />
                <p>IA e design para transformar seu sopro em voz</p>
                
                {/* Usamos o próprio Link como botão para evitar conflitos de renderização */}
                <Link to="/produto" className="saibaMaisHero">
                    SAIBA MAIS
                </Link>
            </div>
        </section>
    );
};

export default Hero;
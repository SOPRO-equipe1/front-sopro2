import React from 'react';
import './hero.css';
import { Link } from 'react-router-dom';
import linhaBranca from '../../assets/icons/linhaBranca.svg';
import imgHero from '../../assets/images/home/imgSection1.png';

const Hero = () =>{
    return(
        <section className="hero" style={{ backgroundImage: `url(${imgHero})` }}>
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
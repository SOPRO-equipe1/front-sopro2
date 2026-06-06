import React from 'react';
import './hero.css';
import { Link } from 'react-router-dom';
import linhaBranca from '../../assets/icons/linhaBranca.svg';
import imgHero from '../../assets/images/home/imgSection1.png';
import { motion } from 'framer-motion';

const Hero = () => {

    return (

        <section className="hero" style={{ backgroundImage: `url(${imgHero})` }}>
            <motion.div
                    className="titulo_hero"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    >
                <h1>Sua voz, sem barreiras</h1>
                <img src={linhaBranca} alt="Linha Decorativa" />
                <p>IA e design para transformar seu sopro em voz.</p>
                
                {/* Usamos o próprio Link como botão para evitar conflitos de renderização */}
                <Link to="/produto" className="saibaMaisHero btn-suave-global">
                    SAIBA MAIS
                </Link>
            </motion.div>
        </section>
    );
};

export default Hero;
import React from 'react';
import './section3.css';
import raioLaranja from '../../assets/icons/raioLaranja.svg';
import arAzul from '../../assets/icons/arAzul.svg';
import reloadVerde from '../../assets/icons/reloadVerde.svg';
import imgSection3 from '../../assets/images/home/imgSection3.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Section3 = () => {
    return (
        
        <section className="section3">
            <motion.div
                    className="textos_section3"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    >
                <div className="produtoTitulo">
                    <div className="produtoeicone">
                        <img src={raioLaranja} className="raioLaranja" alt="Ícone de raio" />
                        <h3>Produto</h3>
                    </div>
                    <h2>Sopro transforma seu fôlego em poder</h2>
                </div>
                <p className="text">Cada sopro é um comando. Tecnologia no seu ritmo, sem esforço</p>

                <div className="sensiveleaprende">
                    <div className="sensivel">
                        <img src={arAzul} className="arAzul" alt="Ícone de ar" />
                        <p>Sensível ao seu ritmo respiratório</p>
                    </div>

                    <div className="aprende">
                        <img src={reloadVerde} className="reloadVerde" alt="Ícone de atualização" />
                        <p>Aprende e se adapta com o tempo</p>
                    </div>    
                </div>
                
                {/* O Link agora possui a classe do botão, eliminando conflitos */}
                <Link to="/produto" className="saibaMaisLaranja btn-suave-global">
                    SAIBA MAIS
                </Link>
            </motion.div>

            <motion.img
                src={imgSection3}
                className="imgSection3"
                alt="Imagem do produto"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            />   
            
        </section>
    );
};

export default Section3;
import React from 'react';
import './section3.css';
import raioLaranja from '../../assets/icons/raioLaranja.svg';
import arAzul from '../../assets/icons/arAzul.svg';
import reloadVerde from '../../assets/icons/reloadVerde.svg';
import imgSection3 from '../../assets/images/home/imgSection3.png';
import { Link } from 'react-router-dom';

const Section3 = () => {
    return (
        <section className="section3">
            <div className="textos_section3">
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
                <Link to="/produto" className="saibaMaisLaranja">
                    SAIBA MAIS
                </Link>
            </div>

            <img src={imgSection3} className="imgSection3" alt="Imagem do produto" />
        </section>
    );
};

export default Section3;
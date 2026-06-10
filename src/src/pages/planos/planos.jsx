import './planos.css';
import React from 'react';
import heroImage from '../../assets/images/planos/imgPlanos.png';
import verificadoAzul from './../../assets/icons/verificadoAzul.svg'
import verificadoLaranja from './../../assets/icons/verificadoLaranja.svg'
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition/PageTransition';
import { motion } from 'framer-motion';
function Planos() {
  return (

<PageTransition>
    <div className="pagina-planos">
      {/* SEÇÃO PRINCIPAL */}
      
       <section className="container-hero">
              <motion.div
                className="conteudo-hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
        <div className="conteudo-hero">
          <img src={heroImage} alt="Usuário utilizando o dispositivo Sopro" className="imagem-hero" />
          <div className="cartao-hero">
            <h1 className="titulo-hero">Planos que crescem com você</h1>
            <hr className="divisor-hero" />
            <p className="subtitulo-hero">
              Escolha o plano ideal e comece a transformar vidas hoje.
            </p>
          </div>
        </div>
        </motion.div>
      </section>

      {/* SEÇÃO DE PREÇOS */}
      <section className="secao-precos">
        <div className="grade-precos">
           
              
          {/* Card Básico */}
           <motion.div
              className="cartao-preco"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
           >
            <h3 className="nome-plano">Autonomia Essencial (Básico)</h3>
            <div className="valor-preco">R$ 49,90</div>
            <ul className="lista-beneficios">
              <li><span className="marcador azul"><img src={verificadoAzul} alt="" /></span> IA que ignora ruídos e tosse, priorizando o comando do sopro.</li>
              <li><span className="marcador azul"><img src={verificadoAzul} alt="" /></span> Calibração de sensibilidade e feedback visual em tempo real.</li>
              <li><span className="marcador azul"><img src={verificadoAzul} alt="" /></span> Relatórios de uso simplificados para acompanhamento terapêutico.</li>
            </ul>
            <button className="botao-assinar azul">Assine Agora ↗</button>
             </motion.div>
      
     
      
          {/* Card Pro (Destaque) */}
            <motion.div
                className="cartao-preco destaque"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
              >
            <div className="etiqueta-recomendado">Recomendado</div>
            <h3 className="nome-plano">Integração de I.A. (Plano Pro)</h3>
            <div className="valor-preco">R$ 89,90</div>
            <ul className="lista-beneficios">
              <li><span className="marcador laranja"><img src={verificadoLaranja} alt="" /></span> Tudo do plano Básico.</li>
              <li><span className="marcador laranja"><img src={verificadoLaranja} alt="" /></span> IA que aprende o vocabulário do usuário. </li>
              <li><span className="marcador laranja"><img src={verificadoLaranja} alt="" /></span> Integração com WhatsApp e redes sociais. </li>
            </ul>
            <button className="botao-assinar laranja">Assine Agora ↗</button>
          </motion.div>

          {/* Card Plus */}
           <motion.div
                  className="cartao-preco"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
            <h3 className="nome-plano">Cuidado Clínico Total (Plano Plus)</h3>
            <div className="valor-preco">R$ 149,90</div>
            <ul className="lista-beneficios">
              <li><span className="marcador azul"><img src={verificadoAzul} alt="" /></span> Tudo do plano Pro.</li>
              <li><span className="marcador azul"><img src={verificadoAzul} alt="" /></span> Vozes personalizadas.</li>
              <li><span className="marcador azul"><img src={verificadoAzul} alt="" /></span> IA preditiva para detecção de fadiga e prevenção de crises.</li>
              <li><span className="marcador azul"><img src={verificadoAzul} alt="" /></span> Portal de telemetria para acompanhamento clínico à distância.</li>
            </ul>
            <button className="botao-assinar azul">Assine Agora ↗</button>
           </motion.div>

        </div>

        {/* Rodapé da seção de preços */}
        <div className="rodape-dispositivo">
        <Link to="/compra">
          <button className="botao-comprar-dispositivo">
            COMPRAR APENAS O DISPOSITIVO
          </button>
          </Link>
        </div>
      </section>
    </div>
</PageTransition>
  );
};

export default Planos;
import React, { useState } from "react";
import "./produto.css";
import estrelasLaranjas from "../../assets/icons/estrelasLaranjas.svg";
import section2Produto1 from "../../assets/images/produto/section2Produto1.png";
import section2Produto2 from "../../assets/images/produto/section2Produto2.png";
import section2Produto3 from "../../assets/images/produto/section2Produto3.png";
import section2Produto4 from "../../assets/images/produto/section2Produto4.png";
import arAzul from "../../assets/icons/arAzul.svg";
import bateriaVerde from "../../assets/icons/bateriaVerde.svg";
import escudoRoxo from "../../assets/icons/escudoRoxo.svg";
import porquinhoLaranja from "../../assets/icons/porquinhoLaranja.svg";
import verificadoAzul from "../../assets/icons/verificadoAzul.svg";
import fotoCompra from "../../assets/images/produto/fotoCompra.png";
import fotoTecnica from "../../assets/images/produto/fotoTecnica.png";
import chipRoxo from "../../assets/icons/chipRoxo.svg";
import sensorVerde from "../../assets/icons/sensorVerde.svg";
import escudoSauderoxo from "../../assets/icons/escudoSaudeRoxo.svg";
import wifiLaranja from "../../assets/icons/wifiLaranja.svg";
import bateriaAzul from "../../assets/icons/bateriaAzul.svg";
import background from "../../assets/videos/backgroundProduto.mp4";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Produto() {
  const [cardAtivo, setCardAtivo] = useState("3d");

  return (
    <div className="container-produto">
      <main className="produto-content">
        <video className="video-bg-produto" autoPlay loop muted playsInline>
          <source src={background} type="video/mp4" />
        </video>

        <div className="video-overlay" />
        <div className="tituloHero">
          <h1 className="titulo1">SOPRO</h1>
          <p className="texto1">Transformando seu fôlego em voz</p>
        </div>
      </main>

      <motion.section
        className="conheca-produto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <img className="estrelas" src={estrelasLaranjas} alt="Estrelas" />
        <h1 className="titulo2">Conheça o nosso produto</h1>
        <p className="texto2">
          Nossa tecnologia assistiva inteligente converte padrões de sopro{" "}
          <br /> em comunicação fluida
        </p>

        <div className="galeria-vertical-container">
          
          <div className="galeria-midia-destaque">
            <AnimatePresence mode="wait">
              {cardAtivo === "3d" ? (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="wrapper-midia"
                >
                  <model-viewer
                    src="/teste4.glb"
                    alt="Modelo 3D interativo do Sopro"
                    camera-controls
                    interaction-prompt="none"
                    camera-target="0m 0m 0m"
                    disable-pan
                    environment-image="neutral"
                    exposure="20"
                    disable-zoom
                    min-field-of-view="auto"
                    camera-orbit="180deg 75deg 1.3m"
                    style={{ width: "100%", height: "100%" }}
                  ></model-viewer>
                </motion.div>
              ) : (
                <motion.img
                  key={cardAtivo}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={
                    cardAtivo === "detalhe1" ? section2Produto1 :
                    cardAtivo === "detalhe2" ? section2Produto2 :
                    cardAtivo === "detalhe3" ? section2Produto3 :
                    section2Produto4
                  }
                  alt="Detalhe do produto"
                  className="imagem-galeria-ativa"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="galeria-cards-linha">
            <div
              className={`galeria-card-item card-3d-seletor ${cardAtivo === "3d" ? "ativo" : ""}`}
              onClick={() => setCardAtivo("3d")}
            >
              <h4>Visão 360°</h4>
            </div>

            <div
              className={`galeria-card-item ${cardAtivo === "detalhe1" ? "ativo" : ""}`}
              onClick={() => setCardAtivo("detalhe1")}
            >
              <h4>Fluxo otimizado</h4>
              {cardAtivo === "detalhe1" && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  Sete furos geométricos direcionam o sopro com precisão até os sensores, facilitando a captação instantânea de comandos sutis.
                </motion.p>
              )}
            </div>

            <div
              className={`galeria-card-item ${cardAtivo === "detalhe2" ? "ativo" : ""}`}
              onClick={() => setCardAtivo("detalhe2")}
            >
              <h4>Formato ultrafino</h4>
              {cardAtivo === "detalhe2" && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  Um perfil ultrafino que quebra o padrão de aparelhos pesados, encaixando-se discretamente no bolso ou na palma da mão.
                </motion.p>
              )}
            </div>

            <div
              className={`galeria-card-item ${cardAtivo === "detalhe3" ? "ativo" : ""}`}
              onClick={() => setCardAtivo("detalhe3")}
            >
              <h4>Áudio integrado</h4>
              {cardAtivo === "detalhe3" && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  Sem telas ou luzes, o foco é totalmente na voz. O design acústico projeta o áudio sintetizado de forma clara e natural.
                </motion.p>
              )}
            </div>

            <div
              className={`galeria-card-item ${cardAtivo === "detalhe4" ? "ativo" : ""}`}
              onClick={() => setCardAtivo("detalhe4")}
            >
              <h4>Arquitetura ultraleve</h4>
              {cardAtivo === "detalhe4" && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  A distribuição inteligente do hardware elimina excessos, resultando num corpo leve feito para horas de uso sem fadiga.
                </motion.p>
              )}
            </div>
          </div>

        </div>
      </motion.section>

      {/* Restante das Seções Mantidas e Corrigidas */}
      <section className="beneficios-container">
        <img src={arAzul} alt="icone de sopro" className="ar-azul" />
        <h2 className="titulo-beneficios">Sua voz de volta em cada respiração</h2>
        <p className="subtitulo-beneficios">
          Criamos uma tecnologia que transforma o seu fôlego em palavras,
          devolvendo a autonomia para você se comunicar com o mundo de forma simples e humana.
        </p>
        
        <motion.div className="card verde" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <span className="icon"><img src={bateriaVerde} alt="" /></span>
          <h3>Autonomia</h3>
          <p>Bateria otimizada para acompanhar o seu ritmo o dia todo, sem interrupções.</p>
        </motion.div>

        <motion.div className="card laranja" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <span className="icon"><img src={porquinhoLaranja} alt="" /></span>
          <h3>Custo benefício</h3>
          <p>Engenharia inteligente que entrega tecnologia assistiva de alta fidelidade por um valor justo e acessível.</p>
        </motion.div>

        <motion.div className="card azul" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <span className="icon"><img src={verificadoAzul} alt="" /></span>
          <h3>Durabilidade</h3>
          <p>Construído com materiais robustos e de qualidade para resistir com excelência ao uso contínuo.</p>
        </motion.div>

        <motion.div className="card roxo" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
          <span className="icon"><img src={escudoRoxo} alt="" /></span>
          <h3>Segurança</h3>
          <p>Feito com materiais confortáveis e que não causam alergias, protegendo sua saúde durante o uso.</p>
        </motion.div>
      </section>

      <motion.section className="compra-container" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <div className="compra-card">
          <img src={fotoCompra} alt="Sopro na mão" className="foto-compra" />
          <h2 className="preco">R$ 350,50 </h2>
          <Link to="/compra">
            <button className="botao-comprar btn-suave-global">COMPRAR</button>
          </Link>
        </div>
      </motion.section>

      <section className="especificacoes-container">
        <hr className="divisor-azul" />
        <div className="especificacoes-content">
          <motion.div className="specs-texto" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="titulo-specs">Especificações técnicas</h2>
            <ul className="lista-specs">
              <li><span className="icon-spec"><img src={chipRoxo} alt="" /></span><p>Chip ESP32 de alta velocidade e baixo consumo.</p></li>
              <li><span className="icon-spec"><img src={sensorVerde} alt="" /></span><p>BMP280 de precisão para leitura do sopro.</p></li>
              <li><span className="icon-spec"><img src={wifiLaranja} alt="" /></span><p>Wi-Fi integrado para updates e telemetria.</p></li>
              <li><span className="icon-spec"><img src={bateriaAzul} alt="" /></span><p>Otimizada para uso contínuo ao longo do dia.</p></li>
              <li><span className="icon-spec"><img src={escudoSauderoxo} alt="" /></span><p>Material de grau médico, leve e ergonômico.</p></li>
            </ul>
            <Link to="/compra">
              <button className="botao-comprar-specs btn-suave-global">COMPRAR</button>
            </Link>
          </motion.div>

          <motion.div className="specs-imagem" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={fotoTecnica} alt="Detalhes técnicos do Sopro" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Produto;
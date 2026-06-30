import React, { useState } from "react";
import "./suporte.css";
import imgSuporteTecnico from "../../assets/images/suporte/imgSuporteTecnico.png";
import linhaBranca from "../../assets/icons/linhaBranca.svg";
import iconSeta from "../../assets/icons/Vector.png";
import video from "../../assets/videos/videoSuporte.mp4";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Suporte = () => {
  const [aberto, setAberto] = useState(null);

  const faqs = [
    {
      pergunta: "Como o SOPRO transforma meu sopro em uma frase?",
      resposta:
        "O dispositivo identifica os sinais gerados pelo sopro através de sensores internos capazes de interpretar pressão e quantidade de ar. Esses padrões são processados pelo sistema e transformados em comandos de comunicação, permitindo que o usuário transmita uma mensagem através da voz.",
    },
    {
      pergunta: "Como devo utilizar o dispositivo para realizar um comando?",
      resposta:
        "Para utilizar o SOPRO, basta posicionar o dispositivo de forma confortável e realizar os sopros conforme o padrão configurado. O hardware interpreta esses sinais e converte a sequência identificada em uma resposta de comunicação.",
    },
    {
      pergunta: "O dispositivo consegue diferenciar sopros involuntários?",
      resposta:
        "Sim. O sistema conta com inteligência artificial integrada para auxiliar na interpretação dos sinais recebidos, reduzindo interferências causadas por entradas de ar que possam confundir a leitura do dispositivo.",
    },
    {
      pergunta: "Como o áudio é reproduzido pelo dispositivo?",
      resposta:
        "Após interpretar o comando recebido, o sistema processa a informação e reproduz a comunicação através da saída de áudio integrada ao dispositivo, permitindo que a mensagem seja ouvida.",
    },
    {
      pergunta: "Posso personalizar a voz utilizada pelo SOPRO?",
      resposta:
        "Sim. O sistema permite recursos de personalização de voz, possibilitando que o usuário escolha uma forma de comunicação que se adapte melhor à sua preferência e identidade.",
    },
  ];

  return (
    <main className="suporte-page">
      {/* Hero */}
      <section className="suporte-hero">
        <div className="suporte-inner">
          <h1 className="suporte-sopro">Suporte SOPRO</h1>
          <img src={linhaBranca} alt="Linha Decorativa" />
          <p>Encontre auxílio e esclareça suas dúvidas</p>
        </div>
      </section>

      {/* Guia de Uso */}
      <section className="guia-uso">
        <div className="guia-uso-container">
          <h2>Guia de uso</h2>
          <div className="video-wrapper">
            <div className="botoes-guia">
              <button className="play-btn btn-suave-global">
                Passo a passo
              </button>
              <Link to="/dicionario">
                <button className="play-btn btn-suave-global">
                  {" "}
                  Dicionário de frases{" "}
                </button>
              </Link>
            </div>

            <div className="video-placeholder">
              <video
                muted
                controls
                autoPlay
                muted
                loop
                playsInline
                width="100%"
                style={{ borderRadius: "10px" }}
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Central de Ajuda */}
      <section className="faq-section">
        <h2>Central de ajuda</h2>
        <div className="faq-grid">
          {faqs.map((item, index) => (
            <article className="faq-item" key={index}>
              <button
                onClick={() => setAberto(aberto === index ? null : index)}
              >
                <h4>{item.pergunta}</h4>
                <img
                  src={iconSeta}
                  alt="Abrir"
                  style={{
                    transform:
                      aberto === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.3s",
                  }}
                />
              </button>
              <div
                className={`faq-resposta ${aberto === index ? "aberta" : ""}`}
              >
                <p>{item.resposta}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="contato-section">
        <div className="contato-container">
          <img
            className="suporte-icon"
            src={imgSuporteTecnico}
            alt="Suporte Técnico"
          />
          <div className="form-wrapper">
            <h2>Entre em contato com nosso Suporte Técnico</h2>
            <form className="suporte-form">
              <div className="input-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Insira seu e-mail"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="duvida">Dúvida</label>
                <textarea
                  id="duvida"
                  placeholder="Insira sua dúvida"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-enviar btn-suave-global">
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Suporte;

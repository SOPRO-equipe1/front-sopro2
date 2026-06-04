import React, { useState } from 'react';
import './suporte.css';
import imgSuporteTecnico from '../../assets/images/suporte/imgSuporteTecnico.png';
import iconSeta from '../../assets/icons/Vector.png'; 
import video from '../../assets/videos/suportevideo.mp4'

const Suporte = () => {
  const [aberto, setAberto] = useState(null);

  const faqs = [
    {
      pergunta: "Como faço para ligar o dispositivo?",
      resposta: "Certifique-se de que o dispositivo está carregado via cabo USB-C. Pressione o botão lateral por 3 segundos. O LED de status piscará em azul, indicando que o firmware está ativo e pronto para a conexão Bluetooth/Wi-Fi com o site SOPRO."
    },
    {
      pergunta: "Posso testar funcionalidades premium do dispositivo?",
      resposta: "Sim. O acesso pode ser liberado via endpoint administrativo (Mock de Pagamento) durante este ciclo."
    },
    {
      pergunta: "Por que o sistema não está identificando meu sopro?",
      resposta: "Isso pode acontecer por alguns motivos: O sopro pode estar muito fraco ou muito forte. O posicionamento do dispositivo pode não estar correto; Pode haver ruído no ambiente. Tente ajustar a intensidade do sopro e segurar o dispositivo de forma confortável, como uma gaita."
    },
    {
      pergunta: "O som da frase não saiu no meu dispositivo, o que pode ser?",
      resposta: "Certifique-se de que o Bluetooth está conectado e o volume do sistema de saída está ativo."
    },
    {
      pergunta: "Como personalizar a voz do dispositivo?",
      resposta: "Você pode escolher diferentes tipos de voz nas configurações do sistema. O objetivo é permitir que cada pessoa se identifique com a forma como deseja se expressar."
    }
  ];

  return (
    <main className="suporte-page">
      {/* Hero */}
      <section className="suporte-hero">
        <div className="suporte-inner">
          <h1 className="suporte-sopro">Suporte SOPRO</h1>
          <p>Encontre auxílio e esclareça suas dúvidas</p>
        </div>
      </section>

      {/* Guia de Uso */}
      <section className="guia-uso">
        <div className="guia-uso-container">
          <h2>Guia de uso</h2>
          <div className="video-wrapper">
            <button className="play-btn">Passo a passo</button>
            <div className="video-placeholder">
              <video
                muted
                controls

                width="100%"
                style={{ borderRadius: '10px'}}
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
              <button onClick={() => setAberto(aberto === index ? null : index)}>
                <span>{item.pergunta}</span>
                <img 
                  src={iconSeta} 
                  alt="Abrir" 
                  style={{ transform: aberto === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} 
                />
              </button>
              {aberto === index && (
                <div style={{ padding: '20px', textAlign: 'left', maxWidth: '946px', width: '100%', margin: '0 auto', color: '#333' }}>
                  <p>{item.resposta}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="contato-section">
        <div className="contato-container">
          <img className="suporte-icon" src={imgSuporteTecnico} alt="Suporte Técnico" />
          <div className="form-wrapper">
            <h2>Entre em contato com nosso Suporte Técnico</h2>
            <form className="suporte-form">
              <div className="input-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="Insira seu e-mail" required />
              </div>
              <div className="input-group">
                <label htmlFor="duvida">Dúvida</label>
                <textarea id="duvida" placeholder="Insira sua dúvida" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn-enviar">Enviar mensagem</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Suporte;

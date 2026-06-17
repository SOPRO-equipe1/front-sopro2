import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './compra.css';


import imgCompra1 from "../../assets/images/produto/fotoCompra.png";
import imgCompra2 from "../../assets/images/produto/section2Produto1.png";
import imgCompra3 from "../../assets/images/produto/section2Produto2.png";
import imgCompra4 from "../../assets/images/produto/section2Produto3.png";
import imgCompra5 from "../../assets/images/produto/section2Produto4.png";
import iconMasterCard from "../../assets/images/compra/iconMasterCard.svg";
import iconPix from "../../assets/images/compra/iconPix.svg";
import iconPayPal from "../../assets/images/compra/iconPayPal.svg";
import iconVisa from "../../assets/images/compra/iconVisa.svg";

function Compra() {
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(1);
  const [imagemPrincipal, setImagemPrincipal] = useState(imgCompra1);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [jaComprou, setJaComprou] = useState(false);

  
  const IMAGENS_COR = {
    Branco:   imgCompra1,
    Preto:    imgCompra1,
    Vermelho: imgCompra1,
    Roxo:     imgCompra1,
    Laranja:  imgCompra1,
    Azul:     imgCompra1,
    Rosa:     imgCompra1,
    Verde:    imgCompra1,
  };

  const THUMBNAILS = [imgCompra2, imgCompra3, imgCompra4, imgCompra5];

  const selecionarCor = (cor) => {
    setCorSelecionada(cor);
    setImagemPrincipal(IMAGENS_COR[cor]);
  };

  const aumentar = () => setQuantidade(q => q + 1);
  const diminuir = () => setQuantidade(q => (q > 1 ? q - 1 : 1));

  // Verifica se o usuário já possui o produto para bloquear compras repetidas involuntárias
  useEffect(() => {
    const checarHistoricoCompra = async () => {
      const token = localStorage.getItem('@Sopro:token');
      const email = localStorage.getItem('@Sopro:email');
      if (!token || !email) return;

      try {
        const response = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/perfil?email=${email}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const dados = await response.json();
          if (dados?.ultimoPedido && dados.ultimoPedido.status !== "CANCELADO") {
            setJaComprou(true);
          }
        }
      } catch (e) {
        console.log("Erro ao checar propriedade do dispositivo.");
      }
    };
    checarHistoricoCompra();
  }, []);

  // Lógica comercial de roteamento
  const handleBotaoComprarClique = () => {
    if (jaComprou) {
      navigate('/perfil'); 
      return;
    }

    localStorage.setItem('@Sopro:intencao_compra', 'true');
    localStorage.setItem('@Sopro:ultimo_qtd', quantitative);
    if (corSelecionada) {
      localStorage.setItem('@Sopro:ultima_cor', corSelecionada);
    }

    const estaLogado = !!localStorage.getItem('@Sopro:token');
    if (estaLogado) {
      navigate('/checkout'); 
    } else {
      navigate('/cadastro'); 
    }
  };

  return (
    <>
      <section className="Produto-Container">

        {/* ── Coluna esquerda: fotos ── */}
        <motion.div
          className="Coluna-Fotos"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/produto" style={{ textDecoration: 'none' }}>
            <p className="Voltar">Voltar</p>
          </Link>

          <div className="Foto-Principal-Wrapper">
            <img
              src={imagemPrincipal}
              alt="Imagem principal do produto"
              className={`Foto-Principal${corSelecionada ? ' foto-cor' : ''}`}
            />
          </div>

          <div className="Produto2">
            {THUMBNAILS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Vista ${i + 1} do produto`}
                className={imagemPrincipal === src ? 'thumb-ativa' : ''}
                onClick={() => { setImagemPrincipal(src); setCorSelecionada(null); }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Coluna direita: detalhes ── */}
        <motion.div
          className="Coluna-Detalhes"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="description">
            <h2 className="Titulo">Sopro</h2>
            <p className="Descrição">
              Dispositivo inteligente com processamento ESP32 que capta a pressão do ar
              e converte diferentes intensidades de sopro em comandos e frases audíveis.
            </p>
            <p className="Preço">R$ 350,50</p>
          </div>

          <hr className="linha1" />

          <h3 className="Name">
            Cores
            {corSelecionada && (
              <span className="cor-escolhida-label"> — {corSelecionada}</span>
            )}
          </h3>

          <div className="Paletadecores">
            {Object.keys(IMAGENS_COR).map((cor) => (
              <button
                key={cor}
                type="button"
                className={`card-cor ${corSelecionada === cor ? 'cor-ativa' : ''}`}
                onClick={() => selecionarCor(cor)}
                aria-label={`Cor ${cor}`}
              >
                <div className={cor}></div>
                <p>{cor}</p>
              </button>
            ))}
          </div>

          <div className="card-quantidade">
            <p className="NameQ">Quantidade</p>
            <div className="seletorempílula">
              <button type="button" className="botao-menos" onClick={diminuir} aria-label="Diminuir">−</button>
              <span className="numero-quantidade">{quantidade}</span>
              <button type="button" className="botao-mais"  onClick={aumentar} aria-label="Aumentar">+</button>
            </div>
          </div>

          <hr className="linha1" />

          <div className="FormasDePagamento">
            <div className="Bandeiras">
              <img src={iconMasterCard} alt="MasterCard" />
              <img src={iconPix}        alt="Pix" />
              <img src={iconPayPal}     alt="PayPal" className="iconPayPal" />
              <img src={iconVisa}       alt="Visa" />
            </div>
            
            <button type="button" className="botao-comprar-compra btn-suave-global" onClick={handleBotaoComprarClique}>
              {jaComprou ? "VER MEU PEDIDO" : "COMPRAR"}
            </button>
          </div>
        </motion.div>

      </section>
    </>
  );
}

export default Compra;
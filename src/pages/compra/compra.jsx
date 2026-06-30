import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './compra.css';


//Produtos e Cores

//Preta

// - IMG Principal
import imgProdutoPreta from "../../assets/images/compra/imgPrincipalPreta.png";

// - Miniatura
import imgCompra2 from "../../assets/images/compra/imgProdutoPreta1.png";
import imgCompra3 from "../../assets/images/compra/imgPrincipalPreta2.png";
import imgCompra4 from "../../assets/images/compra/imgPrincipalPreta3.png";
import imgCompra5 from "../../assets/images/compra/imgPrincipalPreta4.png";

//Branca
import imgProdutoBranco from "../../assets/images/compra/imgPrincipalBranca.png";

// - Miniatura
import imgProdutoBranco1 from "../../assets/images/compra/imgProdutoBranco1.png"
import imgProdutoBranco2 from "../../assets/images/compra/imgProdutoBranco2.png";
import imgProdutoBranco3 from "../../assets/images/compra/imgProdutoBranco3.png";
import imgProdutoBranco4 from "../../assets/images/compra/imgProdutoBranco4.png";

//Vermlha
import imgProdutoVermelho from "../../assets/images/compra/imgPrincipalVermelha.png";

// - Miniatura
import imgProdutoVermelho1 from "../../assets/images/compra/imgPrincipalVermelha1.png";
import imgProdutoVermelho2 from "../../assets/images/compra/imgPrincipalVermelha2.png";
import imgProdutoVermelho3 from "../../assets/images/compra/imgPrincipalVermelha3.png";
import imgProdutoVermelho4 from "../../assets/images/compra/imgPrincipalVermelha4.png";

// roxo
import imgProdutoRoxo from "../../assets/images/compra/imgPrincipalRoxo.png"


// - Miniatura
import imgProdutoRoxo1 from "../../assets/images/compra/imgPrincipalRoxo1.png"
import imgProdutoRoxo2 from "../../assets/images/compra/imgPrincipalRoxo2.png"
import imgProdutoRoxo3 from "../../assets/images/compra/imgPrincipalRoxo3.png"
import imgProdutoRoxo4 from "../../assets/images/compra/imgPrincipalRoxo4.png"

//Laranja
import imgProdutoLaranja from "../../assets/images/compra/imgProdutoPrincipalLaranja.png"

// - Miniatura
import imgProdutoLaranja1 from "../../assets/images/compra/imgProdutoLaranja1.png"
import imgProdutoLaranja2 from "../../assets/images/compra/imgProdutoLaranja2.png"
import imgProdutoLaranja3 from "../../assets/images/compra/imgProdutoLaranja3.png"
import imgProdutoLaranja4 from "../../assets/images/compra/imgProdutoLaranja4.png"

//Azul
import imgProdutoAzul from "../../assets/images/compra/imgProdutoPrincipalAzul.png"

// - Miniatura
import imgProdutoAzul1 from "../../assets/images/compra/imgProdutoAzul1.png"
import imgProdutoAzul2 from "../../assets/images/compra/imgProdutoAzul2.png"
import imgProdutoAzul3 from "../../assets/images/compra/imgProdutoAzul3.png"
import imgProdutoAzul4 from "../../assets/images/compra/imgProdutoAzul4.png"

//Rosa
import imgProdutoRosa from "../../assets/images/compra/imgProdutoPrincipalRosa.png"

// - Miniatura
import imgProdutoRosa1 from "../../assets/images/compra/imgProdutoRosa1.png"
import imgProdutoRosa2 from "../../assets/images/compra/imgProdutoRosa2.png"
import imgProdutoRosa3 from "../../assets/images/compra/imgProdutoRosa3.png"
import imgProdutoRosa4 from "../../assets/images/compra/imgProdutoRosa4.png"
//Verde
import imgProdutoVerde from "../../assets/images/compra/imgProdutoPrincipalVerde.png"
 
// - Miniatura

import iconMasterCard from "../../assets/images/compra/iconMasterCard.svg";
import iconPix from "../../assets/images/compra/iconPix.svg";
import iconPayPal from "../../assets/images/compra/iconPayPal.svg";
import iconVisa from "../../assets/images/compra/iconVisa.svg";

function Compra() {
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(1);
  const [imagemPrincipal, setImagemPrincipal] = useState(imgProdutoPreta);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [jaComprou, setJaComprou] = useState(false);

  
  const IMAGENS_COR = {

    Branco: {
    principal: imgProdutoBranco,
    thumbs: [imgProdutoBranco1, imgProdutoBranco2, imgProdutoBranco3, imgProdutoBranco4],
    },

    Preto:   {
    principal: imgProdutoPreta,
    thumbs: [imgCompra2, imgCompra3, imgCompra4, imgCompra5],
  },

    Vermelho: {
    principal: imgProdutoVermelho,
    thumbs: [imgProdutoVermelho1, imgProdutoVermelho2, imgProdutoVermelho3, imgProdutoVermelho4], // temporário
  },
  Roxo: {
    principal: imgProdutoRoxo,
    thumbs: [imgProdutoRoxo1, imgProdutoRoxo2, imgProdutoRoxo3, imgProdutoRoxo4], // temporário
  },
  Laranja: {
    principal: imgProdutoLaranja,
    thumbs: [imgProdutoLaranja1, imgProdutoLaranja2, imgProdutoLaranja3, imgProdutoLaranja4], // temporário
  },
  Azul: {
    principal: imgProdutoAzul,
    thumbs: [imgProdutoAzul1, imgProdutoAzul2, imgProdutoAzul3, imgProdutoAzul4], // temporário
  },
  Rosa: {
    principal: imgProdutoRosa,
    thumbs: [imgProdutoRosa1, imgProdutoRosa2, imgProdutoRosa3, imgProdutoRosa4], // temporário
  },
  Verde: {
    principal: imgProdutoVerde,
    thumbs: [imgCompra2, imgCompra3, imgCompra4, imgCompra5], // temporário
  },
};

  const THUMBNAILS = [imgCompra2, imgCompra3, imgCompra4, imgCompra5];

  const [thumbnailsAtuais, setThumbnailsAtuais] = useState([imgCompra2, imgCompra3, imgCompra4, imgCompra5]);



  const selecionarCor = (cor) => {
    setCorSelecionada(cor);
    setImagemPrincipal(IMAGENS_COR[cor].principal);
    setThumbnailsAtuais(IMAGENS_COR[cor].thumbs);

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
    localStorage.setItem('@Sopro:ultimo_qtd', quantidade);
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
              {thumbnailsAtuais.map((src, i) => (   // ✅ usa o state que muda com a cor
                <img
                  key={i}
                  src={src}
                  alt={`Vista ${i + 1} do produto`}
                  className={imagemPrincipal === src ? 'thumb-ativa' : ''}
                  onClick={() => { setImagemPrincipal(src); }}
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
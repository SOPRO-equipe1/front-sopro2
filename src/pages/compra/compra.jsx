import imgCompra1    from "../../assets/images/produto/fotoCompra.png"
import imgCompra2    from "../../assets/images/produto/section2Produto1.png"
import imgCompra3    from "../../assets/images/produto/section2Produto2.png"
import imgCompra4    from "../../assets/images/produto/section2Produto3.png"
import imgCompra5    from "../../assets/images/produto/section2Produto4.png"
import './compra.css';
import iconMasterCard from "../../assets/images/compra/iconMasterCard.svg"
import iconPix        from "../../assets/images/compra/iconPix.svg"
import iconPayPal     from "../../assets/images/compra/iconPayPal.svg"
import iconVisa       from "../../assets/images/compra/iconVisa.svg"
import imgCorBranco   from "../../assets/images/produto/produto_branco.png"
import imgCorPreto    from "../../assets/images/produto/produto_preto.png"
import imgCorVermelho from "../../assets/images/produto/produto_vermelho.png"
import imgCorAzul     from "../../assets/images/produto/produto_azul.png"
import imgCorRosa     from "../../assets/images/produto/produto_rosa.png"
import imgCorVerde    from "../../assets/images/produto/produto_verde.png"
import imgCorRoxo     from "../../assets/images/produto/produto_roxo.png"
import imgCorLaranja  from "../../assets/images/produto/produto_laranja.png"
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Compra() {
  const [quantidade, setQuantidade]           = useState(1);
  const [imagemPrincipal, setImagemPrincipal] = useState(imgCompra1);
  const [corSelecionada, setCorSelecionada]   = useState(null);

  const IMAGENS_COR = {
    Branco:   imgCorBranco,
    Preto:    imgCorPreto,
    Vermelho: imgCorVermelho,
    Roxo:     imgCorRoxo,
    Laranja:  imgCorLaranja,
    Azul:     imgCorAzul,
    Rosa:     imgCorRosa,
    Verde:    imgCorVerde,
  };

  const THUMBNAILS = [imgCompra2, imgCompra3, imgCompra4, imgCompra5];

  const selecionarCor = (cor) => {
    setCorSelecionada(cor);
    setImagemPrincipal(IMAGENS_COR[cor]);
  };

  const aumentar = () => setQuantidade(q => q + 1);
  const diminuir = () => setQuantidade(q => (q > 1 ? q - 1 : 1));

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
            <p className="Preço">R$ 200,97</p>
          </div>

          <hr className="linha1" />

          <h3 className="Name">
            Cores
            {corSelecionada && (
              <span className="cor-escolhida-label">{corSelecionada}</span>
            )}
          </h3>

          <div className="Paletadecores">
            {Object.keys(IMAGENS_COR).map((cor) => (
              <button
                key={cor}
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
              <button className="botao-menos" onClick={diminuir} aria-label="Diminuir">−</button>
              <span className="numero-quantidade">{quantidade}</span>
              <button className="botao-mais"  onClick={aumentar} aria-label="Aumentar">+</button>
            </div>
          </div>

          <hr className="linha1" />

          <div className="FormasDePagamento">
            <div className="Bandeiras">
              <img src={iconMasterCard} alt="MasterCard" />
              <img src={iconPix}        alt="Pix" />
              <img src={iconPayPal}     alt="PayPal" />
              <img src={iconVisa}       alt="Visa" />
            </div>
            <Link to="/cadastro">
              <button className="botao-comprar-compra btn-suave-global">COMPRAR</button>
            </Link>
          </div>
        </motion.div>

      </section>
    </>
  );
}

export default Compra;

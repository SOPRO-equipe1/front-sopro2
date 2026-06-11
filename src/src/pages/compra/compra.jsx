/*Imagens do produto*/
import imgCompra1 from "../../assets/images/compra/imgCompra1.png"
import imgCompra2 from "../../assets/images/compra/imgCompra2atualizado.svg"
import imgCompra3 from "../../assets/images/compra/imgCompra3atualizado.svg"
import imgCompra4 from "../../assets/images/compra/imgCompra4atualizado.svg"
/*Pag css*/
import './compra.css';
/*Imagens de forma de pagamento*/
import iconMasterCard from "../../assets/images/compra/iconMasterCard.svg"
import iconPix from "../../assets/images/compra/iconPix.svg"
import iconPayPal from "../../assets/images/compra/iconPayPal.svg"
import iconVisa from "../../assets/images/compra/iconVisa.svg"
import { Link } from 'react-router-dom';
import React , { useState } from 'react';
import { motion } from 'framer-motion';

function Compra() {
  const [quantidade, setQuantidade] = useState(1);
  const [imagemPrincipal, setImagemPrincipal] = useState(imgCompra1);

  const aumentar = () => setQuantidade(quantidade + 1);
  const diminuir = () => {
  if (quantidade > 1) setQuantidade(quantidade - 1);
  }
    return (
<>

<section className="Produto-Container">
   <motion.div
          className="Coluna-Fotos"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
<Link to="/produto" style={{ width: '100%', maxWidth: '490px', textDecoration: 'none' }}>      <p className="Voltar">Voltar</p>
  </Link>
    <img src={imagemPrincipal} alt="Imagem principal produto" className="Foto-Principal"/>
    
    <div className="Produto2">
      <img src={imgCompra2} alt="Imagem2 produto" onClick={() => setImagemPrincipal(imgCompra2)} style={{ cursor: 'pointer' }}/>
      <img src={imgCompra3} alt="Imagem3 produto" onClick={() => setImagemPrincipal(imgCompra3)} style={{ cursor: 'pointer' }}/>
      <img src={imgCompra4} alt="Imagem4 produto" onClick={() => setImagemPrincipal(imgCompra4)} style={{ cursor: 'pointer' }}/>
    </div>
  </motion.div>

   <motion.div
          className="Coluna-Detalhes"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
    <div className="description">
      <h2 className="Titulo">Sopro</h2>
      <p className="Descrição">Dispositivo inteligente com processamento ESP32 que capta a pressão do ar e converte diferentes intensidades de sopro em comandos e frases audíveis.</p>
      <p className="Preço">R$ 200,97</p>
    </div>
    
    <hr className="linha1"/>

    <h3 className="Name">Cores</h3>

    <div className="Paletadecores"> 
      <div className="card-cor">
        <div className="Branco"></div>
        <p>Branco</p>
      </div>
      <div className="card-cor">
        <div className="Preto"></div>
        <p>Preto</p>
      </div>
      <div className="card-cor">
        <div className="Vermelho"></div>
        <p>Vermelho</p>
      </div>
      <div className="card-cor">
        <div className="Roxo"></div>
        <p>Roxo</p>
      </div>
      <div className="card-cor">
        <div className="Laranja"></div>
        <p>Laranja</p>
      </div>
      <div className="card-cor">
        <div className="Azul"></div>
        <p>Azul</p>
      </div>
      <div className="card-cor">
        <div className="Rosa"></div>
        <p>Rosa</p>
      </div>
      <div className="card-cor">
        <div className="Verde"></div>
        <p>Verde</p>
      </div>
    </div>

    <div className="card-quantidade">
  <div className="container-quantidade">
    <p className="NameQ">Quantidade</p>
  </div>

      <div className="seletorempílula">
        <button className="botao-menos" onClick={diminuir}>-</button>
        <span className="numero-quantidade">{quantidade}</span>
        <button className="botao-mais" onClick={aumentar}>+</button>
      </div>
    </div>

    <hr className="linha1"/>

    <div className="FormasDePagamento">
      <div className="Bandeiras">
        <img src={iconMasterCard} alt="MasterCard" />
        <img src={iconPix} alt="Pix" />
        <img src={iconPayPal} alt="PayPal" className="iconPayPal" />
        <img src={iconVisa} alt="Visa" />
      </div>
        <Link to="/cadastro" style={{ width: '100%', display: 'block'}}>
          <button className="botao-comprar-compra btn-suave-global">COMPRAR</button>
      </Link>
    </div>
  </motion.div>
</section>
</>
    )
}

export default Compra
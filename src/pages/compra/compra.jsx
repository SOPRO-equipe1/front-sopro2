/*Imagens do produto*/
import imgCompra1 from "../../assets/images/compra/imgCompra1.png"
import imgCompra2 from "../../assets/images/compra/imgCompra2.png"
import imgCompra3 from "../../assets/images/compra/imgCompra3.png"
import imgCompra4 from "../../assets/images/compra/imgCompra4.png"
/*Pag css*/
import React from 'react'; 
import './compra.css';
/*Imagens de forma de pagamento*/
import iconMasterCard from "../../assets/images/compra/iconMasterCard.png"
import iconPix from "../../assets/images/compra/iconPix.png"
import iconPayPal from "../../assets/images/compra/iconPayPal.png"
import iconVisa from "../../assets/images/compra/iconVisa.png"
import { Link } from 'react-router-dom';


function Compra() {
    return (
<>
<p className="Voltar">Voltar</p>

<section className="Produto-Container"> 


  <div className="Coluna-Fotos">
    <img src={imgCompra1} alt="Imagem principal produto" className="Foto-Principal"/>
    
    <div className="Produto2">
      <img src={imgCompra2} alt="Imagem2 produto" />
      <img src={imgCompra3} alt="Imagem3 produto" />
      <img src={imgCompra4} alt="Imagem4 produto" />
    </div>
  </div>

  <div className="Coluna-Detalhes">
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
        <button className="botao-menos">-</button>
        <span className="numero-quantidade">1</span>
        <button className="botao-mais">+</button>
      </div>
    </div>

    <hr className="linha1"/>

    <div className="FormasDePagamento">
      <div className="Bandeiras">
        <img src={iconMasterCard} alt="MasterCard" />
        <img src={iconPix} alt="Pix" />
        <img src={iconPayPal} alt="PayPal" />
        <img src={iconVisa} alt="Visa" />
      </div>
        <Link to="/cadastro">
          <button className="botao-comprar">COMPRAR</button>
      </Link>
    </div>
  </div>
</section>
</>
    )
}

export default Compra
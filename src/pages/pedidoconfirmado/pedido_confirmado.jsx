import './pedido_confirmado.css';
import verificadoLaranja from '../../assets/icons/verificadoLaranja.svg'; // O selo laranja lá no topo
import dispositivoAzul from '../../assets/icons/dispositivoAzul.svg'; // O ícone azul do dispositivo
import caminhaoAzul from '../../assets/icons/caminhaoAzul.svg'; 
import caminhaoBranco from '../../assets/icons/caminhaoBranco.svg'
import home from '../../assets/icons/home.svg'
import { Link } from 'react-router-dom';

function PedidoConfirmado() {
  return (
    <div className="sucesso-container">
      {/* Selo de check no topo */}
      <img src={verificadoLaranja} alt="" className="verificado-laranja" />

      {/* Bloco de Título */}
      <div className="bloco-header">
        <h1>Pedido <span>confirmado!</span></h1>
        <p>Sua voz está a caminho. Parabéns por dar esse passo fundamental para a sua nova autonomia.</p>
      </div>

      {/* Card de Resumo */}
      <div className="card-resumo">
        <div className="resumo-header">
          <span className="label-resumo">Resumo do pedido</span>
          <span className="numero-pedido">#SP-2026-01</span>
        </div>
        
        <div className="item-pedido">
          <div className="item-info">
            <div className="icone-azul-bg">
              <img src={dispositivoAzul} alt="" />
            </div>
            <span>1x Dispositivo Sopro</span>
          </div>
          <span className="valor">R$ 200,97</span>
        </div>

        <div className="total-pedido">
          <span>Total do pedido</span>
          <strong>R$ 200,97</strong>
        </div>
      </div>

      {/* Info de Entrega */}
      <div className="info-entrega">
        <img src={caminhaoAzul} alt="" />
        <div className="texto-entrega">
          <p><strong>Previsão de entrega: 5 a 8 dias úteis.</strong></p>
          <p>Você receberá atualizações por e-mail e SMS em cada etapa da entrega.</p>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="botoes-acoes">
        <Link to="/perfil">
        <button className="btn-acompanhar">
           <img src={caminhaoBranco} alt="" /> Acompanhar Entrega
        </button>
        </Link>
        <Link to="/">
        <button className="btn-voltar">
           <img src={home} alt="" /> Voltar para a página inicial
        </button>
        </Link>
      </div>
    </div>
  );
}

export default PedidoConfirmado;
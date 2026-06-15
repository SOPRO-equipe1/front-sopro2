import './pedido_confirmado.css';
import verificadoLaranja from '../../assets/icons/verificadoLaranja.svg'; // O selo laranja lá no topo
import dispositivoAzul from '../../assets/icons/dispositivoAzul.svg'; // O ícone azul do dispositivo
import caminhaoAzul from '../../assets/icons/caminhaoAzul.svg'; 
import caminhaoBranco from '../../assets/icons/caminhaoBranco.svg'
import home from '../../assets/icons/home.svg'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function PedidoConfirmado() {
  // CORREÇÃO: Resgata os valores calculados na tela de checkout anterior dinamicamente
  const totalGasto = localStorage.getItem('@Sopro:ultimo_gasto') || "200,97";
  const quantidadeDispositivos = localStorage.getItem('@Sopro:ultimo_qtd') || "1";

  return (
    <motion.div
      className="sucesso-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Selo de check no topo */}
      <motion.img
        src={verificadoLaranja}
        alt=""
        className="verificado-laranja"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
      />

      {/* Bloco de Título */}
      <motion.div
        className="bloco-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1>Pedido <span>confirmado!</span></h1>
        <p>Sua voz está a caminho. Parabéns por dar esse passo fundamental para a sua nova autonomia.</p>
      </motion.div>

      {/* Card de Resumo */}
       <motion.div
        className="card-resumo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="resumo-header">
          <span className="label-resumo">Resumo do pedido</span>
          <span className="numero-pedido">#SP-2026-01</span>
        </div>
        
        <div className="item-pedido">
          <div className="item-info">
            <div className="icone-azul-bg">
              <img src={dispositivoAzul} alt="" />
            </div>
            {/* CORREÇÃO: Substituído o texto estático pela quantidade real */}
            <span>{quantidadeDispositivos}x Dispositivo Sopro</span>
          </div>
          {/* CORREÇÃO: Substituído o valor estático pelo total real */}
          <span className="valor">R$ {totalGasto}</span>
        </div>

        <div className="total-pedido">
          <span>Total do pedido</span>
          {/* CORREÇÃO: Substituído o total estático */}
          <strong>R$ {totalGasto}</strong>
        </div>
      </motion.div>

      {/* Info de Entrega */}
       <motion.div
        className="info-entrega"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <img src={caminhaoAzul} alt="" />
        <div className="texto-entrega">
          <p><strong>Previsão de entrega: 5 a 8 dias úteis.</strong></p>
          <p>Você receberá atualizações por e-mail e SMS em cada etapa da entrega.</p>
        </div>
      </motion.div>

      {/* Botões de Ação */}
       <motion.div
        className="botoes-acoes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link to="/perfil">
        <button className="btn-acompanhar btn-suave-global">
           <img src={caminhaoBranco} alt="" /> Acompanhar Entrega
        </button>
        </Link>
        <Link to="/">
        <button className="btn-voltar btn-suave-global">
           <img src={home} alt="" /> Voltar para a página inicial
        </button>
        </Link>
     </motion.div>
    </motion.div>
  );
}

export default PedidoConfirmado;
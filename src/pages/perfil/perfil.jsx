import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../perfil/perfil.css';
import SoprinhoImg from '../../assets/images/perfil/soprinho_perfil.svg';
import Iconecaminhao from '../../assets/images/perfil/icone_caminhao_perfil.svg';
import Iconesclamacao from '../../assets/images/perfil/icone_esclamacao_perfil.svg';
import IconeEditar from '../../assets/icons/ic_baseline-mode-edit.svg'; // <-- Seu ícone oficial importado aqui!
import { motion } from 'framer-motion';

const STATUS_STEPS = ["Confirmado", "Preparando", "Em transporte", "Entregue"];

function Avatar() {
  return (
    <figure className="avatar-perfil">
      <img src={SoprinhoImg} alt="Avatar do usuário" />
    </figure>
  );
}

function OrderProgress({ status }) {
  const statusIndex = status !== undefined && status !== null ? status : 0;
  const pct = (statusIndex / (STATUS_STEPS.length - 1)) * 100;

  return (
    <div className="progress-wrap" role="progressbar" aria-valuenow={statusIndex} aria-valuemin={0} aria-valuemax={STATUS_STEPS.length - 1} aria-label="Status do pedido">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-steps">
        {STATUS_STEPS.map((label, i) => (
          <div key={label} className="progress-step">
            <span className={`dot ${i <= statusIndex ? "active" : ""} ${i === statusIndex ? "current" : ""}`} />
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


function InfoField({ label, value }) {
  return (
    <div style={{ textHighlight: 'none', margin: 0, paddingLeft: '30px', textAlign: 'left' }}>
     
      <dt className="order-code" style={{ marginBottom: '2px', display: 'block' }}>
        {label}
      </dt>
    
      <dd className="order-valor" style={{ margin: 0 }}>
        {value || "—"}
      </dd>
    </div>
  );
}

export default function MinhaConta() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [dadosPerfil, setDadosPerfil] = useState(null);
  const [pedidoLocalFallback, setPedidoLocalFallback] = useState(null);

  useEffect(() => {
    const buscarDadosDoAzure = async () => {
      const token = localStorage.getItem('@Sopro:token');
      const emailLogado = localStorage.getItem('@Sopro:email');

      if (!token || !emailLogado) {
        navigate('/login');
        return;
      }

  
      const teveCompraLocal = localStorage.getItem('@Sopro:ultimo_gasto');
      const qtdLocal = localStorage.getItem('@Sopro:ultimo_qtd') || 1;
      
      if (teveCompraLocal) {
        setPedidoLocalFallback({
          transactionId: "#SP-2026-01",
          produtoDescricao: `${qtdLocal}x Dispositivo Sopro - Cor Preta`, 
          trackingCode: "RU182121051419BR",
          formaPagamento: "CARTÃO DE CRÉDITO",
          valorTotal: teveCompraLocal, 
          status: "EM_TRANSPORTE",
          deliveryDate: "01 de setembro de 2026"
        });
      }

      try {
        const response = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/perfil?email=${emailLogado}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const dados = await response.json();
          setDadosPerfil(dados);
        }
      } catch (error) {
        console.error("Modo demonstração ativo.");
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosDoAzure();
  }, [navigate]);

  const formatarDataBR = (dataString) => {
    if (!dataString) return "";
    if (dataString.includes("-")) {
      const partes = dataString.split("-");
      if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataString;
  };

  if (carregando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontSize: '18px', fontWeight: '500', color: '#f97316' }}>
        Carregando sua conta SOPRO...
      </div>
    );
  }

 
  const pedidoAtivo = dadosPerfil?.ultimoPedido || pedidoLocalFallback;

  const obterStatusIndex = (statusString) => {
    if (!statusString) return 2;
    switch (statusString.toUpperCase()) {
      case "CONFIRMADO": return 0;
      case "PREPARANDO": return 1;
      case "EM_TRANSPORTE":
      case "ENVIADO": return 2;
      case "ENTREGUE": return 3;
      default: return 2;
    }
  };

  const statusAtualIndex = obterStatusIndex(pedidoAtivo?.status);

  
  const logradouroReal = dadosPerfil?.logradouro || "Rua do Suspiro Profundo";
  const numeroReal = dadosPerfil?.numero || "42";
  const complementoReal = dadosPerfil?.complemento || "Ao lado da Suspiro News";
  const bairroReal = dadosPerfil?.bairro || "Ventos Leves";
  const cidadeEstadoReal = dadosPerfil?.cidadeEstado || "São Paulo - SP";
  const cepReal = dadosPerfil?.cep ? dadosPerfil.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") : "00000-00";

  return (
    <main className="page">
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Minha Conta
      </motion.h1>

      
      <motion.section 
        className="card profile-card" 
        aria-label="Informações do perfil"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Avatar />
        <div className="profile-info">
          <p className="profile-name">{dadosPerfil?.nomeCompleto || localStorage.getItem('@Sopro:nome') || "Soprinho da Silva"}</p>
          <span className="badge-pro">{dadosPerfil?.planoAtivo || "Plano Pro"}</span>
          <address className="profile-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <strong>{dadosPerfil?.cidadeEstado?.split(',')[0] || "São Paulo"}, SP</strong>
          </address>
        </div>
      </motion.section>

      
      <motion.section 
        className="card" 
        aria-label="Último pedido"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="section-heading">Último pedido</p>
        
        {pedidoAtivo ? (
          <div className="order-two-cols">
            <div className="order-left">
              <article className="order-row">
                <div className="icone_caminhao" aria-hidden="true">
                  <img src={Iconecaminhao} alt="" />
                </div>
                <div>
                  <p className="order-code">Código do pedido: <strong>{pedidoAtivo.transactionId || "#SP-2026-01"}</strong></p>
                  <p className="order-meta">{pedidoAtivo.produtoDescricao}</p>
                </div>
              </article>

              <article className="order-row">
                <div className="icone_esclamacao" aria-hidden="true">
                  <img src={Iconesclamacao} alt="Ícone de rastreio" />
                </div>
                <div>
                  <p className="order-code">Rastreio: <strong>{pedidoAtivo.trackingCode || "RU182121051419BR"}</strong></p>
                  <p className="order-meta">Data de entrega prevista: <span className="order-valor-data">{pedidoAtivo.deliveryDate || "01 de setembro de 2026"}</span></p>                
                  <p className="order-valor">Total: {pedidoAtivo.valorTotal.toString().includes("R$") ? pedidoAtivo.valorTotal : `R$ ${pedidoAtivo.valorTotal}`}</p>
                </div>
              </article>
            </div>

            <div className="order-right">
              <OrderProgress status={statusAtualIndex} />
              <button 
                type="button" 
                className="track-btn"
                onClick={() => window.open(`https://rastreamento.correios.com.br/app/index.php`, '_blank')}
              >
                Rastrear pedido
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '15px', fontWeight: '500' }}>
            📦 Você ainda não possui nenhum dispositivo encomendado. Vá até a página de compras para garantir o seu!
          </div>
        )}
      </motion.section>

      
      <motion.section 
        className="card" 
        aria-label="Meus dados"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', borderBottom: '0.5px solid #e5e5e5', marginBottom: '1rem' }}>
          <p className="section-heading" style={{ borderBottom: 'none', marginBottom: 0 }}>Meus dados</p>
          <button type="button" className="btn-editar-perfil-mock" style={{ position: 'absolute', right: '20px', top: '15px', backgroundColor: '#1A5AFF', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={IconeEditar} alt="" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} /> Editar
          </button>
        </div>
        
        <div className="info-grid" style={{ paddingTop: '0.5rem' }}>
          <InfoField label="Nome completo:" value={dadosPerfil?.nomeCompleto || localStorage.getItem('@Sopro:nome') || "Soprinho da Silva"} />
          <InfoField label="CPF:" value={dadosPerfil?.cpf || "000.000.000-00"} />
          <InfoField label="Telefone celular:" value={dadosPerfil?.telefoneCelular || "(11) 94002-8922"} />
          <InfoField label="Endereço de e-mail:" value={localStorage.getItem('@Sopro:email') || "soprinhosilva@gmail.com"} />
          <InfoField label="Data de nascimento:" value={formatarDataBR(dadosPerfil?.dataNascimento) || "03/03/2026"} />
        </div>
      </motion.section>

      {/*: Endereço ── */}
      <motion.section 
        className="card" 
        aria-label="Endereço"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', borderBottom: '0.5px solid #e5e5e5', marginBottom: '1rem' }}>
          <p className="section-heading" style={{ borderBottom: 'none', marginBottom: 0 }}>Endereço</p>
          <button type="button" className="btn-editar-perfil-mock" style={{ position: 'absolute', right: '20px', top: '15px', backgroundColor: '#1A5AFF', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={IconeEditar} alt="" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} /> Editar
          </button>
        </div>
        
        <div className="info-grid" style={{ paddingTop: '0.5rem' }}>
          <InfoField label="Logradouro:" value={`${logradouroReal}, ${numeroReal}`} />
          <InfoField label="Complemento:" value={complementoReal} />
          <InfoField label="Bairro:" value={bairroReal} />
          <InfoField label="Cidade/UF:" value={cidadeEstadoReal} />
          <InfoField label="CEP:" value={cepReal} />
        </div>
      </motion.section>
    </main>
  );
}
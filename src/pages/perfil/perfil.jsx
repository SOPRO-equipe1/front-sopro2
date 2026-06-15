import { useState, useEffect } from 'react';
import '../perfil/perfil.css';
import SoprinhoImg from '../../assets/images/perfil/soprinho_perfil.svg';
import Iconecaminhao from '../../assets/images/perfil/icone_caminhao_perfil.svg';
import Iconesclamacao from '../../assets/images/perfil/icone_esclamacao_perfil.svg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const STATUS_STEPS = ["Confirmado", "Preparando", "Em transporte", "Entregue"];

const mapearStatusPedido = (statusString) => {
  if (!statusString) return 2;
  const statusFormatado = statusString.toUpperCase();
  if (statusFormatado === 'CONFIRMADO') return 0;
  if (statusFormatado === 'PREPARANDO') return 1;
  if (statusFormatado === 'EM_TRANSPORTE') return 2;
  if (statusFormatado === 'ENTREGUE') return 3;
  return 2;
};

const formatarData = (dataStr) => {
  if (!dataStr) return '01 de setembro de 2026';
  try {
    const partes = dataStr.split('-'); 
    if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataStr;
  } catch {
    return dataStr;
  }
};

function Avatar() {
  return (
    <figure className="avatar-perfil">
      <img src={SoprinhoImg} alt="Avatar do usuário logado" />
    </figure>
  );
}

function OrderProgress({ status }) {
  const pct = (status / (STATUS_STEPS.length - 1)) * 100;
  return (
    <div className="progress-wrap" role="progressbar" aria-valuenow={status} aria-valuemin={0} aria-valuemax={STATUS_STEPS.length - 1} aria-label="Status do pedido">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-steps">
        {STATUS_STEPS.map((label, i) => (
          <div key={label} className="progress-step">
            <span className={`dot ${i <= status ? "active" : ""} ${i === status ? "current" : ""}`} />
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <dl className="info-field">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}

export default function MinhaConta() {
  const [dadosPerfil, setDadosPerfil] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obterDadosDoSqlServer = async () => {
      try {
        const token = localStorage.getItem('@Sopro:token');
        const emailLogado = localStorage.getItem('@Sopro:email');

        if (!token || !emailLogado) {
          setCarregando(false);
          return;
        }

        const response = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/perfil?email=${emailLogado}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json(); 
          setDadosPerfil(data);
        }
      } catch (err) {
        console.error("Erro na leitura do perfil SQL:", err);
      } finally {
        setCarregando(false);
      }
    };

    obterDadosDoSqlServer();
  }, []);

  if (carregando) {
    return (
      <main className="page" style={{textAlign: 'center', paddingTop: '100px'}}>
        <p style={{color: '#1D252A', fontSize: '20px', fontWeight: 600}}>Carregando ecossistema SOPRO do Azure...</p>
      </main>
    );
  }

  
  const email = dadosPerfil?.email || localStorage.getItem('@Sopro:email') || "soprinhosilva@gmail.com";
  const name = dadosPerfil?.nomeCompleto || localStorage.getItem('@Sopro:nome') || "Soprinho da Silva";
  const plan = dadosPerfil?.plano || "Plano Pro";
  const location = dadosPerfil?.cidadeEstado || "São Paulo, SP";
  const cpf = dadosPerfil?.cpf || "000.000.000-00";
  const phone = dadosPerfil?.telefoneCelular || "(11) 94002-8922";
  const birthdate = dadosPerfil?.dataNascimento ? formatarData(dadosPerfil.dataNascimento) : "03/03/2026";
  const address = dadosPerfil?.enderecoCompleto || "Rua do Suspiro Profundo, 42 – Ao lado da Suspiro News";

  const pedidoData = dadosPerfil?.ultimoPedido;
  const code = pedidoData?.codigoPedido || "#SP-2026-01";
  const product = pedidoData?.produtoDescricao || "1x Dispositivo Sopro - Cor Branca";
  const tracking = pedidoData?.codigoRastreio || "RU182121051419BR";
  const deliveryDate = pedidoData?.dataEntregaPrevista ? formatarData(pedidoData.dataEntregaPrevista) : "01 de setembro de 2026";
  const totalPedido = pedidoData?.valorTotal ? `R$ ${pedidoData.valorTotal.toFixed(2).replace('.', ',')}` : "R$ 200,97";
  const statusIndex = mapearStatusPedido(pedidoData?.status);

  return (
    <main className="page">
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >Minha Conta
      </motion.h1>

      {/* Perfil */}
      <motion.section 
        className="card profile-card" 
        aria-label="Informações do perfil"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Avatar />
        <div className="profile-info">
          <p className="profile-name">{name}</p>
          <span className="badge-pro">{plan}</span>
         <address className="profile-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
                 <strong>{location}</strong>
          </address>
        </div>
      </motion.section>

      {/* Último pedido */}
      <motion.section 
        className="card" 
        aria-label="Último pedido"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="section-heading">Último pedido</p>
        <div className="order-two-cols">
          <div className="order-left">
            <article className="order-row">
             <div className="icone_caminhao" aria-hidden="true">
                <img src={Iconecaminhao} alt="" />
              </div>
              <div>
                <p className="order-code">Código do pedido: <strong>{code}</strong></p>
                <p className="order-meta">{product}</p>
              </div>
            </article>

            <article className="order-row">
             <div className="icone_esclamacao" aria-hidden="true">
                <img src={Iconesclamacao} alt="icone de esclamação que representa ratreio do pedido" />
             </div>
              <div>
                <p className="order-code">Rastreio: <strong>{tracking}</strong></p>
                 <p className="order-meta">Data de entrega prevista: <span className="order-valor-data">{deliveryDate}</span></p>                
                 <p className="order-valor">Total: {totalPedido}</p>
              </div>
            </article>
          </div>

          <div className="order-right">
            <OrderProgress status={statusIndex} />
            <button className="track-btn" >
              Rastrear pedido
            </button>
          </div>
          </div>
      </motion.section>

      {/* Informações pessoais */}
      <motion.section 
        className="card" 
        aria-label="Informações pessoais"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="section-heading">Informações pessoais</p>
        <div className="info-grid">
          <InfoField label="Nome completo:" value={name} />
          <InfoField label="CPF:" value={cpf} />
          <InfoField label="Telefone celular:" value={phone} />
          <InfoField label="Endereço de e-mail:" value={email} />
          <InfoField label="Data de nascimento:" value={birthdate} />
          <InfoField label="Endereço:" value={address} />
        </div>
      </motion.section>
    </main>
  );
}
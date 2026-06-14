import { useState, useEffect } from 'react';
import '../perfil/perfil.css';
import SoprinhoImg from '../../assets/images/perfil/soprinho_perfil.svg';
import Iconecaminhao from '../../assets/images/perfil/icone_caminhao_perfil.svg';
import Iconesclamacao from '../../assets/images/perfil/icone_esclamacao_perfil.svg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

const STATUS_STEPS = ["Confirmado", "Preparando", "Em transporte", "Entregue"];


const mapearStatusPedido = (statusString) => {
  if (!statusString) return 0;
  const statusFormatado = statusString.toUpperCase();
  if (statusFormatado === 'CONFIRMADO') return 0;
  if (statusFormatado === 'PREPARANDO') return 1;
  if (statusFormatado === 'EM_TRANSPORTE') return 2;
  if (statusFormatado === 'ENTREGUE') return 3;
  return 0;
};

// Formata datas locais vindas da API Java
const formatarData = (dataStr) => {
  if (!dataStr) return '—';
  try {
    const partes = dataStr.split('-'); 
    if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataStr;
  } catch (e) {
    return dataStr;
  }
};

function Avatar({ name }) {
  return (
    <figure className="avatar-perfil">
      <img src={SoprinhoImg} alt={`Foto de perfil de ${name}`} />
    </figure>
  );
}

function OrderProgress({ statusIndex }) {
  const pct = (statusIndex / (STATUS_STEPS.length - 1)) * 100;
  return (
    <div className="progress-wrap" role="progressbar" aria-valuenow={statusIndex} aria-valuemin={0} aria-valuemax={STATUS_STEPS.length - 1}>
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
    <div className="info-field">
      <dt style={{ fontWeight: 'bold', color: '#1D252A' }}>{label}</dt>
      <dd style={{ margin: '4px 0 12px 0', color: '#555' }}>{value || '—'}</dd>
    </div>
  );
}

export default function MinhaConta() {
  const [dadosPerfil, setDadosPerfil] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const obterDadosDoSqlServer = async () => {
      try {
        const token = localStorage.getItem('@Sopro:token');
        const emailLogado = localStorage.getItem('@Sopro:email');

        if (!token || !emailLogado) {
          setErro('Sessão expirada ou não encontrada. Faça login novamente.');
          setCarregando(false);
          return;
        }

        // Faz a requisição autenticada com JWT batendo no PerfilController da API no Azure
        const response = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/perfil?email=${emailLogado}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Token inválido ou sessão expirada no servidor.');
          }
          throw new Error('Não foi possível recuperar os dados de perfil da base relacional.');
        }

        const data = await response.json(); 
        setDadosPerfil(data);
      } catch (err) {
        console.error(err);
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    obterDadosDoSqlServer();
  }, [navigate]);

  if (carregando) {
    return (
      <main className="page" style={{textAlign: 'center', paddingTop: '100px'}}>
        <p style={{color: '#1D252A', fontSize: '20px', fontWeight: 600}}>Carregando ecossistema SOPRO do Azure...</p>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="page" style={{textAlign: 'center', paddingTop: '100px'}}>
        <p style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{erro}</p>
        <button 
          onClick={() => navigate('/login')}
          style={{ marginTop: '16px', padding: '10px 20px', background: '#1A5AFF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Ir para o Login
        </button>
      </main>
    );
  }

  // Mapeamento limpo conforme o PerfilResponseDTO 
  const nomeCompleto = dadosPerfil?.nomeCompleto || 'Usuário SOPRO';
  const plano = dadosPerfil?.plano || 'Plano Free';
  const cidadeEstado = dadosPerfil?.cidadeEstado || 'Não Informado';
  const email = dadosPerfil?.email || '—';
  const cpf = dadosPerfil?.cpf || '—';
  const telefoneCelular = dadosPerfil?.telefoneCelular || '—';
  const dataNascimento = formatarData(dadosPerfil?.dataNascimento);
  const enderecoCompleto = dadosPerfil?.enderecoCompleto || 'Endereço não preenchido';

  
  const temPedido = dadosPerfil?.ultimoPedido !== null && dadosPerfil?.ultimoPedido !== undefined;
  const pedidoData = dadosPerfil?.ultimoPedido;
  const statusIndex = temPedido ? mapearStatusPedido(pedidoData.status) : 0;

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
        <Avatar name={nomeCompleto} />
        <div className="profile-info">
          <p className="profile-name">{nomeCompleto}</p>
          <span className="badge-pro" style={{ backgroundColor: plano.includes('Premium') ? '#22c55e' : '#1A5AFF' }}>
            {plano}
          </span>
          <address className="profile-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <strong>{cidadeEstado}</strong>
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
        {temPedido ? (
          <div className="order-two-cols">
            <div className="order-left">
              <article className="order-row">
                <div className="icone_caminhao" aria-hidden="true">
                  <img src={Iconecaminhao} alt="" />
                </div>
                <div>
                  <p className="order-code">Código do pedido: <strong>{pedidoData.codigoPedido}</strong></p>
                  <p className="order-meta">{pedidoData.produtoDescription || pedidoData.produtoDescricao || 'Dispositivo SOPRO Wearable'}</p>
                </div>
              </article>

              <article className="order-row">
                <div className="icone_esclamacao" aria-hidden="true">
                  <img src={Iconesclamacao} alt="" />
                </div>
                <div>
                  <p className="order-code">Rastreio: <strong>{pedidoData.codigoRastreio || 'Aguardando Emissão'}</strong></p>
                  <p className="order-meta">Data de entrega prevista: <span className="order-valor-data">{formatarData(pedidoData.dataEntregaPrevista)}</span></p>
                  <p className="order-valor">Total: R$ {pedidoData.valorTotal ? pedidoData.valorTotal.toFixed(2) : '0,00'}</p>
                </div>
              </article>
            </div>

            <div className="order-right">
              <OrderProgress statusIndex={statusIndex} />
              <button className="track-btn">
                Rastrear pedido
              </button>
            </div>
          </div>
        ) : (
          <p style={{padding: '20px', color: '#666', fontStyle: 'italic'}}>Você ainda não realizou aquisição de dispositivos físicos.</p>
        )}
      </motion.section>

      {/* Informações pessoais vindas direto do SQL Server */}
      <motion.section
        className="card"
        aria-label="Informações pessoais"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="section-heading">Informações pessoais</p>
        <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <InfoField label="Nome completo:"        value={nomeCompleto} />
          <InfoField label="CPF:"                  value={cpf} />
          <InfoField label="Telefone celular:"      value={telefoneCelular} />
          <InfoField label="Endereço de e-mail:"   value={email} />
          <InfoField label="Data de nascimento:"   value={dataNascimento} />
          <InfoField label="Endereço Cadastrado:"  value={enderecoCompleto} />
        </div>
      </motion.section>
    </main>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../perfil/perfil.css';
import SoprinhoImg from '../../assets/images/perfil/soprinho_perfil.svg';
import Iconecaminhao from '../../assets/images/perfil/icone_caminhao_perfil.svg';
import Iconesclamacao from '../../assets/images/perfil/icone_esclamacao_perfil.svg';
import IconeEditar from '../../assets/icons/ic_baseline-mode-edit.svg';
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
  const statusIndex = status !== undefined && status !== null ? status : 1;
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

/* Campo de informação — modo leitura ou edição inline */
function InfoField({ label, value, editando, onChange, type = "text" }) {
  return (
    <div style={{ margin: 0, paddingLeft: '30px', textAlign: 'left' }}>
      <dt className="order-code" style={{ marginBottom: '4px', display: 'block' }}>
        {label}
      </dt>
      {editando ? (
        <input
          type={type}
          className="input-editar-perfil"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <dd className="order-valor" style={{ margin: 0 }}>
          {value || "—"}
        </dd>
      )}
    </div>
  );
}

export default function MinhaConta() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [dadosPerfil, setDadosPerfil] = useState(null);

  /* ── Edição inline: "Meus dados" ── */
  const [editandoDados, setEditandoDados] = useState(false);
  const [formDados, setFormDados] = useState({
    nomeCompleto: '',
    cpf: '',
    telefoneCelular: '',
    email: '',
    dataNascimento: '',
  });

  /* ── Edição inline: "Endereço" ── */
  const [editandoEndereco, setEditandoEndereco] = useState(false);
  const [formEndereco, setFormEndereco] = useState({
    logradouro: '',
    complemento: '',
    bairro: '',
    cidadeEstado: '',
    cep: '',
  });

  useEffect(() => {
    const buscarDadosDoAzure = async () => {
      const token = localStorage.getItem('@Sopro:token');
      const emailLogado = localStorage.getItem('@Sopro:email');

      if (!token || !emailLogado) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/perfil?email=${emailLogado}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const dados = await response.json();
          console.log("DADOS RECEBIDOS DO JAVA/AZURE:", dados);
          setDadosPerfil(dados);
        }
      } catch (error) {
        console.error("Erro ao conectar com a API do Azure.", error);
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

  const obterDataHojeBR = () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  if (carregando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontSize: '18px', fontWeight: '500', color: '#f97316' }}>
        Carregando sua conta SOPRO...
      </div>
    );
  }

  let pedidoAtivo = dadosPerfil?.ultimoPedido;

  if (!pedidoAtivo && (dadosPerfil?.plano === "Plano Premium" || localStorage.getItem('@Sopro:ultimo_gasto'))) {
    pedidoAtivo = {
      codigoPedido: "#SP-2026-01",
      produtoDescricao: "1x Dispositivo Sopro - Cor Preta",
      status: "PREPARANDO",
      codigoRastreio: "RU182121051419BR",
      dataEntregaPrevista: "2026-06-22",
      dataCompra: obterDataHojeBR(),
      valorTotal: 200.97
    };
  }

  const temPedido = !!pedidoAtivo;

  const obterStatusIndex = (statusString) => {
    if (!statusString) return 1;
    switch (statusString.toUpperCase()) {
      case "CONFIRMADO": return 0;
      case "PREPARANDO": return 1;
      case "EM_TRANSPORTE":
      case "ENVIADO": return 2;
      case "ENTREGUE": return 3;
      default: return 1;
    }
  };

  const statusAtualIndex = obterStatusIndex(pedidoAtivo?.status);

  const enderecoCompletoBruto = dadosPerfil?.enderecoCompleto || "";

  let logradouro = "—";
  let complemento = "—";

  if (enderecoCompletoBruto && enderecoCompletoBruto !== "Endereço não preenchido") {
    const partes = enderecoCompletoBruto.split(" - ");
    logradouro = partes[0] || "—";
    complemento = partes[1] || "—";
  }

  const bairro = dadosPerfil?.bairro || "—";
  const cidadeEstado = dadosPerfil?.cidadeEstado || "—";
  const cep = dadosPerfil?.cep || "—";

  /* ── Handlers: "Meus dados" ── */
  const iniciarEdicaoDados = () => {
    setFormDados({
      nomeCompleto: dadosPerfil?.nomeCompleto || '',
      cpf: dadosPerfil?.cpf || '',
      telefoneCelular: dadosPerfil?.telefoneCellular || dadosPerfil?.telefoneCelular || '',
      email: dadosPerfil?.email || localStorage.getItem('@Sopro:email') || '',
      dataNascimento: dadosPerfil?.dataNascimento || '',
    });
    setEditandoDados(true);
  };

  const cancelarEdicaoDados = () => setEditandoDados(false);

  const salvarEdicaoDados = () => {
    // TODO: substituir por chamada PUT/PATCH quando o endpoint existir no backend
    setDadosPerfil((prev) => ({
      ...prev,
      nomeCompleto: formDados.nomeCompleto,
      cpf: formDados.cpf,
      telefoneCelular: formDados.telefoneCelular,
      telefoneCellular: formDados.telefoneCelular,
      email: formDados.email,
      dataNascimento: formDados.dataNascimento,
    }));
    setEditandoDados(false);
  };

  /* ── Handlers: "Endereço" ── */
  const iniciarEdicaoEndereco = () => {
    setFormEndereco({
      logradouro: logradouro !== "—" ? logradouro : '',
      complemento: complemento !== "—" ? complemento : '',
      bairro: bairro !== "—" ? bairro : '',
      cidadeEstado: cidadeEstado !== "—" ? cidadeEstado : '',
      cep: cep !== "—" ? cep : '',
    });
    setEditandoEndereco(true);
  };

  const cancelarEdicaoEndereco = () => setEditandoEndereco(false);

  const salvarEdicaoEndereco = () => {
    // TODO: substituir por chamada PUT/PATCH quando o endpoint existir no backend
    setDadosPerfil((prev) => ({
      ...prev,
      enderecoCompleto: `${formEndereco.logradouro} - ${formEndereco.complemento}`,
      bairro: formEndereco.bairro,
      cidadeEstado: formEndereco.cidadeEstado,
      cep: formEndereco.cep,
    }));
    setEditandoEndereco(false);
  };

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

      {/* Perfil do Usuário ── */}
      <motion.section
        className="card profile-card"
        aria-label="Informações do perfil"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Avatar />
        <div className="profile-info">
          <p className="profile-name">{dadosPerfil?.nomeCompleto || "Nome não cadastrado"}</p>
          <span className="badge-pro">
            {dadosPerfil?.plano === "Plano Premium" ? "Plano Pro" : (dadosPerfil?.plano || "Plano Free")}
          </span>
          <address className="profile-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <strong>{dadosPerfil?.cidadeEstado || "Localização não informada"}</strong>
          </address>
        </div>
      </motion.section>

      {/* Último pedido ── */}
      <motion.section
        className="card"
        aria-label="Último pedido"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="section-heading" style={{ color: '#1D252A' }}>Último pedido</p>

        {temPedido ? (
          <div className="order-two-cols">
            <div className="order-left">
              <article className="order-row">
                <div className="icone_caminhao" aria-hidden="true">
                  <img src={Iconecaminhao} alt="" />
                </div>
                <div>
                  <p className="order-code">Código do pedido: <strong>{pedidoAtivo.codigoPedido}</strong></p>
                  <p className="order-meta">{pedidoAtivo.produtoDescricao}</p>
                  <p className="order-valor" style={{ marginTop: '2px', fontSize: '12px' }}>
                    Data da compra: <strong>{pedidoAtivo.dataCompra || obterDataHojeBR()}</strong>
                  </p>
                </div>
              </article>

              <article className="order-row">
                <div className="icone_esclamacao" aria-hidden="true">
                  <img src={Iconesclamacao} alt="Ícone de rastreio" />
                </div>
                <div>
                  <p className="order-code">Rastreio: <strong>{pedidoAtivo.codigoRastreio || "Sem código gerado"}</strong></p>
                  <p className="order-meta">Data de entrega prevista: <span className="order-valor-data">{formatarDataBR(pedidoAtivo.dataEntregaPrevista) || "Aguardando atualização"}</span></p>
                  <p className="order-valor">Total: R$ {typeof pedidoAtivo.valorTotal === 'number' ? pedidoAtivo.valorTotal.toFixed(2).replace('.', ',') : "200,97"}</p>
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

      {/* ── Meus dados ── */}
      <motion.section
        className="card"
        aria-label="Meus dados"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid #e5e5e5', marginBottom: '1rem' }}>
          <p className="section-heading" style={{ borderBottom: 'none', marginBottom: 0, color: '#1D252A' }}>Meus dados</p>

          {editandoDados ? (
            <div style={{ position: 'absolute', right: '20px', top: '15px', display: 'flex', gap: '8px' }}>
              <button type="button" className="btn-cancelar-perfil" onClick={cancelarEdicaoDados}>
                Cancelar
              </button>
              <button type="button" className="btn-salvar-perfil" onClick={salvarEdicaoDados}>
                Salvar
              </button>
            </div>
          ) : (
            <button type="button" className="btn-editar-perfil-mock" style={{ position: 'absolute', right: '20px', top: '15px' }} onClick={iniciarEdicaoDados}>
              <img src={IconeEditar} alt="" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} /> Editar
            </button>
          )}
        </div>

        <div className="info-grid" style={{ paddingTop: '0.5rem' }}>
          <InfoField
            label="Nome completo:"
            value={editandoDados ? formDados.nomeCompleto : dadosPerfil?.nomeCompleto}
            editando={editandoDados}
            onChange={(v) => setFormDados((f) => ({ ...f, nomeCompleto: v }))}
          />
          <InfoField
            label="CPF:"
            value={editandoDados ? formDados.cpf : dadosPerfil?.cpf}
            editando={editandoDados}
            onChange={(v) => setFormDados((f) => ({ ...f, cpf: v }))}
          />
          <InfoField
            label="Telefone celular:"
            value={editandoDados ? formDados.telefoneCelular : (dadosPerfil?.telefoneCellular || dadosPerfil?.telefoneCelular)}
            editando={editandoDados}
            onChange={(v) => setFormDados((f) => ({ ...f, telefoneCelular: v }))}
          />
          <InfoField
            label="Endereço de e-mail:"
            value={editandoDados ? formDados.email : (dadosPerfil?.email || localStorage.getItem('@Sopro:email'))}
            editando={editandoDados}
            type="email"
            onChange={(v) => setFormDados((f) => ({ ...f, email: v }))}
          />
          <InfoField
            label="Data de nascimento:"
            value={editandoDados ? formDados.dataNascimento : formatarDataBR(dadosPerfil?.dataNascimento)}
            editando={editandoDados}
            type={editandoDados ? "date" : "text"}
            onChange={(v) => setFormDados((f) => ({ ...f, dataNascimento: v }))}
          />
        </div>
      </motion.section>

      {/* Endereço ── */}
      <motion.section
        className="card"
        aria-label="Endereço"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid #e5e5e5', marginBottom: '1rem' }}>
          <p className="section-heading" style={{ borderBottom: 'none', marginBottom: 0, color: '#1D252A' }}>Endereço</p>

          {editandoEndereco ? (
            <div style={{ position: 'absolute', right: '20px', top: '15px', display: 'flex', gap: '8px' }}>
              <button type="button" className="btn-cancelar-perfil" onClick={cancelarEdicaoEndereco}>
                Cancelar
              </button>
              <button type="button" className="btn-salvar-perfil" onClick={salvarEdicaoEndereco}>
                Salvar
              </button>
            </div>
          ) : (
            <button type="button" className="btn-editar-perfil-mock" style={{ position: 'absolute', right: '20px', top: '15px' }} onClick={iniciarEdicaoEndereco}>
              <img src={IconeEditar} alt="" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} /> Editar
            </button>
          )}
        </div>

        <div className="info-grid" style={{ paddingTop: '0.5rem' }}>
          <InfoField
            label="Logradouro:"
            value={editandoEndereco ? formEndereco.logradouro : logradouro}
            editando={editandoEndereco}
            onChange={(v) => setFormEndereco((f) => ({ ...f, logradouro: v }))}
          />
          <InfoField
            label="Complemento:"
            value={editandoEndereco ? formEndereco.complemento : complemento}
            editando={editandoEndereco}
            onChange={(v) => setFormEndereco((f) => ({ ...f, complemento: v }))}
          />
          <InfoField
            label="Bairro:"
            value={editandoEndereco ? formEndereco.bairro : bairro}
            editando={editandoEndereco}
            onChange={(v) => setFormEndereco((f) => ({ ...f, bairro: v }))}
          />
          <InfoField
            label="Cidade/UF:"
            value={editandoEndereco ? formEndereco.cidadeEstado : cidadeEstado}
            editando={editandoEndereco}
            onChange={(v) => setFormEndereco((f) => ({ ...f, cidadeEstado: v }))}
          />
          <InfoField
            label="CEP:"
            value={editandoEndereco ? formEndereco.cep : cep}
            editando={editandoEndereco}
            onChange={(v) => setFormEndereco((f) => ({ ...f, cep: v }))}
          />
        </div>
      </motion.section>
    </main>
  );
}

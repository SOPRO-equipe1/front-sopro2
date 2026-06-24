import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../perfil/perfil.css';
import SoprinhoImg from '../../assets/images/perfil/soprinho_perfil.svg';
import Iconecaminhao from '../../assets/images/perfil/icone_caminhao_perfil.svg';
import Iconesclamacao from '../../assets/images/perfil/icone_esclamacao_perfil.svg';
import IconeEditar from '../../assets/icons/ic_baseline-mode-edit.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/auth/authContext.jsx';

const STATUS_STEPS = ["Confirmado", "Preparando", "Em transporte", "Entregue"];

const ESTADOS_BR = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

function Avatar({ photoURL, name }) {
  return (
    <figure className="avatar-perfil">
      <img
        src={photoURL || SoprinhoImg}
        alt={`Foto de perfil de ${name || 'usuário'}`}
        referrerPolicy="no-referrer"
        onError={(e) => { e.currentTarget.src = SoprinhoImg; }}
      />
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

function InfoField({ label, value }) {
  return (
    <div style={{ margin: 0, paddingLeft: '30px', textAlign: 'left' }}>
      <dt className="info-label" style={{ marginBottom: '2px', display: 'block' }}>
        {label}
      </dt>
      <dd className="order-valor" style={{ margin: 0 }}>
        {value || "—"}
      </dd>
    </div>
  );
}

/* ── Wrapper genérico de modal ── */
function ModalOverlay({ children, onClose }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Modal: Editando meus dados ── */
function ModalMeusDados({ form, setForm, onClose, onSalvar, onAbrirAlterarEmail, onAbrirAlterarSenha, onAbrirExcluirConta }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="modal-header">
        <h2 className="modal-title">Editando meus dados</h2>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
      </div>

      <div className="modal-field">
        <label>E-mail:</label>
        <input type="email" value={form.email} disabled className="modal-input modal-input-disabled" />
      </div>

      <div className="modal-field">
        <label>Nome completo:</label>
        <input
          type="text"
          value={form.nomeCompleto}
          onChange={(e) => setForm((f) => ({ ...f, nomeCompleto: e.target.value }))}
          className="modal-input"
        />
      </div>

      <div className="modal-row">
        <div className="modal-field">
          <label>CPF:</label>
          <input
            type="text"
            value={form.cpf}
            onChange={(e) => setForm((f) => ({ ...f, cpf: e.target.value }))}
            className="modal-input"
          />
        </div>
        <div className="modal-field">
          <label>Data de nascimento:</label>
          <input
            type="date"
            value={form.dataNascimento}
            onChange={(e) => setForm((f) => ({ ...f, dataNascimento: e.target.value }))}
            className="modal-input"
          />
        </div>
      </div>

      <div className="modal-row">
        <div className="modal-field">
          <label>Telefone celular:</label>
          <input
            type="tel"
            value={form.telefoneCelular}
            onChange={(e) => setForm((f) => ({ ...f, telefoneCelular: e.target.value }))}
            className="modal-input"
          />
        </div>
        <div className="modal-field">
          <label>Nome social:</label>
          <input
            type="text"
            value={form.nomeSocial}
            onChange={(e) => setForm((f) => ({ ...f, nomeSocial: e.target.value }))}
            className="modal-input"
          />
        </div>
      </div>

      <div className="modal-row">
        <button type="button" className="btn-outline-laranja" onClick={onAbrirAlterarEmail}>
          Alterar e-mail
        </button>
        <button type="button" className="btn-outline-laranja" onClick={onAbrirAlterarSenha}>
          Alterar senha
        </button>
      </div>

      <button type="button" className="btn-salvar-modal" onClick={onSalvar}>
        ✓ Salvar alterações
      </button>

      <button type="button" className="btn-excluir-conta" onClick={onAbrirExcluirConta}>
        🗑 Excluir minha conta
      </button>
    </ModalOverlay>
  );
}

/* ── Modal: Alterar e-mail ── */
function ModalAlterarEmail({ onClose, onConfirmar }) {
  const [novoEmail, setNovoEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');

  return (
    <ModalOverlay onClose={onClose}>
      <div className="modal-header">
        <h2 className="modal-title">Alterar e-mail</h2>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
      </div>

      <div className="modal-field">
        <label>Novo e-mail:</label>
        <input type="email" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} className="modal-input" />
      </div>

      <div className="modal-field">
        <label>Confirme sua senha atual:</label>
        <input type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} className="modal-input" />
      </div>

      <button
        type="button"
        className="btn-salvar-modal"
        onClick={() => onConfirmar(novoEmail)}
      >
        ✓ Confirmar alteração
      </button>
    </ModalOverlay>
  );
}

/* ── Modal: Alterar senha ── */
function ModalAlterarSenha({ onClose, onConfirmar }) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleConfirmar = () => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    setErro('');
    onConfirmar();
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="modal-header">
        <h2 className="modal-title">Alterar senha</h2>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
      </div>

      <div className="modal-field">
        <label>Senha atual:</label>
        <input type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} className="modal-input" />
      </div>

      <div className="modal-field">
        <label>Nova senha:</label>
        <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} className="modal-input" />
      </div>

      <div className="modal-field">
        <label>Confirme a nova senha:</label>
        <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} className="modal-input" />
      </div>

      {erro && <p className="modal-erro">{erro}</p>}

      <button type="button" className="btn-salvar-modal" onClick={handleConfirmar}>
        ✓ Confirmar alteração
      </button>
    </ModalOverlay>
  );
}

/* ── Modal: Excluir conta ── */
function ModalExcluirConta({ onClose, onConfirmar }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="modal-header">
        <h2 className="modal-title">Excluir minha conta</h2>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
      </div>

      <p style={{ color: '#444', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
        Essa ação é <strong>permanente</strong> e não pode ser desfeita. Todos os seus dados,
        pedidos e histórico serão removidos da plataforma SOPRO.
      </p>

      <div className="modal-row">
        <button type="button" className="btn-cancelar-perfil" style={{ flex: 1 }} onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className="btn-excluir-conta-confirmar" style={{ flex: 1 }} onClick={onConfirmar}>
          Sim, excluir conta
        </button>
      </div>
    </ModalOverlay>
  );
}

/* ── Modal: Editando endereço ── */
function ModalEndereco({ form, setForm, onClose, onSalvar, buscandoCep }) {
  const handleCepChange = (e) => {
    const cep = e.target.value.replace(/\D/g, '').slice(0, 8);
    setForm((f) => ({ ...f, cep }));
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="modal-header">
        <h2 className="modal-title">Editando endereço</h2>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
      </div>

      <div className="modal-field">
        <div className="modal-label-row">
          <label>CEP:</label>
          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            rel="noreferrer"
            className="modal-link-laranja"
          >
            Não sei meu CEP
          </a>
        </div>
        <input
          type="text"
          value={form.cep}
          onChange={handleCepChange}
          placeholder="00000-000"
          className="modal-input"
          maxLength={8}
        />
        {buscandoCep && <span className="modal-hint">Buscando endereço…</span>}
      </div>

      <div className="modal-field">
        <label>Endereço:</label>
        <input
          type="text"
          value={form.logradouro}
          onChange={(e) => setForm((f) => ({ ...f, logradouro: e.target.value }))}
          className="modal-input"
        />
      </div>

      <div className="modal-row modal-row-3">
        <div className="modal-field">
          <label>Bairro:</label>
          <input
            type="text"
            value={form.bairro}
            onChange={(e) => setForm((f) => ({ ...f, bairro: e.target.value }))}
            className="modal-input"
          />
        </div>
        <div className="modal-field">
          <label>Cidade:</label>
          <input
            type="text"
            value={form.cidade}
            onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
            className="modal-input"
          />
        </div>
        <div className="modal-field">
          <label>Estado:</label>
          <select
            value={form.estado}
            onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}
            className="modal-input modal-select"
          >
            <option value="">UF</option>
            {ESTADOS_BR.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="modal-row">
        <div className="modal-field">
          <label>Número:</label>
          <input
            type="text"
            value={form.numero}
            onChange={(e) => setForm((f) => ({ ...f, numero: e.target.value }))}
            className="modal-input"
          />
        </div>
        <div className="modal-field">
          <label>Complemento:</label>
          <input
            type="text"
            value={form.complemento}
            onChange={(e) => setForm((f) => ({ ...f, complemento: e.target.value }))}
            className="modal-input"
          />
        </div>
      </div>

      <button type="button" className="btn-salvar-modal" onClick={onSalvar}>
        ✓ Salvar alterações
      </button>
    </ModalOverlay>
  );
}

export default function MinhaConta() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [carregando, setCarregando] = useState(true);
  const [dadosPerfil, setDadosPerfil] = useState(null);

  /* ── Controle de modais ── */
  const [modalAberto, setModalAberto] = useState(null);
  // valores possíveis: null | 'dados' | 'email' | 'senha' | 'excluir' | 'endereco'

  const [buscandoCep, setBuscandoCep] = useState(false);

  const [formDados, setFormDados] = useState({
    email: '',
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '',
    telefoneCelular: '',
    nomeSocial: '',
  });

  const [formEndereco, setFormEndereco] = useState({
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    complemento: '',
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

  /* ── Busca automática de CEP via ViaCEP ── */
  useEffect(() => {
    const cepLimpo = formEndereco.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    let cancelado = false;

    const buscarCep = async () => {
      setBuscandoCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await res.json();
        if (!cancelado && !data.erro) {
          setFormEndereco((f) => ({
            ...f,
            logradouro: data.logradouro || f.logradouro,
            bairro: data.bairro || f.bairro,
            cidade: data.localidade || f.cidade,
            estado: data.uf || f.estado,
          }));
        }
      } catch (err) {
        console.error('Erro ao buscar CEP:', err);
      } finally {
        if (!cancelado) setBuscandoCep(false);
      }
    };

    buscarCep();
    return () => { cancelado = true; };
  }, [formEndereco.cep]);

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

  // Resolução do Conflito de Pedidos (HEAD vs Hash)
  const pedidoCache = JSON.parse(localStorage.getItem('@Sopro:pedido') || 'null');
  let pedidoAtivo = dadosPerfil?.ultimoPedido || pedidoCache || null;

  if (!pedidoAtivo && (dadosPerfil?.plano === "Plano Premium" || localStorage.getItem('@Sopro:ultimo_gasto'))) {
    pedidoAtivo = {
      codigoPedido: "#SP-2026-01",
      produtoDescricao: "1x Dispositivo Sopro - Cor Preta",
      status: "PREPARANDO",
      codigoRastreio: "RU182121051419BR",
      dataEntregaPrevista: "2026-06-22",
      dataCompra: obterDataHojeBR(),
      valorTotal: 350.50
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

  // Resolução do Conflito de Endereço (HEAD vs Hash)
  const enderecoCache = JSON.parse(localStorage.getItem('@Sopro:endereco') || 'null');
  const enderecoCompletoBruto = dadosPerfil?.enderecoCompleto || "";

  let logradouro = enderecoCache?.logradouro || "—";
  let complemento = enderecoCache?.complemento || "—";

  if (logradouro === "—" && enderecoCompletoBruto && enderecoCompletoBruto !== "Endereço não preenchido") {
    const partes = enderecoCompletoBruto.split(" - ");
    logradouro = partes[0] || "—";
    complemento = partes[1] || "—";
  }

  const bairro = enderecoCache?.bairro || dadosPerfil?.bairro || "—";
  const cep = enderecoCache?.cep || dadosPerfil?.cep || "—";
  
  const cidadeEstado = enderecoCache?.cidade && enderecoCache?.estado
    ? `${enderecoCache.cidade}, ${enderecoCache.estado}`
    : (dadosPerfil?.cidadeEstado || "—");

  /* ── Abertura dos modais ── */
  const abrirModalDados = () => {
    setFormDados({
      email: dadosPerfil?.email || usuario?.email || localStorage.getItem('@Sopro:email') || '',
      nomeCompleto: dadosPerfil?.nomeCompleto || usuario?.displayName || '',
      cpf: dadosPerfil?.cpf || '',
      dataNascimento: dadosPerfil?.dataNascimento || '',
      telefoneCelular: dadosPerfil?.telefoneCellular || dadosPerfil?.telefoneCelular || '',
      nomeSocial: dadosPerfil?.nomeSocial || '',
    });
    setModalAberto('dados');
  };

  const abrirModalEndereco = () => {
    setFormEndereco({
      cep: cep !== "—" ? cep.replace(/\D/g, '') : '',
      logradouro: logradouro !== "—" ? logradouro : '',
      bairro: bairro !== "—" ? bairro : '',
      cidade: cidadeEstado !== "—" ? cidadeEstado.split(', ')[0] || cidadeEstado.split(' - ')[0] || '' : '',
      estado: cidadeEstado !== "—" ? cidadeEstado.split(', ')[1] || cidadeEstado.split(' - ')[1] || '' : '',
      numero: dadosPerfil?.numero || '',
      complemento: complemento !== "—" ? complemento : '',
    });
    setModalAberto('endereco');
  };

  /* ── Salvar (local apenas — sem chamada de API por enquanto) ── */
  const salvarDados = () => {
    setDadosPerfil((prev) => ({
      ...prev,
      nomeCompleto: formDados.nomeCompleto,
      cpf: formDados.cpf,
      dataNascimento: formDados.dataNascimento,
      telefoneCelular: formDados.telefoneCelular,
      telefoneCellular: formDados.telefoneCelular,
      nomeSocial: formDados.nomeSocial,
    }));
    setModalAberto(null);
  };

  const salvarEndereco = () => {
    setDadosPerfil((prev) => ({
      ...prev,
      enderecoCompleto: `${formEndereco.logradouro}, ${formEndereco.numero} - ${formEndereco.complemento}`,
      bairro: formEndereco.bairro,
      cidadeEstado: `${formEndereco.cidade} - ${formEndereco.estado}`,
      cep: formEndereco.cep,
      numero: formEndereco.numero,
    }));
    setModalAberto(null);
  };

  const confirmarAlterarEmail = (novoEmail) => {
    setFormDados((f) => ({ ...f, email: novoEmail }));
    setModalAberto('dados');
  };

  const confirmarAlterarSenha = () => {
    setModalAberto('dados');
  };

  const confirmarExcluirConta = () => {
    localStorage.removeItem('@Sopro:token');
    localStorage.removeItem('@Sopro:email');
    navigate('/login');
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
        className="perfil-card-box profile-card"
        aria-label="Informações do perfil"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Avatar photoURL={usuario?.photoURL} name={dadosPerfil?.nomeCompleto || usuario?.displayName} />
        <div className="profile-info">
          <p className="profile-name">{dadosPerfil?.nomeCompleto || usuario?.displayName || "Nome não cadastrado"}</p>
          <span className="badge-pro">
            {dadosPerfil?.plano === "Plano Premium" ? "Plano Pro" : (dadosPerfil?.plano || "Plano Free")}
          </span>
          <address className="profile-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <strong>{cidadeEstado !== "—" ? cidadeEstado : "Localização não informada"}</strong>
          </address>
        </div>
      </motion.section>

      {/* Último pedido ── */}
      <motion.section
        className="perfil-card-box"
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
                  <p className="order-code"> <span className='order-codeRastreio'> Rastreio: </span> <strong>{pedidoAtivo.codigoRastreio || "Sem código gerado"}</strong></p>
                  <p className="order-meta"> <strong> Data de entrega prevista: </strong> <span className="order-valor-data">{formatarDataBR(pedidoAtivo.dataEntregaPrevista) || "Aguardando atualização"}</span></p>
                  <p className="order-valor"> <strong> Total: </strong>R$ {typeof pedidoAtivo.valorTotal === 'number' ? pedidoAtivo.valorTotal.toFixed(2).replace('.', ',') : "350,50"}</p>
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
        className="perfil-card-box"
        aria-label="Meus dados"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid #e5e5e5', marginBottom: '1rem' }}>
          <p className="section-heading" style={{ borderBottom: 'none', marginBottom: 0, color: '#1D252A' }}>Meus dados</p>
          <button type="button" className="btn-editar-perfil-mock" style={{ position: 'absolute', right: '20px', top: '15px' }} onClick={abrirModalDados}>
            <img src={IconeEditar} alt="" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} /> Editar
          </button>
        </div>

        <div className="info-grid" style={{ paddingTop: '0.5rem' }}>
          <InfoField label="Nome completo:" value={dadosPerfil?.nomeCompleto || usuario?.displayName} />
          <InfoField label="CPF:" value={dadosPerfil?.cpf} />
          <InfoField label="Telefone celular:" value={dadosPerfil?.telefoneCellular || dadosPerfil?.telefoneCelular} />
          <InfoField label="Endereço de e-mail:" value={dadosPerfil?.email || usuario?.email || localStorage.getItem('@Sopro:email')} />
          <InfoField label="Data de nascimento:" value={formatarDataBR(dadosPerfil?.dataNascimento)} />
        </div>
      </motion.section>

      {/* Endereço ── */}
      <motion.section
        className="perfil-card-box"
        aria-label="Endereço"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid #e5e5e5', marginBottom: '1rem' }}>
          <p className="section-heading" style={{ borderBottom: 'none', marginBottom: 0, color: '#1D252A' }}>Endereço</p>
          <button type="button" className="btn-editar-perfil-mock" style={{ position: 'absolute', right: '20px', top: '15px' }} onClick={abrirModalEndereco}>
            <img src={IconeEditar} alt="" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} /> Editar
          </button>
        </div>

        <div className="info-grid" style={{ paddingTop: '0.5rem' }}>
          <InfoField label="Logradouro:" value={logradouro} />
          <InfoField label="Complemento:" value={complemento} />
          <InfoField label="Bairro:" value={bairro} />
          <InfoField label="Cidade/UF:" value={cidadeEstado} />
          <InfoField label="CEP:" value={cep} />
        </div>
      </motion.section>

      {/* ── Modais ── */}
      <AnimatePresence>
        {modalAberto === 'dados' && (
          <ModalMeusDados
            form={formDados}
            setForm={setFormDados}
            onClose={() => setModalAberto(null)}
            onSalvar={salvarDados}
            onAbrirAlterarEmail={() => setModalAberto('email')}
            onAbrirAlterarSenha={() => setModalAberto('senha')}
            onAbrirExcluirConta={() => setModalAberto('excluir')}
          />
        )}

        {modalAberto === 'email' && (
          <ModalAlterarEmail
            onClose={() => setModalAberto('dados')}
            onConfirmar={confirmarAlterarEmail}
          />
        )}

        {modalAberto === 'senha' && (
          <ModalAlterarSenha
            onClose={() => setModalAberto('dados')}
            onConfirmar={confirmarAlterarSenha}
          />
        )}

        {modalAberto === 'excluir' && (
          <ModalExcluirConta
            onClose={() => setModalAberto('dados')}
            onConfirmar={confirmarExcluirConta}
          />
        )}

        {modalAberto === 'endereco' && (
          <ModalEndereco
            form={formEndereco}
            setForm={setFormEndereco}
            onClose={() => setModalAberto(null)}
            onSalvar={salvarEndereco}
            buscandoCep={buscandoCep}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
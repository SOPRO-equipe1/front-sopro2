import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './cadastro.css';
import '../../context/auth/auth-extras.css';
import logo from '../../assets/icons/logo.png';
import imagemCadastro from '../../assets/images/cadastro/imgCadastre-se.png';
import { motion } from 'framer-motion';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const CadastroContent = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [errosCampos, setErrosCampos] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const validarCampoAoSair = (nomeCampo, valor) => {
    let mensagemErro = '';

    if (nomeCampo === 'nome') {
      if (!valor.trim()) mensagemErro = 'O nome é obrigatório.';
    }

    if (nomeCampo === 'email') {
      if (!valor.trim()) {
        mensagemErro = 'O e-mail é obrigatório.';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor.trim())) {
          mensagemErro = 'Por favor, insira um e-mail válido contendo @ e um domínio.';
        }
      }
    }

    if (nomeCampo === 'senha') {
      if (!valor) {
        mensagemErro = 'A senha é obrigatória.';
      } else {
        const senhaForteRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_\-*&%#@])(?=\S+$).{8,}$/;
        if (!senhaForteRegex.test(valor)) {
          mensagemErro = 'Senha fraca: Mínimo de 8 caracteres, incluindo 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.';
        }
      }
    }

    if (nomeCampo === 'confirmarSenha') {
      if (valor !== senha) {
        mensagemErro = 'As senhas não coincidem.';
      }
    }

    setErrosCampos(prev => ({ ...prev, [nomeCampo]: mensagemErro }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroGeral('');

    validarCampoAoSair('nome', nome);
    validarCampoAoSair('email', email);
    validarCampoAoSair('senha', senha);
    validarCampoAoSair('confirmarSenha', confirmarSenha);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaForteRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_\-*&%#@])(?=\S+$).{8,}$/;

    if (!nome.trim() || !emailRegex.test(email.trim()) || !senhaForteRegex.test(senha) || senha !== confirmarSenha) {
      setErroGeral('Por favor, corrija os erros nos campos destacados antes de prosseguir.');
      return;
    }
    
    setCarregando(true);
    try {
      const respostaCadastro = await fetch('https://sopro-backend-a6h6e5a9bydzd2dd.eastus-01.azurewebsites.net/api/usuarios/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          senha: senha
        })
      });

      if (!respostaCadastro.ok) {
        throw new Error('Falha no cadastro. Verifique os dados ou certifique-se de que o e-mail é único.');
      }

      localStorage.setItem('@Sopro:nome', nome.trim());
      navigate('/login');

    } catch (err) {
      setErroGeral(err.message || 'Erro ao conectar-se com a API do Azure.');
    } finally {
      setCarregando(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setCarregando(true);
    setErroGeral('');
    try {
      const res = await fetch('https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });

      if (!res.ok) throw new Error('Falha no cadastro/login com o Google.');

      const dadosAPI = await res.json();
      localStorage.setItem('@Sopro:token', dadosAPI.token);
      localStorage.setItem('@Sopro:email', dadosAPI.email);
      localStorage.setItem('@Sopro:nome', dadosAPI.nome);

      navigate('/perfil');
    } catch (err) {
      setErroGeral('Erro na autenticação com o Google.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">
         <motion.article className="cadastro-form-col" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <header className="cadastro-header">
            <img src={logo} alt="Sopro Logo" className="cadastro-logo" />
            <h1 className="cadastro-title">Crie sua conta</h1>
          </header>

          <form className="cadastro-form" onSubmit={handleSubmit} noValidate>
            {erroGeral && <p className="cadastro-erro" role="alert" style={{ marginBottom: '15px' }}>{erroGeral}</p>}

            {/* Campo Nome */}
            <label htmlFor="nome" className="visually-hidden">Nome</label>
            <input id="nome" type="text" className={`cadastro-input ${errosCampos.nome ? 'input-erro-visual' : ''}`} placeholder="Insira seu nome" value={nome} onChange={(e) => setNome(e.target.value)} onBlur={() => validarCampoAoSair('nome', nome)} autoComplete="name" disabled={carregando} />
            {errosCampos.nome && <span className="feedback-erro-campo">{errosCampos.nome}</span>}

            {/* Campo E-mail */}
            <label htmlFor="email" className="visually-hidden">E-mail</label>
            <input id="email" type="email" className={`cadastro-input ${errosCampos.email ? 'input-erro-visual' : ''}`} placeholder="Insira seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => validarCampoAoSair('email', email)} autoComplete="email" disabled={carregando} />
            {errosCampos.email && <span className="feedback-erro-campo">{errosCampos.email}</span>}

            {/* Campo senha */}
            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input id="senha" type="password" className={`cadastro-input ${errosCampos.senha ? 'input-erro-visual' : ''}`} placeholder="Insira sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} onBlur={() => validarCampoAoSair('senha', senha)} autoComplete="new-password" disabled={carregando} />
            {errosCampos.senha && <span className="feedback-erro-campo">{errosCampos.senha}</span>}

            {/* Campo confirmar Senha */}
            <label htmlFor="confirmarSenha" className="visually-hidden">Confirmar senha</label>
            <input id="confirmarSenha" type="password" className={`cadastro-input ${errosCampos.confirmarSenha ? 'input-erro-visual' : ''}`} placeholder="Confirme sua senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} onBlur={() => validarCampoAoSair('confirmarSenha', confirmarSenha)} autoComplete="new-password" disabled={carregando} />
            {errosCampos.confirmarSenha && <span className="feedback-erro-campo">{errosCampos.confirmarSenha}</span>}

            <button type="submit" className="cadastro-btn" style={{ marginTop: '15px' }} disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="login-divider-label">Cadastrar com</p>
          
          <nav className="login-social" aria-label="Cadastro social">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setErroGeral('Cadastro com o Google falhou.')}
              text="signup_with"
              shape="rectangular"
              locale="pt-BR"
            />
          </nav>

          <p className="cadastro-login">
            Já possui uma conta? <Link to="/login">Faça login</Link>
          </p>
        </motion.article>

        <motion.figure className="cadastro-image-col" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <img src={imagemCadastro} alt="Usuário do Sopro" className="cadastro-image" />
        </motion.figure>
      </section>
    </main>
  );
};

const Cadastro = () => (
  <GoogleOAuthProvider clientId="668261340880-j3djh4lugbo1kb0hs3if8g9734q1u7kl.apps.googleusercontent.com">
    <CadastroContent />
  </GoogleOAuthProvider>
);

export default Cadastro;
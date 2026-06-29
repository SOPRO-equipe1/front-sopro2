import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './cadastro.css';
import '../../context/auth/auth-extras.css';
import logo from '../../assets/icons/logo.png';
import logoGoogle from '../../assets/icons/logoGoogle.png';
import imagemCadastro from '../../assets/images/cadastro/imgCadastre-se.png';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../../context/auth/firebase.js';
import { useAuth } from '../../context/auth/authContext.jsx';

const Cadastro = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

  /* Cadastro com e-mail e senha via Firebase Auth */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroGeral('');

    // Valida todos os campos
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
      // Cria o usuário no Firebase Authentication
      const resultado = await createUserWithEmailAndPassword(auth, email.trim(), senha);

      // Salva o nome no perfil do Firebase
      await updateProfile(resultado.user, { displayName: nome.trim() });

      // Gera o token e salva na sessão
      const token = await resultado.user.getIdToken();
      localStorage.setItem('@Sopro:token', token);
      localStorage.setItem('@Sopro:email', resultado.user.email);
      localStorage.setItem('@Sopro:nome', nome.trim());

      await login(resultado.user.email, nome.trim(), null);
      navigate('/perfil');

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErroGeral('Este e-mail já está cadastrado. Faça login ou use outro e-mail.');
      } else if (err.code === 'auth/weak-password') {
        setErroGeral('Senha muito fraca. Use pelo menos 6 caracteres.');
      } else if (err.code === 'auth/invalid-email') {
        setErroGeral('E-mail inválido.');
      } else {
        setErroGeral('Erro ao criar conta. Tente novamente.');
        console.error('Erro no cadastro:', err);
      }
    } finally {
      setCarregando(false);
    }
  };

  /* Cadastro/Login com Google via Firebase Auth */
  const handleGoogleCadastro = async () => {
    setErroGeral('');
    setCarregando(true);
    try {
      const resultado = await signInWithPopup(auth, googleProvider);
      const firebaseUser = resultado.user;
      const token = await firebaseUser.getIdToken();
      const foto =
        firebaseUser.photoURL ||
        firebaseUser.providerData?.find((p) => p.providerId === 'google.com')?.photoURL ||
        null;
      const nomeGoogle = firebaseUser.displayName || firebaseUser.email.split('@')[0];

      localStorage.setItem('@Sopro:token', token);
      localStorage.setItem('@Sopro:email', firebaseUser.email);
      localStorage.setItem('@Sopro:nome', nomeGoogle);
      if (foto) localStorage.setItem('@Sopro:foto', foto);

      await login(firebaseUser.email, nomeGoogle, foto);
      navigate('/perfil');

    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        // usuário cancelou; não exibe erro
      } else if (err.code === 'auth/unauthorized-domain') {
        setErroGeral('Este domínio não está autorizado no Firebase. Avise o time técnico.');
      } else {
        setErroGeral('Erro na autenticação com o Google.');
        console.error('Erro no cadastro com Google:', err);
      }
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

            {/* Campo Senha */}
            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input id="senha" type="password" className={`cadastro-input ${errosCampos.senha ? 'input-erro-visual' : ''}`} placeholder="Insira sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} onBlur={() => validarCampoAoSair('senha', senha)} autoComplete="new-password" disabled={carregando} />
            {errosCampos.senha && <span className="feedback-erro-campo">{errosCampos.senha}</span>}

            {/* Campo Confirmar Senha */}
            <label htmlFor="confirmarSenha" className="visually-hidden">Confirmar senha</label>
            <input id="confirmarSenha" type="password" className={`cadastro-input ${errosCampos.confirmarSenha ? 'input-erro-visual' : ''}`} placeholder="Confirme sua senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} onBlur={() => validarCampoAoSair('confirmarSenha', confirmarSenha)} autoComplete="new-password" disabled={carregando} />
            {errosCampos.confirmarSenha && <span className="feedback-erro-campo">{errosCampos.confirmarSenha}</span>}

            <button type="submit" className="cadastro-btn" style={{ marginTop: '15px' }} disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="login-divider-label">Cadastrar com</p>

          <nav className="login-social" aria-label="Cadastro social">
            <button type="button" className="social-btn social-btn--google" onClick={handleGoogleCadastro} disabled={carregando}>
              <img src={logoGoogle} alt="" aria-hidden="true" />
              {carregando ? 'Aguarde...' : 'Cadastrar com Google'}
            </button>
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

export default Cadastro;

import { useState } from 'react';
import './login.css';
import imagemLogin from '../../assets/images/login/imagemLogin.png';
import logo from '../../assets/icons/logo.png';
import logoGoogle from '../../assets/icons/logoGoogle.png';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/auth/authContext.jsx';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../context/auth/firebase.js';

const Login = () => {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const processarSessaoAposLogin = async (token, email, nome, foto = null) => {
    localStorage.setItem('@Sopro:token', token);
    localStorage.setItem('@Sopro:email', email);
    localStorage.setItem('@Sopro:nome', nome);

    if (login) {
      await login(email, nome, foto);
    }

    const temIntencaoCompra = localStorage.getItem('@Sopro:intencao_compra') === 'true';
    if (temIntencaoCompra) {
      localStorage.removeItem('@Sopro:intencao_compra');
      navigate('/checkout');
    } else {
      navigate('/perfil');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    if (!usuarioInput.trim() || !senha) { setErro('Preencha todos os campos.'); return; }

    setCarregando(true);
    try {
      const response = await fetch('https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: usuarioInput.trim(), senha: senha })
      });

      if (!response.ok) throw new Error('E-mail ou senha incorretos.');
      const dados = await response.json();

      await processarSessaoAposLogin(dados.token, dados.email, dados.email.split('@')[0]);
    } catch (err) {
      setErro(err.message || 'Erro ao realizar login.');
    } finally {
      setCarregando(false);
    }
  };

  /* Login com Google via Firebase Auth (popup) — não depende do backend Java/Azure */
  const handleGoogleLogin = async () => {
    setErro('');
    setCarregando(true);
    try {
      const resultado = await signInWithPopup(auth, googleProvider);
      const usuarioGoogle = resultado.user;
      const tokenFirebase = await usuarioGoogle.getIdToken();

      // O photoURL no nível raiz às vezes vem vazio; o providerData do Google é mais confiável
      const fotoGoogle =
        usuarioGoogle.photoURL ||
        usuarioGoogle.providerData?.find((p) => p.providerId === 'google.com')?.photoURL ||
        null;

      await processarSessaoAposLogin(
        tokenFirebase,
        usuarioGoogle.email,
        usuarioGoogle.displayName || usuarioGoogle.email.split('@')[0],
        fotoGoogle
      );
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        // usuário cancelou; não exibe erro
      } else if (err.code === 'auth/unauthorized-domain') {
        setErro('Este domínio não está autorizado no Firebase. Avise o time técnico.');
      } else {
        setErro('Erro na autenticação com o Google.');
        console.error('Erro no login com Google:', err);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-container">
        <motion.article className="login-form-col" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <header className="login-header">
            <img src={logo} alt="Sopro Logo" className="login-logo" />
            <h1 className="login-title">Seja bem-vindo(a) de volta</h1>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            {erro && <p className="login-erro" role="alert">{erro}</p>}

            <label htmlFor="usuario" className="visually-hidden">E-mail</label>
            <input id="usuario" type="text" className="login-input" placeholder="Insira seu e-mail" value={usuarioInput} onChange={(e) => setUsuarioInput(e.target.value)} autoComplete="username" disabled={carregando} />

            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input id="senha" type="password" className="login-input" placeholder="Insira sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" disabled={carregando} />

            <button type="submit" className="login-btn" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>

            <p className="login-cadastro">
              Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
          </form>

          <p className="login-divider-label">Entrar com outros</p>

          <nav className="login-social" aria-label="Login social">
            <button type="button" className="social-btn social-btn--google" onClick={handleGoogleLogin} disabled={carregando}>
              <img src={logoGoogle} alt="" aria-hidden="true" />
              {carregando ? 'Entrando...' : 'Entrar com Google'}
            </button>
          </nav>
        </motion.article>

        <motion.figure className="login-image-col" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <img src={imagemLogin} alt="Usuária do Sopro" className="login-image" />
        </motion.figure>
      </section>
    </main>
  );
};

export default Login;
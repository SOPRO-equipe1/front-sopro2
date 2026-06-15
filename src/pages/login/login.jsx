import { useState } from 'react';
import './login.css';
import imagemLogin from '../../assets/images/login/imagemLogin.png';
import logo from '../../assets/icons/logo.png';
import logoGoogle from '../../assets/icons/logoGoogle.png';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/auth/authContext.jsx'; 

import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const LoginContent = () => {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const processarSessaoAposLogin = async (token, email, nome) => {
    localStorage.setItem('@Sopro:token', token);
    localStorage.setItem('@Sopro:email', email);
    localStorage.setItem('@Sopro:nome', nome);

    if (login) {
      await login(email, nome);
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


  const dispararLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setCarregando(true);
      try {
        const res = await fetch('https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });

        if (!res.ok) throw new Error('Falha na validação do Google com o Azure.');
        const dados = await res.json();

        await processarSessaoAposLogin(dados.token, dados.email, dados.nome);
      } catch (err) {
        setErro('Erro na autenticação com o Google.');
      } finally {
        setCarregando(false);
      }
    },
    onError: () => setErro('Login com o Google cancelado.')
  });

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
         
            <button type="button" className="social-btn social-btn--google" onClick={() => dispararLoginGoogle()} disabled={carregando}>
              <img src={logoGoogle} alt="" aria-hidden="true" />
              Entrar com Google
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


const Login = () => (
  <GoogleOAuthProvider clientId="668261340880-j3djh4lugbo1kb0hs3if8g9734q1u7kl.apps.googleusercontent.com">
    <LoginContent />
  </GoogleOAuthProvider>
);

export default Login;
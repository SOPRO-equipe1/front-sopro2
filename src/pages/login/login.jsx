import { useState } from 'react';
import './login.css';
import imagemLogin from '../../assets/images/login/imagemLogin.png';
import logo from '../../assets/icons/logo.png';
import logoGoogle from '../../assets/icons/logoGoogle.png';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../context/auth/firebase';
import { motion } from 'framer-motion';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!usuario.trim() || !senha) { 
      setErro('Preencha todos os campos.'); 
      return; 
    }

    setCarregando(true);
    try {
      const response = await fetch('https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: usuario.trim(),
          senha: senha
        })
      });

      if (!response.ok) {
        const dadosErro = await response.json().catch(() => ({}));
        throw new Error(dadosErro.mensagem || 'Credenciais inválidas ou erro no servidor.');
      }

      const dados = await response.json(); 

      localStorage.setItem('@Sopro:token', dados.token);
      localStorage.setItem('@Sopro:email', dados.email);

      // Redireciona para o checkout
      navigate('/checkout');

    } catch (err) {
      setErro(err.message || 'Erro ao realizar login. Verifique seus dados.');
    } finally {
      setCarregando(false);
    }
  };

  const handleGoogle = async () => {
    setErro('');
    setCarregando(true);
    try {
      const resultado = await signInWithPopup(auth, googleProvider);
      const token = await resultado.user.getIdToken();
      localStorage.setItem('@Sopro:token', token);
      localStorage.setItem('@Sopro:email', resultado.user.email);
      
      navigate('/checkout');
    } catch (error) {
      setErro('Falha na autenticação com o Google.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="login-main">
      <section className="login-container">
        <motion.article 
          className="login-form-col"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="login-header">
            <img src={logo} alt="Sopro Logo" className="login-logo-img" />
            <h1 className="login-titulo">Entrar na Sopro</h1>
            <p className="login-subtitulo">Acesse sua conta para continuar</p>
          </header>

          {erro && <p className="login-erro-msg" role="alert">{erro}</p>}

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="usuario" className="visually-hidden">E-mail</label>
            <input
              id="usuario" type="email" className="login-input"
              placeholder="Insira seu e-mail"
              value={usuario} onChange={(e) => setUsuario(e.target.value)}
              autoComplete="email" disabled={carregando}
            />

            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input
              id="senha" type="password" className="login-input"
              placeholder="Insira sua senha"
              value={senha} onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password" disabled={carregando}
            />

            <button type="submit" className="login-btn" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>

            <p className="login-cadastro">
              Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
          </form>

          <p className="login-divider-label">Entrar com outros</p>

          <nav className="login-social" aria-label="Login social">
            <button type="button" className="social-btn social-btn--google" onClick={handleGoogle} disabled={carregando}>
              <img src={logoGoogle} alt="" aria-hidden="true" />
              Entrar com Google
            </button>
          </nav>
        </motion.article>

        <motion.figure
          className="login-image-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={imagemLogin} alt="Painel Sopro" />
        </motion.figure>
      </section>
    </main>
  );
};

export default Login;
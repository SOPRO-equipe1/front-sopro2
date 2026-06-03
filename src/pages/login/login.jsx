import { useState } from 'react';
import './login.css';
import imagemLogin from '../../assets/images/login/imagemLogin.png';
import logo from '../../assets/icons/logo.png';
import logoGoogle from '../../assets/icons/logoGoogle.png';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../context/auth/firebase';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const traduzirErro = (code) => {
    const erros = {
      'auth/user-not-found': 'Usuário não encontrado.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/invalid-email': 'E-mail inválido.',
      'auth/invalid-credential': 'E-mail ou senha incorretos.',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    };
    return erros[code] || 'Ocorreu um erro. Tente novamente.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    if (!usuario.trim() || !senha) { setErro('Preencha todos os campos.'); return; }
    setCarregando(true);
    try {
      await signInWithEmailAndPassword(auth, usuario.trim(), senha);
      navigate('/perfil');
    } catch (err) {
      setErro(traduzirErro(err.code));
    } finally {
      setCarregando(false);
    }
  };

  const handleGoogle = async () => {
    setErro('');
    setCarregando(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/perfil');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setErro(traduzirErro(err.code));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-container">
        <article className="login-form-col">
          <header className="login-header">
            <img src={logo} alt="Sopro Logo" className="login-logo" />
            <h1 className="login-title">Seja bem-vindo(a) de volta</h1>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            {erro && <p className="login-erro" role="alert">{erro}</p>}

            <label htmlFor="usuario" className="visually-hidden">Usuário ou e-mail</label>
            <input
              id="usuario" type="text" className="login-input"
              placeholder="Insira seu usuário ou e-mail"
              value={usuario} onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username" disabled={carregando}
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
        </article>

        <figure className="login-image-col">
          <img src={imagemLogin} alt="Usuária do Sopro" className="login-image" />
        </figure>
      </section>
    </main>
  );
};

export default Login;

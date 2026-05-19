import { useState } from 'react';
import './Login.css';
import imagemLogin from '../../assets/images/login/imagemLogin.png';
import logo from '../../assets/icons/logo.png';
import logoGoogle from '../../assets/icons/logoGoogle.png';
import logoApple from '../../assets/icons/logoApple.png';
import logoFacebook from '../../assets/icons/logoFacebook.png';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { usuario, senha });
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
            <label htmlFor="usuario" className="visually-hidden">Usuário ou e-mail</label>
            <input
              id="usuario"
              type="text"
              className="login-input"
              placeholder="Insira seu usuário ou e-mail"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username"
            />

            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input
              id="senha"
              type="password"
              className="login-input"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />

            <button type="submit" className="login-btn">Entrar</button>

            <p className="login-cadastro">
              Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
            </p>
          </form>

          <hr className="login-divider" aria-label="ou" />
          <p className="login-divider-label">Entrar com outros</p>

          <nav className="login-social" aria-label="Login social">
            <button type="button" className="social-btn social-btn--google">
              <img src={logoGoogle} alt="" aria-hidden="true" />
              Entrar com Google
            </button>
            <button type="button" className="social-btn social-btn--apple">
              <img src={logoApple} alt="" aria-hidden="true" />
              Entrar com Apple
            </button>
            <button type="button" className="social-btn social-btn--facebook">
              <img src={logoFacebook} alt="" aria-hidden="true" />
              Entrar com Facebook
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
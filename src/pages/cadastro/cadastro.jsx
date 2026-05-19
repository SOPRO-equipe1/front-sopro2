import { useState } from 'react';
import './cadastro.css';
import imagemCadastro from '../../assets/images/cadastro/imgCadastre-se.png';
import logo from '../../assets/icons/logo.png';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cadastro:', { nome, email, senha, confirmarSenha });
  };

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">

        <article className="cadastro-form-col">
          <header className="cadastro-header">
            <img src={logo} alt="Sopro Logo" className="cadastro-logo" />
            <h1 className="cadastro-title">Crie sua conta</h1>
          </header>

          <form className="cadastro-form" onSubmit={handleSubmit}>
            <label htmlFor="nome" className="visually-hidden">Nome</label>
            <input
              id="nome"
              type="text"
              className="cadastro-input"
              placeholder="Insira seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
            />

            <label htmlFor="email" className="visually-hidden">E-mail</label>
            <input
              id="email"
              type="email"
              className="cadastro-input"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input
              id="senha"
              type="password"
              className="cadastro-input"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="new-password"
            />

            <label htmlFor="confirmarSenha" className="visually-hidden">Confirmar senha</label>
            <input
              id="confirmarSenha"
              type="password"
              className="cadastro-input"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              autoComplete="new-password"
            />

            <button type="submit" className="cadastro-btn">Cadastrar</button>
          </form>

          <p className="cadastro-login">
            Já possui uma conta? <a href="/login">Faça login</a>
          </p>
        </article>

        <figure className="cadastro-image-col">
          <img src={imagemCadastro} alt="Usuário do Sopro" className="cadastro-image" />
        </figure>

      </section>
    </main>
  );
};

export default Cadastro;
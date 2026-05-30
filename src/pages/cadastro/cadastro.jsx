// src/pages/cadastro/cadastro.jsx

import { useState } from 'react';
import { Router, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../context/auth/firebase';
import './cadastro.css';
import '../../context/auth/auth-extras.css';
import imagemCadastro from '../../assets/images/cadastro/imgCadastre-se.png';
import logo from '../../assets/icons/logo.png';
import {Link} from 'react-router-dom';


const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const traduzirErro = (code) => {
    const erros = {
      'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
      'auth/invalid-email': 'E-mail inválido.',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    };
    return erros[code] || 'Ocorreu um erro. Tente novamente.';
  };

  const validar = () => {
    if (!nome.trim()) return 'Preencha seu nome.';
    if (!email.trim()) return 'Preencha seu e-mail.';
    if (senha.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    if (senha !== confirmarSenha) return 'As senhas não coincidem.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const erroValidacao = validar();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setCarregando(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

      await updateProfile(user, { displayName: nome.trim() });

      navigate('/');
    } catch (err) {
      setErro(traduzirErro(err.code));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">

        <article className="cadastro-form-col">
          <header className="cadastro-header">
            <img src={logo} alt="Sopro Logo" className="cadastro-logo" />
            <h1 className="cadastro-title">Crie sua conta</h1>
          </header>

          <form className="cadastro-form" onSubmit={handleSubmit} noValidate>
            {erro && (
              <p className="cadastro-erro" role="alert">
                {erro}
              </p>
            )}

            <label htmlFor="nome" className="visually-hidden">Nome</label>
            <input
              id="nome"
              type="text"
              className="cadastro-input"
              placeholder="Insira seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              disabled={carregando}
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
              disabled={carregando}
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
              disabled={carregando}
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
              disabled={carregando}
            />
            <Link to="/checkout">
            <button
              type="submit"
              className="cadastro-btn"
              disabled={carregando}
            >
          
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </Link>
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
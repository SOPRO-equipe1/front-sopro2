import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './cadastro.css';
import '../../context/auth/auth-extras.css';
import logo from '../../assets/icons/logo.png';
import logoGoogle from '../../assets/icons/logoGoogle.png';
import imagemCadastro from '../../assets/images/cadastro/imgCadastre-se.png';
import { motion } from 'framer-motion';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const validar = () => {
    if (!nome.trim()) return 'Preencha seu nome.';
    if (!email.trim()) return 'Preencha seu e-mail.';
    if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres para o servidor.';
    if (senha !== confirmarSenha) return 'As senhas não coincidem.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    const erroValidacao = validar();
    if (erroValidacao) { setErro(erroValidacao); return; }
    
    setCarregando(true);
    try {
      const respostaCadastro = await fetch('https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/usuarios/cadastro', {
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
        throw new Error('Falha no cadastro. Verifique os dados ou mude o e-mail.');
      }

      localStorage.setItem('@Sopro:nome', nome.trim());
      
     
      navigate('/login');

    } catch (err) {
      setErro(err.message || 'Erro ao conectar-se com a API do Azure.');
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
            {erro && <p className="cadastro-erro" role="alert">{erro}</p>}

            <label htmlFor="nome" className="visually-hidden">Nome</label>
            <input id="nome" type="text" className="cadastro-input" placeholder="Insira seu nome" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" disabled={carregando} />

            <label htmlFor="email" className="visually-hidden">E-mail</label>
            <input id="email" type="email" className="cadastro-input" placeholder="Insira seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" disabled={carregando} />

            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input id="senha" type="password" className="cadastro-input" placeholder="Insira sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="new-password" disabled={carregando} />

            <label htmlFor="confirmarSenha" className="visually-hidden">Confirmar senha</label>
            <input id="confirmarSenha" type="password" className="cadastro-input" placeholder="Confirme sua senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} autoComplete="new-password" disabled={carregando} />

            <button type="submit" className="cadastro-btn" disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="login-divider-label">Cadastrar com</p>
          <nav className="login-social" aria-label="Cadastro social">
            <button type="button" className="social-btn social-btn--google" onClick={() => setErro('Use o formulário padrão.')} disabled={carregando}>
              <img src={logoGoogle} alt="" aria-hidden="true" /> Continuar com Google
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
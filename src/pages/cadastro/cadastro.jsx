import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../context/auth/firebase';
import './cadastro.css';
import '../../context/auth/auth-extras.css';
import imagemCadastro from '../../assets/images/cadastro/imgCadastre-se.png';
import logo from '../../assets/icons/logo.png';
import logoGoogle from '../../assets/icons/logoGoogle.png';
import { motion } from 'framer-motion';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      // Envia a requisição de cadastro para o backend correto no Azure
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
        const dadosErro = await respostaCadastro.json().catch(() => ({}));
        throw new Error(dadosErro.mensagem || 'Erro ao realizar o cadastro no servidor.');
      }

      //  Realiza o login automático para coletar o Token JWT com a URL CORRIGIDA
      const respostaLogin = await fetch('https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha
        })
      });

      if (respostaLogin.ok) {
        const dadosLogin = await respostaLogin.json();
        localStorage.setItem('@Sopro:token', dadosLogin.token);
        localStorage.setItem('@Sopro:email', dadosLogin.email);
        
        
        navigate('/checkout');
      } else {
        
        navigate('/login');
      }

    } catch (err) {
      setErro(err.message || 'Ocorreu um erro técnico. Tente novamente.');
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
      setErro(traduzirErro(error.code));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="cadastro-main">
      <section className="cadastro-container">
        <motion.article 
          className="cadastro-form-col"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="cadastro-header">
            <img src={logo} alt="Sopro Logo" className="cadastro-logo-img" />
            <h1 className="cadastro-titulo">Crie sua conta</h1>
            <p className="cadastro-subtitulo">Preencha seus dados para começar</p>
          </header>

          {erro && <p className="cadastro-erro-msg" role="alert">{erro}</p>}

          <form onSubmit={handleSubmit} className="cadastro-form">
            <label htmlFor="nome" className="visually-hidden">Nome completo</label>
            <input id="nome" type="text" className="cadastro-input" 
              placeholder="Insira seu nome completo" value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              autoComplete="name" disabled={carregando} />

            <label htmlFor="email" className="visually-hidden">E-mail</label>
            <input id="email" type="email" className="cadastro-input" 
              placeholder="Insira seu e-mail" value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              autoComplete="email" disabled={carregando} />

            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input id="senha" type="password" className="cadastro-input" 
              placeholder="Crie uma senha (mín. 6 caracteres)" value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              autoComplete="new-password" disabled={carregando} />

            <label htmlFor="confirmarSenha" className="visually-hidden">Confirmar senha</label>
            <input id="confirmarSenha" type="password" className="cadastro-input"
              placeholder="Confirme sua senha" value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              autoComplete="new-password" disabled={carregando} />

            <button type="submit" className="cadastro-btn" disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="login-divider-label">Cadastrar com</p>

          <nav className="login-social" aria-label="Cadastro social">
            <button type="button" className="social-btn social-btn--google" onClick={handleGoogle} disabled={carregando}>
              <img src={logoGoogle} alt="" aria-hidden="true" />
              Continuar com Google
            </button>
          </nav>

          <p className="cadastro-login">
            Já possui uma conta? <Link to="/login">Faça login</Link>
          </p>
        </motion.article>

        <motion.figure
          className="cadastro-image-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={imagemCadastro} alt="Usuário interagindo com tecnologia assistiva" />
        </motion.figure>
      </section>
    </main>
  );
};

export default Cadastro;
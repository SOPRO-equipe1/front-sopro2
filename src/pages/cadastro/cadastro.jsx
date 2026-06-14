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

  const validar = () => {
    if (!nome.trim()) return 'Preencha seu nome.';
    if (!email.trim()) return 'Preencha seu e-mail.';
    if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres conforme regras do backend.';
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
      
      const respostaCadastro = await fetch('https://sopro-backend.azurewebsites.net/api/usuarios/cadastro', {
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
        const textoErro = await respostaCadastro.text();
        try {
          const objetoErro = JSON.parse(textoErro);
          throw new Error(objetoErro.mensagem || objetoErro.erro || 'Falha ao registrar usuário.');
        } catch (e) {
          throw new Error(textoErro || 'Este e-mail já está cadastrado no sistema.');
        }
      }

      
      const respostaLogin = await fetch('https://sopro-backend.azurewebsites.net/api/auth/login', {
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

      if (!respostaLogin.ok) {
      
        navigate('/login');
        return;
      }

      const dadosSessao = await respostaLogin.json(); 

     
      localStorage.setItem('@Sopro:token', dadosSessao.token);
      localStorage.setItem('@Sopro:email', dadosSessao.email);

      
      navigate('/checkout');
    } catch (err) {
      console.error("Erro capturado no fluxo de cadastro:", err);
      setErro(err.message || 'Instabilidade detectada na comunicação com o servidor do Azure.');
    } finally {
      setCarregando(false);
    }
  };

  const handleGoogle = async () => {
    setErro('');
    setCarregando(true);
    try {
      const resultado = await signInWithPopup(auth, googleProvider);
      if (resultado.user?.email) {
        localStorage.setItem('@Sopro:email', resultado.user.email);
        navigate('/checkout');
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setErro('Ocorreu um erro na autenticação externa do Google.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">
         <motion.article
          className="cadastro-form-col"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="cadastro-header">
            <img src={logo} alt="Sopro Logo" className="cadastro-logo" />
            <h1 className="cadastro-title">Crie sua conta</h1>
          </header>

          <form className="cadastro-form" onSubmit={handleSubmit} noValidate>
            {erro && <p className="cadastro-erro" role="alert">{erro}</p>}

            <label htmlFor="nome" className="visually-hidden">Nome</label>
            <input id="nome" type="text" className="cadastro-input"
              placeholder="Insira seu nome" value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name" disabled={carregando} />

            <label htmlFor="email" className="visually-hidden">E-mail</label>
            <input id="email" type="email" className="cadastro-input"
              placeholder="Insira seu e-mail" value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" disabled={carregando} />

            <label htmlFor="senha" className="visually-hidden">Senha</label>
            <input id="senha" type="password" className="cadastro-input"
              placeholder="Insira sua senha" value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="new-password" disabled={carregando} />

            <label htmlFor="confirmarSenha" className="visually-hidden">Confirmar senha</label>
            <input id="confirmarSenha" type="password" className="cadastro-input"
              placeholder="Confirme sua senha" value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              autoComplete="new-password" disabled={carregando} />

            <button type="submit" className="cadastro-btn" disabled={carregando}>
              {carregando ? 'Processando ecossistema...' : 'Cadastrar'}
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
          <img src={imagemCadastro} alt="Usuário do Sopro" className="cadastro-image" />
        </motion.figure>
      </section>
    </main>
  );
};

export default Cadastro;
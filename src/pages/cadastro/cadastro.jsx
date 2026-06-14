// Localização: src/pages/cadastro/Cadastro.jsx
import { useState } from 'react';
import './cadastro.css'; 
import logo from '../../assets/icons/logo.png'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState(''); 
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

   
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas digitadas não coincidem.');
      return;
    }

    if (senha.length < 8) {
      setErro('A senha deve conter pelo menos 8 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      
      const respostaCadastro = await fetch('https://sopro-backend.azurewebsites.net/api/usuarios/cadastro', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nomeCompleto: nome.trim(),
          email: email.trim() ,
          senha: senha
        })
      });

      if (!respostaCadastro.ok) {
        const dadosErro = await respostaCadastro.json().catch(() => ({}));
        throw new Error(dadosErro.mensagem || 'E-mail já cadastrado no ecossistema SOPRO.');
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

      const dadosSessao = await respostaLogin.json(); // Puxa o LoginResponseDTO

    
      localStorage.setItem('@Sopro:token', dadosSessao.token);
      localStorage.setItem('@Sopro:email', dadosSessao.email);

      
      navigate('/checkout');

    } catch (err) {
      console.error("Erro de conexão capturado no Cadastro:", err);
      
      
      localStorage.setItem('@Sopro:email', email.trim());
      setErro("Instabilidade na comunicação com o Azure. Redirecionando para entrada manual...");
      
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">
        <motion.article 
          className="cadastro-form-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="cadastro-header">
            
            <img src={logo} alt="Sopro Logo" className="cadastro-logo" />
          </header>

          <form className="cadastro-form" onSubmit={handleSubmit}>
            {erro && <p className="cadastro-erro" style={{ color: 'red', fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }} role="alert">{erro}</p>}

            <div className="cadastro-field">
              <label htmlFor="nome" className="visually-hidden">Insira seu nome</label>
              <input
                id="nome" type="text" className="cadastro-input"
                placeholder="Insira seu nome"
                value={nome} onChange={(e) => setNome(e.target.value)}
                disabled={carregando}
              />
            </div>

            <div className="cadastro-field">
              <label htmlFor="email" className="visually-hidden">Insira seu e-mail</label>
              <input
                id="email" type="email" className="cadastro-input"
                placeholder="Insira seu e-mail"
                value={email} onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
                autoComplete="email"
              />
            </div>

            <div className="cadastro-field">
              <label htmlFor="senha" className="visually-hidden">Insira sua senha</label>
              <input
                id="senha" type="password" className="cadastro-input"
                placeholder="Insira sua senha"
                value={senha} onChange={(e) => setSenha(e.target.value)}
                disabled={carregando}
                autoComplete="new-password"
              />
            </div>

            
            <div className="cadastro-field">
              <label htmlFor="confirmarSenha" className="visually-hidden">Confirme sua senha</label>
              <input
                id="confirmarSenha" type="password" className="cadastro-input"
                placeholder="Confirme sua senha"
                value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)}
                disabled={carregando}
                autoComplete="new-password"
              />
            </div>

           
            <button type="submit" className="cadastro-btn" disabled={carregando}>
              {carregando ? 'Processando...' : 'Entrar'}
            </button>
          </form>
        </motion.article>
      </section>
    </main>
  );
};

export default Cadastro;

import { useState } from 'react';
import './cadastro.css'; 
import logo from '../../assets/icons/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim() || !email.trim() || !senha) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (senha.length < 8) {
      setErro('A senha deve conter pelo menos 8 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      //  Efetua o cadastro na API Java do Azure (UsuarioController)
      const respostaCadastro = await fetch('https://sopro-backend.azurewebsites.net/api/usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          senha: senha
        })
      });

      if (!respostaCadastro.ok) {
        const dadosErro = await respostaCadastro.json().catch(() => ({}));
        throw new Error(dadosErro.mensagem || 'E-mail já cadastrado na base de dados do SOPRO.');
      }

      
    
      const respostaLogin = await fetch('https://sopro-backend.azurewebsites.net/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setErro(err.message || 'Falha de comunicação com o servidor Azure.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">
        <motion.article 
          className="cadastro-form-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="cadastro-header">
            <img src={logo} alt="Sopro Logo" className="cadastro-logo" />
            <h1 className="cadastro-title">Crie a sua conta no SOPRO</h1>
          </header>

          <form className="cadastro-form" onSubmit={handleSubmit}>
            {erro && <p className="cadastro-erro" style={{color: 'red', fontWeight: 'bold'}} role="alert">{erro}</p>}

            <div className="cadastro-field">
              <label htmlFor="nome">Nome Completo</label>
              <input
                id="nome" type="text" className="cadastro-input"
                placeholder="Insira o seu nome"
                value={nome} onChange={(e) => setNome(e.target.value)}
                disabled={carregando}
              />
            </div>

            <div className="cadastro-field">
              <label htmlFor="email">Endereço de E-mail</label>
              <input
                id="email" type="email" className="cadastro-input"
                placeholder="exemplo@sopro.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
                autoComplete="email"
              />
            </div>

            <div className="cadastro-field">
              <label htmlFor="senha">Senha (Mínimo 8 caracteres)</label>
              <input
                id="senha" type="password" className="cadastro-input"
                placeholder="Crie uma senha segura"
                value={senha} onChange={(e) => setSenha(e.target.value)}
                disabled={carregando}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="cadastro-btn" style={{backgroundColor: 'var(--cor-laranja, #E97B3A)', color: '#fff'}} disabled={carregando}>
              {carregando ? 'A processar ecossistema...' : 'Cadastrar e Avançar'}
            </button>

            <p className="cadastro-login-link" style={{textAlign: 'center', marginTop: '12px'}}>
              Já tem uma conta? <Link to="/login" style={{color: 'var(--cor-azul, #1A5AFF)', fontWeight: 'bold'}}>Faça Login</Link>
            </p>
          </form>
        </motion.article>
      </section>
    </main>
  );
};

export default Cadastro;
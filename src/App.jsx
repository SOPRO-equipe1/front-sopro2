import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home.jsx';
import Suporte from './pages/Suporte/Suporte';
import LoginPage from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import Checkout from './pages/checkout/Checkout.jsx';
import Planos from './pages/planos/planos.jsx';
import Produto from './pages/Produto/produto.jsx';
import Perfil from './pages/perfil/perfil.jsx';
import Dicionario from './pages/Dicionario/dicionario';
// Verifique se está com as maiúsculas exatas das pastas e do arquivo:
import Soprinho2 from './components/layout/Chatbot/Soprinho2';

// Contexto e Toolbar de Acessibilidade
import { AccessibilityProvider } from './context/AccessibilityContext';
import AccessibilityToolbar from './components/AccessibilityToolbar/AccessibilityToolbar';

// IMPORTAR O SOPRINHO (Verifique se o caminho está certo conforme sua pasta)
import Soprinho from './components/layout/Chatbot/Soprinho';

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="app-container">
          <Header />
          
          <main style={{ minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/suporte" element={<Suporte />} />
              <Route path='/produto' element={<Produto />} />
              <Route path='/planos' element={<Planos />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/perfil' element={<Perfil/>} />
              <Route path="/dicionario" element={<Dicionario />} />
            </Routes>
          </main>

          {/* ESTAS LINHAS FAZEM OS BOTÕES APARECEREM NA TELA */}
          <AccessibilityToolbar /> 
          <Soprinho /> 
          
          <Footer />
        </div>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
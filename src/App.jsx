import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/header/header.jsx';
import Footer from './components/layout/footer/footer.jsx';
import Home from './pages/home/home.jsx';
import SobreNos from './pages/sobrenos/sobre-nos.jsx';
import Compra from './pages/compra/compra.jsx';
import PedidoConfirmado from './pages/pedidoconfirmado/pedido_confirmado.jsx';
import Suporte from './pages/suporte/suporte.jsx';
import LoginPage from './pages/login/login.jsx';
import Cadastro from './pages/cadastro/cadastro.jsx';
import Checkout from './pages/checkout/checkout.jsx';
import Planos from './pages/planos/planos.jsx';
import Produto from './pages/produto/produto.jsx';
import Perfil from './pages/perfil/perfil.jsx';
import Dicionario from './pages/dicionario/dicionario.jsx';
// Verifique se está com as maiúsculas exatas das pastas e do arquivo:
import Soprinho2 from './components/layout/chatbot/soprinho2.jsx';

// Contexto e Toolbar de Acessibilidade
import { AccessibilityProvider } from './context/AccessibilityContext.jsx';
import AccessibilityToolbar from './components/AccessibilityToolbar/AccessibilityToolbar.jsx';

// IMPORTAR O SOPRINHO (Verifique se o caminho está certo conforme sua pasta)
import Soprinho from './components/layout/chatbot/soprinho.jsx';

// QUANDO UM BOTÃO É CLICADO LEVA DIRETAMENTE PARA O TOPO DA PÁGINA 
import { useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';

import { AuthProvider } from './context/auth/authContext.jsx';

function App() {
  return (
    
    <AuthProvider>
    <AccessibilityProvider>
      <Router>
      <ScrollToTop />
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
              <Route path="/sobrenos" element={<SobreNos />} />
              <Route path="/compra" element={<Compra />} />
              <Route path="/pedidoconfirmado" element={<PedidoConfirmado />} />
            </Routes>
          </main>

          {/* ESTAS LINHAS FAZEM OS BOTÕES APARECEREM NA TELA */}
          <AccessibilityToolbar /> 
          <Soprinho /> 
          
          <Footer />
        </div>
      </Router>
    </AccessibilityProvider>
    </AuthProvider>
  );
}

export default App;
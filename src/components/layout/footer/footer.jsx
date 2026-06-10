import './footer.css';
import soproLogo from "../../../assets/icons/logobranc.png";
import linkedin from '../../../assets/icons/imgSimboloLi.png';
import instagramIcon from '../../../assets/icons/instagramFooter.png';
import youtubeIcon from '../../../assets/icons/youtubeFooter.png';
import githubIcon from '../../../assets/icons/githubFooter.png';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-wrapper">
        <div className="footer-columns">
          <div className="footer-col">
            <img className="logo-sopro" src={soproLogo} alt="SOPRO Logo" />
            <p className="footer-desc">
              Redefinindo comunicação através de <br />
              tecnologia assistiva de próxima geração.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navegação</h4>
            <ul className="footer-list">
              <li><a href="/">Início</a></li>
              <li><a href="/sobrenos">Sobre Nós</a></li>
              <li><a href="/produto">Produto</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Área do Usuário</h4>
            <ul className="footer-list">
              <li><a href="/planos">Planos</a></li>
              <li><a href="/suporte">Suporte</a></li>
              <li><a href="/perfil">Conta</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Conecte-se</h4>
            <div className="footer-social-icons">
              <a href="https://www.instagram.com/sopro.voz/" className="social-icon-box"> <img src={instagramIcon} alt="Instagram" /></a>
              <a href="https://www.youtube.com/@Sopro-voz" className="social-icon-box"><img src={youtubeIcon} alt="YoutubeFooter" /></a>
              <a href="https://github.com/SOPRO-equipe1" className="social-icon-box"><img src={githubIcon} alt="GitHubFooter" /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Sopro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
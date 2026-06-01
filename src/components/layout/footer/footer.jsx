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
            <div className="footer-logo-brand">
              <img src={soproLogo} alt="SOPRO Logo" />

              <span>SOPRO</span>
            </div>
            <p className="footer-desc">
              Redefinindo comunicação através de <br />
              tecnologia assistiva de próxima <br />
              geração.
            </p>
          </div>

          <div className="footer-col">
            <h4>Produto</h4>
            <ul className="footer-list">
              <li><a href="/produto">Recursos</a></li>
              <li><a href="/home">Especificações</a></li>
              <li><a href="/planos">Preços</a></li>
              <li><a href="/suporte">Suporte</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <ul className="footer-list">
              <li><a href="/sobre">Sobre Nós</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="/suporte">Contato</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Conecte-se</h4>
            <div className="footer-social-icons">
              <a href="#" className="social-icon-box"><img src={linkedin} alt="Linkedin" /></a>
              <a href="https://www.instagram.com/sopro.voz/" className="social-icon-box"> <img src={instagramIcon} alt="Instagram" /></a>
              <a href="#" className="social-icon-box"><img src={youtubeIcon} alt="YoutubeFooter" /></a>
              <a href="https://github.com/SOPRO-equipe1" className="social-icon-box"><img src={githubIcon} alt="GitHubFooter" /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Sopro AI. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <a href="#">Privacidade</a>
            <a href="#">Termos</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
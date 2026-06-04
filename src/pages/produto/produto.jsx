import './produto.css'; // 1. Conecta o CSS
import fotoHero from '../../assets/images/produto/fotoHero.png';
import estrelasLaranjas from '../../assets/icons/estrelasLaranjas.svg';
import section2Produto1 from '../../assets/images/produto/section2Produto1.png';
import section2Produto2 from '../../assets/images/produto/section2Produto2.png';
import section2Produto3 from '../../assets/images/produto/section2Produto3.png';
import section2Produto4 from '../../assets/images/produto/section2Produto4.png';
import arAzul from '../../assets/icons/arAzul.svg';
import bateriaVerde from '../../assets/icons/bateriaVerde.svg';
import escudoRoxo from '../../assets/icons/escudoRoxo.svg';
import porquinhoLaranja from '../../assets/icons/porquinhoLaranja.svg';
import verificadoAzul from '../../assets/icons/verificadoAzul.svg';
import fotoCompra from '../../assets/images/produto/fotoCompra.png';
import linhaAzul from '../../assets/icons/linhaAzul.svg';
import fotoTecnica from '../../assets/images/produto/fotoTecnica.png';
import chipRoxo from '../../assets/icons/chipRoxo.svg';
import sensorVerde from '../../assets/icons/sensorVerde.svg';
import escudoSauderoxo from '../../assets/icons/escudoSaudeRoxo.svg';
import wifiLaranja from '../../assets/icons/wifiLaranja.svg';
import bateriaAzul from '../../assets/icons/bateriaAzul.svg';

import { Link } from 'react-router-dom';

function Produto() { // 2. Cria a função (Componente)
  return (
    <div className="container-produto"> 
      <main className="produto-content">
        <h1 className="titulo1">SOPRO</h1>
        <p className="texto1">Transformando seu fôlego em voz</p>
        <img className="fotoHero"src ={fotoHero} alt=""/>
      </main>

      <section className="conheca-produto">
          <img className="estrelas" src={estrelasLaranjas} alt="Estrelas" />
          <h1 className="titulo2">Conheça o nosso produto</h1>
          <p className="texto2">
            Nossa tecnologia assistiva inteligente converte padrões de sopro em comunicação fluida
          </p>

          {/* Novo container para o mosaico de fotos */}
          <div className="galeria-fotos">
            <img src={section2Produto1} alt="Sopro lateral" className="foto-item foto-grande" />
            <img src={section2Produto2} alt="Sopro vertical" className="foto-item" />
            <img src={section2Produto3} alt="Sopro frontal" className="foto-item" />
            <img src={section2Produto4} alt="Sopro detalhe logo" className="foto-item foto-longa" />
          </div>
      </section>


       <section className="beneficios-container">
            <img src={arAzul} alt="icone de sopro" className="ar-azul"></img>
            <h2 className="titulo-beneficios">Sua voz de volta em cada respiração</h2>
            <p className="subtitulo-beneficios">Criamos uma tecnologia que transforma o seu fôlego em palavras, devolvendo a autonomia para você se comunicar com o mundo de forma simples e humana.</p>
            <div className="card verde">
              <span className="icon"><img src={bateriaVerde} alt="" /></span> {/* Você pode trocar por SVGs depois */}
              <h3>Autonomia</h3>
              <p>Bateria otimizada para acompanhar o seu ritmo o dia todo, sem interrupções.</p>
            </div>

            <div className="card laranja">
              <span className="icon"><img src={porquinhoLaranja} alt="" /></span>
              <h3>Custo benefício</h3>
              <p>Engenharia inteligente que entrega tecnologia assistiva de alta fidelidade por um valor justo e acessível</p>
            </div>

            <div className="card azul">
              <span className="icon"><img src={verificadoAzul} alt="" /></span>
              <h3>Durabilidade</h3>
              <p>Construído com materiais robustos e de qualidade para resistir com excelência ao uso contínuo.</p>
            </div>

            <div className="card roxo">
              <span className="icon"><img src={escudoRoxo} alt="" /></span>
              <h3>Segurança</h3>
              <p>Feito com materiais confortáveis e que não causam alergias, protegendo sua saúde durante o uso.</p>
            </div>
       </section>


       <section className="compra-container">
              <div className="compra-card">
                  <img src={fotoCompra} alt="Sopro na mão" className="foto-compra" />
                  <h2 className="preco">R$ 200,97 </h2>
                  <Link to="/compra">
                      <button className="botao-comprar">COMPRAR</button>
                  </Link>
              </div>
          </section>


       <section className="especificacoes-container">
          <img src={linhaAzul} alt="" className="divisor-azul" />
          
          <div className="especificacoes-content">
            <div className="specs-texto">
              <h2 className="titulo-specs">Especificações técnicas</h2>
              
              <ul className="lista-specs">
                <li>
                  <span className="icon-spec"><img src={chipRoxo} alt="" /></span> 
                  <p>Chip ESP32 de alta velocidade e baixo consumo.</p>
                </li>
                <li>
                  <span className="icon-spec"><img src={sensorVerde} alt="" /></span>
                  <p>BMP280 de precisão para leitura do sopro.</p>
                </li>
                <li>
                  <span className="icon-spec"><img src={wifiLaranja} alt="" /></span>
                  <p>Wi-Fi integrado para atualizações e telemetria.</p>
                </li>
                <li>
                  <span className="icon-spec"><img src={bateriaAzul} alt="" /></span>
                  <p>Otimizada para uso contínuo ao longo do dia.</p>
                </li>
                <li>
                  <span className="icon-spec"><img src={escudoSauderoxo} alt="" /></span>
                  <p>Material de grau médico, leve e ergonômico.</p>
                </li>
              </ul>
              <Link to="/compra">
                    <button className="botao-comprar-specs">COMPRAR</button>
              </Link>
            </div>

            <div className="specs-imagem">
              <img src={fotoTecnica} alt="Detalhes técnicos do Sopro" />
            </div>
          </div>
      </section>
    </div>
  );
}

export default Produto; // 3. Exporta para o resto do app
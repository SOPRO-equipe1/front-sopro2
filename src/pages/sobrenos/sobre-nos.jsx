/*Parte de cima: fotos produtos*/
import imgSection1SobreNos from "../../assets/images/sobre-nos/imgSection1SobreNos.png";
import imgSection2SobreNos from "../../assets/images/sobre-nos/imgSection2SobreNos2.svg";
/*Imagem do grupo*/
import imgSection3SobreNos from "../../assets/images/sobre-nos/imgSection3SobreNos.png";
/*Icon section1*/
import olhoAzul from "../../assets/icons/olhoAzul.svg";
/*icons section2*/
import estrelasLaranjas from "../../assets/icons/estrelasLaranjas.svg"; 
import coracaoRoxo from "../../assets/icons/coracaoRoxo.svg";
import escudoVerde from "../../assets/icons/escudoVerde.svg";
/*Icons Cards*/
import redessociais from "../../assets/images/sobre-nos/redessociais.png";
import github from "../../assets/icons/icon_github.svg";
import linkedin from "../../assets/icons/icon_linkedin.svg";
/*Verde e Azul Parte da equipe*/
import conhecaequipe from "../../assets/images/sobre-nos/conhecanossaesquipe1.svg"
/*Integrantes coluna 1*/
import Jaiane from "../../assets/imagesReadme/Jaiane.png"
import Iasmin from "../../assets/imagesReadme/Iasmin.png"
import Joao from "../../assets/imagesReadme/Joao.png"
import Raquel from "../../assets/imagesReadme/Raquel.png"
/*Integrantes coluna 2*/
import Gabriel from "../../assets/imagesReadme/Gabriel.png"
import Filipe from "../../assets/imagesReadme/Filipe.png"
import Bruno from "../../assets/imagesReadme/Bruno.png"
import Rubens from "../../assets/imagesReadme/Rubens.png"
import { motion } from 'framer-motion';

import './sobre-nos.css';
import React from 'react'; 

function SobreNos () {
return (

<main className="mainSobreNos">
<motion.section 
        className="Seção1"
        style={{ 
          backgroundImage: `url(${imgSection1SobreNos})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'   
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >

<div className="QuadradoVerde1">
<h1 className="hV1">Sobre Nós</h1>
<hr/>
<p className="pV1">Como desenvolvedores e alunos do Instituto PROA, acreditamos que a tecnologia deve ser inclusiva. Atuamos para transformar o sopro, um ato simples, em uma poderosa ferramenta de expressão e autonomia, garantindo que a inovação alcance a todos.</p>
</div>
</motion.section>

<motion.section 
        className="Seção2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >

<div className="Texto2">
    <img className="IconAzul" src={olhoAzul} alt="Icone de um olho azul"/>
<h2>Nossa Visão</h2>
<p>Nossa visão é ser a ponte tecnológica que rompe barreiras e minimiza o isolamento social. Queremos garantir que cada indivíduo, independente de suas limitações físicas, encontre no Sopro o caminho para a plena conexão com o mundo e com as pessoas ao seu redor.</p>
</div>

<img className="Img2" src={imgSection2SobreNos} alt="Imagem da Seção 2" />

</motion.section>

<section>
  <div className="RetanguloAzul">
 
    <motion.h3
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Nossos Valores
    </motion.h3>

    
    <div className="cards">

      {/* Card 1: Inovação */}
      <motion.div 
        className="CardsMVV"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <img src={estrelasLaranjas} alt="Imagem de estrelas Laranjas" />
        <h4>Inovação</h4>
        <p>Engenharia aplicada para transformar o sopro em autonomia.</p>
      </motion.div>

      {/* Card 2: Empatia */}
      <motion.div 
        className="CardsMVV"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <img src={coracaoRoxo} alt="Imagem de coração Roxo" />
        <h4>Empatia</h4>
        <p>Escuta ativa e respeito à individualidade de cada usuário.</p>
      </motion.div>

      {/* Card 3: Integridade */}
      <motion.div 
        className="CardsMVV"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <img src={escudoVerde} alt="Imagem de escudo Verde" />
        <h4>Integridade</h4>
        <p>Ética, transparência e segurança em todas as nossas ações.</p>
      </motion.div>

    </div> 
  </div>
</section>

        <section className="ParteEquipe">
          <div className="FotoEquipe">
          <img src={conhecaequipe} alt="Foto da equipe SOPRO" />
          </div>
        </section>

      <motion.section 
        style={{ overflow: 'hidden' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="secaocards">
          <div className="containercards">
            
            {/* Card 1: Jaiane */}
            <div className="card-laranja">
              <div className="fotoperfil"><img src={Jaiane} alt="Jaiane Soares" /></div>
              <div className="conteudoperfil">
                <h3>Jaiane Soares</h3>
                <p>Product Owner, Desenvolvedora Full Stack & IA</p>
                <div className="conteiner-icone">
                  <a href="https://github.com/jaiane-soares" target="_blank" rel="noopener noreferrer" className="btn-suave-global"><img src={github} alt="icone do github" /></a>
                  <a href="https://www.linkedin.com/in/jaiane-d-5897802b5/" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={linkedin} alt="icone do linkedin" /></a>
                </div>
              </div>
            </div>

            {/* Card 2: Gabriel */}
            <div className="card-azul">
              <div className="fotoperfil"><img src={Gabriel} alt="Gabriel Conceição" /></div>
              <div className="conteudoperfil">
                <h3>Gabriel Conceição</h3>
                <p>Scrum Master & Desenvolvedor Back End</p>
                <div className="conteiner-icone">
                  <a href="https://github.com/Gabriel-Silva-Tech" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={github} alt="icone do github" /></a> 
                  <a href="https://www.linkedin.com/in/gabriel-concei%C3%A7%C3%A3o-ds/" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={linkedin} alt="icone do linkedlin" /></a>
                </div>
              </div>
            </div>

            {/* Card 3: Iasmin */}
            <div className="card-roxo">
              <div className="fotoperfil"><img src={Iasmin} alt="Iasmin Lopes" /></div>
              <div className="conteudoperfil">
                <h3>Iasmin Lopes</h3>
                <p>Gestão financeira, Desenvolvedora Front End & Hardware</p>
                <div className="conteiner-icone">
                  <a href="https://github.com/IasminMoreira" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={github} alt="icone do github" /></a>
                  <a href="https://www.linkedin.com/in/iasmin-lopes-moreira/" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={linkedin} alt="icone do linkedlin" /></a>
                </div>
              </div>
            </div>

            {/* Card 4: Filipe */}
            <div className="card-verde">
              <div className="fotoperfil"><img src={Filipe} alt="Filipe Apolinário" /></div>
              <div className="conteudoperfil">
                <h3>Filipe Apolinário</h3>
                <p>Marketing, Desenvolvedor Back End & IA</p>
                <div className="conteiner-icone">
                  <a href="https://github.com/FilipeAp" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={github} alt="icone do github" /></a> 
                  <a href="https://www.linkedin.com/in/o-filipe-apolinario/" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={linkedin} alt="icone do linkedlin" /></a>
                </div>
              </div>
            </div>

            {/* Card 5: João Victor */}
            <div className="card-azul">
              <div className="fotoperfil"><img src={Joao} alt="João Victor Brito" /></div>
              <div className="conteudoperfil">
                <h3>João Victor</h3>
                <p>Desenvolvedor Front End & Marketing</p>
                <div className="conteiner-icone">
                  <a href="https://github.com/araujobrito" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={github} alt="icone do github" /></a> 
                  <a href="https://www.linkedin.com/in/araujobrito/" target="_blank" rel="noopener noreferrer" className="btn-suave-global"><img src={linkedin} alt="icone do linkedlin" /></a>
                </div>
              </div>
            </div>

            {/* Card 6: Bruno */}
            <div className="card-laranja">
              <div className="fotoperfil"><img src={Bruno} alt="Bruno Souza" /></div>
              <div className="conteudoperfil">
                <h3>Bruno Souza</h3>
                <p>Hardware & Desenvolvedor Front End</p>
                <div className="conteiner-icone">
                  <a href="https://github.com/brunoasouza15004-hash" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={github} alt="icone do github" /></a> 
                  <a href="https://www.linkedin.com/in/bruno-asouza/" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={linkedin} alt="icone do linkedlin" /></a>
                </div>
              </div>
            </div>

            {/* Card 7: Raquel */}
            <div className="card-verde">
              <div className="fotoperfil"><img src={Raquel} alt="Raquel Alves" /></div>
              <div className="conteudoperfil">
                <h3>Raquel Alves</h3>
                <p>Marketing, Designer & Desenvolvedora Front End</p>
                <div className="conteiner-icone">
                  <a href="https://github.com/raquelalve" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={github} alt="icone do github" /></a> 
                  <a href="https://www.linkedin.com/in/raquel-alves-044743385/" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={linkedin} alt="icone do linkedlin" /></a>
                </div>
              </div>
            </div>

            {/* Card 8: Rubens */}
            <div className="card-roxo">
              <div className="fotoperfil"><img src={Rubens} alt="Rubens Silva" /></div>
              <div className="conteudoperfil">
                <h3>Rubens Silva</h3>
                <p>Designer UI/UX & Desenvolvedor Front End</p>
                <div className="conteiner-icone">
                  <a href="https://github.com/rubsfrs" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={github} alt="icone do github" /></a> 
                  <a href="https://www.linkedin.com/in/rubens-frsilva/" target="_blank" rel="noreferrer" className="btn-suave-global"><img src={linkedin} alt="icone do linkedlin" /></a>
                </div>
              </div>
            </div>

          </div> 
        </div> 
      </motion.section>

</main>

)

}

export default SobreNos 

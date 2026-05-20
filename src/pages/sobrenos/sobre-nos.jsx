/*Parte de cima: fotos produtos*/
import imgSection1SobreNos from "../../assets/images/sobre-nos/imgSection1SobreNos.png";
import imgSection2SobreNos from "../../assets/images/sobre-nos/imgSection2SobreNos.png";
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
/*Verde e Azul Parte da equipe*/
import conhecaequipe from "../../assets/images/sobre-nos/conhecaequipe.png"
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


import './sobrenos.css';
import React from 'react'; 

function SobreNos () {
return (

<main>

<section className="Seção1">
<img className="Img1"src={imgSection1SobreNos} alt="Imagem da Seção 1" />

<div className="QuadradoVerde1">
<h1 className="hV1">Sobre Nós</h1>
<hr/>
<p className="pV1">Como desenvolvedores e alunos do Instituto PROA, acreditamos que a tecnologia deve ser inclusiva. Atuamos para transformar o sopro, um ato simples, em uma poderosa ferramenta de expressão e autonomia, garantindo que a inovação alcance a todos.</p>
</div>
</section>

<section className="Seção2">
<img className="Img2" src={imgSection2SobreNos} alt="Imagem da Seção 2" />

<div className="Texto2">
    <img className="IconAzul" src={olhoAzul} alt="Icone de um olho azul"/>
<h2>Nossa Visão</h2>
<p>Nossa visão é ser a ponte tecnológica que rompe barreiras e minimiza o isolamento social. Queremos garantir que cada indivíduo, independente de suas limitações físicas, encontre no Sopro o caminho para a plena conexão com o mundo e com as pessoas ao seu redor.</p>
</div>
</section>


 
<section>
  <div className="RetanguloAzul">
    <h3>Nossos Valores</h3>

    <div className="cards">
      <div className="CardsMVV">
        <img src={estrelasLaranjas} alt="Imagem de estrelas Laranjas" />
        <h4>Inovação</h4>
        <p>Engenharia aplicada para transformar o sopro em autonomia.</p>
      </div>

      <div className="CardsMVV">
        <img src={coracaoRoxo} alt="Imagem de coração Roxo" />
        <h4>Empatia</h4>
        <p>Escuta ativa e respeito à individualidade de cada usuário.</p>
      </div>

      <div className="CardsMVV">
        <img src={escudoVerde} alt="Imagem de escudo Verde" />
        <h4>Integridade</h4>
        <p>Ética, transparência e segurança em todas as nossas ações.</p>
      </div>

    </div> 
  </div>
</section>

<div className="ParteEquipe">
  <h4>Conheça Nossa Equipe</h4>

  <div className="FotoEquipe">
    <img src={conheçaequipe} alt="Foto da equipe com fundo decorativo" />
  </div>
</div>



<div className="secaocards">
  <div className="containercards">
    
    <div className="card-laranja">
      <div className="fotoperfil">
        <img src={Jaiane} alt="Jaiane Soares" />
      </div>

      <div className="conteudoperfil">
        <h3>Jaiane Soares</h3>
        <p>Product Owner, Desenvolvedora Full Stack & IA</p>

        <div className="card-redes-perfil">
          
        </div>
      </div>
    </div>


    <div className="card-azul">
      <div className="fotoperfil">
        <img src={Gabriel} alt="Gabriel Conceição" />
      </div>

      <div className="conteudoperfil">
        <h3>Gabriel Conceição</h3>
        <p>Scrum Master & Desenvolvedor Back End</p>

        <div className="card-redes-perfil">
          
        </div>
      </div>
    </div>


    <div className="card-roxo">
      <div className="fotoperfil">
        <img src={Iasmin} alt="Iasmin Lopes" />
      </div>

      <div className="conteudoperfil">
        <h3>Iasmin Lopes</h3>
        <p>Gestão financeira, Desenvolvedora Front End & Hardware</p>

        <div className="card-redes-perfil">
          
        </div>
      </div>
    </div>

   
    <div className="card-verde">
      <div className="fotoperfil">
        <img src={Filipe} alt="Filipe Apolinário" />
      </div>

      <div className="conteudoperfil">
        <h3>Filipe Apolinário</h3>
        <p>Marketing, Desenvolvedor Back End & IA</p>

        <div className="card-redes-perfil">
          
        </div>
      </div>
    </div>

<div className="card-azul">
      <div className="fotoperfil">
        <img src={João} alt="João Victor Brito" />
      </div>

      <div className="conteudoperfil">
        <h3>João Victor Brito</h3>
        <p>Desenvolvedor Front End</p>

        <div className="card-redes-perfil">
          
       </div>
      </div>
    </div>

<div className="card-laranja">
      <div className="fotoperfil">
        <img src={Bruno} alt="Bruno Souza" />
      </div>

      <div className="conteudoperfil">
        <h3>Bruno Souza</h3>
        <p>Hardware & Desenvolvedor Front End</p>

        <div className="card-redes-perfil">
          
        </div>
      </div>
    </div>

    <div className="card-verde">
      <div className="fotoperfil">
        <img src={Raquel} alt="Raquel Alves" />
      </div>

      <div className="conteudoperfil">
        <h3>Raquel Alves</h3>
        <p>Marketing, Designer & Desenvolvedora Front End  </p>

        <div className="card-redes-perfil">
          
        </div>
      </div>
    </div>


    <div className="card-roxo">
      <div className="fotoperfil">
        <img src={Rubens} alt="Rubens Silva" />
      </div>

      <div className="conteudoperfil">
        <h3>Rubens Silva</h3>
        <p>Designer UI/UX & Desenvolvedor Front End</p>

        <div className="card-redes-perfil">
          
        </div>
      </div>
    </div>



  </div>
</div>

</main>

)

}

export default SobreNos 
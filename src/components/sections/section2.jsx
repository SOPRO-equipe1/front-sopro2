import './Section2.css'
import lampadaAzul from '../../assets/icons/lampadaAzul.svg'
import img1 from '../../assets/images/home/imgMoçaSection2.png'
import img2 from '../../assets/images/home/imgProcessadorIaSection2.png'
import img3 from '../../assets/images/home/imgProdutoSection2.png'
import linhaRoxa from '../../assets/icons/linhaRoxa.svg'
import linhaVerde from '../../assets/icons/linhaVerde.svg'
import linhaLaranja from '../../assets/icons/linhaLaranja.svg'

const Section2 = () =>{
    return(
        <>
            <section>
                <div className="titulo_section2">
                    <img src={lampadaAzul} className="lampadaAzul"/>
                    <h3>Capacidades</h3>
                    <h2>O que torna a Sopro diferente</h2>
                    <p className="descricao_capacidades">
                        Cada recurso foi desenvolvido com rigor técnico e sensibilidade humana, transformando limitações em possibilidades reais.
                    </p>
                </div>
            </section>

            <section className="section2">
                <div className="controle">
                    <img src={img1} className="imgMulher" />
                    <h3>Controle por sopro</h3>
                    <img src={linhaRoxa} className="linhaRoxa" />
                    <p>
                        Tecnologia que capta as nuances da respiração para comandos instantâneos e fluidos.
                    </p>              
                </div>
                
                <div className="integracao">
                    <img src={img2} className="imgIA" />
                    <h3>Integração com IA</h3>
                    <img src={linhaVerde} className="linhaVerde" />
                    <p>
                        Algoritmos adaptativos que aprendem seu ritmo único, evoluindo a cada interação.
                    </p>              
                </div>

                <div className="design">
                    <img src={img3} className="imgProduto" />
                    <h3>Design assistivo</h3>
                    <img src={linhaLaranja} className="linhaLaranja" />
                    <p>
                        Estética premium e minimalista que prioriza a dignidade, eliminando o estigma médico.
                    </p>              
                </div>

            </section>
        </>
    )
}

export default Section2;
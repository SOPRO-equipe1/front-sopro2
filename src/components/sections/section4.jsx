import './section4.css'
import imgSection4 from '../../assets/images/home/imgSection4.png'
import alvoLaranja from '../../assets/icons/alvoLaranja.svg'
import maoVerde from '../../assets/icons/mãoVerde.svg'
import estrelasRoxas from '../../assets/icons/estrelasRoxas.svg'
import linhaRoxa2 from '../../assets/icons/linhaRoxa2.svg'
import linhaAzul from '../../assets/icons/linhaAzul.svg'

const Section4 = () =>{
    return(
        <>
            <section className="section4">
                <img src={imgSection4} className="imgSection4" />
                    <div className="textos_section4">
                        <div className="autonomia">
                            <div className="autonomiaTitulo">
                                <img src={alvoLaranja} className="alvoLaranja"/>
                                <h3>Autonomia real</h3>
                            </div>
                            <p>Controle total sobre sua experiência digital sem intermediários ou dependências</p>                            
                        </div>
                        
                        <div className="linhaRoxaDIV">
                            <img src={linhaRoxa2} className="linhaRoxa"/>
                        </div>


                        <div className="inclusao">
                            <div className="inclusaoTitulo">
                                <img src={maoVerde} className="maoVerde"/>
                                <h3>Inclusão genuína</h3>
                            </div>
                            <p>Design pensado para todos, unindo tecnologia assistiva e máxima eficiência.</p>
                        </div>

                        <div className="linhaAzulDIV">
                            <img src={linhaAzul} className="linhaAzul"/>
                        </div>


                        <div className="inovacao">
                            <div className="inovacaoTitulo">
                                <img src={estrelasRoxas} className="estrelasRoxas"/>
                                <h3>Inovação humana</h3>
                            </div>
                            <p>Tecnologia que respeita sua dignidade e amplifica suas possibilidades.</p>
                        </div>

                        <button className="saibaMais2">SAIBA MAIS</button>
                    </div>
            </section>
        </>
    )
}

export default Section4
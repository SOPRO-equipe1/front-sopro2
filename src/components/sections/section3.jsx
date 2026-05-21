import './section3.css'
import raioLaranja from '../../assets/icons/raioLaranja.svg'
import arAzul from '../../assets/icons/arAzul.svg'
import reloadVerde from '../../assets/icons/reloadVerde.svg'
import imgSection3 from '../../assets/images/home/imgSection3.png'

const Section3 = () =>{
    return(
        <>
            <section className="section3">
                <div className="textos_section3">
                    <div className="produtoTitulo">
                        <div className="produtoeicone">
                            <img src={raioLaranja} className="raioLaranja" />
                            <h3>Produto</h3>
                        </div>
                        <h2>Sopro transforma seu fôlego em poder</h2>
                    </div>
                    <p>Cada sopro é um comando. Tecnologia no seu ritmo, sem esforço</p>

                    <div className="sensiveleaprende">
                        <div className="sensivel">
                            <img src={arAzul} className="arAzul" />
                            <p>Sensível ao seu ritmo respiratório</p>
                        </div>

                        <div className="aprende">
                            <img src={reloadVerde} className="reloadVerde" />
                            <p>Aprende e se adapta com o tempo</p>
                        </div>    
                    </div>

                    <button className="saibaMaisLaranja">SAIBA MAIS</button>             
                </div>

                <img src={imgSection3} className="imgSection3" />
            </section>
        </>
    )
}

export default Section3
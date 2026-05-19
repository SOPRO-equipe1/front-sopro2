import './section5.css'
import playRoxo from '../../assets/icons/playRoxo.svg'
import imgSection5 from '../../assets/images/home/imgSection5.png'

const Section5 = () =>{
    return(
        <>
            <section className="section5">
                <div className="textosSection5">
                    <img src={playRoxo} className="playRoxo"/>
                    <h2>Pronto pra começar?</h2>
                    <p>Descubra como a Sopro pode transformar sua relação com a tecnologia hoje.</p>
                    <div className="botoes">
                        <button className="contato">CONTATO</button>
                        <button className="produtos">PRODUTOS</button>
                    </div>
                </div>

                <img src={imgSection5} className="imgSection5"/>
            </section>
        </>
    )
}

export default Section5
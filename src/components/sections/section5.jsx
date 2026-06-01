import './section5.css'
import playRoxo from '../../assets/icons/playRoxo.svg'
import imgSection5 from '../../assets/images/home/imgSection5.png'
import { Link } from 'react-router-dom';

const Section5 = () =>{
    return(
        <>
            <section className="section5">
                <div className="textosSection5">
                    <img src={playRoxo} className="playRoxo"/>
                    <h2>Pronto pra começar?</h2>
                    <p>Descubra como a Sopro pode transformar sua relação com a tecnologia hoje.</p>
                    <div className="botoes">
                    <Link to="/suporte" style={{ textDecoration: 'none'}}>
                        <button className="contato">CONTATO</button>
                    </Link>
                    <Link to="/produto">
                        <button className="produtos">PRODUTOS </button>
                    </Link>
                    </div>
                </div>

                <img src={imgSection5} className="imgSection5"/>
            </section>
        </>
    )
}

export default Section5
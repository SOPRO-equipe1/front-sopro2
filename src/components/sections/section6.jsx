import './section6.css'
import sinoVerde from '../../assets/icons/sinoVerde.svg'
import { Link } from 'react-router-dom';

const Section6 = () =>{
    return(
        <>
            <section className="section6">
                <div className="fiquePorDentro">
                    <img src={sinoVerde} className="sinoVerde"/>
                    <h2>Fique por dentro</h2>
                    <p>Sinta o próximo passo da tecnologia assistiva. Inscreva-se para receber novidades e atualizações da Sopro.</p>
                    <div className="inscricao">
                        <input type="email" placeholder="Digite seu e-mail" className="email"/>
                        <button className="inscreverBotao">Inscrever-se</button>
                    </div>                    
                </div>
                <Link to='/produto' style={{ textDecoration: 'none'}}>
                <button className="explorar">EXPLORAR O DISPOSITIVO</button>
                </Link>
            </section>
        </>
    )
}

export default Section6
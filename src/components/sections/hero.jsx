import './hero.css';
import linhaBranca from '../../assets/icons/linhaBranca.svg';
import imgHero from '../../assets/images/home/imgSection1.png';
import { Link } from 'react-router-dom';

const Hero = () =>{
    return(
        <section className="hero">
            <div className="titulo_hero">
                <h1>Sua voz, sem barreiras</h1>
                <img src={linhaBranca}/>
                <p>IA e design para transformar seu sopro em voz</p>
                <Link to="/produto" style={{ textDecoration: 'none'}}>
                    <button className="saibaMaisHero">SAIBA MAIS</button>
                </Link>
            </div>
        </section>
    )
}

export default Hero;
import './section5.css'
import playRoxo from '../../assets/icons/playRoxo.svg'
import imgSection5 from '../../assets/images/home/imgSection5.png'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Section5 = () =>{
    return(
        <>
            <section className="section5">
                 <motion.div
                    className="textosSection5"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img src={playRoxo} className="playRoxo"/>
                    <h2>Pronto pra começar?</h2>
                    <p>Descubra como a Sopro pode transformar sua relação com a tecnologia hoje.</p>
                    <div className="botoes">
                    <Link to="/suporte" style={{ textDecoration: 'none'}}>
                        <button className="contato btn-suave-global">CONTATO</button>
                    </Link>
                    <Link to="/produto">
                        <button className="produtos btn-suave-global">PRODUTOS </button>
                    </Link>
                    </div>
                </motion.div>

                 <motion.img
                    src={imgSection5}
                    className="imgSection5"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                />
            </section>
        </>
    )
}

export default Section5
import './section6.css'
import sinoVerde from '../../assets/icons/sinoVerde.svg'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Section6 = () =>{
    return(
        <>
            <section className="section6">
                <motion.div
                    className="fiquePorDentro"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img src={sinoVerde} className="sinoVerde"/>
                    <h2>Fique por dentro</h2>
                    <p>Sinta o próximo passo da tecnologia assistiva. Inscreva-se para receber novidades e atualizações da Sopro.</p>
                    <div className="inscricao">
                        <input type="email" placeholder="Digite seu e-mail" className="email"/>
                        <button className="inscreverBotao btn-suave-global">Inscrever-se</button>
                    </div>                    
                </motion.div>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                <Link to='/produto' style={{ textDecoration: 'none'}}>
                    <button className="explorar btn-suave-global">EXPLORAR O DISPOSITIVO</button>
                </Link>
                </motion.div>
            </section>
        </>
    )
}

export default Section6
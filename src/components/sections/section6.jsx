import './section6.css'
import { useState } from 'react';
import sinoVerde from '../../assets/icons/sinoVerde.svg'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Section6 = () => {
    const [email, setEmail]       = useState('');
    const [enviado, setEnviado]   = useState(false);
    const [emailSalvo, setEmailSalvo] = useState('');

    const handleInscrever = () => {
        if (!email.trim()) return;
        setEmailSalvo(email);
        setEnviado(true);
        setEmail('');
    };

    return (
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

                    <AnimatePresence mode="wait">
                        {!enviado ? (
                            <motion.div
                                key="form"
                                className="inscricao"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    className="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleInscrever()}
                                />
                                <button
                                    className="inscreverBotao btn-suave-global"
                                    onClick={handleInscrever}
                                >
                                    Inscrever-se
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sucesso"
                                className="inscricao-sucesso"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <span className="sucesso-icone">✅</span>
                                <div>
                                    <p className="sucesso-titulo">E-mail cadastrado com sucesso!</p>
                                    <p className="sucesso-sub">Em breve enviaremos novidades para <strong>{emailSalvo}</strong></p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
    );
};

export default Section6;

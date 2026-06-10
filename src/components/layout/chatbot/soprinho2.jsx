import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import icone2 from '../../../assets/images/chatbot/soprinho2.svg';
import './soprinho2.css';
import enviar from '../../../assets/images/chatbot/icone_enviar.svg';
import ReactMarkdown from 'react-markdown';

function Soprinho2({ perguntaInicial }) {
    const [mensagens, setMensagens] = useState([
        { 
            id: 1, 
            remetente: 'soprinho', 
            texto: 'Oi, eu sou o Soprinho! Estou aqui para te guiar pela plataforma. Como posso te ajudar hoje?' 
        }
    ]);
    
    const [novoInput, setNovoInput] = useState('');
    const [carregando, setCarregando] = useState(false);
    
   
    const requisicaoDisparada = useRef(false);
    const fimDasMensagensRef = useRef(null);

    const rolarParaBaixo = () => {
        fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        rolarParaBaixo();
    }, [mensagens]);

    
    useEffect(() => {
        if (perguntaInicial && perguntaInicial.trim() !== '' && !requisicaoDisparada.current) {
            requisicaoDisparada.current = true; 
            enviarMensagemParaBackend(perguntaInicial);
        }
    }, []); 

   const enviarMensagemParaBackend = async (textoMensagem) => {
    if (!textoMensagem.trim()) return;

  
    const msgUsuario = {
        id: Date.now(),
        remetente: 'usuario',
        texto: textoMensagem
    };
    
    setMensagens((antigas) => [...antigas, msgUsuario]);
    setNovoInput('');
    setCarregando(true);

    const emailUsuarioLogado = "soprinhoosilva@gmail.com"; 

    try {
        
        const response = await axios.post(
            `https://back-sopro.onrender.com/api/conhecimento/chat?email=${emailUsuarioLogado}`, 
            { mensagem: textoMensagem },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const msgSoprinho = {
            id: Date.now() + 1,
            remetente: 'soprinho',
            texto: response.data
        };
        setMensagens((antigas) => [...antigas, msgSoprinho]);

    } catch (error) {
        console.error("Erro ao conectar com o motor Java no Render:", error);
        setMensagens((antigas) => [
            ...antigas,
            { 
                id: Date.now() + 2, 
                remetente: 'soprinho', 
                texto: 'Ops! Estou com dificuldades para me conectar ao servidor agora. Tente novamente em instantes.' 
            }
        ]);
    } finally {
        setCarregando(false);
    }
};

    const mapearTeclaEnter = (e) => {
        if (e.key === 'Enter') {
            enviarMensagemParaBackend(novoInput);
        }
    };

    return (
        <main className='container_chatbot_sessao2'>
            <section className='mensagens'>
                {mensagens.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={msg.remetente === 'usuario' ? 'mensagem_do_usuario' : 'mensagens_soprinho'}
                    >
                        {msg.remetente === 'soprinho' && (
                            <img src={icone2} alt='Icone do soprinho' />
                        )}
                        
                        <div className="texto_mensagem">
                            <ReactMarkdown>{msg.texto}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                
                {carregando && (
                    <article className='mensagens_soprinho'>
                        <img src={icone2} alt='Soprinho digitando' />
                        <p><em>Digitando...</em></p>
                    </article>
                )}
                
                <div ref={fimDasMensagensRef} />
            </section>

            <footer className='input_soprinho'>
                <input 
                    type="text" 
                    placeholder='Digite a sua mensagem...'
                    value={novoInput}
                    onChange={(e) => setNovoInput(e.target.value)}
                    onKeyDown={mapearTeclaEnter}
                    disabled={carregando}
                />
                <button 
                    className='botao_enviar' 
                    onClick={() => enviarMensagemParaBackend(novoInput)}
                    disabled={carregando}
                >
                    <img src={enviar} alt='icone de enviar' />
                </button>
            </footer>
        </main>
    );
}

export default Soprinho2;
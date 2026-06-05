import icone from '../../../assets/images/chatbot/soprinho2.svg';
import logo from '../../../assets/images/chatbot/logo_sopro.svg';
import fechar from '../../../assets/images/chatbot/botao_fechar.svg';
import './soprinho.css';
import enviar from '../../../assets/images/chatbot/icone_enviar.svg';
import { useState } from 'react';
import Chat from './soprinho2';

function Soprinho() {
    const [tela, setTela] = useState('inicial');
    const [aberto, setAberto] = useState(false);
    
    // Estado que captura o texto digitado temporariamente
    const [inputTexto, setInputTexto] = useState('');
    
    
    const [mensagemParaEnviar, setMensagemParaEnviar] = useState('');

    
    const iniciarChatComMensagem = (texto) => {
        if (!texto.trim()) return;
        
        setMensagemParaEnviar(texto); 
        setInputTexto('');           
        setTela('chat');             
    };

    const mapearEnterTelaInicial = (e) => {
        if (e.key === 'Enter') {
            iniciarChatComMensagem(inputTexto);
        }
    };

    // Reseta completamente as variáveis ao fechar o chat
    const fecharChatbot = () => {
        setAberto(false);
        setTela('inicial');
        setInputTexto('');
        setMensagemParaEnviar('');
    };

    return (
        <>
            {aberto ? (
                <div className='componente_principal'>
                    <section>
                        <header className={'header_chatbot'}>
                            <div className={"soprinho_e_logo"}>
                                <img src={icone} alt="Icone do soprinho ao lado da logo da sopro" className="icone_header" /> 
                                <img src={logo} alt="Logotipo da empresa sopro" />
                            </div>

                            <div className="fechar" onClick={fecharChatbot}> 
                                <img src={fechar} alt="icone de fechar página" />
                            </div>
                        </header>

                        {tela === 'inicial' ? (
                            <section> 
                                <main className={"container_chatbot"}>
                                    <div className="area_de_perguntas">
                                        <img src={icone} alt='Icone do soprinho na area do chatbot' className='icone_area_de_perguntas'/>
                                        <h2> Oi, eu sou o soprinho!💙 <br /> Como posso te ajudar?</h2>
                                    </div>
                                    <div className='sugestoes'>
                                        <button 
                                            className='sugestao sugestao_verde' 
                                            onClick={() => iniciarChatComMensagem('Quanto custa e como posso comprar?')}
                                        > 
                                            Quanto custa e como posso comprar? 
                                        </button>
                                        <button 
                                            className='sugestao sugestao_azul'  
                                            onClick={() => iniciarChatComMensagem('Como funciona na prática?')}
                                        > 
                                            Como funciona na prática? 
                                        </button>
                                        <button 
                                            className='sugestao sugestao_laranja' 
                                            onClick={() => iniciarChatComMensagem('Ele serve para o meu caso?')}
                                        > 
                                            Ele serve para o meu caso? 
                                        </button>
                                    </div>
                                </main>
                                <footer className='input_soprinho'>
                                    <input 
                                        type="text" 
                                        placeholder='Digite a sua mensagem...'
                                        value={inputTexto}
                                        onChange={(e) => setInputTexto(e.target.value)}
                                        onKeyDown={mapearEnterTelaInicial}
                                    />

                                    <button 
                                        className='botao_enviar' 
                                        onClick={() => iniciarChatComMensagem(inputTexto)} 
                                        aria-label='Enviar mensagem'
                                    >
                                        <img src={enviar} alt='icone de enviar'/>
                                    </button>
                                </footer>
                            </section>
                        ) : (
                            
                            <Chat perguntaInicial={mensagemParaEnviar} />
                        )}
                    </section> 
                </div>
            ) : (
                <button className='botao_flutuante' onClick={() => setAberto(true)} >
                    <img src={icone} className='icone_chatbot' alt='Abrir chat' />
                </button>
            )}
        </>
    );
}

export default Soprinho;
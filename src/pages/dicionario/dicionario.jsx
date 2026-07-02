import { useState, useEffect, useRef, useCallback } from 'react';
import './dicionario.css';
import { motion } from 'framer-motion';


// ── Chave da API (OpenRouter) ─────────────────────────────────────────
// A chave NUNCA fica escrita aqui no código — ela vem de uma variável
// de ambiente, lida de um arquivo .env.local (que fica fora do Git,
// listado no .gitignore). Veja o arquivo .env.local.example.
const API_KEY = import.meta.env.VITE_OPENROUTER_KEY || '';

// ── Tabela de códigos das frases (mesma para as 4 categorias) ─────────
// Sopro curto = "." · Sopro longo = "-"
const CODIGO_FRASE = ['.', '..', '...', '....', '-', '-.', '.-', '--'];

// ── Duração máxima considerada sopro longo (ms) ───────────────────────
// Mesmo valor do ESP32: tempoSoproLongo = 700ms
const DURACAO_LONGO = 700;

// ── Dados das categorias ──────────────────────────────────────────────
const CATEGORIAS = [
  {
    id: 1,
    nome: 'Necessidades',
    icone: '🛡️',
    cor: '#1a5aff',
    frases: [
      { id: 1, icone: '🚰', texto: 'Quero água' },
      { id: 2, icone: '🍽️', texto: 'Estou com fome' },
      { id: 3, icone: '🚻', texto: 'Preciso ir ao banheiro' },
      { id: 4, icone: '🌙', texto: 'Quero descansar' },
      { id: 5, icone: '🌡️', texto: 'Estou com calor' },
      { id: 6, icone: '❄️', texto: 'Estou com frio' },
      { id: 7, icone: '💊', texto: 'Preciso de remédio' },
      { id: 8, icone: '🆘', texto: 'Preciso de ajuda urgente' },
    ],
  },
  {
    id: 2,
    nome: 'Emoções',
    icone: '😊',
    cor: '#f97316',
    frases: [
      { id: 1, icone: '😟', texto: 'Estou me sentindo mal' },
      { id: 2, icone: '😊', texto: 'Estou bem, obrigado(a)' },
      { id: 3, icone: '😰', texto: 'Estou ansioso(a)' },
      { id: 4, icone: '😢', texto: 'Estou triste' },
      { id: 5, icone: '😤', texto: 'Estou incomodado(a)' },
      { id: 6, icone: '🧘', texto: 'Estou tranquilo(a)' },
      { id: 7, icone: '🙏', texto: 'Muito obrigado(a)' },
      { id: 8, icone: '❤️', texto: 'Eu te amo' },
    ],
  },
  {
    id: 3,
    nome: 'Dor',
    icone: '🩺',
    cor: '#9333ea',
    frases: [
      { id: 1, icone: '⚠️', texto: 'Estou com dor' },
      { id: 2, icone: '⚡', texto: 'Dor de cabeça' },
      { id: 3, icone: '💢', texto: 'Dor no peito' },
      { id: 4, icone: '🦵', texto: 'Dor nas pernas' },
      { id: 5, icone: '❗', texto: 'A dor está forte' },
      { id: 6, icone: '💨', texto: 'Difícil respirar' },
      { id: 7, icone: '🤢', texto: 'Estou enjoado(a)' },
      { id: 8, icone: '✅', texto: 'A dor melhorou' },
    ],
  },
  {
    id: 4,
    nome: 'Social',
    icone: '💬',
    cor: '#16a34a',
    frases: [
      { id: 1, icone: '✔️', texto: 'Sim' },
      { id: 2, icone: '❌', texto: 'Não' },
      { id: 3, icone: '🔄', texto: 'Pode repetir?' },
      { id: 4, icone: '✋', texto: 'Espera um momento' },
      { id: 5, icone: '👨‍👩‍👧', texto: 'Chama minha família' },
      { id: 6, icone: '👨‍⚕️', texto: 'Chama o médico' },
      { id: 7, icone: '▶️', texto: 'Entendi, pode continuar' },
    ],
  },
];

export default function Dicionario() {
  const [aba, setAba] = useState('rapidas');

  // Dispositivo
  const [dispositivo, setDispositivo] = useState(false);
  const [statusSerial, setStatusSerial] = useState('desconectado'); // 'desconectado' | 'conectado' | 'erro'

  // Navegação
  const [contagem, setContagem] = useState(0);         // sopros curtos parciais (CONTAGEM:X)
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [fraseSelecionada, setFraseSelecionada] = useState(null); // confirmada
  const [sequenciaFrase, setSequenciaFrase] = useState(''); // código Morse sendo digitado (SEQFRASE:X)

  // Barra de intensidade
  const [duracao, setDuracao] = useState(0);           // ms do sopro atual
  const [barraAtiva, setBarraAtiva] = useState(false);
  const timerBarraRef = useRef(null);

  // IA
  const [sugestoes, setSugestoes] = useState([]);
  const [iaCarregando, setIaCarregando] = useState(false);
  const [indiceSelecao, setIndiceSelecao] = useState(-1);

  // Histórico
  const [historico, setHistorico] = useState([
    { icone: '🚰', texto: 'Quero água' },
    { icone: '😟', texto: 'Estou me sentindo mal' },
    { icone: '⚠️', texto: 'Estou com dor' },
    { icone: '🌿', texto: 'Olá, tudo bem?' },
  ]);

  const portRef = useRef(null);
  const categoriaAtivaRef = useRef(null);
  const sugestoesRef = useRef([]);
  const indiceSelecaoRef = useRef(-1);

  useEffect(() => { categoriaAtivaRef.current = categoriaAtiva; }, [categoriaAtiva]);
  useEffect(() => { sugestoesRef.current = sugestoes; }, [sugestoes]);
  useEffect(() => { indiceSelecaoRef.current = indiceSelecao; }, [indiceSelecao]);

  // ── Helpers (declarados antes de quem os usa) ────────────────────────
  const falarFrase = useCallback((texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = 'pt-BR';
      window.speechSynthesis.speak(u);
    }
  }, []);

  // ── Confirmar frase selecionada ─────────────────────────────────────
  const confirmarFrase = useCallback((frase) => {
    setFraseSelecionada(frase);
    falarFrase(frase.texto);
    setHistorico((prev) => [frase, ...prev.slice(0, 3)]);
    setTimeout(() => {
      setFraseSelecionada(null);
      setCategoriaAtiva(null);
      setSugestoes([]);
      setIndiceSelecao(-1);
    }, 3000);
  }, [falarFrase]);

  // ── IA ──────────────────────────────────────────────────────────────
  const buscarSugestoesIA = useCallback(async (categoria) => {
    if (!API_KEY) return;
    setIaCarregando(true);
    setSugestoes([]);
    try {
      const prompt = `Você é um assistente de comunicação aumentativa para pessoas com paralisia, ELA ou AVC.
O usuário selecionou a categoria: "${categoria}".
Gere exatamente 4 frases curtas e úteis dentro dessa categoria, em português brasileiro.
Cada frase deve ter no máximo 8 palavras.
Responda APENAS com JSON válido, sem explicação, sem markdown:
{"sugestoes": ["frase1", "frase2", "frase3", "frase4"]}`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + API_KEY,
          'HTTP-Referer': window.location.href,
          'X-Title': 'SOPRO - Dicionário',
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          max_tokens: 300,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await response.json();
      const texto = data.choices?.[0]?.message?.content || '{}';
      const clean = texto.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setSugestoes(parsed.sugestoes || []);
    } catch (err) {
      console.error('Erro IA:', err);
    } finally {
      setIaCarregando(false);
    }
  }, []);

  // ── Processar linha serial ──────────────────────────────────────────
  const processarLinha = useCallback((linha) => {
    if (!linha) return;
    console.log('[SOPRO] linha recebida:', JSON.stringify(linha));

    // DURACAO:X — mostra intensidade na barra
    if (linha.startsWith('DURACAO:')) {
      const ms = parseInt(linha.split('DURACAO:')[1]);
      setDuracao(ms);
      setBarraAtiva(true);
      clearTimeout(timerBarraRef.current);
      timerBarraRef.current = setTimeout(() => {
        setBarraAtiva(false);
        setDuracao(0);
      }, 1500);
      return;
    }

    // CONTAGEM:X — feedback parcial de sopros curtos
    if (linha.startsWith('CONTAGEM:')) {
      const n = parseInt(linha.split('CONTAGEM:')[1]);
      setContagem(n);
      return;
    }

    // CATEGORIA:X — ESP32 confirmou a categoria após janela de 1500ms
    if (linha.startsWith('CATEGORIA:')) {
      const id = parseInt(linha.split('CATEGORIA:')[1]);
      const cat = CATEGORIAS.find((c) => c.id === id);
      if (cat) {
        setCategoriaAtiva(cat);
        setContagem(0);
        setSequenciaFrase('');
        buscarSugestoesIA(cat.nome);
      }
      return;
    }

    // SEQFRASE:X — feedback ao vivo do código Morse sendo digitado (. e -)
    if (linha.startsWith('SEQFRASE:')) {
      const seq = linha.split('SEQFRASE:')[1];
      setSequenciaFrase(seq);
      return;
    }

    // FRASE:N — código decodificado no ESP32, seleciona e confirma direto
    if (linha.startsWith('FRASE:')) {
      const idx = parseInt(linha.split('FRASE:')[1]);
      const cat = categoriaAtivaRef.current;
      setSequenciaFrase('');
      if (!cat) return;
      const frase = cat.frases[idx - 1];
      if (frase) confirmarFrase(frase);
      return;
    }

    // FRASE_INVALIDA:X — código não reconhecido, só limpa a sequência
    if (linha.startsWith('FRASE_INVALIDA')) {
      setSequenciaFrase('');
      return;
    }
  }, [buscarSugestoesIA, confirmarFrase]);

  // ── Web Serial ──────────────────────────────────────────────────────
  const conectarUSB = async () => {
    if (!navigator.serial) {
      alert('Web Serial não suportado. Use Chrome ou Edge com o dispositivo conectado via USB.');
      return;
    }
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      portRef.current = port;
      setDispositivo(true);
      setStatusSerial('conectado');
      console.log('[SOPRO] porta aberta, aguardando dados...');

      // Alguns ESP32 (CP2102/CH340) usam DTR/RTS pro circuito de
      // auto-reset. O Web Serial pode deixar essas linhas num estado
      // que prende o chip no bootloader (sem rodar o sketch). Forçamos
      // as duas pra "false" pra garantir que ele rode normalmente.
      try {
        await port.setSignals({ dataTerminalReady: false, requestToSend: false });
        console.log('[SOPRO] DTR/RTS ajustados (false/false)');
      } catch (sigErr) {
        console.warn('[SOPRO] não foi possível ajustar DTR/RTS:', sigErr);
      }

      const decoder = new TextDecoderStream();
      port.readable.pipeTo(decoder.writable).catch((err) => {
        console.error('[SOPRO] erro no pipeTo (readable->decoder):', err);
      });
      const reader = decoder.readable.getReader();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) { console.log('[SOPRO] leitura encerrada (done=true)'); break; }
        if (!value) continue;
        console.log('[SOPRO] chunk bruto:', JSON.stringify(value));
        buffer += value;
        const linhas = buffer.split('\n');
        for (let i = 0; i < linhas.length - 1; i++) {
          processarLinha(linhas[i].trim());
        }
        buffer = linhas[linhas.length - 1];
      }
    } catch (e) {
      console.error('[SOPRO] erro na conexão serial:', e);
      if (e.name !== 'NotFoundError') {
        setStatusSerial('erro');
        setDispositivo(false);
      }
    }
  };

  const desconectarUSB = async () => {
    try {
      if (portRef.current) await portRef.current.close();
    } catch {
      // porta já pode estar fechada — ignora
    }
    portRef.current = null;
    setDispositivo(false);
    setStatusSerial('desconectado');
    voltarInicio();
  };

  // ── Simulação teclado (desenvolvimento sem hardware) ────────────────
  // Espelha a máquina de estados do ESP32: enquanto nenhuma categoria
  // está ativa, Espaço/L contam sopros pra escolher a categoria (1-4).
  // Depois que a categoria é escolhida, Espaço/L viram os símbolos
  // "." e "-" do código Morse que seleciona a frase direto.
  useEffect(() => {
    if (!dispositivo) return;

    let contagemSim = 0;
    let sequenciaSim = '';
    let timerCategoria = null;
    let timerFrase = null;

    const emitirSopro = (curto) => {
      processarLinha(curto ? 'DURACAO:300' : 'DURACAO:900');

      if (!categoriaAtivaRef.current) {
        // Nível categoria: só sopros curtos contam (1-4)
        if (curto) {
          contagemSim++;
          processarLinha(`CONTAGEM:${contagemSim}`);
          clearTimeout(timerCategoria);
          timerCategoria = setTimeout(() => {
            processarLinha(`CATEGORIA:${contagemSim}`);
            contagemSim = 0;
          }, 1500);
        }
      } else {
        // Nível frase: acumula código Morse (. e -)
        sequenciaSim += curto ? '.' : '-';
        processarLinha(`SEQFRASE:${sequenciaSim}`);
        clearTimeout(timerFrase);
        timerFrase = setTimeout(() => {
          const idx = CODIGO_FRASE.indexOf(sequenciaSim) + 1;
          processarLinha(idx > 0 ? `FRASE:${idx}` : `FRASE_INVALIDA:${sequenciaSim}`);
          sequenciaSim = '';
        }, 1500);
      }
    };

    const handleKey = (e) => {
      // Espaço = sopro curto (.)
      if (e.code === 'Space') {
        e.preventDefault();
        emitirSopro(true);
      }
      // L = sopro longo (-)
      if (e.code === 'KeyL') {
        emitirSopro(false);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearTimeout(timerCategoria);
      clearTimeout(timerFrase);
    };
  }, [dispositivo, processarLinha]);

  const voltarInicio = () => {
    setCategoriaAtiva(null);
    setSequenciaFrase('');
    setContagem(0);
    setSugestoes([]);
    setIndiceSelecao(-1);
  };

  // ── Barra de intensidade ─────────────────────────────────────────────
  // 300ms = mínimo (sopro curto), 2000ms = máximo visual
  const intensidadePct = Math.min(100, (duracao / 2000) * 100);
  const corBarra = duracao < DURACAO_LONGO
    ? '#3ab4ff'   // azul = sopro curto
    : '#f97316';  // laranja = sopro longo

  const corAtiva = categoriaAtiva ? categoriaAtiva.cor : '#1a5aff';
  const totalDots = categoriaAtiva ? categoriaAtiva.frases.length : CATEGORIAS.length;

  return (
    <main className="dic-page">

      {/* Abas */}
      <motion.nav
            className="dic-abas"
            aria-label="Modo de frases"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
        <button className={`dic-aba ${aba === 'rapidas' ? 'dic-aba--ativa' : ''}`}
          onClick={() => { setAba('rapidas'); voltarInicio(); }}>
          ⚡ Frases rápidas
        </button>
        <button className={`dic-aba ${aba === 'personalizadas' ? 'dic-aba--ativa' : ''}`}
          onClick={() => { setAba('personalizadas'); voltarInicio(); }}>
          ✨ Frases personalizadas + IA
        </button>
      </motion.nav>

      <section className="dic-layout">

        {/* ── Coluna principal ── */}
        <div className="dic-col-principal">

          {/* Barra de sopro + intensidade */}
          <div className="dic-sopro-barra">
            <span className="dic-sopro-texto">
              {barraAtiva
                ? duracao >= DURACAO_LONGO ? '💨 Sopro longo (-)' : '💨 Sopro curto (.)'
                : categoriaAtiva
                  ? 'Sopre o código da frase'
                  : 'Aguardando sopro'}
            </span>
            <div className="dic-sopro-progress">
              <div
                className="dic-sopro-fill"
                style={{
                  width: barraAtiva ? `${intensidadePct}%` : '0%',
                  backgroundColor: corBarra,
                  transition: barraAtiva ? 'width 0.05s linear' : 'width 0.4s ease',
                }}
              />
            </div>
            {barraAtiva && (
              <span className="dic-sopro-ms">{duracao}ms</span>
            )}
          </div>

          {/* Dots (nível categoria) OU código sendo digitado (nível frase) */}
          <div className="dic-dots-row">
            {!categoriaAtiva ? (
              <>
                <div className="dic-dots">
                  {Array.from({ length: totalDots }).map((_, i) => (
                    <span key={i} className="dic-dot" style={{
                      backgroundColor: i < contagem ? corAtiva : 'transparent',
                      borderColor: i < contagem ? corAtiva : '#d1d5db',
                    }} />
                  ))}
                </div>
                <span className="dic-dots-label">Sopre para selecionar</span>
              </>
            ) : (
              <>
                <span className="dic-dots-label" style={{ marginLeft: 0, fontFamily: 'monospace', fontSize: 20, color: corAtiva }}>
                  {sequenciaFrase || '···'}
                </span>
                <span className="dic-dots-label">Código da frase</span>
              </>
            )}
          </div>

          {/* Sequência sendo digitada — aguardando pausa pra decodificar */}
          {categoriaAtiva && sequenciaFrase && !fraseSelecionada && (
            <div className="dic-navegando" style={{ borderColor: corAtiva }}>
              <span className="dic-navegando-icone">📡</span>
              <span className="dic-navegando-texto">Digitando código: {sequenciaFrase}</span>
              <span className="dic-navegando-tag" style={{ color: corAtiva }}>
                ⏳ Pausa confirma
              </span>
            </div>
          )}

          {/* Frase confirmada */}
          {fraseSelecionada && (
            <div className="dic-confirmacao" style={{ borderColor: corAtiva }}>
              <span className="dic-confirmacao-icone">{fraseSelecionada.icone}</span>
              <strong className="dic-confirmacao-texto">{fraseSelecionada.texto}</strong>
              <span className="dic-confirmacao-tag">✔ Selecionado</span>
            </div>
          )}

          {/* Grade de categorias */}
          {!categoriaAtiva && aba === 'rapidas' && !fraseSelecionada && (
            <motion.section
                  className="dic-categorias"
                  aria-label="Categorias"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
              {CATEGORIAS.map((cat) => (
                <button key={cat.id} className="dic-categoria-card"
                  style={{ '--cor-cat': cat.cor }}
                  onClick={() => { setCategoriaAtiva(cat); setSequenciaFrase(''); buscarSugestoesIA(cat.nome); }}>
                  <span className="dic-categoria-dot" style={{ borderColor: '#d1d5db' }} />
                  <span className="dic-categoria-icone">{cat.icone}</span>
                  <span className="dic-categoria-nome">{cat.id} - {cat.nome}</span>
                </button>
              ))}
            </motion.section>
          )}

          {/* Frases personalizadas */}
          {!categoriaAtiva && aba === 'personalizadas' && !fraseSelecionada && (
            <section className="dic-frases-personalizadas">
              <p className="dic-em-breve">✨ Frases personalizadas com IA em breve!</p>
            </section>
          )}

          {/* Lista de frases da categoria */}
          {categoriaAtiva && !fraseSelecionada && (
            <section className="dic-frases" aria-label={`Frases de ${categoriaAtiva.nome}`}>
              <header className="dic-frases-header" style={{ borderColor: categoriaAtiva.cor }}>
                <span className="dic-frases-header-icone">{categoriaAtiva.icone}</span>
                <strong className="dic-frases-header-nome">{categoriaAtiva.nome}</strong>
                <button className="dic-voltar" onClick={voltarInicio}>← Voltar</button>
              </header>

              {categoriaAtiva.frases.map((frase, i) => {
                const codigo = CODIGO_FRASE[i];
                const isAtiva = sequenciaFrase && codigo.startsWith(sequenciaFrase);
                return (
                  <button key={frase.id} className={`dic-frase-item ${isAtiva ? 'dic-frase-item--navegando' : ''}`}
                    style={isAtiva ? { borderColor: categoriaAtiva.cor, background: '#f8faff' } : {}}
                    onClick={() => confirmarFrase(frase)}>
                    <span className="dic-frase-num">{frase.id} -</span>
                    <span className="dic-frase-icone">{frase.icone}</span>
                    <span className="dic-frase-texto">{frase.texto}</span>
                    <span className="dic-sugestao-num" style={{ fontSize: 13 }}>{codigo}</span>
                    <span className="dic-frase-dot" style={{
                      backgroundColor: isAtiva ? categoriaAtiva.cor : 'transparent',
                      borderColor: isAtiva ? categoriaAtiva.cor : '#d1d5db',
                    }} />
                  </button>
                );
              })}

              {/* Sugestões IA */}
              {(iaCarregando || sugestoes.length > 0) && (
                <div className="dic-sugestoes">
                  <p className="dic-sugestoes-titulo">✨ Sugestões IA</p>
                  {iaCarregando ? (
                    <p className="dic-sugestoes-loading">Gerando sugestões...</p>
                  ) : (
                    sugestoes.map((texto, i) => (
                      <button key={i}
                        className={`dic-sugestao-item ${indiceSelecao === i ? 'dic-sugestao-item--ativa' : ''}`}
                        onClick={() => confirmarFrase({ icone: '✨', texto })}>
                        <span className="dic-sugestao-num">{i + 1}</span>
                        <span>{texto}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </section>
          )}
        </div>

        {/* ── Coluna lateral ── */}
        <motion.aside
              className="dic-col-lateral"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >

          <button
            className={`dic-dispositivo ${dispositivo ? 'dic-dispositivo--ligado' : ''}`}
            onClick={dispositivo ? desconectarUSB : conectarUSB}
            aria-pressed={dispositivo}
          >
            <span className="dic-dispositivo-icone">⏻</span>
            <span>
              {dispositivo ? 'Dispositivo Ligado'
                : statusSerial === 'erro' ? 'Erro — Tentar novamente'
                : 'Dispositivo Desligado'}
            </span>
          </button>

          {dispositivo && (
            <p className="dic-simulacao-aviso">
              💡 <kbd>Espaço</kbd> = sopro curto · <kbd>L</kbd> = sopro longo
            </p>
          )}

          <div className="dic-card-lateral">
            <h3 className="dic-card-titulo">❓ Como Navegar?</h3>
            <hr className="dic-card-hr" />
            {categoriaAtiva ? (
              <>
                <p className="dic-card-texto">
                  Sopre o código da frase (curto = <strong>.</strong> · longo = <strong>−</strong>, segurando um pouco mais). Uma pausa confirma automaticamente.
                </p>
                <ul className="dic-nav-lista">
                  <li><strong>. — frase 1</strong></li>
                  <li><strong>.. — frase 2</strong></li>
                  <li><strong>... — frase 3</strong></li>
                  <li><strong>.... — frase 4</strong></li>
                  <li><strong>− — frase 5</strong></li>
                  <li><strong>−. — frase 6</strong></li>
                  <li><strong>.− — frase 7</strong></li>
                  <li><strong>−− — frase 8</strong></li>
                </ul>
              </>
            ) : (
              <>
                <p className="dic-card-texto">
                  Sopre rapidamente o número de vezes correspondente à categoria. O sistema confirma após 1,2s.
                </p>
                <ul className="dic-nav-lista">
                  <li><strong>1x 💨 - Necessidades</strong></li>
                  <li><strong>2x 💨💨 - Emoções</strong></li>
                  <li><strong>3x 💨💨💨 - Dor</strong></li>
                  <li><strong>4x 💨💨💨💨 - Social</strong></li>
                </ul>
              </>
            )}
          </div>

          <div className="dic-card-lateral">
            <h3 className="dic-card-titulo">🕐 Histórico</h3>
            <hr className="dic-card-hr" />
            <ul className="dic-historico-lista">
              {historico.map((item, i) => (
                <li key={i} className="dic-historico-item">
                  <span>{item.icone}</span>
                  <span>{item.texto}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </section>
    </main>
  );
}
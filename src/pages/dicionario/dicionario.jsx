import { useState, useEffect, useRef, useCallback } from 'react';
import './dicionario.css';
import { motion } from 'framer-motion';


// ── Chave da API (OpenRouter) ─────────────────────────────────────────
// Crie sua chave em https://openrouter.ai e substitua abaixo:
const API_KEY = 'COLE_SUA_CHAVE_AQUI';

// ── Duração máxima considerada sopro longo (ms) ───────────────────────
// Mesmo valor do ESP32: tempoNavegacao = 1000ms
const DURACAO_LONGO = 1000;

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
  const [fraseAtual, setFraseAtual] = useState(null);  // frase sendo navegada (AVANCAR_FRASE)
  const [fraseSelecionada, setFraseSelecionada] = useState(null); // confirmada

  // Barra de intensidade
  const [duracao, setDuracao] = useState(0);           // ms do sopro atual
  const [barraAtiva, setBarraAtiva] = useState(false);
  const timerBarraRef = useRef(null);

  // IA
  const [sugestoes, setSugestoes] = useState([]);
  const [iaCarregando, setIaCarregando] = useState(false);
  const [indiceSelecao, setIndiceSelecao] = useState(-1);
  const timerConfirmarRef = useRef(null);

  // Histórico
  const [historico, setHistorico] = useState([
    { icone: '🚰', texto: 'Quero água' },
    { icone: '😟', texto: 'Estou me sentindo mal' },
    { icone: '⚠️', texto: 'Estou com dor' },
    { icone: '🌿', texto: 'Olá, tudo bem?' },
  ]);

  const portRef = useRef(null);
  const categoriaAtivaRef = useRef(null);
  const fraseAtualRef = useRef(null);
  const sugestoesRef = useRef([]);
  const indiceSelecaoRef = useRef(-1);

  useEffect(() => { categoriaAtivaRef.current = categoriaAtiva; }, [categoriaAtiva]);
  useEffect(() => { fraseAtualRef.current = fraseAtual; }, [fraseAtual]);
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
    clearTimeout(timerConfirmarRef.current);
    setFraseSelecionada(frase);
    setFraseAtual(null);
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
    if (!API_KEY || API_KEY === 'COLE_SUA_CHAVE_AQUI') return;
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

    // CATEGORIA:X — ESP32 confirmou a categoria após janela de 1200ms
    if (linha.startsWith('CATEGORIA:')) {
      const id = parseInt(linha.split('CATEGORIA:')[1]);
      const cat = CATEGORIAS.find((c) => c.id === id);
      if (cat) {
        setCategoriaAtiva(cat);
        setContagem(0);
        setFraseAtual(cat.frases[0]); // começa na primeira frase
        buscarSugestoesIA(cat.nome);
      }
      return;
    }

    // AVANCAR_FRASE — sopro longo, avança para próxima frase
    if (linha === 'AVANCAR_FRASE') {
      const cat = categoriaAtivaRef.current;
      if (!cat) return;

      setFraseAtual((prev) => {
        const idx = prev ? cat.frases.findIndex((f) => f.id === prev.id) : -1;
        const prox = cat.frases[(idx + 1) % cat.frases.length];
        fraseAtualRef.current = prox;
        return prox;
      });

      // 3s de silêncio após AVANCAR_FRASE = confirma
      clearTimeout(timerConfirmarRef.current);
      timerConfirmarRef.current = setTimeout(() => {
        const frase = fraseAtualRef.current;
        if (frase) confirmarFrase(frase);
      }, 3000);
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
  useEffect(() => {
    if (!dispositivo) return;

    let contagemSim = 0;
    let timerCategoria = null;

    const handleKey = (e) => {
      // Espaço = sopro curto (simula DURACAO:300 + CONTAGEM + CATEGORIA)
      if (e.code === 'Space') {
        e.preventDefault();
        contagemSim++;
        processarLinha('DURACAO:300');
        processarLinha(`CONTAGEM:${contagemSim}`);
        clearTimeout(timerCategoria);
        timerCategoria = setTimeout(() => {
          processarLinha(`CATEGORIA:${contagemSim}`);
          contagemSim = 0;
        }, 1200);
      }
      // L = sopro longo (simula DURACAO:1200 + AVANCAR_FRASE)
      if (e.code === 'KeyL') {
        processarLinha('DURACAO:1200');
        processarLinha('AVANCAR_FRASE');
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearTimeout(timerCategoria);
    };
  }, [dispositivo, processarLinha]);

  const voltarInicio = () => {
    setCategoriaAtiva(null);
    setFraseAtual(null);
    setContagem(0);
    setSugestoes([]);
    setIndiceSelecao(-1);
    clearTimeout(timerConfirmarRef.current);
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
                ? duracao >= DURACAO_LONGO ? '💨 Sopro longo...' : '💨 Sopro detectado'
                : categoriaAtiva
                  ? 'Sopre para navegar frases'
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

          {/* Dots — mostram contagem parcial de sopros curtos */}
          <div className="dic-dots-row">
            <div className="dic-dots">
              {Array.from({ length: totalDots }).map((_, i) => (
                <span key={i} className="dic-dot" style={{
                  backgroundColor: i < contagem ? corAtiva : 'transparent',
                  borderColor: i < contagem ? corAtiva : '#d1d5db',
                }} />
              ))}
            </div>
            <span className="dic-dots-label">
              {categoriaAtiva ? 'Sopre para navegar' : 'Sopre para selecionar'}
            </span>
          </div>

          {/* Frase sendo navegada (highlight antes de confirmar) */}
          {fraseAtual && !fraseSelecionada && (
            <div className="dic-navegando" style={{ borderColor: corAtiva }}>
              <span className="dic-navegando-icone">{fraseAtual.icone}</span>
              <span className="dic-navegando-texto">{fraseAtual.texto}</span>
              <span className="dic-navegando-tag" style={{ color: corAtiva }}>
                ⏳ Confirma em 3s...
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
                  onClick={() => { setCategoriaAtiva(cat); setFraseAtual(cat.frases[0]); buscarSugestoesIA(cat.nome); }}>
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

              {categoriaAtiva.frases.map((frase) => {
                const isAtiva = fraseAtual?.id === frase.id;
                return (
                  <button key={frase.id} className={`dic-frase-item ${isAtiva ? 'dic-frase-item--navegando' : ''}`}
                    style={isAtiva ? { borderColor: categoriaAtiva.cor, background: '#f8faff' } : {}}
                    onClick={() => confirmarFrase(frase)}>
                    <span className="dic-frase-num">{frase.id} -</span>
                    <span className="dic-frase-icone">{frase.icone}</span>
                    <span className="dic-frase-texto">{frase.texto}</span>
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
                  Sopre longo para avançar entre as frases. Pare por 3 segundos para confirmar a frase destacada.
                </p>
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
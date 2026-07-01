import { useState, useEffect, useRef, use } from "react";
import "./checkout.css";
import carrinhoDeCompra from "../../assets/icons/carrinhoDeCompra.svg";
import cartaoCredito from "../../assets/icons/cartaoCredito.svg";
import codigoBarras from "../../assets/icons/codigoBarras.svg";
import carteira from "../../assets/icons/carteira.svg";
import qrCode from "../../assets/icons/qrCode.svg";
import caminhaoAzul from "../../assets/icons/caminhaoAzul.svg";
import mais from "../../assets/icons/mais.svg";
import menos from "../../assets/icons/menos.svg";
import circuloSelecionado from "../../assets/icons/circuloSelecionadoLaranja.svg";

import imgProdutoPreta from "../../assets/images/compra/imgPrincipalPreta.png";
import imgProdutoBranco from "../../assets/images/compra/imgPrincipalBranca.png";
import imgProdutoVermelho from "../../assets/images/compra/imgPrincipalVermelha.png";
import imgProdutoRoxo from "../../assets/images/compra/imgPrincipalRoxo.png";
import imgProdutoLaranja from "../../assets/images/compra/imgProdutoPrincipalLaranja.png";
import imgProdutoAzul from "../../assets/images/compra/imgProdutoPrincipalAzul.png";
import imgProdutoRosa from "../../assets/images/compra/imgProdutoPrincipalRosa.png";
import imgProdutoVerde from "../../assets/images/compra/imgProdutoPrincipalVerde.png";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const IMAGENS_PRODUTO = {
  Preto: imgProdutoPreta,
  Branco: imgProdutoBranco,
  Vermelho: imgProdutoVermelho,
  Roxo: imgProdutoRoxo,
  Laranja: imgProdutoLaranja,
  Azul: imgProdutoAzul,
  Rosa: imgProdutoRosa,
  Verde: imgProdutoVerde,
};

const Checkout = () => {

  const [corProduto, setCorProduto] = useState("Preto");

useEffect(() => {
  const corSalva = localStorage.getItem('@Sopro:ultima_cor');
  if (corSalva && IMAGENS_PRODUTO[corSalva]) {
    setCorProduto(corSalva);
  }
}, []);

const imgProduto = IMAGENS_PRODUTO[corProduto];

  const navigate = useNavigate();
  const [planoSelecionado, setPlanoSelecionado] = useState("dispositivo");
  const [quantidade, setQuantidade] = useState(1);
  const [pagamento, setPagamento] = useState("pix");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [usuarioJaTemEndereco, setUsuarioJaTemEndereco] = useState(false);
  const [nomeCompletoUsuario, setNomeCompletoUsuario] = useState("");

  // Estados Logística
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // Estados Cartão de Crédito
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [parcelas, setParcelas] = useState('1');
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const parcelaOpcoes = [
    { value: '1', label: '1x de R$ 350,50 sem juros' },
    { value: '2', label: '2x de R$ 175,25 sem juros' },
    { value: '3', label: '3x de R$ 116,83 sem juros' },
    { value: '6', label: '6x de R$ 58,41 sem juros' },
    { value: '12', label: '12x de R$ 29,20 com juros' },
  ];

  const precoBase = 350.50;
  const planos = {
    dispositivo: { label: "Só o dispositivo", preco: 0 },
    basico: { label: "Sopro Autonomia - Básico", preco: 49.9 },
    pro: { label: "Voz Ativa - Pro", preco: 89.9 },
    elite: { label: "Cuidado Total - Plus", preco: 149.9 },
  };

  const estadosBrasileiros = [
    {sigla: "AC", nome: "Acre"},
    {sigla: "AL", nome: "Alagoas"},
    {sigla: "AP", nome: "Amapá"},
    {sigla: "AM", nome: "Amazonas"},
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" },
  ];

  const [estadoAberto, setEstadoAberto] = useState(false);
  const estadoRef = useRef(null); 

 useEffect(() => {
  function fecharAoClicarFora(e) {
    if (estadoRef.current && !estadoRef.current.contains(e.target)) {
      setEstadoAberto(false);
    }
  }
  document.addEventListener("mousedown", fecharAoClicarFora);
  return () => document.removeEventListener("mousedown", fecharAoClicarFora);
}, []);

  const precoPlano = planos[planoSelecionado].preco;
  const valorTotalCalculado = (precoBase * quantidade + precoPlano);
  const total = valorTotalCalculado.toFixed(2).replace(".", ",");

  const pagamentos = [
    { id: "pix", label: "PIX", icon: qrCode },
    { id: "cartao", label: "Cartão de crédito ou débito", icon: cartaoCredito },
    { id: "boleto", label: "Boleto Bancário", icon: codigoBarras },
    { id: "carteira", label: "Carteiras Digitais", icon: carteira },
  ];

  useEffect(() => {
    const checarEnderecoExistente = async () => {
      try {
        const token = localStorage.getItem('@Sopro:token');
        const emailLogado = localStorage.getItem('@Sopro:email');
        if (!token || !emailLogado) return;

        const response = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/perfil?email=${emailLogado}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const dados = await response.json();

          if (dados?.nomeCompleto) {
            setNomeCompletoUsuario(dados.nomeCompleto);
          }
          if (dados.enderecoCompleto && dados.enderecoCompleto !== "Endereço não preenchido") {
            setUsuarioJaTemEndereco(true);
          }
        }
      } catch (e) {
        console.log("Sem histórico logístico prévio.");
      }
    };
    checarEnderecoExistente();
  }, []);

  const validarCartaoDeCredito = () => {
    if (!nomeCartao.trim()) return "Insira o nome impresso no cartão.";
    const numLimpo = numeroCartao.replace(/\s/g, '');
    if (numLimpo.length !== 16) return "O número do cartão deve conter exatamente 16 dígitos.";
    if (!/^\d{2}\/\d{2}$/.test(validade)) return "A validade deve estar no formato MM/AA.";
    if (cvv.length !== 3) return "O CVV deve ter 3 dígitos.";
    return null;
  };

  const handleFinalizarCompraSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!usuarioJaTemEndereco && (!cep || !endereco || !numero || !bairro || !cidade || !estado)) {
      setErro("Por favor, preencha os campos obrigatórios do endereço.");
      return;
    }

    if (pagamento === "cartao") {
      const erroCartao = validarCartaoDeCredito();
      if (erroCartao) {
        setErro(erroCartao);
        return;
      }
    }

    setCarregando(true);

    const qtdNumerica = Number(quantidade) || 1;
    const vPlano = Number(precoPlano) || 0;
    const vDispositivo = Number(precoBase) * qtdNumerica;
    const vTotal = vPlano + vDispositivo;

    localStorage.setItem('@Sopro:ultimo_gasto', vTotal.toFixed(2).replace(".", ","));
    localStorage.setItem('@Sopro:ultimo_qtd', qtdNumerica);

    // Salva endereço e pedido em cache para exibir no perfil
    localStorage.setItem('@Sopro:endereco', JSON.stringify({
      logradouro: endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep
    }));
    localStorage.setItem('@Sopro:pedido', JSON.stringify({
      codigoPedido: "SP-" + Date.now(),
      produtoDescricao: `${qtdNumerica}x Dispositivo Sopro`,
      status: "PREPARANDO",
      codigoRastreio: "RU" + (Math.floor(Math.random() * 90000000) + 10000000) + "BR",
      dataEntregaPrevista: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dataCompra: new Date().toLocaleDateString('pt-BR'),
      valorTotal: vTotal
    }));

    try {
      const token = localStorage.getItem('@Sopro:token');
      const emailLogado = localStorage.getItem('@Sopro:email');
      const nomeFinalParaEnvio = nomeCompletoUsuario || localStorage.getItem('@Sopro:nome') || "Usuário SOPRO";

      if (!emailLogado) throw new Error("Usuário não identificado.");

      // Salva o endereço no perfil apenas se o usuário ainda não tinha um
      if (!usuarioJaTemEndereco) {
        const resPerfil = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/perfil/dados-pessoais?email=${emailLogado}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nomeCompleto: nomeFinalParaEnvio,
            cpf: "321." + Math.floor(Math.random() * 900 + 100) + ".455-" + Math.floor(Math.random() * 89 + 10),
            telefoneCelular: "(11) 94002-8922",
            dataNascimento: "2026-03-03",
            cidadeEstado: `${cidade}, ${estado}`
          })
        });

        if (!resPerfil.ok) console.warn("Falha ao salvar dados pessoais secundários.");

        const resEndereco = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/perfil/endereco?email=${emailLogado}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cep: cep,
            logradouro: endereco,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            estado: estado
          })
        });

        if (!resEndereco.ok) console.warn("Falha ao registrar endereço logístico inicial.");
      }

      const transactionId = "SP-" + Date.now();

      // CORRIGIDO: inclui logradouro no payload; se já tem endereço, envia campos nulos
      // para o backend saber que deve usar o endereço já salvo no perfil
      const dadosLogistica = {
        plano: planoSelecionado.toUpperCase(),
        valorPlano: vPlano,
        incluiDispositivo: true,
        valorDispositivo: vDispositivo,
        produtoDescricao: `${qtdNumerica}x Dispositivo Sopro`,
        valor: vTotal,
        formaPagamento: pagamento.toUpperCase(),
        transactionId: transactionId,
        // Se o usuário já tem endereço, envia null — o backend usa o que está no banco
        cep: usuarioJaTemEndereco ? null : cep.trim() || null,
        logradouro: usuarioJaTemEndereco ? null : endereco.trim() || null,
        numero: usuarioJaTemEndereco ? null : numero.trim() || null,
        complemento: usuarioJaTemEndereco ? null : complemento.trim() || null,
        bairro: usuarioJaTemEndereco ? null : bairro.trim() || null,
        cidade: usuarioJaTemEndereco ? null : cidade.trim() || null,
        estado: usuarioJaTemEndereco ? null : estado.trim() || null
      };

      // Salva o transactionId para exibir na tela de confirmação
      localStorage.setItem('@Sopro:ultimo_pedido_id', transactionId);

      const response = await fetch(`https://sopro-backend-a6h6e5a9bydzd2dd.canadacentral-01.azurewebsites.net/api/assinaturas/checkout?email=${emailLogado}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogistica)
      });

      if (response.ok || response.status === 400 || response.status === 409) {
        navigate('/pedidoconfirmado');
        return;
      }

      throw new Error("Erro no processamento remoto do checkout.");

    } catch (err) {
      console.error("Erro detalhado no envio do Checkout: ", err);
      navigate('/pedidoconfirmado');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="checkout-page">
      <section className="checkout-container">
        <motion.section className="checkout-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>

          {erro && (
            <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '500', fontSize: '14px' }}>
              ⚠️ {erro}
            </div>
          )}

          {usuarioJaTemEndereco ? (
            <article className="checkout-card" style={{ border: '2px solid #22c55e', backgroundColor: '#f0fdf4' }}>
              <h2 className="checkout-card-title" style={{ color: '#166534', margin: 0 }}>✓ Endereço de entrega já cadastrado</h2>
              <p style={{ color: '#166534', marginTop: '8px', fontSize: '14px' }}>Utilizaremos o endereço salvo no seu perfil para o envio automático deste pedido.</p>
            </article>
          ) : (
            <article className="checkout-card">
              <h2 className="checkout-card-title">Endereço de entrega</h2>
              <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
                <fieldset className="checkout-fieldset">
                  <div className="checkout-field">
                    <label htmlFor="cep">CEP</label>
                    <input id="cep" type="text" className="checkout-input" maxLength={8} value={cep} inputMode="numeric" onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} />
                  </div>
                  <div className="checkout-row">
                    <div className="checkout-field grow">
                      <label htmlFor="endereco">Endereço</label>
                      <input id="endereco" type="text" className="checkout-input" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                    </div>
                    <div className="checkout-field small">
                      <label htmlFor="numero">Número</label>
                      <input id="numero" type="text" className="checkout-input" maxLength={6} value={numero} inputMode="numeric" onChange={(e) => setNumero(e.target.value.replace(/\D/g, ''))} />
                    </div>
                  </div>
                  <div className="checkout-row">
                    <div className="checkout-field grow">
                      <label htmlFor="complemento">Complemento</label>
                      <input id="complemento" type="text" className="checkout-input" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                    </div>
                    <div className="checkout-field grow">
                      <label htmlFor="bairro">Bairro</label>
                      <input id="bairro" type="text" className="checkout-input" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                    </div>
                  </div>
                  <div className="checkout-row">
                    <div className="checkout-field grow">
                      <label htmlFor="cidade">Cidade</label>
                      <input id="cidade" type="text" className="checkout-input" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    </div>
                    <div className="checkout-field grow">
                      <label htmlFor="estado">Estado</label>
                      <select id="estado" className="checkout-input checkout-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                      <option value="">Selecione</option>
                      {estadosBrasileiros.map((uf) => (
                      <option key={uf.sigla} value={uf.sigla}>{uf.sigla} - {uf.nome}</option>
                    ))}
                    </select>
                    </div>
                  </div>
                </fieldset>
              </form>
            </article>
          )}

          <article className="checkout-card">
            <h2 className="checkout-card-title">Forma de pagamento</h2>
            <nav className="checkout-pagamento-options" aria-label="Formas de pagamento">
              {pagamentos.map((tipo) => (
                <button key={tipo.id} type="button" className={`checkout-pagamento-btn ${pagamento === tipo.id ? "active" : ""}`} onClick={() => setPagamento(tipo.id)}>
                  <img src={tipo.icon} alt={tipo.label} className="checkout-pagamento-icon" />
                  <span>{tipo.label}</span>
                </button>
              ))}
            </nav>

            <AnimatePresence mode="wait">
              {pagamento === "cartao" ? (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                  <form className="checkout-form" style={{ marginTop: '20px' }} onSubmit={(e) => e.preventDefault()}>
                    <fieldset className="checkout-fieldset">
                      <div className="checkout-field">
                        <label htmlFor="nome-cartao">Nome impresso no cartão</label>
                        <input id="nome-cartao" type="text" className="checkout-input" value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} placeholder="JOÃO P SILVA" />
                      </div>
                      <div className="checkout-field">
                        <label htmlFor="numero-cartao">Número do cartão</label>
                        <input id="numero-cartao" type="text" className="checkout-input" maxLength={19} inputMode="numeric" placeholder="0000 0000 0000 0000" value={numeroCartao} onChange={(e) => { setNumeroCartao(formatCardNumber(e.target.value)); }} />
                      </div>
                      <div className="checkout-row">
                        <div className="checkout-field grow">
                          <label htmlFor="parcelamento">Parcelamento</label>
                          <select id="parcelamento" className="checkout-input checkout-select" value={parcelas} onChange={(e) => setParcelas(e.target.value)}>
                            {parcelaOpcoes.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
                          </select>
                        </div>
                        <div className="checkout-field medium">
                          <label htmlFor="validade">Validade</label>
                          <input id="validade" type="text" className="checkout-input" maxLength={5} placeholder="MM/AA" value={validade} onChange={(e) => { let val = e.target.value.replace(/\D/g, ''); if (val.length >= 2) val = val.slice(0,2) + '/' + val.slice(2); setValidade(val); }} />
                        </div>
                        <div className="checkout-field small">
                          <label htmlFor="cvv">CVV</label>
                          <input id="cvv" type="text" className="checkout-input" maxLength={3} value={cvv} inputMode="numeric" placeholder="000" onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))} />
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="checkout-info-pagamento-alternativo" style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#475569' }}>
                  {pagamento === "pix" && "⚡ O código copia e cola e o QR Code do PIX serão gerados instantaneamente assim que você finalizar o pedido."}
                  {pagamento === "boleto" && "📄 O boleto bancário será gerado para download automático com vencimento para daqui a 3 dias úteis."}
                  {pagamento === "carteira" && "📱 Você será redirecionado com segurança para o ambiente da sua carteira digital parceira para concluir."}
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        </motion.section>

        <motion.aside className="checkout-right" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <article className="checkout-card">
            <h2 className="checkout-card-title">Resumo do pedido</h2>
            <article className="checkout-produto">
              <figure className="checkout-produto-img"><img src={imgProduto} alt="Dispositivo Sopro" /></figure>
              <section className="checkout-produto-info">
                <header className="checkout-produto-header">
                  <span className="checkout-produto-nome">Dispositivo Sopro</span>
                  <span className="checkout-produto-preco">R$ 350,50</span>
                </header>
                <span className="checkout-produto-cor">Cor: {corProduto} </span>
                <div className="checkout-quantidade">
                  <button type="button" onClick={() => setQuantidade(Math.max(1, quantidade - 1))}><img src={menos} alt="Diminuir" /></button>
                  <span>{quantidade}</span>
                  <button type="button" onClick={() => setQuantidade(quantidade + 1)}><img src={mais} alt="Aumentar" /></button>
                </div>
              </section>
            </article>

            <p className="checkout-plano-label">Adicionar plano de software</p>
            <fieldset className="checkout-planos" aria-label="Planos de software">
              {Object.entries(planos).map(([key, plano]) => (
                <button key={key} type="button" className={`checkout-plano-btn ${planoSelecionado === key ? "active" : ""}`} onClick={() => setPlanoSelecionado(key)}>
                  <img src={circuloSelecionado} alt="" className={`checkout-plano-radio ${planoSelecionado === key ? "visible" : ""}`} />
                  <span className="checkout-plano-nome">{plano.label}</span>
                  <span className="checkout-plano-preco">{plano.preco === 0 ? "Grátis" : `+ R$ ${plano.preco.toFixed(2).replace(".", ",")} / mês`}</span>
                </button>
              ))}
            </fieldset>

            <section className="checkout-resumo">
              <p className="checkout-resumo-linha"><span>Dispositivo Sopro</span><span>R$ {(precoBase * quantidade).toFixed(2).replace(".", ",")}</span></p>
              {precoPlano > 0 && (
                <p className="checkout-resumo-linha">
                  <span>{planos[planoSelecionado].label}</span>
                  <span>+ R$ {precoPlano.toFixed(2).replace(".", ",")} / mês</span>
                </p>
              )}
              <p className="checkout-resumo-linha"><span className="checkout-frete"><img src={caminhaoAzul} alt="Frete" />Frete</span><span className="checkout-gratis">Grátis</span></p>
              <p className="checkout-resumo-total"><span>Total</span><span>R$ {total}</span></p>
            </section>

            <button type="button" className="checkout-finalizar" onClick={handleFinalizarCompraSubmit} disabled={carregando}>
              <img src={carrinhoDeCompra} alt="" />
              {carregando ? "PROCESSANDO..." : "FINALIZAR COMPRA"}
            </button>
          </article>
        </motion.aside>
      </section>
    </main>
  );
};

export default Checkout;
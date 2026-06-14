import { useState } from "react";
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
import imgProduto from "../../assets/images/compra/imgCompra1.png";
import { useNavigate } from "react-router-dom"; 
import { motion } from 'framer-motion';

const Checkout = () => {
  const navigate = useNavigate();
  const [planoSelecionado, setPlanoSelecionado] = useState("dispositivo");
  const [quantidade, setQuantidade] = useState(1);
  const [pagamento, setPagamento] = useState("pix");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\\d{4})(?=\\d)/g, '$1 ');
  };

  const parcelaOpcoes = [
    { value: '1', label: '1x de R$ 200,97 sem juros' },
    { value: '2', label: '2x de R$ 100,49 sem juros' },
    { value: '3', label: '3x de R$ 66,99 sem juros' },
    { value: '6', label: '6x de R$ 33,50 sem juros' },
    { value: '12', label: '12x de R$ 16,75 com juros' },
  ];
  const [parcelas, setParcelas] = useState('1');

  const precoBase = 200.97;
  const planos = {
    dispositivo: { label: "Só o dispositivo", preco: 0 },
    basico: { label: "Sopro Autonomia - Básico", preco: 49.9 },
    pro: { label: "Voz Ativa - Pro", preco: 89.9 },
    elite: { label: "Cuidado Total - Elite", preco: 149.9 },
  };

  const precoPlano = planos[planoSelecionado].preco;
  const valorTotalCalculado = (precoBase * quantidade + precoPlano);
  const totalFormatado = valorTotalCalculado.toFixed(2).replace(".", ",");

  const pagamentos = [
    { id: "pix", label: "PIX", icon: qrCode },
    { id: "cartao", label: "Cartão de crédito ou débito", icon: cartaoCredito },
    { id: "boleto", label: "Boleto Bancário", icon: codigoBarras },
    { id: "carteira", label: "Carteiras Digitais", icon: carteira },
  ];

  
  const handleFinalizarCompra = async () => {
    setErro("");
    if (!cep || !endereco || !numero || !bairro || !cidade || !estado) {
      setErro("Por favor, preencha todos os campos obrigatórios do endereço de entrega.");
      return;
    }

    setCarregando(true);
    try {
      const token = localStorage.getItem('@Sopro:token');
      const emailLogado = localStorage.getItem('@Sopro:email');

      
      const response = await fetch(`https://sopro-backend.azurewebsites.net/api/assinaturas/checkout?email=${emailLogado}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plano: planoSelecionado.toUpperCase(),
          valorPlano: precoPlano,
          incluiDispositivo: true,
          valorDispositivo: precoBase * quantidade,
          produtoDescricao: `${quantidade}x Dispositivo Sopro - Cor Branca`,
          valor: valorTotalCalculado,
          formaPagamento: pagamento.toUpperCase(),
          transactionId: "TRX-" + Math.floor(Math.random() * 900000 + 100000), 
          cep: cep,
          numero: numero,
          complemento: complemento,
          bairro: bairro,
          cidade: cidade,
          estado: estado
        })
      });

      if (!response.ok) {
        throw new Error("Erro de comunicação ao processar faturamento e logística da assinatura.");
      }

      
      navigate("/pedidoconfirmado");
    } catch (err) {
      console.error(err);
      setErro(err.message || "Não foi possível registrar o seu pedido.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="checkout-page">
      <section className="checkout-container">
         <motion.section
          className="checkout-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <article className="checkout-card">
            <h2 className="checkout-card-title">Endereço de entrega</h2>
            {erro && <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '12px' }}>{erro}</p>}
            <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
              <fieldset className="checkout-fieldset">
                <div className="checkout-field">
                  <label htmlFor="cep">CEP *</label>
                  <input id="cep" type="text" className="checkout-input"
                      maxLength={8}
                      value={cep}
                      inputMode="numeric"
                      onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                    />
                </div>
                <div className="checkout-row">
                  <div className="checkout-field grow">
                    <label htmlFor="endereco">Endereço *</label>
                    <input
                      id="endereco"
                      type="text"
                      className="checkout-input"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                  </div>
                  <div className="checkout-field small">
                    <label htmlFor="numero">Número *</label>
                    <input id="numero" type="text" className="checkout-input"
                          maxLength={6}
                          value={numero}
                          inputMode="numeric"
                          onChange={(e) => setNumero(e.target.value.replace(/\D/g, ''))}
                        />
                  </div>
                </div>
                <div className="checkout-row">
                  <div className="checkout-field grow">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      id="complemento"
                      type="text"
                      className="checkout-input"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                    />
                  </div>
                  <div className="checkout-field grow">
                    <label htmlFor="bairro">Bairro *</label>
                    <input id="bairro" type="text" className="checkout-input" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                  </div>
                </div>
                <div className="checkout-row">
                  <div className="checkout-field grow">
                    <label htmlFor="cidade">Cidade *</label>
                    <input id="cidade" type="text" className="checkout-input" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                  </div>
                  <div className="checkout-field grow">
                    <label htmlFor="estado">Estado *</label>
                    <input id="estado" type="text" className="checkout-input" maxLength={2} value={estado} onChange={(e) => setEstado(e.target.value)} />
                  </div>
                </div>
              </fieldset>
            </form>
          </article>

          <article className="checkout-card">
            <h2 className="checkout-card-title">Forma de pagamento</h2>
            <nav className="checkout-pagamento-options" aria-label="Formas de pagamento">
              {pagamentos.map((tipo) => (
                <button
                  key={tipo.id}
                  className={`checkout-pagamento-btn ${pagamento === tipo.id ? "active" : ""}`}
                  onClick={() => setPagamento(tipo.id)}
                  aria-pressed={pagamento === tipo.id}
                >
                  <img src={tipo.icon} alt={tipo.label} className="checkout-pagamento-icon" />
                  <span>{tipo.label}</span>
                </button>
              ))}
            </nav>
            <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
              <fieldset className="checkout-fieldset">
                <div className="checkout-field">
                  <label htmlFor="nome-cartao">Nome impresso no cartão</label>
                  <input id="nome-cartao" type="text" className="checkout-input" />
                </div>
                <div className="checkout-field">
                  <label htmlFor="numero-cartao">Número do cartão</label>
               <input id="numero-cartao" type="text" className="checkout-input"
                    maxLength={19}
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    onChange={(e) => { e.target.value = formatCardNumber(e.target.value); }}
                  />
                </div>
                <div className="checkout-row">
                  <div className="checkout-field grow">
                    <label htmlFor="parcelamento">Parcelamento</label>
                    <select
                      id="parcelamento"
                      className="checkout-input checkout-select"
                      value={parcelas}
                      onChange={(e) => setParcelas(e.target.value)}
                    >
                      {parcelaOpcoes.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="checkout-field medium">
                    <label htmlFor="validade">Validade</label>
                    <input id="validade" type="text" className="checkout-input"
                            maxLength={5}
                            placeholder="MM/AA"
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '');
                              if (val.length >= 2) val = val.slice(0,2) + '/' + val.slice(2);
                              e.target.value = val;
                            }}
                          />
                  </div>
                  <div className="checkout-field small">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" type="text" className="checkout-input"
                        maxLength={3}
                        inputMode="numeric"
                        onChange={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                      />
                  </div>
                </div>
              </fieldset>
            </form>
          </article>
        </motion.section>

        <motion.aside
          className="checkout-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <article className="checkout-card">
            <h2 className="checkout-card-title">Resumo do pedido</h2>

            <article className="checkout-produto">
              <figure className="checkout-produto-img">
                <img src={imgProduto} alt="Dispositivo Sopro" />
              </figure>
              <section className="checkout-produto-info">
                <header className="checkout-produto-header">
                  <span className="checkout-produto-nome">Dispositivo Sopro</span>
                  <span className="checkout-produto-preco">R$ 200,97</span>
                </header>
                <span className="checkout-produto-cor">Cor: Branco</span>
                <div className="checkout-quantidade">
                  <button aria-label="Diminuir quantidade" onClick={() => setQuantidade(Math.max(1, quantidade - 1))}>
                    <img src={menos} alt="Diminuir" />
                  </button>
                  <span>{quantidade}</span>
                  <button aria-label="Aumentar quantidade" onClick={() => setQuantidade(quantidade + 1)}>
                    <img src={mais} alt="Aumentar" />
                  </button>
                </div>
              </section>
            </article>

            <p className="checkout-plano-label">Adicionar plano de software</p>

            <fieldset className="checkout-planos" aria-label="Planos de software">
              {Object.entries(planos).map(([key, plano]) => (
                <button
                  key={key}
                  className={`checkout-plano-btn ${planoSelecionado === key ? "active" : ""}`}
                  onClick={() => setPlanoSelecionado(key)}
                  aria-pressed={planoSelecionado === key}
                >
                  <img src={circuloSelecionado} alt="" className={`checkout-plano-radio ${planoSelecionado === key ? "visible" : ""}`} />
                  <span className="checkout-plano-nome">{plano.label}</span>
                  <span className="checkout-plano-preco">
                    {plano.preco === 0 ? "Grátis" : `+ R$ ${plano.preco.toFixed(2).replace(".", ",")}/mês`}
                  </span>
                </button>
              ))}
            </fieldset>

            <section className="checkout-resumo">
              <p className="checkout-resumo-linha">
                <span>Dispositivo Sopro</span>
                <span>R$ {(precoBase * quantidade).toFixed(2).replace(".", ",")}</span>
              </p>
              {precoPlano > 0 && (
                <p className="checkout-resumo-linha">
                  <span>{planos[planoSelecionado].label}</span>
                  <span>+ R$ {precoPlano.toFixed(2).replace(".", ",Format")}/mês</span>
                </p>
              )}
              <p className="checkout-resumo-linha">
                <span className="checkout-frete"><img src={caminhaoAzul} alt="Frete" />Frete</span>
                <span className="checkout-gratis">Grátis</span>
              </p>
              <p className="checkout-resumo-total">
                <span>Total</span>
                <span>R$ {totalFormatado}</span>
              </p>
            </section>
            
            <button 
              className="checkout-finalizar" 
              onClick={handleFinalizarCompra}
              disabled={carregando}
            >
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
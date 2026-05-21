import { useState } from "react";
import "./Checkout.css";
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

const Checkout = () => {
  const [planoSelecionado, setPlanoSelecionado] = useState("dispositivo");
  const [quantidade, setQuantidade] = useState(1);
  const [pagamento, setPagamento] = useState("pix");

  const precoBase = 200.97;
  const planos = {
    dispositivo: { label: "Só o dispositivo", preco: 0 },
    basico: { label: "Sopro Autonomia - Básico", preco: 49.9 },
    pro: { label: "Voz Ativa - Pro", preco: 89.9 },
    elite: { label: "Cuidado Total - Elite", preco: 149.9 },
  };

  const precoPlano = planos[planoSelecionado].preco;
  const total = (precoBase * quantidade + precoPlano)
    .toFixed(2)
    .replace(".", ",");

  const pagamentos = [
    { id: "pix", label: "PIX", icon: qrCode },
    { id: "cartao", label: "Cartão de crédito ou débito", icon: cartaoCredito },
    { id: "boleto", label: "Boleto Bancário", icon: codigoBarras },
    { id: "carteira", label: "Carteiras Digitais", icon: carteira },
  ];

  return (
    <main className="checkout-page">
      <section className="checkout-container">
        <section className="checkout-left">
          <article className="checkout-card">
            <h2 className="checkout-card-title">Endereço de entrega</h2>
            <form className="checkout-form">
              <fieldset className="checkout-fieldset">
                <div className="checkout-field">
                  <label htmlFor="cep">CEP</label>
                  <input id="cep" type="text" className="checkout-input" />
                </div>
                <div className="checkout-row">
                  <div className="checkout-field grow">
                    <label htmlFor="endereco">Endereço</label>
                    <input
                      id="endereco"
                      type="text"
                      className="checkout-input"
                    />
                  </div>
                  <div className="checkout-field small">
                    <label htmlFor="numero">Número</label>
                    <input id="numero" type="text" className="checkout-input" />
                  </div>
                </div>
                <div className="checkout-row">
                  <div className="checkout-field grow">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      id="complemento"
                      type="text"
                      className="checkout-input"
                    />
                  </div>
                  <div className="checkout-field grow">
                    <label htmlFor="bairro">Bairro</label>
                    <input id="bairro" type="text" className="checkout-input" />
                  </div>
                </div>
                <div className="checkout-row">
                  <div className="checkout-field grow">
                    <label htmlFor="cidade">Cidade</label>
                    <input id="cidade" type="text" className="checkout-input" />
                  </div>
                  <div className="checkout-field grow">
                    <label htmlFor="estado">Estado</label>
                    <input id="estado" type="text" className="checkout-input" />
                  </div>
                </div>
              </fieldset>
            </form>
          </article>

          <article className="checkout-card">
            <h2 className="checkout-card-title">Forma de pagamento</h2>
            <nav
              className="checkout-pagamento-options"
              aria-label="Formas de pagamento"
            >
              {pagamentos.map((tipo) => (
                <button
                  key={tipo.id}
                  className={`checkout-pagamento-btn ${pagamento === tipo.id ? "active" : ""}`}
                  onClick={() => setPagamento(tipo.id)}
                  aria-pressed={pagamento === tipo.id}
                >
                  <img
                    src={tipo.icon}
                    alt={tipo.label}
                    className="checkout-pagamento-icon"
                  />
                  <span>{tipo.label}</span>
                </button>
              ))}
            </nav>
            <form className="checkout-form">
              <fieldset className="checkout-fieldset">
                <div className="checkout-field">
                  <label htmlFor="nome-cartao">Nome impresso no cartão</label>
                  <input
                    id="nome-cartao"
                    type="text"
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-field">
                  <label htmlFor="numero-cartao">Número do cartão</label>
                  <input
                    id="numero-cartao"
                    type="text"
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-row">
                  <div className="checkout-field grow">
                    <label htmlFor="parcelamento">Parcelamento</label>
                    <input
                      id="parcelamento"
                      type="text"
                      className="checkout-input"
                    />
                  </div>
                  <div className="checkout-field medium">
                    <label htmlFor="validade">Validade</label>
                    <input
                      id="validade"
                      type="text"
                      className="checkout-input"
                    />
                  </div>
                  <div className="checkout-field small">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" type="text" className="checkout-input" />
                  </div>
                </div>
              </fieldset>
            </form>
          </article>
        </section>

        <aside className="checkout-right">
          <article className="checkout-card">
            <h2 className="checkout-card-title">Resumo do pedido</h2>

            <article className="checkout-produto">
              <figure className="checkout-produto-img">
                <img src={imgProduto} alt="Dispositivo Sopro" />
              </figure>
              <section className="checkout-produto-info">
                <header className="checkout-produto-header">
                  <span className="checkout-produto-nome">
                    Dispositivo Sopro
                  </span>
                  <span className="checkout-produto-preco">R$ 200,97</span>
                </header>
                <span className="checkout-produto-cor">Cor: Branco</span>
                <div className="checkout-quantidade">
                  <button
                    aria-label="Diminuir quantidade"
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                  >
                    <img src={menos} alt="Diminuir" />
                  </button>
                  <span>{quantidade}</span>
                  <button
                    aria-label="Aumentar quantidade"
                    onClick={() => setQuantidade(quantidade + 1)}
                  >
                    <img src={mais} alt="Aumentar" />
                  </button>
                </div>
              </section>
            </article>

            <p className="checkout-plano-label">Adicionar plano de software</p>

            <fieldset
              className="checkout-planos"
              aria-label="Planos de software"
            >
              {Object.entries(planos).map(([key, plano]) => (
                <button
                  key={key}
                  className={`checkout-plano-btn ${planoSelecionado === key ? "active" : ""}`}
                  onClick={() => setPlanoSelecionado(key)}
                  aria-pressed={planoSelecionado === key}
                >
                  <img
                    src={circuloSelecionado}
                    alt=""
                    className={`checkout-plano-radio ${planoSelecionado === key ? "visible" : ""}`}
                  />
                  <span className="checkout-plano-nome">{plano.label}</span>
                  <span className="checkout-plano-preco">
                    {plano.preco === 0
                      ? "Grátis"
                      : `+ R$ ${plano.preco.toFixed(2).replace(".", ",")}/mês`}
                  </span>
                </button>
              ))}
            </fieldset>

            <section className="checkout-resumo">
              <p className="checkout-resumo-linha">
                <span>Dispositivo Sopro</span>
                <span>
                  R$ {(precoBase * quantidade).toFixed(2).replace(".", ",")}
                </span>
              </p>
              {precoPlano > 0 && (
                <p className="checkout-resumo-linha">
                  <span>{planos[planoSelecionado].label}</span>
                  <span>
                    + R$ {precoPlano.toFixed(2).replace(".", ",")}/mês
                  </span>
                </p>
              )}
              <p className="checkout-resumo-linha">
                <span className="checkout-frete">
                  <img src={caminhaoAzul} alt="Frete" />
                  Frete
                </span>
                <span className="checkout-gratis">Grátis</span>
              </p>
              <p className="checkout-resumo-total">
                <span>Total</span>
                <span>R$ {total}</span>
              </p>
            </section>

            <button className="checkout-finalizar">
              <img src={carrinhoDeCompra} alt="" />
              FINALIZAR COMPRA
            </button>
          </article>
        </aside>
      </section>
    </main>
  );
};

export default Checkout;

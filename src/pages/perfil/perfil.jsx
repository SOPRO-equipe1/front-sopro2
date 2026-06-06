import '../perfil/perfil.css';
import SoprinhoImg from '../../assets/images/perfil/soprinho_perfil.svg';
import Iconecaminhao from '../../assets/images/perfil/icone_caminhao_perfil.svg';
import Iconesclamacao from '../../assets/images/perfil/icone_esclamacao_perfil.svg';

const user = {
  name: "Soprinho da Silva",
  plan: "Plano Pro",
  location: "São Paulo, SP",
  email: "soprinhosilva@gmail.com",
  cpf: "000.000.000-00",
  phone: "(11) 94002-8922",
  birthdate: "03/03/2026",
  address: "Rua do Suspiro Profundo, 42 – Ao lado da Suspiro News",
};

const order = {
  code: "#SP-2026-01",
  product: "1x Dispositivo Sopro - Cor Preta",
  tracking: "RU182121051419BR",
  deliveryDate: "01 de setembro de 2026",
  total: "R$ 200,97",
  status: 2,
};

const STATUS_STEPS = ["Confirmado", "Preparando", "Em transporte", "Entregue"];

function Avatar() {
  return (
    <figure className="avatar-perfil">
      <img src={SoprinhoImg} alt="Avatar do usuário Soprinho da Silva" />
    </figure>
  );
}

function OrderProgress({ status }) {
  const pct = (status / (STATUS_STEPS.length - 1)) * 100;
  return (
    <div className="progress-wrap" role="progressbar" aria-valuenow={status} aria-valuemin={0} aria-valuemax={STATUS_STEPS.length - 1} aria-label="Status do pedido">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-steps">
        {STATUS_STEPS.map((label, i) => (
          <div key={label} className="progress-step">
            <span className={`dot ${i <= status ? "active" : ""} ${i === status ? "current" : ""}`} />
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <dl className="info-field">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}

export default function MinhaConta() {
  return (
    <main className="page">
      <h1 className="page-title">Minha Conta</h1>

      {/* Perfil */}
      <section className="card profile-card" aria-label="Informações do perfil">
        <Avatar />
        <div className="profile-info">
          <p className="profile-name">{user.name}</p>
          <span className="badge-pro">{user.plan}</span>
         <address className="profile-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
                 <strong>{user.location}</strong>
          </address>
        </div>
      </section>

      {/* Último pedido */}
      <section className="card" aria-label="Último pedido">
        <p className="section-heading">Último pedido</p>
        <div className="order-two-cols">
          <div className="order-left">
            <article className="order-row">
             <div className="icone_caminhao" aria-hidden="true">
                <img src={Iconecaminhao} alt="" />
              </div>
              <div>
                <p className="order-code">Código do pedido: <strong>{order.code}</strong></p>
                <p className="order-meta">{order.product}</p>
              </div>
            </article>

            <article className="order-row">
             <div className="icone_esclamacao" aria-hidden="true">
                <img src={Iconesclamacao} alt="icone de esclamação que representa ratreio do pedido" />
             </div>
              <div>
                <p className="order-code">Rastreio: <strong>{order.tracking}</strong></p>
                 <p className="order-meta">Data de entrega prevista: <span className="order-valor-data">{order.deliveryDate}</span></p>                
                 <p className="order-valor">Total: {order.total}</p>
              </div>
            </article>
          </div>

          <div className="order-right">
            <OrderProgress status={order.status} />
            <button className="track-btn" >
              Rastrear pedido
            </button>
          </div>
          </div>
      </section>

      {/* Informações pessoais */}
      <section className="card" aria-label="Informações pessoais">
        <p className="section-heading">Informações pessoais</p>
        <div className="info-grid">
          <InfoField label="Nome completo:" value={user.name} />
          <InfoField label="CPF:" value={user.cpf} />
          <InfoField label="Telefone celular:" value={user.phone} />
          <InfoField label="Endereço de e-mail:" value={user.email} />
          <InfoField label="Data de nascimento:" value={user.birthdate} />
          <InfoField label="Endereço:" value={user.address} />
        </div>
      </section>
    </main>
  );
}
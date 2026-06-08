<div align="center">

<img src="https://github.com/SOPRO-equipe1/.github/blob/main/profile/logo.png" alt="SOPRO Logo" width="180">

# Interface
### *Sua voz, seu sopro.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Figma](https://img.shields.io/badge/Design-Figma-F24E1E?logo=figma&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)
![Accessibility](https://img.shields.io/badge/Acessibilidade-WCAG%202.1-blueviolet)

---

## 📽️ A jornada do usuário
*A experiência de quem utiliza o SOPRO, do primeiro contato à comunicação real.*

<details>
  <summary>Jornada do usuário</summary>
    
```mermaid
graph LR
    %% Definição de Estilos Avançados
    classDef azul fill:#1A53FF,stroke:#FAFCFF,color:#FAFCFF,stroke-width:3px,font-weight:bold;
    classDef roxo fill:#9333EA,stroke:#FAFCFF,color:#FAFCFF,stroke-width:3px,font-weight:bold;
    classDef verde fill:#30BD30,stroke:#1D252A,color:#1D252A,stroke-width:3px,font-weight:bold;
    classDef laranja fill:#F97316,stroke:#1D252A,color:#1D252A,stroke-width:3px,font-weight:bold;
    classDef preto fill:#1D252A,stroke:#FAFCFF,color:#FAFCFF,stroke-width:3px,font-weight:bold;
    classDef branco fill:#FAFCFF,stroke:#1D252A,color:#1D252A,stroke-width:3px,font-weight:bold;

    %% Nós com Ícones e Texto
    LP["🏠 Landing Page"] 
    PP["📦 Produto"] 
    PC["🛒 Comprar"] 
    LC["🔐 Login / Cadastro"] 
    CH["💳 Checkout"] 
    CC["✅ Conclusão"]

    %% Fluxo com setas estilizadas
    LP ==> PP ==> PC ==> LC ==> CH ==> CC

    %% Aplicação das Cores
    class LP azul;
    class PP roxo;
    class PC verde;
    class LC laranja;
    class CH preto;
    class CC branco;

    %% Subgráficos para organização visual (opcional)
    subgraph Jornada do Cliente
    LP
    PP
    PC
    LC
    CH
    CC
    end
```

</details>


##  Ecossistema de interação
*Onde a tecnologia encontra a humanidade.*

<table align="center" style="border: none;">
  <tr>
    <td align="center" width="45%" style="vertical-align: top;">
      <h3>🤖 Chatbot de suporte</h3>
      <p>Auxílio imediato para familiares e cuidadores configurarem o dispositivo.</p>
      <br>
      <img src="https://github.com/SOPRO-equipe1/front-sopro/blob/main/imagesReadme/Chatbot.png?raw=true" alt="Preview Chatbot" width="300">
      <br><br>
      
  </td>
    <td align="center" width="45%" style="vertical-align: top;">
      <h3>♿ Ferramenta de acessibilidade</h3>
      <p>Ajustes dinâmicos de contraste, voz e tamanho para diferentes necessidades.Ferramenta feita especialmente por nós</p>
      <br>
      <img src="https://github.com/SOPRO-equipe1/front-sopro2/blob/main/src/assets/imagesReadme/AcessibilidadeSOPRO.png?raw=true" alt="Preview Acessibilidade" width="320">
      <br><br>
     
  </td>
  </tr>
</table>

---
---

##  Design System & UI
*Focado em simplicidade cognitiva e alta legibilidade.*

### 1. Interface adaptativa 
Nossa interface foi construída para ser leve. O frontend consome os dados do **Edge AI** em tempo real, garantindo que o feedback visual do sopro seja instantâneo.

### 2. Acessibilidade 
 **Contraste Elevado:** Seguindo diretrizes WCAG para usuários com baixa visão.
 **Navegação Simplificada:** Menos cliques, mais ação.
 **Feedback Sonoro:** Confirmação visual e auditiva de cada comando enviado pelo hardware.

---

## 💻 Stack de Frontend

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

---


---

<p align="center">
<b>SOPRO Equipe 1</b> • Licença MIT • 2026
</p>

</div>

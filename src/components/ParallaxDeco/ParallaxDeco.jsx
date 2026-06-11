import { useEffect, useRef } from 'react';
import './ParallaxDeco.css';

// Desenha um dente-de-leão completo em SVG inline
function criarDenteleao(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'denteleao-cai';

    const x        = 8 + Math.random() * 84;          // % horizontal
    const size     = 40 + Math.random() * 40;          // 40–80px
    const dur      = 8  + Math.random() * 10;          // 8–18s
    const drift    = (Math.random() - 0.5) * 120;      // deriva lateral px
    const delay    = Math.random() * 2;                // 0–2s de delay
    const opacity  = 0.70 + Math.random() * 0.25;      // 0.70–0.95

    wrapper.style.cssText = `
        left: ${x}%;
        top: -80px;
        width: ${size}px;
        height: ${size}px;
        --drift: ${drift}px;
        --dur: ${dur}s;
        --delay: ${delay}s;
        opacity: 0;
    `;

    // SVG do dente-de-leão: caule + pétalas + centro
    const n = 16; // número de pétalas
    let petals = '';
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * 360;
        petals += `<line
            x1="50" y1="50"
            x2="${50 + 38 * Math.cos((angle * Math.PI) / 180)}"
            y2="${50 + 38 * Math.sin((angle * Math.PI) / 180)}"
            stroke="#c8d8a0" stroke-width="1.8" stroke-linecap="round"
        />
        <circle
            cx="${50 + 42 * Math.cos((angle * Math.PI) / 180)}"
            cy="${50 + 42 * Math.sin((angle * Math.PI) / 180)}"
            r="5" fill="white" stroke="#c8d8a0" stroke-width="1.2"
        />`;
    }

    wrapper.innerHTML = `
        <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.15}">
            <!-- Caule -->
            <line x1="50" y1="88" x2="50" y2="115"
                stroke="#5a9e4a" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Pétalas -->
            ${petals}
            <!-- Centro -->
            <circle cx="50" cy="50" r="9" fill="#b5c96a"/>
            <circle cx="50" cy="50" r="5" fill="#8faa42"/>
        </svg>
    `;

    container.appendChild(wrapper);
    wrapper.getBoundingClientRect(); // força reflow
    wrapper.classList.add('denteleao-cai--ativo');

    setTimeout(() => wrapper.remove(), (dur + delay) * 1000 + 500);
}

export default function ParallaxDeco() {
    const ref = useRef(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        let timeout;
        const soltar = () => {
            criarDenteleao(container);
            // Intervalo entre 1.5s e 4s — espaçado, não poluído
            timeout = setTimeout(soltar, 800 + Math.random() * 1700);
        };

        const inicio = setTimeout(soltar, 800);
        return () => { clearTimeout(inicio); clearTimeout(timeout); };
    }, []);

    return <div ref={ref} className="parallax-deco" aria-hidden="true" />;
}

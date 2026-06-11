import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import './ParallaxDeco.css';

// Dente-de-leão em SVG puro caindo pela tela
function criarDenteleao(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'denteleao-cai';

    const x       = 8  + Math.random() * 84;
    const size    = 40 + Math.random() * 40;
    const dur     = 8  + Math.random() * 10;
    const drift   = (Math.random() - 0.5) * 120;
    const delay   = Math.random() * 2;

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

    const n = 16;
    let petals = '';
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * 360;
        petals += `
        <line x1="50" y1="50"
            x2="${50 + 38 * Math.cos((angle * Math.PI) / 180)}"
            y2="${50 + 38 * Math.sin((angle * Math.PI) / 180)}"
            stroke="#c8d8a0" stroke-width="1.8" stroke-linecap="round"/>
        <circle
            cx="${50 + 42 * Math.cos((angle * Math.PI) / 180)}"
            cy="${50 + 42 * Math.sin((angle * Math.PI) / 180)}"
            r="5" fill="white" stroke="#c8d8a0" stroke-width="1.2"/>`;
    }

    wrapper.innerHTML = `
        <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.15}">
            <line x1="50" y1="88" x2="50" y2="115" stroke="#5a9e4a" stroke-width="2.5" stroke-linecap="round"/>
            ${petals}
            <circle cx="50" cy="50" r="9" fill="#b5c96a"/>
            <circle cx="50" cy="50" r="5" fill="#8faa42"/>
        </svg>`;

    container.appendChild(wrapper);
    wrapper.getBoundingClientRect();
    wrapper.classList.add('denteleao-cai--ativo');
    setTimeout(() => wrapper.remove(), (dur + delay) * 1000 + 500);
}

// Linha serpentina que se desenha com o scroll
function LinhaSerpentina() {
    const { scrollYProgress } = useScroll();
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity    = useTransform(scrollYProgress, [0, 0.02, 0.95, 1], [0, 1, 1, 0]);

    return (
        <svg className="linha-svg" viewBox="0 0 1440 5200"
            preserveAspectRatio="xMidYMin slice"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="serpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#7C3AED"/>
                    <stop offset="20%"  stopColor="#9333EA"/>
                    <stop offset="45%"  stopColor="#92400E"/>
                    <stop offset="70%"  stopColor="#D97706"/>
                    <stop offset="100%" stopColor="#F59E0B"/>
                </linearGradient>
                <filter id="brilho" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            {/* Brilho */}
            <motion.path
                d="M 180 0 C 180 350,1260 500,1260 850 C 1260 1100,180 1250,180 1550 C 180 1800,1200 1950,1200 2250 C 1200 2500,180 2650,180 2950 C 180 3200,1200 3350,1200 3650 C 1200 3900,180 4050,180 4350 C 180 4650,900 4900,720 5200"
                stroke="url(#serpGrad)" strokeWidth="22" strokeLinecap="round"
                fill="none" opacity="0.18" filter="url(#brilho)"
                style={{ pathLength, opacity }}
            />
            {/* Linha principal */}
            <motion.path
                d="M 180 0 C 180 350,1260 500,1260 850 C 1260 1100,180 1250,180 1550 C 180 1800,1200 1950,1200 2250 C 1200 2500,180 2650,180 2950 C 180 3200,1200 3350,1200 3650 C 1200 3900,180 4050,180 4350 C 180 4650,900 4900,720 5200"
                stroke="url(#serpGrad)" strokeWidth="7" strokeLinecap="round"
                fill="none"
                style={{ pathLength, opacity }}
            />
        </svg>
    );
}

export default function ParallaxDeco() {
    const ref = useRef(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        let timeout;
        const soltar = () => {
            criarDenteleao(container);
            timeout = setTimeout(soltar, 800 + Math.random() * 1700);
        };

        const inicio = setTimeout(soltar, 800);
        return () => { clearTimeout(inicio); clearTimeout(timeout); };
    }, []);

    return (
        <div ref={ref} className="parallax-deco" aria-hidden="true">
            <LinhaSerpentina />
        </div>
    );
}

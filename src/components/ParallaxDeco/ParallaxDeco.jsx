import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import './ParallaxDeco.css';

export default function ParallaxDeco() {
    const containerRef = useRef(null);
    const [pageHeight, setPageHeight] = useState(5200);

    useEffect(() => {
        const update = () => {
            const h = document.documentElement.scrollHeight;
            setPageHeight(h);
        };
        update();
        setTimeout(update, 500);
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // offset: start start = quando o topo do container chega ao topo da tela
    // offset: end end     = quando o fundo do container chega ao fundo da tela
    // Isso faz o pathLength mapear 0→1 exatamente no trecho visível
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const pathLength = useTransform(scrollYProgress, [0, isMobile ? 0.75 : 1], [0, 1]);
    const opacity    = useTransform(scrollYProgress, [0, 0.01, 0.98, 1], [0, 1, 1, 0]);

    const h = pageHeight;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const vw   = isMobile ? 480  : 1440;
    const xL   = isMobile ? 48   : 180;
    const xR   = isMobile ? 432  : 1260;
    const xM   = isMobile ? 420  : 1200;
    const xMid = isMobile ? 240  : 720;

    const d = `
        M ${xL} 0
        C ${xL} ${h*0.07}, ${xR} ${h*0.10}, ${xR} ${h*0.16}
        C ${xR} ${h*0.21}, ${xL} ${h*0.24}, ${xL} ${h*0.30}
        C ${xL} ${h*0.35}, ${xM} ${h*0.38}, ${xM} ${h*0.43}
        C ${xM} ${h*0.48}, ${xL} ${h*0.51}, ${xL} ${h*0.57}
        C ${xL} ${h*0.62}, ${xM} ${h*0.65}, ${xM} ${h*0.70}
        C ${xM} ${h*0.75}, ${xL} ${h*0.78}, ${xL} ${h*0.84}
        C ${xL} ${h*0.89}, ${xM} ${h*0.92}, ${xM} ${h*0.97}
        C ${xM} ${h*0.99}, ${xMid} ${h}, ${xMid} ${h}
    `;

    return (
        <div ref={containerRef} className="parallax-deco" aria-hidden="true">
            <svg
                className="linha-svg"
                viewBox={`0 0 ${vw} ${pageHeight}`}
                preserveAspectRatio="xMidYMin meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="serpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%"   stopColor="#00C8FF"/>
                        <stop offset="33%"  stopColor="#00D97A"/>
                        <stop offset="66%"  stopColor="#8DC63F"/>
                        <stop offset="100%" stopColor="#F97316"/>
                    </linearGradient>
                    <filter id="brilho" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Brilho */}
                <motion.path
                    d={d}
                    stroke="url(#serpGrad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.12"
                    filter="url(#brilho)"
                    style={{ pathLength, opacity }}
                />
                {/* Linha principal */}
                <motion.path
                    d={d}
                    stroke="url(#serpGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                    style={{ pathLength, opacity }}
                />
            </svg>
        </div>
    );
}

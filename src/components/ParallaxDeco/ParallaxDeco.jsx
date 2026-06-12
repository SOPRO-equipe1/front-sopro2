import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import './ParallaxDeco.css';

export default function ParallaxDeco() {
    const containerRef = useRef(null);
    const [pageHeight, setPageHeight] = useState(5200);

    // Mede a altura real da página para o SVG acompanhar exatamente
    useEffect(() => {
        const update = () => {
            const h = document.documentElement.scrollHeight;
            setPageHeight(h);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // Scroll relativo ao documento inteiro
    const { scrollYProgress } = useScroll();
    // Mobile tem página mais longa — comprime o range para a linha aparecer mais cedo
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const pathLength = useTransform(
        scrollYProgress,
        isMobile ? [0, 0.7] : [0, 1],
        [0, 1]
    );
    const opacity = useTransform(
        scrollYProgress,
        isMobile ? [0, 0.01, 0.65, 0.7] : [0, 0.01, 0.98, 1],
        [0, 1, 1, 0]
    );

    // Path serpentina: pontos X fixos, Y proporcionais à altura real
    const h = pageHeight;
    const d = `
        M 180 0
        C 180 ${h*0.07}, 1260 ${h*0.10}, 1260 ${h*0.16}
        C 1260 ${h*0.21}, 180  ${h*0.24}, 180  ${h*0.30}
        C 180  ${h*0.35}, 1200 ${h*0.38}, 1200 ${h*0.43}
        C 1200 ${h*0.48}, 180  ${h*0.51}, 180  ${h*0.57}
        C 180  ${h*0.62}, 1200 ${h*0.65}, 1200 ${h*0.70}
        C 1200 ${h*0.75}, 180  ${h*0.78}, 180  ${h*0.84}
        C 180  ${h*0.89}, 1200 ${h*0.92}, 1200 ${h*0.97}
        C 1200 ${h*0.99}, 720  ${h}, 720 ${h}
    `;

    return (
        <div ref={containerRef} className="parallax-deco" aria-hidden="true">
            <svg
                className="linha-svg"
                viewBox={`0 0 1440 ${pageHeight}`}
                preserveAspectRatio="xMidYMin slice"
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

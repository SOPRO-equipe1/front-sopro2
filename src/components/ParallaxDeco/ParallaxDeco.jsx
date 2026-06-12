import { useScroll, useTransform, motion } from 'framer-motion';
import './ParallaxDeco.css';

export default function ParallaxDeco() {
    const { scrollYProgress } = useScroll();
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        // Fixed na viewport — sempre visível onde o usuário está
        <div className="parallax-deco" aria-hidden="true">
            <motion.svg
                className="linha-svg"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ scaleY, transformOrigin: 'top' }}
            >
                <defs>
                    <linearGradient id="serpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%"   stopColor="#00C8FF"/>
                        <stop offset="33%"  stopColor="#00D97A"/>
                        <stop offset="66%"  stopColor="#8DC63F"/>
                        <stop offset="100%" stopColor="#F97316"/>
                    </linearGradient>
                    <filter id="brilho">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Curvas que atravessam a tela de lado a lado */}
                {/* Brilho */}
                <path
                    d="
                        M 180 0
                        C 180 8, 1260 12, 1260 20
                        C 1260 28, 180 32, 180 40
                        C 180 48, 1200 52, 1200 60
                        C 1200 68, 180 72, 180 80
                        C 180 88, 1200 92, 1200 100
                    "
                    stroke="url(#serpGrad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.12"
                    filter="url(#brilho)"
                />
                {/* Linha principal */}
                <path
                    d="
                        M 180 0
                        C 180 8, 1260 12, 1260 20
                        C 1260 28, 180 32, 180 40
                        C 180 48, 1200 52, 1200 60
                        C 1200 68, 180 72, 180 80
                        C 180 88, 1200 92, 1200 100
                    "
                    stroke="url(#serpGrad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                />
            </motion.svg>
        </div>
    );
}

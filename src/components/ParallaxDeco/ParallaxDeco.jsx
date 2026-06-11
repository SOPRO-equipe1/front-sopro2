import { useScroll, useTransform, motion } from 'framer-motion';
import './ParallaxDeco.css';

export default function ParallaxDeco() {
    const { scrollYProgress } = useScroll();
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity    = useTransform(scrollYProgress, [0, 0.02, 0.95, 1], [0, 1, 1, 0]);

    return (
        <div className="parallax-deco" aria-hidden="true">
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
        </div>
    );
}

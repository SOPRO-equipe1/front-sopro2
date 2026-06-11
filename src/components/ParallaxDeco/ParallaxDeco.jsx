import { useScroll, useTransform, motion } from 'framer-motion';
import './ParallaxDeco.css';

// Path desktop: viewBox 1440px, linha vai de x=180 até x=1260
const PATH_DESKTOP = `
    M 180  0
    C 180  350, 1260  500, 1260  850
    C 1260 1100, 180 1250, 180  1550
    C 180  1800, 1200 1950, 1200 2250
    C 1200 2500, 180  2650, 180  2950
    C 180  3200, 1200 3350, 1200 3650
    C 1200 3900, 180  4050, 180  4350
    C 180  4650, 900  4900, 720  5200
`;

// Path mobile: viewBox 390px, linha vai de x=40 até x=350
const PATH_MOBILE = `
    M 40   0
    C 40   350, 350  500, 350  850
    C 350  1100, 40  1250, 40  1550
    C 40   1800, 330 1950, 330 2250
    C 330  2500, 40  2650, 40  2950
    C 40   3200, 330 3350, 330 3650
    C 330  3900, 40  4050, 40  4350
    C 40   4650, 195 4900, 195 5200
`;

function LinhaPath({ path, gradId, filterId }) {
    const { scrollYProgress } = useScroll();
    const pathLength = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
    const opacity    = useTransform(scrollYProgress, [0, 0.01, 0.98, 1], [0, 1, 1, 0]);

    return (
        <>
            {/* Brilho */}
            <motion.path
                d={path}
                stroke={`url(#${gradId})`}
                strokeWidth="20"
                strokeLinecap="round"
                fill="none"
                opacity="0.15"
                filter={filterId ? `url(#${filterId})` : undefined}
                style={{ pathLength, opacity }}
            />
            {/* Linha principal */}
            <motion.path
                d={path}
                stroke={`url(#${gradId})`}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength, opacity }}
            />
        </>
    );
}

export default function ParallaxDeco() {
    return (
        <div className="parallax-deco" aria-hidden="true">

            {/* ── Desktop (>768px) ── */}
            <svg
                className="linha-svg linha-svg--desktop"
                viewBox="0 0 1440 5200"
                preserveAspectRatio="xMidYMin meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="gradD" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%"   stopColor="#7C3AED"/>
                        <stop offset="20%"  stopColor="#9333EA"/>
                        <stop offset="45%"  stopColor="#92400E"/>
                        <stop offset="70%"  stopColor="#D97706"/>
                        <stop offset="100%" stopColor="#F59E0B"/>
                    </linearGradient>
                    <filter id="brilhoD" x="-20%" y="-5%" width="140%" height="110%">
                        <feGaussianBlur stdDeviation="6"/>
                    </filter>
                </defs>
                <LinhaPath path={PATH_DESKTOP} gradId="gradD" filterId="brilhoD" />
            </svg>

            {/* ── Mobile (≤768px) ── */}
            <svg
                className="linha-svg linha-svg--mobile"
                viewBox="0 0 390 5200"
                preserveAspectRatio="xMidYMin meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="gradM" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%"   stopColor="#7C3AED"/>
                        <stop offset="20%"  stopColor="#9333EA"/>
                        <stop offset="45%"  stopColor="#92400E"/>
                        <stop offset="70%"  stopColor="#D97706"/>
                        <stop offset="100%" stopColor="#F59E0B"/>
                    </linearGradient>
                    <filter id="brilhoM" x="-20%" y="-5%" width="140%" height="110%">
                        <feGaussianBlur stdDeviation="4"/>
                    </filter>
                </defs>
                <LinhaPath path={PATH_MOBILE} gradId="gradM" filterId="brilhoM" />
            </svg>

        </div>
    );
}

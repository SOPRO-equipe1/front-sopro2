import { useScroll, useTransform, motion } from 'framer-motion';

export default function FitaScroll() {
    const { scrollYProgress } = useScroll();
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div
            style={{
                scaleY,
                transformOrigin: 'top',
                position: 'fixed',
                top: 0,
                right: '3px',
                width: '5px',
                height: '100vh',
                background: 'linear-gradient(to bottom, #00C8FF, #00D97A, #8DC63F)',
                borderRadius: '0 0 3px 3px',
                zIndex: 100,
                pointerEvents: 'none',
            }}
        />
    );
}

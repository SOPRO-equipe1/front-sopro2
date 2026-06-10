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
                right: '6px',
                width: '4px',
                height: '100vh',
                background: 'linear-gradient(to bottom, #00C8FF, #00D97A, #8DC63F)',
                borderRadius: '0 0 4px 4px',
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        />
    );
}

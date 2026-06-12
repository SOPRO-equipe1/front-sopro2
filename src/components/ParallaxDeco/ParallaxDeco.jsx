import { useScroll, useTransform, motion } from 'framer-motion';
import './ParallaxDeco.css';

export default function ParallaxDeco() {
    const { scrollYProgress } = useScroll();
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div
            className="linha-fixa"
            style={{ scaleY, transformOrigin: 'top' }}
            aria-hidden="true"
        />
    );
}

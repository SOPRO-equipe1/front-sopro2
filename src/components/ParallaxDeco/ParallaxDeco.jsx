import { useScroll, useTransform, motion } from 'framer-motion';
import './ParallaxDeco.css';

export default function ParallaxDeco() {
    const { scrollYProgress } = useScroll();

    // scaleY vai de 0 a 1 exatamente com o scroll — sem delay, sem cálculo de path
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="parallax-deco" aria-hidden="true">
            {/* Linha central que cresce de cima para baixo com o scroll */}
            <motion.div
                className="linha-central"
                style={{ scaleY, transformOrigin: 'top' }}
            />
        </div>
    );
}

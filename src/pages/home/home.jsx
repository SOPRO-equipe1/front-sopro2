import './home.css';
import Hero     from '../../components/sections/hero.jsx';
import Section2 from '../../components/sections/section2.jsx';
import Section3 from '../../components/sections/section3.jsx';
import Section4 from '../../components/sections/section4.jsx';
import Section5 from '../../components/sections/section5.jsx';
import Section6 from '../../components/sections/section6.jsx';

function Home() {
    return (
        <main>
            <Hero />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
        </main>
    );
}

export default Home;

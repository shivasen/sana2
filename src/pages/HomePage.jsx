import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Philosophy from '@/components/sections/Philosophy';
import Booking from '@/components/sections/Booking';
import Footer from '@/components/layout/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Philosophy />
        <Booking />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

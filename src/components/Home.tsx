import Link from 'next/link';
import { Button } from '@/components/ui/button';
import About from './About';
import Works from './Works';

const Home = () => {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <section className="text-center mb-8 h-[80vh] flex flex-col justify-center items-center md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">S Soumyakanta</h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4 md:mb-8">Full-Stack Developer</h2>
          <p className="max-w-xl md:max-w-lg mx-auto text-base sm:text-lg mb-6 md:mb-8">
            Helping businesses build robust and scalable web applications.
          </p>
          <Link href="/contact">
            <Button className='uppercase font-bold'>Contact</Button>
          </Link>
        </section>
        <section id="about" className='min-h-screen flex justify-center items-center'>
          <About />
        </section>
        <section id="works" className='min-h-screen flex justify-center items-center'>
          <Works />
        </section>
      </main>
    </div>
  );
};

export default Home;

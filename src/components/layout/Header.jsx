import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/#services', label: 'SERVICES' },
  { href: '/skin-analysis', label: 'AI SKIN ANALYSIS' },
  { href: '/#philosophy', label: 'PHILOSOPHY' },
  { href: '/#contact', label: 'CONTACT' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute w-full z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-light tracking-widest text-white">CHROME·BLUSH</Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white hover:text-rose-300/80 transition-colors duration-300">
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="text-white hover:bg-zinc-800 hover:text-white">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-rose-500/80 backdrop-blur-sm text-white rounded-full hover:bg-rose-400 transition-all duration-300">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white text-2xl hover:bg-transparent">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-zinc-950 text-white border-zinc-800 w-[250px] sm:w-[300px]">
                <SheetHeader className="flex flex-row justify-between items-center">
                  <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-light tracking-widest text-white">CHROME·BLUSH</Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white text-2xl hover:bg-zinc-800">
                    <X />
                  </Button>
                </SheetHeader>
                <nav className="flex flex-col space-y-6 mt-10">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-lg hover:text-rose-300/80 transition-colors duration-300">
                      {link.label}
                    </a>
                  ))}
                  <div className="border-t border-zinc-800 pt-6 flex flex-col space-y-4">
                    <Button asChild variant="outline" className="w-full border-zinc-700">
                      <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild className="w-full bg-rose-500/80">
                      <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#treatments', label: 'TREATMENTS' },
  { href: '#philosophy', label: 'PHILOSOPHY' },
  { href: '#gallery', label: 'GALLERY' },
  { href: '#contact', label: 'CONTACT' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute w-full z-50 mix-blend-difference">
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <a href="#" className="text-xl font-light tracking-widest text-white">CHROME·BLUSH</a>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white hover:text-rose-300/80 transition-colors duration-300">
                {link.label}
              </a>
            ))}
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
                  <a href="#" className="text-xl font-light tracking-widest text-white">CHROME·BLUSH</a>
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

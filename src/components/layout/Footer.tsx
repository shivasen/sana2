const footerLinks = {
    treatments: [
      { href: '#', label: 'Chrome Revival' },
      { href: '#', label: 'Satin Surface' },
      { href: '#', label: 'Architecture Lift' },
      { href: '#', label: 'Custom Experiences' },
    ],
    about: [
      { href: '#', label: 'Our Story' },
      { href: '#', label: 'Philosophy' },
      { href: '#', label: 'Team' },
      { href: '#', label: 'Press' },
    ],
    connect: [
      { href: '#', label: 'Instagram' },
      { href: '#', label: 'Pinterest' },
      { href: '#', label: 'TikTok' },
    ],
  };
  
  const Footer = () => {
    return (
      <footer className="py-12 border-t border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-light mb-6">CHROME·BLUSH</h3>
              <p className="text-zinc-400 font-light">Where satin brutalism meets lipstick futurism. A beauty experience beyond convention.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-light mb-6 text-rose-300">TREATMENTS</h4>
              <ul className="space-y-3 text-zinc-400">
                {footerLinks.treatments.map(link => (
                  <li key={link.label}><a href={link.href} className="hover:text-white transition-colors duration-300">{link.label}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-light mb-6 text-rose-300">ABOUT</h4>
              <ul className="space-y-3 text-zinc-400">
                {footerLinks.about.map(link => (
                  <li key={link.label}><a href={link.href} className="hover:text-white transition-colors duration-300">{link.label}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-light mb-6 text-rose-300">CONNECT</h4>
              <ul className="space-y-3 text-zinc-400">
                {footerLinks.connect.map(link => (
                  <li key={link.label}><a href={link.href} className="hover:text-white transition-colors duration-300">{link.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-zinc-800 text-zinc-500 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 Chrome·Blush. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
              <a href="#" className="hover:text-zinc-300 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-300 transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;

const philosophies = [
    {
      title: 'SATIN BRUTALISM',
      description: 'We embrace contradiction—hard edges with soft surfaces, clinical precision with sensual application. Our treatments merge architectural structure with fluid motion.',
    },
    {
      title: 'LIPSTICK FUTURISM',
      description: 'Beauty is perpetual evolution. We harness next-generation technology while honoring the primal ritual of self-adornment that traces back to our earliest ancestors.',
    },
    {
      title: 'FERAL FEMININITY',
      description: 'We reject the domesticated vision of beauty. Our approach is untamed, powerful, and unapologetic—a celebration of beauty that refuses to be confined.',
    },
  ];
  
  const Philosophy = () => {
    return (
      <section id="philosophy" className="relative py-32 bg-zinc-900/50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-rose-500/20 to-transparent"></div>
          <div className="absolute top-0 left-3/4 w-px h-1/2 bg-gradient-to-b from-zinc-700/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-thin tracking-tight mb-12">
                <span className="block">OUR</span>
                <span className="block text-rose-300">PHILOSOPHY</span>
              </h2>
              
              <div className="space-y-8">
                {philosophies.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-2xl font-light mb-3">{item.title}</h3>
                    <p className="text-zinc-300 font-light">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 to-zinc-950/80 mix-blend-multiply z-10"></div>
                <img src="https://preview.webstudio.ai/cgi/image/dev/e51390c99b624a8ae10f955c6ee95dd8203e1988db95e2b4bef4b59d490c0aef.png?width=1024&height=1024&format=auto" alt="Abstract beauty portrait" className="w-full h-full object-cover" width="1024" height="1024" />
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-zinc-700/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Philosophy;

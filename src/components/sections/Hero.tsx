import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 to-zinc-950 animate-pulse-slow"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-[400px] border-t border-rose-400/20 rounded-t-[300px]"></div>
        <div className="absolute top-1/3 left-0 w-full h-[600px] border-t border-zinc-700/30 rounded-t-[500px]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-[700px] border-l border-rose-300/10 rounded-tl-[400px]"></div>
      </div>
      
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-6">
              <span className="block">FERAL</span>
              <span className="block text-rose-300/90 italic">BEAUTY</span>
            </h1>
            <p className="text-xl md:text-2xl font-extralight tracking-wide text-zinc-400 mb-10 max-w-md mx-auto md:mx-0">
              Where satin brutalism meets lipstick futurism. A beauty experience beyond convention.
            </p>
            <div className="flex space-x-4 sm:space-x-6 justify-center md:justify-start">
              <Button size="lg" className="px-8 py-3 h-auto bg-rose-500/80 backdrop-blur-sm text-white rounded-full hover:bg-rose-400 transition-all duration-300 transform hover:-translate-y-0.5">
                BOOK NOW
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 h-auto border-zinc-700 rounded-full hover:border-rose-300/50 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 bg-transparent">
                EXPLORE
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <img src="https://preview.webstudio.ai/cgi/image/dev/e51390c99b624a8ae10f955c6ee95dd8203e1988db95e2b4bef4b59d490c0aef.png?width=1024&height=1024&format=auto" alt="Abstract beauty portrait with chrome and brutalist elements" className="rounded-bl-[100px] rounded-tr-[100px] w-full h-auto object-cover shadow-2xl shadow-rose-900/20" width="1024" height="1024" />
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full blur-xl opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

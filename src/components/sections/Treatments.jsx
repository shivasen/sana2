import { ArrowRight } from 'lucide-react';

const treatments = [
  {
    title: 'CHROME REVIVAL',
    description: 'Metallic-infused facial treatment that sculpts and illuminates.',
    imgSrc: 'https://preview.webstudio.ai/cgi/image/dev/62e379ead8622f3706d1dcfb059a674169f6fa1ce3a988def824527533bde07b.png?width=1024&height=1024&format=auto',
    imgAlt: 'Chrome beauty product',
    extraClasses: '',
    rounding: 'rounded-tl-[80px]',
  },
  {
    title: 'SATIN SURFACE',
    description: 'Micro-current therapy with silk protein complex.',
    imgSrc: 'https://preview.webstudio.ai/cgi/image/dev/3cfdcfb091b8477572881ec9142147146d79d061ad07b6e6520fefd179c825d3.png?width=1152&height=896&format=auto',
    imgAlt: 'Liquid beauty product',
    extraClasses: 'md:mt-20',
    rounding: 'rounded-tr-[80px]',
  },
  {
    title: 'ARCHITECTURE LIFT',
    description: 'Structural facial massage with brutalist precision.',
    imgSrc: 'https://preview.webstudio.ai/cgi/image/dev/91504ef1a74267bec22a5eba5668533b0a70559627578a16ee5c199782d16432.png?width=1024&height=1024&format=auto',
    imgAlt: 'Brutalist beauty salon interior',
    extraClasses: '',
    rounding: 'rounded-bl-[80px]',
  },
];

const Treatments = () => {
  return (
    <section id="treatments" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-[800px] border-l border-zinc-800 rounded-bl-[300px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-[400px] border-r border-rose-900/20 rounded-tr-[200px]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
          <h2 className="text-5xl font-thin tracking-tight">
            <span className="block">SIGNATURE</span>
            <span className="block text-rose-300">TREATMENTS</span>
          </h2>
          <p className="md:max-w-md text-zinc-400 text-xl font-light mt-6 md:mt-0">
            Each service is a performance—a dance between technique and intuition, science and sensation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {treatments.map((treatment) => (
            <div key={treatment.title} className={`group relative overflow-hidden ${treatment.extraClasses}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>
              <img src={treatment.imgSrc} alt={treatment.imgAlt} className={`w-full aspect-[3/4] object-cover ${treatment.rounding}`} width="1024" height="1024" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-2xl font-light mb-2">{treatment.title}</h3>
                <p className="text-zinc-300 font-light mb-6">{treatment.description}</p>
                <a href="#" className="text-rose-300 group-hover:text-rose-200 transition-colors duration-300 flex items-center">
                  DISCOVER
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treatments;

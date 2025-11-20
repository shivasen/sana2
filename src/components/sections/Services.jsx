import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const individualServices = {
  fashion: [
    {
      title: 'Bespoke Blouse Stitching',
      description: 'Custom fit with lining, padding options, and precision cutting.',
      price: 'From ₹1,200',
    },
    {
      title: 'Handcrafted Aari Embroidery',
      description: 'Custom Zardosi, bead, and stone work for minimalist borders to grand bridal designs.',
      price: 'From ₹3,500',
    },
  ],
  beauty: [
    {
      title: 'HD Bridal Makeup',
      description: 'Flawless high-definition finish including lashes, lenses, and skin prep.',
      price: '₹15,000',
    },
    {
      title: 'Advanced Saree Draping',
      description: 'Professional ironing, pleating, and pinning (Madisar, Kanjeevaram, Lehenga styles).',
      price: 'Inquire for price',
    },
    {
      title: 'Groom’s Touch-Up',
      description: 'Skin prep, spot concealing, and hair setting for a camera-ready look.',
      price: 'Inquire for price',
    },
  ],
};

const signaturePackages = [
  {
    title: 'The Essential Bride',
    tagline: 'Ideal for Reception/Engagement',
    features: ['HD Makeup', 'Hairstyling (with flowers)', 'Saree Draping', 'Jewelry Setting'],
    tier: 'essential',
  },
  {
    title: 'The Power Couple',
    tagline: 'Best for the Wedding Day',
    features: ['Full Bridal Makeup & Draping', "Groom's Skin Prep, Concealing & Hair Fix", 'Bonus: Color coordination check'],
    tier: 'popular',
  },
  {
    title: 'The Couture Bride',
    tagline: 'From Thread to Brush',
    features: ['Custom Aari Work Blouse (Heavy)', 'Blouse Stitching', 'Full HD Bridal Makeup', 'Draping'],
    special: 'We design your outfit and your look for perfect harmony.',
    tier: 'luxury',
  },
];

const viewVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const Services = () => {
  const [activeView, setActiveView] = useState('packages');

  return (
    <section id="services" className="py-24 sm:py-32 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-thin tracking-tight mb-4">Services & Pricing</h2>
          <p className="text-lg text-zinc-400">
            Choose from our curated packages or build your own experience with our à la carte services.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-zinc-800/50 rounded-full p-1 flex items-center">
            <button
              onClick={() => setActiveView('packages')}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-colors',
                activeView === 'packages' ? 'bg-rose-500/80 text-white' : 'text-zinc-300 hover:bg-zinc-700/50'
              )}
            >
              Signature Packages
            </button>
            <button
              onClick={() => setActiveView('individual')}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-colors',
                activeView === 'individual' ? 'bg-rose-500/80 text-white' : 'text-zinc-300 hover:bg-zinc-700/50'
              )}
            >
              Individual Services
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'packages' && (
            <motion.div
              key="packages"
              variants={viewVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {signaturePackages.map((pkg) => (
                <motion.div
                  key={pkg.title}
                  variants={itemVariants}
                  className={cn(
                    'relative rounded-2xl p-8 border flex flex-col h-full group',
                    pkg.tier === 'luxury' && 'border-gold-400/30 bg-gold-900/10 shadow-2xl shadow-gold-500/10',
                    pkg.tier === 'popular' && 'border-rose-400/30 bg-rose-900/10',
                    pkg.tier === 'essential' && 'border-zinc-800 bg-zinc-900/30'
                  )}
                >
                  {pkg.tier === 'popular' && (
                    <div className="absolute -top-3 right-6 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  {pkg.tier === 'luxury' && (
                     <div className="absolute -top-3 right-6 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> LUXURY
                    </div>
                  )}

                  <div className="flex-grow">
                    <h3 className="text-2xl font-light mb-2">{pkg.title}</h3>
                    <p className="text-sm text-zinc-400 mb-6">{pkg.tagline}</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-rose-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {pkg.special && (
                      <p className="text-sm italic text-gold-300/80 border-l-2 border-gold-400/50 pl-4 mb-8">
                        {pkg.special}
                      </p>
                    )}
                  </div>
                  <Button
                    size="lg"
                    className={cn(
                      'w-full mt-4 transition-transform duration-300 group-hover:-translate-y-1',
                       pkg.tier === 'luxury' ? 'bg-gold-500 hover:bg-gold-400 text-gold-900 font-bold' : 'bg-rose-500 hover:bg-rose-400 text-white'
                    )}
                  >
                    Check Availability
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeView === 'individual' && (
            <motion.div
              key="individual"
              variants={viewVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-light text-rose-300 mb-6 border-b border-rose-300/20 pb-2">The Fashion Studio</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {individualServices.fashion.map((service) => (
                      <motion.div variants={itemVariants} key={service.title} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg flex flex-col">
                        <div className="flex-grow">
                          <h4 className="text-xl font-medium mb-2">{service.title}</h4>
                          <p className="text-zinc-400 mb-4">{service.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-lg font-semibold text-rose-400">{service.price}</p>
                          <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 hover:text-white">Inquire</Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-light text-rose-300 mb-6 border-b border-rose-300/20 pb-2">The Beauty Suite</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {individualServices.beauty.map((service) => (
                      <motion.div variants={itemVariants} key={service.title} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg flex flex-col">
                        <div className="flex-grow">
                          <h4 className="text-xl font-medium mb-2">{service.title}</h4>
                          <p className="text-zinc-400 mb-4">{service.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-lg font-semibold text-rose-400">{service.price}</p>
                          <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 hover:text-white">Inquire</Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;

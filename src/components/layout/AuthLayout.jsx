import Silk from '@/components/ui/SilkBackground';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <Silk color="#f43f5e" scale={1.5} noiseIntensity={1} />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-light tracking-widest text-white mb-2 inline-block">CHROME·BLUSH</Link>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            <p className="text-zinc-400">{subtitle}</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-2xl shadow-rose-900/10 backdrop-blur-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

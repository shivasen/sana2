import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/sonner';
import AuraChatbot from '@/components/AuraChatbot';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SkinAnalysis = lazy(() => import('@/components/sections/SkinAnalysis'));
const Header = lazy(() => import('@/components/layout/Header'));
const Footer = lazy(() => import('@/components/layout/Footer'));

function App() {
  return (
    <div className="bg-zinc-950 text-white font-sans overflow-x-hidden">
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/skin-analysis" element={
            <>
              <Header />
              <SkinAnalysis />
              <Footer />
            </>
          } />
        </Routes>
      </Suspense>
      <Toaster richColors position="bottom-right" />
      <AuraChatbot />
    </div>
  );
}

export default App;

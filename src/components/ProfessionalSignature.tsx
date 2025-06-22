import React from 'react';
import { Mail } from 'lucide-react';

interface ProfessionalSignatureProps {
  className?: string;
}

const ProfessionalSignature: React.FC<ProfessionalSignatureProps> = ({ className = '' }) => {
  return (
    <div 
      className={`relative w-full max-w-4xl mx-auto h-72 rounded-lg overflow-hidden shadow-2xl ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0D1B2A 0%, #1B2951 30%, #2A4A7A 60%, #F5D547 100%)'
      }}
    >
      {/* Overlay pattern for texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
        
        {/* Title */}
        <h1 
          className="text-4xl md:text-5xl font-bold mb-3 tracking-wide"
          style={{
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F5D547 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Par Beros
        </h1>

        {/* Subtitle - Espacement réduit */}
        <p 
          className="text-lg md:text-xl font-medium mb-3 leading-tight max-w-2xl"
          style={{
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            color: '#E8F4FD',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          Expert en Réseau & Sécurité, Automatisation et Intelligence Artificielle
        </p>

        {/* Separator line - Espacement réduit */}
        <div 
          className="w-32 h-px mb-3"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)'
          }}
        />

        {/* Contact information - Espacement réduit */}
        <div className="flex items-center justify-center gap-3">
          <div 
            className="p-2 rounded-full"
            style={{
              background: 'rgba(245, 213, 71, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Mail size={20} className="text-[#F5D547]" />
          </div>
          <span 
            className="text-base md:text-lg font-medium"
            style={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              color: '#E8F4FD',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Contact : berosform@gmail.com
          </span>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-6 left-6 w-16 h-16 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, #F5D547 0%, transparent 70%)' }} />
        <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full opacity-15"
             style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)' }} />
        
        {/* Subtle geometric pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
          <div className="w-full h-full border border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSignature;
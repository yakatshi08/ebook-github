import React from 'react';
import { Brain, Zap, CircuitBoard, Play } from 'lucide-react';

interface CoverProps {
  onStart: () => void;
}

const Cover: React.FC<CoverProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#0C1C44] flex flex-col justify-center items-center text-center px-8 relative overflow-hidden">
      {/* Gradient overlay at the bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #FFD43B 0%, rgba(255, 212, 59, 0.8) 20%, rgba(255, 212, 59, 0.4) 50%, rgba(255, 212, 59, 0.1) 80%, transparent 100%)'
        }}
      />

      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 opacity-10">
        <CircuitBoard size={120} className="text-[#FFD43B]" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-10">
        <Zap size={100} className="text-[#FFD43B]" />
      </div>
      <div className="absolute top-1/2 left-10 opacity-5 transform -translate-y-1/2">
        <Brain size={200} className="text-white" />
      </div>

      {/* Main content */}
      <div className="z-10 max-w-3xl">
        {/* Main title */}
        <h1 className="text-5xl md:text-7xl font-bold text-[#FFD43B] mb-6 tracking-tight leading-tight">
          MAÎTRISEZ L'IA
          <br />
          DÈS AUJOURD'HUI
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white mb-8 font-light tracking-wide leading-relaxed">
          Manuel essentiel pour novices et créateurs d'entreprise
        </p>

        {/* Description */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12 border border-white/20">
          <p className="text-white text-lg leading-relaxed">
            Explorez 50 exemples d'applications réelles, apprenez à utiliser efficacement ChatGPT 
            et Midjourney, et révolutionnez votre vie personnelle et professionnelle grâce à la 
            <span className="text-[#FFD43B] font-semibold"> puissance de l'intelligence artificielle</span>
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="bg-[#FFD43B] text-[#0C1C44] px-8 py-4 rounded-full font-semibold text-lg 
                   hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 
                   shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
        >
          <Play size={20} />
          Commencer la lecture
        </button>

        {/* Author signature */}
        <div className="mt-16 pt-8 border-t border-white/20 relative z-20">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-6 py-4 inline-block">
            <p className="text-[#0C1C44] text-sm font-medium leading-relaxed">
              Par <span className="font-bold text-[#0C1C44]">Bertos</span><br />
              <span className="text-[#1A2A5B] font-medium">Expert en Réseau et Sécurité, Automatisation et Intelligence Artificielle</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative brain icon */}
      <div className="absolute top-16 right-1/2 transform translate-x-1/2 opacity-20">
        <Brain size={60} className="text-[#FFD43B]" />
      </div>
    </div>
  );
};

export default Cover;
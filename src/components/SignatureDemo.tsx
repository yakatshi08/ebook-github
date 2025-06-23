import React from 'react';

const SignatureDemo: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-4xl w-full">
        {/* Signature Principale UNIQUEMENT */}
        <div className="bg-gradient-to-br from-[#0C1C44] to-[#FFD43B] p-8 rounded-lg shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">Par Beros</h1>
          <p className="text-xl text-white/90 mb-6">
            Expert en Réseau & Sécurité, Automatisation et Intelligence Artificielle
          </p>
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md">
              <span className="text-yellow-300">✉</span>
              <span className="text-white ml-2">Contact : berosform@gmail.com</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureDemo;
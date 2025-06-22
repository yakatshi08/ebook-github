import React from 'react';
import ProfessionalSignature from './ProfessionalSignature';

const SignatureDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Signature Graphique Professionnelle
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Signature moderne avec dégradé bleu nuit vers jaune doré, 
            optimisée pour les eBooks et pages de vente professionnelles.
          </p>
        </div>

        {/* Main signature display */}
        <div className="mb-12">
          <ProfessionalSignature />
        </div>

        {/* Variations */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Version Compacte</h3>
            <div className="transform scale-75 origin-top">
              <ProfessionalSignature />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Version avec Ombre</h3>
            <div className="drop-shadow-2xl">
              <ProfessionalSignature />
            </div>
          </div>
        </div>

        {/* Technical specifications */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Spécifications Techniques</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">🎨 Design</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Dégradé : #0D1B2A → #F5D547</li>
                <li>• Format : 1000x300px (ratio 10:3)</li>
                <li>• Typographie : System UI moderne</li>
                <li>• Alignement : Centré</li>
                <li>• Effets : Ombres et dégradés</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">⚡ Performance</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Composant React réutilisable</li>
                <li>• CSS-in-JS optimisé</li>
                <li>• Responsive design</li>
                <li>• Icônes Lucide React</li>
                <li>• Rendu vectoriel haute qualité</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Utilisation</h4>
            <p className="text-blue-700">
              Cette signature peut être intégrée dans n'importe quelle page de votre application 
              en important le composant <code className="bg-blue-100 px-2 py-1 rounded">ProfessionalSignature</code>. 
              Elle s'adapte automatiquement à la largeur du conteneur parent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureDemo;
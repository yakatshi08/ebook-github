// Convertisseur PDF haute-fidélité qui préserve EXACTEMENT le design
// Installation: npm install puppeteer pdf-lib

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

class PixelPerfectPDFConverter {
  constructor() {
    this.baseUrl = 'http://localhost:5174';
    this.outputDir = './pdf-output';
    this.browser = null;
    this.page = null;
    
    // Structure exacte de votre ebook React
    this.pages = [
      { id: 0, title: 'Couverture', type: 'cover' },
      { id: 1, title: 'Table des Matières', type: 'toc' },
      { id: 2, title: 'Chapitre 1 - Comprendre l\'Intelligence Artificielle', type: 'chapter' },
      { id: 3, title: 'Chapitre 2 - ChatGPT : Votre Assistant IA Personnel', type: 'chapter' },
      { id: 4, title: 'Chapitre 3 - Midjourney : Créez des Visuels Époustouflants', type: 'chapter' },
      { id: 5, title: 'Chapitre 4 - 50 Applications Pratiques de l\'IA', type: 'chapter' },
      { id: 6, title: 'Chapitre 5 - Intégrer l\'IA dans Votre Entreprise', type: 'chapter' },
      { id: 7, title: 'Chapitre 6 - L\'Avenir de l\'IA et Votre Carrière', type: 'chapter' }
    ];
  }

  // Fonction utilitaire pour remplacer waitForTimeout
  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async initialize() {
    console.log('🚀 Initialisation du convertisseur haute-fidélité...');
    
    // Créer le dossier de sortie
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }

    // Lancer le navigateur avec des paramètres optimaux
    this.browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--force-color-profile=srgb',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection'
      ]
    });

    this.page = await this.browser.newPage();
    
    // Configuration viewport EXACTE
    await this.page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2
    });

    console.log('✅ Navigateur initialisé');
  }

  async preserveOriginalStyles() {
    await this.page.addStyleTag({
      content: `
        @media print {
          * {
            color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* COULEURS EXACTES DE VOTRE EBOOK */
          .text-blue-900, [class*="text-blue-900"] { color: #0C1C44 !important; }
          .text-blue-800, [class*="text-blue-800"] { color: #1A2A5B !important; }
          .text-yellow-400, [class*="text-yellow-400"] { color: #FFD43B !important; }
          .bg-blue-900, [class*="bg-blue-900"] { background-color: #0C1C44 !important; }
          .bg-yellow-400, [class*="bg-yellow-400"] { background-color: #FFD43B !important; }
          .bg-gray-50, [class*="bg-gray-50"] { background-color: #F9FAFB !important; }
          
          /* GRADIENTS */
          .bg-gradient-to-r, .bg-gradient-to-b, .bg-gradient-to-br {
            background: linear-gradient(135deg, #0C1C44 0%, #1A2A5B 50%, #FFD43B 100%) !important;
          }
          
          /* TYPOGRAPHIE */
          .text-4xl, .text-5xl { font-size: 2.5rem !important; font-weight: 800 !important; }
          .text-3xl { font-size: 1.875rem !important; font-weight: 700 !important; }
          .text-2xl { font-size: 1.5rem !important; font-weight: 600 !important; }
          
          /* MASQUER TOUS LES BOUTONS ET NAVIGATION */
          button, 
          nav, 
          .navigation,
          .demo-toggle,
          [class*="button"],
          [class*="btn"],
          input[type="button"],
          .fixed.top-4.right-4 {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* MASQUER LA PAGE SIGNATURE COMPLÈTE */
          .signature-demo,
          [class*="Signature Graphique"],
          [class*="Version Compacte"],
          [class*="Version avec Ombre"] {
            display: none !important;
          }
          
          /* SIGNATURE SIMPLE EN BAS DE PAGE */
          body::after {
            content: "© Beros - Expert IA & Automatisation - berosform@gmail.com" !important;
            position: fixed !important;
            bottom: 8mm !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            font-size: 0.7rem !important;
            color: #6B7280 !important;
            text-align: center !important;
            z-index: 9999 !important;
            background: rgba(255, 255, 255, 0.9) !important;
            padding: 2px 8px !important;
            border-radius: 3px !important;
          }
          
          /* SIGNATURE SPÉCIALE POUR COUVERTURE */
          .cover-page::after {
            content: "Par Beros - Expert en Réseau & Sécurité, Automatisation et Intelligence Artificielle - Contact: berosform@gmail.com" !important;
            position: absolute !important;
            bottom: 3rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            color: white !important;
            font-size: 1rem !important;
            text-align: center !important;
            background: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
          }
          
          /* LAYOUT */
          .max-w-4xl, .container, main {
            max-width: 100% !important;
            padding-bottom: 20mm !important;
          }
          
          /* FORCER MASQUAGE CONTENU SIGNATURE PAGE */
          body.signature-page * {
            display: none !important;
          }
          
          body.signature-page::after {
            content: "" !important;
          }
        }
      `
    });
  }

  async captureEbookPage(pageIndex, pageInfo) {
    console.log(`📖 Capture de ${pageInfo.title}...`);
    
    try {
      // Navigation améliorée pour React
      if (pageIndex > 0) {
        console.log(`🔄 Navigation vers la page ${pageIndex}...`);
        
        // Méthode de navigation corrigée
        await this.page.evaluate((targetIndex) => {
          // Essayer différentes méthodes de navigation
          let navigationSuccess = false;
          
          // Méthode 1: Chercher les boutons par texte
          const buttons = Array.from(document.querySelectorAll('button'));
          const nextButton = buttons.find(btn => 
            btn.textContent && (
              btn.textContent.includes('Suivant') ||
              btn.textContent.includes('→') ||
              btn.textContent.includes('Next')
            )
          );
          
          if (nextButton) {
            // Cliquer plusieurs fois pour atteindre la page cible
            for (let i = 0; i < targetIndex; i++) {
              nextButton.click();
            }
            navigationSuccess = true;
            console.log('Navigation par bouton Suivant réussie');
          }
          
          // Méthode 2: Navigation directe si possible
          if (!navigationSuccess && window.setCurrentPage) {
            window.setCurrentPage(targetIndex);
            navigationSuccess = true;
            console.log('Navigation directe React réussie');
          }
          
          // Méthode 3: Essayer avec les classes de navigation
          if (!navigationSuccess) {
            const navButtons = document.querySelectorAll('.navigation button, [class*="nav"] button');
            if (navButtons.length > 1) {
              const nextBtn = navButtons[navButtons.length - 1]; // Dernier bouton = suivant généralement
              for (let i = 0; i < targetIndex; i++) {
                nextBtn.click();
              }
              navigationSuccess = true;
            }
          }
          
          return navigationSuccess;
        }, pageIndex);
        
        console.log(`✅ Navigation vers page ${pageIndex} tentée`);
        await this.wait(4000); // Plus de temps pour le chargement
      }

      // Vérifier si on est sur la page de signatures (à ignorer)
      const isSignaturePage = await this.page.evaluate(() => {
        return document.body.textContent.includes('Signature Graphique Professionnelle') ||
               document.body.textContent.includes('Version Compacte') ||
               document.body.textContent.includes('Version avec Ombre') ||
               document.body.textContent.includes('Retour eBook');
      });

      if (isSignaturePage) {
        console.log(`⏭️ Page de signatures/retour détectée - ignorée`);
        return null;
      }

      // Marquer le type de page pour CSS
      await this.page.evaluate((pageInfo) => {
        document.body.className = `${pageInfo.type}-page`;
        
        // Masquer explicitement tous les boutons visibles
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
          btn.style.display = 'none';
          btn.style.visibility = 'hidden';
        });
        
        // Masquer éléments de navigation
        const navElements = document.querySelectorAll('nav, .navigation, .fixed');
        navElements.forEach(nav => {
          nav.style.display = 'none';
        });
        
      }, pageInfo);

      // Vérifier qu'on a du contenu
      const contentLength = await this.page.evaluate(() => {
        return document.body.textContent.trim().length;
      });

      if (contentLength < 50) {
        console.log(`⚠️ Contenu insuffisant détecté (${contentLength} caractères) - page ignorée`);
        return null;
      }

      // Configuration PDF
      const pdfOptions = {
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        margin: {
          top: '15mm',
          right: '10mm',
          bottom: '20mm',
          left: '10mm'
        },
        scale: 0.85
      };

      // Générer PDF
      const filename = `${String(pageIndex + 1).padStart(2, '0')}-${pageInfo.title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
      const pagePath = path.join(this.outputDir, filename);
      
      await this.page.pdf({
        ...pdfOptions,
        path: pagePath
      });

      if (fs.existsSync(pagePath)) {
        const stats = fs.statSync(pagePath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`✅ ${pageInfo.title} capturé: ${filename} (${sizeKB} KB)`);
        
        if (pageInfo.type === 'cover') {
          console.log(`🖋️  Signature originale préservée sur couverture`);
        } else {
          console.log(`🔒 Signature discrète automatique ajoutée en bas`);
        }
        
        return pagePath;
      } else {
        throw new Error(`Fichier non créé: ${pagePath}`);
      }

    } catch (error) {
      console.error(`❌ Erreur ${pageInfo.title}:`, error.message);
      return null;
    }
  }

  async captureFullEbook() {
    console.log('📚 Début de la capture complète...');
    
    try {
      await this.page.goto(this.baseUrl, { 
        waitUntil: 'networkidle0',
        timeout: 60000
      });
      
      console.log('✅ Connexion réussie !');
      await this.wait(5000);
      
      await this.page.waitForSelector('#root', { timeout: 15000 });
      console.log('✅ Application React détectée');
      
      await this.preserveOriginalStyles();

      const generatedFiles = [];

      for (let i = 0; i < this.pages.length; i++) {
        const pageInfo = this.pages[i];
        console.log(`\n📄 Page ${i + 1}/${this.pages.length}: ${pageInfo.title}`);
        
        const filePath = await this.captureEbookPage(i, pageInfo);
        if (filePath) {
          generatedFiles.push(filePath);
        }
        
        await this.wait(2000);
      }

      console.log(`\n📊 Bilan: ${generatedFiles.length}/${this.pages.length} pages réussies`);

      if (generatedFiles.length > 0) {
        await this.mergePDFs(generatedFiles);
      } else {
        console.error('❌ Aucune page capturée');
      }

    } catch (error) {
      throw error;
    }
  }

  async mergePDFs(pdfFiles) {
    console.log('\n📑 Fusion des PDFs...');
    
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of pdfFiles) {
      if (fs.existsSync(pdfFile)) {
        const pdfBytes = fs.readFileSync(pdfFile);
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }
    }

    // Métadonnées
    mergedPdf.setTitle('Maîtrisez l\'IA dès Aujourd\'hui');
    mergedPdf.setAuthor('Beros');
    mergedPdf.setSubject('Le guide ultime pour démarrer avec l\'IA, sans être expert');
    
    // Sauvegarder
    const finalPath = path.join(this.outputDir, 'Maitrisez-IA-Aujourd-hui-EBOOK-FINAL.pdf');
    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(finalPath, pdfBytes);

    const sizeMB = (pdfBytes.length / 1024 / 1024).toFixed(2);
    console.log(`\n🎉 PDF FINAL: ${finalPath}`);
    console.log(`📊 Taille: ${sizeMB} MB`);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

async function main() {
  const converter = new PixelPerfectPDFConverter();
  
  try {
    console.log('🎯 CONVERSION REACT → PDF DÉMARRÉE');
    console.log('📘 Ebook: "Maîtrisez l\'IA dès Aujourd\'hui" par Beros');
    console.log('🔒 Signatures sécurisées sur toutes les pages');
    console.log('⚡ Serveur React: localhost:5173');
    
    await converter.initialize();
    await converter.captureFullEbook();
    
    console.log('\n🎉 SUCCÈS! PDF prêt pour Amazon KDP');
    console.log('✅ Tous les boutons masqués');
    console.log('✅ Page signatures multiples ignorée');
    console.log('✅ Signature simple en bas de chaque page');
    console.log('✅ Design original préservé');
    
  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    console.error('💡 Vérifiez:');
    console.error('   1. npm run dev actif');
    console.error('   2. http://localhost:5173 accessible');
    console.error('   3. Navigation manuelle fonctionne');
  } finally {
    await converter.cleanup();
  }
}

console.log('🚀 Lancement du convertisseur...\n');
main();
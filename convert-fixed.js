import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

class FixedPDFConverter {
  constructor() {
    this.baseUrl = 'http://localhost:5173'; // Ajustez selon votre port
    this.outputDir = './pdf-output-fixed';
    this.browser = null;
    this.page = null;
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async initialize() {
    console.log('🚀 Initialisation du convertisseur...');
    
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }

    this.browser = await puppeteer.launch({
      headless: false, // Mode visible pour debug
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080'
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
      }
    });

    this.page = await this.browser.newPage();
    
    // Configuration viewport large pour capturer tout le contenu
    await this.page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    });

    console.log('✅ Navigateur initialisé');
  }

  async applyPrintStyles() {
    // CSS minimal - ne masquer que les boutons, garder tout le contenu
    await this.page.addStyleTag({
      content: `
        @media print {
          /* IMPORTANT: Préserver TOUT le contenu */
          * {
            visibility: visible !important;
            display: initial !important;
            opacity: 1 !important;
          }
          
          /* Préserver les couleurs */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Forcer l'affichage du contenu principal */
          .max-w-4xl,
          .container,
          main,
          #root,
          .min-h-screen,
          .bg-gradient-to-br,
          [class*="text-"],
          [class*="bg-"],
          h1, h2, h3, h4, h5, h6,
          p, div, section, article {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          /* Masquer SEULEMENT les boutons de navigation */
          button.fixed,
          .fixed.top-4.right-4,
          nav.fixed,
          .navigation {
            display: none !important;
          }
          
          /* Ajuster la mise en page */
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .min-h-screen {
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ajuster la signature en bas */
          body::after {
            content: "© Beros - Expert IA & Automatisation - berosform@gmail.com";
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: #666;
            display: none; /* On la désactive temporairement */
          }
        }
      `
    });
  }

  async captureEbookPage(pageIndex, title) {
    console.log(`\n📖 Capture de ${title}...`);
    
    try {
      // Attendre que le contenu soit visible
      await this.wait(3000);
      
      // Vérifier que le contenu est chargé
      const hasContent = await this.page.evaluate(() => {
        const content = document.querySelector('.max-w-4xl, .container, main');
        return content && content.innerText.length > 100;
      });

      if (!hasContent) {
        console.log('⚠️  Attente du chargement complet du contenu...');
        await this.wait(5000);
      }

      // Faire défiler la page pour s'assurer que tout est chargé
      await this.page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await this.wait(1000);

      // Configuration PDF optimisée
      const pdfPath = path.join(this.outputDir, `${String(pageIndex + 1).padStart(2, '0')}-${title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`);
      
      await this.page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate: `
          <div style="width: 100%; text-align: center; font-size: 10px; color: #666; margin-bottom: 20px;">
            © Beros - Expert IA & Automatisation - berosform@gmail.com
          </div>
        `,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '30mm',
          left: '20mm'
        },
        preferCSSPageSize: false,
        scale: 0.9 // Légèrement réduit pour s'assurer que tout rentre
      });

      // Vérifier la taille du fichier
      const stats = fs.statSync(pdfPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      
      if (sizeKB < 100) {
        console.log(`⚠️  Fichier petit (${sizeKB} KB) - Le contenu pourrait être manquant`);
      } else {
        console.log(`✅ ${title} capturé avec succès (${sizeKB} KB)`);
      }
      
      return pdfPath;

    } catch (error) {
      console.error(`❌ Erreur lors de la capture :`, error.message);
      return null;
    }
  }

  async navigateToNextPage() {
    // Chercher et cliquer sur le bouton Suivant
    const clicked = await this.page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextButton = buttons.find(btn => 
        btn.textContent && (
          btn.textContent.includes('Suivant') ||
          btn.textContent.includes('Commencer') ||
          btn.textContent.includes('→')
        )
      );
      
      if (nextButton) {
        nextButton.click();
        return true;
      }
      return false;
    });

    if (clicked) {
      console.log('✅ Navigation effectuée');
      await this.wait(3000); // Attendre le chargement
    } else {
      console.log('⚠️  Bouton de navigation non trouvé');
    }
  }

  async convertEbook() {
    try {
      await this.initialize();
      
      console.log('\n📚 Chargement de votre ebook...');
      await this.page.goto(this.baseUrl, { 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });
      
      // Attendre que React soit complètement chargé
      await this.page.waitForSelector('.min-h-screen', { timeout: 30000 });
      await this.wait(5000);
      
      await this.applyPrintStyles();

      const pages = [
        'Couverture',
        'Table-des-Matieres',
        'Chapitre-1',
        'Chapitre-2',
        'Chapitre-3',
        'Chapitre-4',
        'Chapitre-5',
        'Chapitre-6'
      ];

      const pdfPaths = [];

      // Capture page par page
      for (let i = 0; i < pages.length; i++) {
        const pdfPath = await this.captureEbookPage(i, pages[i]);
        if (pdfPath) {
          pdfPaths.push(pdfPath);
        }

        // Navigation vers la page suivante (sauf pour la dernière)
        if (i < pages.length - 1) {
          await this.navigateToNextPage();
        }
      }

      // Fusionner les PDFs
      if (pdfPaths.length > 0) {
        console.log('\n📑 Fusion des PDFs...');
        await this.mergePDFs(pdfPaths);
      }

      console.log('\n🎉 Conversion terminée avec succès !');
      console.log(`📁 Fichiers dans : ${this.outputDir}`);

    } catch (error) {
      console.error('\n❌ Erreur :', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async mergePDFs(pdfFiles) {
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of pdfFiles) {
      if (fs.existsSync(pdfFile)) {
        const pdfBytes = fs.readFileSync(pdfFile);
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }
    }

    mergedPdf.setTitle('Maîtrisez l\'IA dès Aujourd\'hui');
    mergedPdf.setAuthor('Beros');

    const finalPath = path.join(this.outputDir, 'Maitrisez-IA-FINAL.pdf');
    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(finalPath, pdfBytes);
    
    const sizeMB = (pdfBytes.length / 1024 / 1024).toFixed(2);
    console.log(`✅ PDF final créé : ${finalPath} (${sizeMB} MB)`);
  }
}

// Exécution
const converter = new FixedPDFConverter();
converter.convertEbook().catch(console.error);
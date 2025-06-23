import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * GÉNÉRATEUR PDF CONFORME AMAZON KDP
 * Format : 6" x 9" (format livre standard)
 */

class AmazonKDPGenerator {
  constructor() {
    this.baseUrl = 'http://localhost:5173';
    this.outputDir = './pdf-amazon-kdp';
    this.browser = null;
    this.page = null;
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async initialize() {
    console.log(`
╔═══════════════════════════════════════════════╗
║    GÉNÉRATEUR PDF POUR AMAZON KDP             ║
║    Format : 6" x 9"                           ║
╚═══════════════════════════════════════════════╝
    `);

    // Créer le dossier de sortie
    if (fs.existsSync(this.outputDir)) {
      fs.rmSync(this.outputDir, { recursive: true });
    }
    fs.mkdirSync(this.outputDir);

    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--font-render-hinting=none',
        '--enable-font-antialiasing'
      ]
    });

    this.page = await this.browser.newPage();
    
    // Viewport pour capturer en haute qualité
    await this.page.setViewport({
      width: 1800,
      height: 2400,
      deviceScaleFactor: 2
    });
  }

  async applyKDPStyles() {
    await this.page.addStyleTag({
      content: `
        @media print {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: 6in 9in;
            margin: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #000000;
            background: #ffffff;
          }
          
          /* Masquer les éléments interactifs */
          button, .fixed, nav, .navigation {
            display: none !important;
          }
          
          /* Préserver la mise en page */
          .min-h-screen {
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            page-break-inside: avoid;
          }
          
          img {
            max-width: 100%;
            height: auto;
          }
        }
      `
    });

    // Nettoyer le contenu
    await this.page.evaluate(() => {
      // Supprimer les éléments interdits
      document.querySelectorAll('script, iframe, form, input').forEach(el => el.remove());
      
      // Nettoyer les URLs locales
      document.querySelectorAll('*').forEach(el => {
        if (el.textContent && el.textContent.includes('localhost')) {
          el.textContent = el.textContent.replace(/localhost:\d+/g, '');
        }
      });
    });
  }

  async capturePage(pageIndex, title) {
    console.log(`📖 Capture de ${title}...`);
    
    try {
      await this.wait(3000);
      
      const pdfPath = path.join(this.outputDir, `${String(pageIndex + 1).padStart(2, '0')}-${title}.pdf`);
      
      // Configuration PDF pour Amazon KDP
      await this.page.pdf({
        path: pdfPath,
        width: '6in',
        height: '9in',
        printBackground: true,
        displayHeaderFooter: false,
        margin: {
          top: '0.75in',
          right: '0.5in',
          bottom: '0.75in',
          left: '0.75in'
        },
        scale: 1
      });

      console.log(`✅ ${title} capturé au format KDP`);
      return pdfPath;

    } catch (error) {
      console.error(`❌ Erreur :`, error.message);
      return null;
    }
  }

  async navigateNext() {
    await this.page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent || '';
        if (text.includes('Suivant') || 
            text.includes('→') ||
            text.includes('Commencer') ||
            text.includes('Je me lance')) {
          btn.click();
          break;
        }
      }
    });
    await this.wait(3000);
  }

  async generateKDPBook() {
    try {
      await this.initialize();
      
      console.log('\n📚 Chargement de votre ebook...');
      await this.page.goto(this.baseUrl, { 
        waitUntil: ['networkidle0', 'domcontentloaded'],
        timeout: 60000 
      });
      
      await this.wait(5000);
      await this.applyKDPStyles();

      const pages = [
        { name: 'Couverture', needsClick: false },
        { name: 'Table-des-Matieres', needsClick: true },
        { name: 'Chapitre-1', needsClick: true },
        { name: 'Chapitre-2', needsClick: true },
        { name: 'Chapitre-3', needsClick: true },
        { name: 'Chapitre-4', needsClick: true },
        { name: 'Chapitre-5', needsClick: true },
        { name: 'Chapitre-6', needsClick: true }
      ];

      const pdfFiles = [];

      // Capturer chaque page
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        
        if (i > 0 && page.needsClick) {
          await this.navigateNext();
        }
        
        const pdfPath = await this.capturePage(i, page.name);
        if (pdfPath && fs.existsSync(pdfPath)) {
          pdfFiles.push(pdfPath);
        }
      }

      // Créer le PDF final
      await this.createKDPFinalPDF(pdfFiles);

    } catch (error) {
      console.error('\n❌ Erreur :', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async createKDPFinalPDF(pdfFiles) {
    console.log('\n📑 Création du PDF final pour Amazon KDP...');
    
    const mergedPdf = await PDFDocument.create();
    
    // Métadonnées
    mergedPdf.setTitle('Maîtrisez l\'IA dès aujourd\'hui');
    mergedPdf.setAuthor('Beros');
    mergedPdf.setSubject('Guide pratique pour exploiter l\'intelligence artificielle');
    mergedPdf.setKeywords(['intelligence artificielle', 'ChatGPT', 'Midjourney', 'productivité', 'IA business', 'automatisation']);
    mergedPdf.setCreator('Beros');
    mergedPdf.setProducer('PDF Generator for Amazon KDP');
    
    // Ajouter toutes les pages
    for (const pdfFile of pdfFiles) {
      try {
        const pdfBytes = fs.readFileSync(pdfFile);
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        for (const page of pages) {
          mergedPdf.addPage(page);
        }
      } catch (error) {
        console.error(`❌ Erreur avec ${pdfFile}:`, error.message);
      }
    }

    // Sauvegarder
    const finalPath = path.join(this.outputDir, 'EBOOK-AMAZON-KDP-READY.pdf');
    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(finalPath, pdfBytes);
    
    const pageCount = mergedPdf.getPageCount();
    const sizeMB = (pdfBytes.length / 1024 / 1024).toFixed(2);
    
    console.log(`
╔═══════════════════════════════════════════════╗
║         PDF AMAZON KDP CRÉÉ AVEC SUCCÈS !     ║
╚═══════════════════════════════════════════════╝

📄 Pages : ${pageCount}
📊 Taille : ${sizeMB} MB
📁 Fichier : ${finalPath}

✅ Format 6" x 9" conforme Amazon KDP
🎯 Prêt pour le téléversement !
    `);
  }
}

// Exécution
const generator = new AmazonKDPGenerator();
generator.generateKDPBook().catch(console.error);
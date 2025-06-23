import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

class FinalPDFConverter {
  constructor() {
    this.baseUrl = 'http://localhost:5173'; // Ajustez selon votre port
    this.outputDir = './pdf-final';
    this.browser = null;
    this.page = null;
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async initialize() {
    console.log('🚀 Initialisation du convertisseur final...');
    
    // Nettoyer et créer le dossier
    if (fs.existsSync(this.outputDir)) {
      fs.rmSync(this.outputDir, { recursive: true });
    }
    fs.mkdirSync(this.outputDir);

    this.browser = await puppeteer.launch({
      headless: false, // CHANGÉ: Mode visible pour voir ce qui se passe
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ],
      defaultViewport: null
    });

    this.page = await this.browser.newPage();
    
    // Viewport optimisé
    await this.page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1
    });

    console.log('✅ Navigateur initialisé');
  }

  async applyOptimizedStyles() {
    // Attendre que la page soit stable
    await this.wait(3000);
    
    // Style minimal pour éviter la corruption
    await this.page.addStyleTag({
      content: `
        @media print {
          body { 
            margin: 0 !important; 
            padding: 0 !important;
          }
          .fixed, nav, button:not(.bg-yellow-400), .navigation { 
            display: none !important; 
          }
          /* Préserver la structure de la page de couverture */
          .min-h-screen {
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
          }
          /* S'assurer que la signature reste en bas */
          .mt-auto {
            margin-top: auto !important;
          }
        }
      `
    });
  }

  async capturePageOptimized(pageIndex, title) {
    console.log(`\n📖 Capture optimisée de ${title}...`);
    
    try {
      // Attendre plus longtemps pour le rendu complet
      await this.wait(5000);
      
      // Pour la page de couverture, attendre que tous les éléments soient visibles
      if (pageIndex === 0) {
        console.log('⏳ Attente du chargement complet de la couverture...');
        
        // Attendre que le titre et la signature soient présents
        await this.page.waitForSelector('h1', { timeout: 10000 });
        await this.page.waitForFunction(() => {
          const hasTitle = document.querySelector('h1')?.textContent?.includes('MAÎTRISEZ');
          const hasAuthor = document.body.textContent.includes('Par Beros');
          const hasExpertise = document.body.textContent.includes('Expert');
          return hasTitle && hasAuthor && hasExpertise;
        }, { timeout: 10000 });
        
        console.log('✅ Tous les éléments de la couverture sont chargés');
        await this.wait(2000); // Attente supplémentaire pour stabilisation
      }
      
      // S'assurer que la page est complètement rendue
      await this.page.evaluate(() => {
        return new Promise((resolve) => {
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', resolve);
          }
        });
      });
      
      await this.wait(2000);

      const pdfPath = path.join(this.outputDir, `${String(pageIndex + 1).padStart(2, '0')}-${title}.pdf`);
      
      // Pour la couverture, s'assurer que tout est visible
      if (pageIndex === 0) {
        await this.page.evaluate(() => {
          // Forcer l'affichage de tous les éléments
          document.querySelectorAll('*').forEach(el => {
            if (el.style.display === 'none') {
              el.style.display = '';
            }
          });
          // S'assurer qu'on voit toute la page
          window.scrollTo(0, 0);
        });
        await this.wait(1000);
      }
      
      // Configuration simplifiée pour éviter la corruption
      await this.page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<span></span>', // Header complètement vide
        footerTemplate: '<div style="width: 100%; text-align: center; font-size: 10px; font-family: Arial;">Page <span class="pageNumber"></span></div>',
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '25mm',
          left: '15mm'
        },
        scale: 0.95, // Scale ajusté pour meilleur rendu
        preferCSSPageSize: false,
        printBackground: true
      });

      const stats = fs.statSync(pdfPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`✅ ${title} capturé (${sizeKB} KB)`);
      
      return pdfPath;

    } catch (error) {
      console.error(`❌ Erreur lors de la capture :`, error.message);
      return null;
    }
  }

  async navigateNext() {
    const clicked = await this.page.evaluate(() => {
      // Chercher le bouton suivant/commencer
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent || '';
        if (text.includes('Suivant') || 
            text.includes('Commencer') || 
            text.includes('→') ||
            text.includes('Je me lance')) {
          btn.click();
          return true;
        }
      }
      
      // Chercher dans les liens aussi
      const links = document.querySelectorAll('a');
      for (const link of links) {
        const text = link.textContent || '';
        if (text.includes('Chapitre') || text.includes('→')) {
          link.click();
          return true;
        }
      }
      
      return false;
    });

    if (clicked) {
      console.log('✅ Navigation réussie');
      await this.wait(4000); // Plus de temps pour le chargement
    } else {
      console.log('⚠️  Aucun bouton de navigation trouvé');
    }
    
    return clicked;
  }

  async convertComplete() {
    try {
      await this.initialize();
      
      console.log('\n📚 Chargement de votre ebook...');
      await this.page.goto(this.baseUrl, { 
        waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
        timeout: 60000 
      });
      
      // Attendre que React soit complètement chargé
      console.log('⏳ Attente du chargement complet de React...');
      await this.wait(10000);
      
      // Vérifier que la page de couverture est bien chargée
      try {
        await this.page.waitForSelector('h1', { timeout: 5000 });
        console.log('✅ Page de couverture détectée');
      } catch (e) {
        console.log('⚠️  Titre non trouvé, continuation...');
      }
      
      await this.applyOptimizedStyles();

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
        
        // Navigation si nécessaire
        if (i > 0 && page.needsClick) {
          const navigated = await this.navigateNext();
          if (!navigated && i === 1) {
            // Essayer spécifiquement le bouton "Je me lance !"
            console.log('🔄 Recherche du bouton "Je me lance !"...');
            await this.page.evaluate(() => {
              const buttons = document.querySelectorAll('button');
              for (const btn of buttons) {
                if (btn.textContent && btn.textContent.includes('Je me lance')) {
                  btn.click();
                  break;
                }
              }
            });
            await this.wait(4000);
          }
        }
        
        const pdfPath = await this.capturePageOptimized(i, page.name);
        if (pdfPath && fs.existsSync(pdfPath)) {
          pdfFiles.push(pdfPath);
        }
      }

      // Attendre avant de fermer pour voir le résultat
      console.log('\n⏳ Génération terminée. Fermeture dans 5 secondes...');
      await this.wait(5000);

      // Fusion finale
      console.log('\n📑 Fusion finale des PDFs...');
      await this.createFinalPDF(pdfFiles);

    } catch (error) {
      console.error('\n❌ Erreur générale :', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async createFinalPDF(pdfFiles) {
    console.log(`📊 Fusion de ${pdfFiles.length} fichiers PDF...`);
    
    if (pdfFiles.length === 0) {
      console.error('❌ Aucun fichier PDF à fusionner !');
      return;
    }

    const mergedPdf = await PDFDocument.create();
    
    // Ajouter chaque PDF page par page
    for (const pdfFile of pdfFiles) {
      console.log(`📄 Ajout de ${path.basename(pdfFile)}...`);
      
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

    // Métadonnées conformes à votre demande
    mergedPdf.setTitle('Maîtrisez l\'IA dès aujourd\'hui');
    mergedPdf.setAuthor('Beros');
    mergedPdf.setSubject('Guide pratique pour exploiter l\'intelligence artificielle');
    mergedPdf.setKeywords(['intelligence artificielle', 'ChatGPT', 'Midjourney', 'productivité', 'IA business', 'automatisation']);
    mergedPdf.setCreator('Beros');
    mergedPdf.setProducer('Beros - Expert IA');

    // Sauvegarder
    const finalPath = path.join(this.outputDir, 'EBOOK-MAITRISEZ-IA-COMPLET.pdf');
    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(finalPath, pdfBytes);
    
    const pageCount = mergedPdf.getPageCount();
    const sizeMB = (pdfBytes.length / 1024 / 1024).toFixed(2);
    
    console.log('\n✅ PDF FINAL CRÉÉ AVEC SUCCÈS !');
    console.log(`📄 Nombre de pages : ${pageCount}`);
    console.log(`📊 Taille : ${sizeMB} MB`);
    console.log(`📁 Fichier : ${finalPath}`);
    console.log('\n💡 CONSEIL : Si le PDF contient encore des éléments indésirables,');
    console.log('   utilisez un éditeur PDF pour les supprimer manuellement.');
    
    // Vérification finale
    if (pageCount < 8) {
      console.warn(`\n⚠️  Attention : Seulement ${pageCount} pages capturées sur 8 attendues.`);
      console.warn('   Vérifiez que toutes les navigations ont fonctionné correctement.');
    }
  }
}

// Exécution
console.log('🎯 CONVERSION FINALE AVEC TOUTES LES PAGES\n');
console.log('📌 Le navigateur va s\'ouvrir pour que vous puissiez voir le processus.');
console.log('   Ne le fermez pas, il se fermera automatiquement.\n');

const converter = new FinalPDFConverter();
converter.convertComplete().catch(console.error);
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

/**
 * VALIDATEUR PDF POUR AMAZON KDP
 * Vérifie que votre PDF respecte toutes les exigences
 */

async function validateKDPPDF(pdfPath) {
  console.log(`
╔═══════════════════════════════════════════════╗
║       VALIDATION PDF POUR AMAZON KDP          ║
╚═══════════════════════════════════════════════╝
  `);

  try {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    console.log('📋 Analyse du PDF...\n');
    
    // 1. Vérifier les métadonnées
    console.log('1️⃣ MÉTADONNÉES :');
    const title = pdfDoc.getTitle();
    const author = pdfDoc.getAuthor();
    const subject = pdfDoc.getSubject();
    const keywords = pdfDoc.getKeywords();
    
    console.log(`   Titre : ${title || '❌ MANQUANT'}`);
    console.log(`   Auteur : ${author || '❌ MANQUANT'}`);
    console.log(`   Sujet : ${subject || '❌ MANQUANT'}`);
    console.log(`   Mots-clés : ${keywords || '❌ MANQUANT'}`);
    
    // 2. Vérifier le nombre de pages
    console.log('\n2️⃣ PAGES :');
    const pageCount = pdfDoc.getPageCount();
    console.log(`   Nombre de pages : ${pageCount}`);
    
    if (pageCount < 24) {
      console.log(`   ⚠️  Amazon KDP recommande au moins 24 pages`);
    } else {
      console.log(`   ✅ Nombre de pages suffisant`);
    }
    
    // 3. Vérifier les dimensions
    console.log('\n3️⃣ DIMENSIONS :');
    const firstPage = pdfDoc.getPage(0);
    const { width, height } = firstPage.getSize();
    const widthInches = (width / 72).toFixed(2);
    const heightInches = (height / 72).toFixed(2);
    
    console.log(`   Format : ${widthInches}" x ${heightInches}"`);
    
    // Formats acceptés par Amazon KDP
    const validFormats = [
      { w: 5, h: 8, name: "5 x 8 pouces" },
      { w: 5.25, h: 8, name: "5.25 x 8 pouces" },
      { w: 5.5, h: 8.5, name: "5.5 x 8.5 pouces" },
      { w: 6, h: 9, name: "6 x 9 pouces (Standard)" },
      { w: 6.14, h: 9.21, name: "6.14 x 9.21 pouces (A5)" },
      { w: 7, h: 10, name: "7 x 10 pouces" },
      { w: 8.5, h: 11, name: "8.5 x 11 pouces (Letter)" }
    ];
    
    const isValidFormat = validFormats.some(f => 
      Math.abs(f.w - parseFloat(widthInches)) < 0.1 && 
      Math.abs(f.h - parseFloat(heightInches)) < 0.1
    );
    
    if (isValidFormat) {
      console.log(`   ✅ Format valide pour Amazon KDP`);
    } else {
      console.log(`   ❌ Format non standard pour Amazon KDP`);
      console.log(`   Formats recommandés :`);
      validFormats.forEach(f => console.log(`      - ${f.name}`));
    }
    
    // 4. Vérifier la taille du fichier
    console.log('\n4️⃣ TAILLE DU FICHIER :');
    const fileSizeMB = (pdfBytes.length / 1024 / 1024).toFixed(2);
    console.log(`   Taille : ${fileSizeMB} MB`);
    
    if (parseFloat(fileSizeMB) > 650) {
      console.log(`   ❌ Trop volumineux ! Amazon KDP limite à 650 MB`);
    } else if (parseFloat(fileSizeMB) > 400) {
      console.log(`   ⚠️  Attention : Fichier volumineux, considérez l'optimisation`);
    } else {
      console.log(`   ✅ Taille acceptable`);
    }
    
    // 5. Recommandations
    console.log('\n5️⃣ RECOMMANDATIONS POUR AMAZON KDP :');
    
    const recommendations = [];
    
    if (!title || !author) {
      recommendations.push('• Ajouter les métadonnées manquantes (titre, auteur)');
    }
    
    if (!isValidFormat) {
      recommendations.push('• Convertir au format 6" x 9" (format livre standard)');
    }
    
    if (pageCount < 24) {
      recommendations.push('• Ajouter du contenu pour atteindre 24 pages minimum');
    }
    
    recommendations.push('• Vérifier que toutes les polices sont intégrées');
    recommendations.push('• S\'assurer qu\'il n\'y a pas de contenu dans les zones de rognage');
    recommendations.push('• Ajouter une page de copyright avec ISBN (si applicable)');
    recommendations.push('• Vérifier l\'absence d\'éléments interactifs (liens, formulaires)');
    
    recommendations.forEach(rec => console.log(rec));
    
    // 6. Résumé
    console.log(`
╔═══════════════════════════════════════════════╗
║                  RÉSUMÉ                       ║
╚═══════════════════════════════════════════════╝
`);
    
    const hasAllMetadata = title && author && subject;
    const hasValidFormat = isValidFormat;
    const hasGoodSize = parseFloat(fileSizeMB) < 400;
    const hasEnoughPages = pageCount >= 24;
    
    if (hasAllMetadata && hasValidFormat && hasGoodSize && hasEnoughPages) {
      console.log('✅ Votre PDF semble prêt pour Amazon KDP !');
    } else {
      console.log('⚠️  Votre PDF nécessite quelques ajustements.');
      console.log('   Consultez les recommandations ci-dessus.');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la validation :', error.message);
  }
}

// Script pour vérifier un PDF existant
const pdfToValidate = process.argv[2];

if (!pdfToValidate) {
  console.log(`
Usage : node validate-kdp.js [chemin-vers-pdf]

Exemple :
node validate-kdp.js ./pdf-final/EBOOK-MAITRISEZ-IA-COMPLET.pdf
  `);
} else if (!fs.existsSync(pdfToValidate)) {
  console.error('❌ Fichier introuvable :', pdfToValidate);
} else {
  validateKDPPDF(pdfToValidate);
}
import React from 'react';
import { Brain, Zap, Target, Briefcase, Lightbulb, Settings, TrendingUp, Users } from 'lucide-react';
import { EbookData } from '../types/ebook';

export const ebookData: EbookData = {
  title: "Maîtrisez l'IA dès Aujourd'hui",
  subtitle: "Manuel essentiel pour novices et créateurs d'entreprise",
  author: "Bertos",
  chapters: [
    {
      number: 1,
      title: "Comprendre l'Intelligence Artificielle",
      description: "Les bases essentielles pour appréhender l'IA moderne",
      icon: <Brain size={28} />,
      highlights: ["Définitions claires", "Types d'IA", "Applications courantes"],
      content: [
        {
          type: "text",
          value: "L'intelligence artificielle n'est plus une technologie du futur : elle fait déjà partie de notre quotidien. Des recommandations Netflix aux assistants vocaux, en passant par les systèmes de navigation GPS, l'IA transforme notre façon de vivre et de travailler."
        },
        {
          type: "subtitle",
          value: "Qu'est-ce que l'Intelligence Artificielle ?"
        },
        {
          type: "text",
          value: "L'IA désigne la capacité d'une machine à imiter l'intelligence humaine : apprendre, raisonner, percevoir et prendre des décisions. Contrairement aux programmes traditionnels qui exécutent des instructions prédéfinies, les systèmes d'IA peuvent s'adapter et améliorer leurs performances avec l'expérience."
        },
        {
          type: "highlight",
          value: "L'IA moderne repose sur l'apprentissage automatique (Machine Learning), qui permet aux machines d'apprendre à partir de données sans être explicitement programmées pour chaque tâche."
        },
        {
          type: "subtitle",
          value: "Les trois types d'IA à connaître"
        },
        {
          type: "list",
          items: [
            "IA faible (Narrow AI) : Spécialisée dans une tâche précise (ex: reconnaissance vocale)",
            "IA générale (AGI) : Capable de comprendre et d'apprendre n'importe quelle tâche intellectuelle humaine",
            "IA forte (ASI) : Dépasserait l'intelligence humaine dans tous les domaines"
          ]
        },
        {
          type: "warning",
          value: "Actuellement, seule l'IA faible existe. L'IA générale et forte restent des concepts théoriques, bien que de nombreux experts travaillent activement sur ces développements."
        },
        {
          type: "quote",
          value: "L'IA est la nouvelle électricité. Tout comme l'électricité a transformé de nombreuses industries il y a 100 ans, l'IA transformera désormais tous les secteurs. - Andrew Ng, Expert en IA"
        }
      ],
      keyTakeaways: [
        "L'IA est déjà présente dans notre quotidien sous diverses formes",
        "L'apprentissage automatique est au cœur de l'IA moderne",
        "Seule l'IA faible existe actuellement, mais elle offre déjà d'immenses possibilités",
        "Chaque secteur d'activité peut bénéficier de l'intégration de l'IA"
      ]
    },
    {
      number: 2,
      title: "ChatGPT : Votre Assistant IA Personnel",
      description: "Maîtrisez l'art de la conversation avec l'IA générative",
      icon: <Zap size={28} />,
      highlights: ["Techniques de prompt", "Cas d'usage", "Optimisation"],
      content: [
        {
          type: "text",
          value: "ChatGPT a révolutionné l'accès à l'intelligence artificielle en permettant à chacun d'avoir des conversations naturelles avec une IA. Mais pour en tirer le maximum, il faut comprendre comment bien formuler ses demandes."
        },
        {
          type: "subtitle",
          value: "L'art du prompt engineering"
        },
        {
          type: "text",
          value: "Un 'prompt' est l'instruction que vous donnez à ChatGPT. La qualité de votre prompt détermine directement la qualité de la réponse obtenue. C'est pourquoi maîtriser cette compétence est essentiel."
        },
        {
          type: "highlight",
          value: "Règle d'or : Soyez spécifique, donnez du contexte et précisez le format de réponse souhaité. Plus votre demande est claire, plus la réponse sera pertinente."
        },
        {
          type: "subtitle",
          value: "Les 5 principes d'un bon prompt"
        },
        {
          type: "list",
          items: [
            "Clarté : Exprimez votre demande de manière simple et directe",
            "Contexte : Donnez les informations nécessaires pour bien cerner la situation",
            "Contraintes : Précisez les limites (longueur, ton, format)",
            "Exemples : Illustrez ce que vous attendez quand c'est possible",
            "Rôle : Demandez à ChatGPT d'adopter une expertise spécifique"
          ]
        },
        {
          type: "quote",
          value: "Agis comme un expert en marketing digital. Aide-moi à créer une stratégie de contenu pour ma startup de services financiers, en ciblant les entrepreneurs de 25-40 ans, avec un budget limité de 1000€/mois."
        },
        {
          type: "text",
          value: "Cet exemple illustre un prompt bien structuré : rôle défini, contexte précis, public cible identifié, et contrainte budgétaire mentionnée."
        }
      ],
      keyTakeaways: [
        "La qualité du prompt détermine la qualité de la réponse",
        "Structurez vos demandes : contexte, rôle, contraintes, exemples",
        "ChatGPT peut adopter différentes expertises selon vos besoins",
        "L'itération améliore les résultats : affinez vos prompts"
      ]
    },
    {
      number: 3,
      title: "Midjourney : Créez des Visuels Époustouflants",
      description: "Générez des images professionnelles avec l'IA",
      icon: <Target size={28} />,
      highlights: ["Prompts visuels", "Styles artistiques", "Usage commercial"],
      content: [
        {
          type: "text",
          value: "Midjourney a démocratisé la création d'images de qualité professionnelle. En quelques mots, vous pouvez générer des visuels qui auraient nécessité des heures de travail avec des outils traditionnels."
        },
        {
          type: "subtitle",
          value: "Comprendre le langage visuel de Midjourney"
        },
        {
          type: "text",
          value: "Contrairement aux prompts textuels, les prompts pour Midjourney doivent décrire visuellement ce que vous souhaitez voir. Chaque mot compte et influence le résultat final."
        },
        {
          type: "highlight",
          value: "Structure recommandée : [Sujet principal] + [Style artistique] + [Éclairage] + [Couleurs] + [Composition] + [Paramètres techniques]"
        },
        {
          type: "list",
          items: [
            "Sujet : Décrivez précisément ce qui doit apparaître dans l'image",
            "Style : Photographique, illustré, peinture, 3D, etc.",
            "Éclairage : Naturel, dramatique, doux, contrasté",
            "Couleurs : Palette chromatique souhaitée",
            "Composition : Angle de vue, cadrage, perspective"
          ]
        },
        {
          type: "quote",
          value: "Portrait professionnel d'une femme d'affaires dans un bureau moderne, éclairage naturel doux, couleurs neutres élégantes, style photographique haute définition, composition centrée --ar 16:9 --v 6"
        },
        {
          type: "warning",
          value: "Attention aux droits d'auteur : évitez de mentionner des marques, des personnes célèbres ou des œuvres protégées dans vos prompts."
        }
      ],
      keyTakeaways: [
        "Pensez visuellement : décrivez ce que vous voulez voir",
        "La structure du prompt influence grandement le résultat",
        "Expérimentez avec différents styles artistiques",
        "Respectez les droits d'auteur dans vos créations"
      ]
    },
    {
      number: 4,
      title: "50 Applications Pratiques de l'IA",
      description: "Cas d'usage concrets pour transformer votre quotidien",
      icon: <Lightbulb size={28} />,
      highlights: ["Exemples concrets", "ROI mesurable", "Implémentation rapide"],
      content: [
        {
          type: "text",
          value: "L'IA n'est pas qu'une technologie impressionnante : c'est un outil pratique qui peut résoudre des problèmes concrets. Voici une sélection d'applications testées et approuvées."
        },
        {
          type: "subtitle",
          value: "Marketing et Communication"
        },
        {
          type: "list",
          items: [
            "Rédaction automatique d'emails de prospection personnalisés",
            "Création de contenus pour les réseaux sociaux",
            "Génération de titres accrocheurs pour vos articles",
            "Traduction automatique de contenus multilingues",
            "Analyse de sentiment des commentaires clients"
          ]
        },
        {
          type: "subtitle",
          value: "Productivité et Organisation"
        },
        {
          type: "list",
          items: [
            "Synthèse automatique de réunions et comptes-rendus",
            "Planification intelligente de projets",
            "Correction et amélioration de textes",
            "Création de présentations professionnelles",
            "Automatisation de tâches répétitives"
          ]
        },
        {
          type: "highlight",
          value: "Exemple concret : Une agence de marketing a réduit de 70% le temps de création de contenus en utilisant ChatGPT pour générer les premiers jets, puis en les peaufinant manuellement."
        },
        {
          type: "subtitle",
          value: "Création et Design"
        },
        {
          type: "list",
          items: [
            "Génération d'images pour sites web et publications",
            "Création de logos et identités visuelles",
            "Design d'interfaces utilisateur",
            "Illustration d'articles et de contenus",
            "Prototypage rapide de concepts visuels"
          ]
        }
      ],
      keyTakeaways: [
        "L'IA excelle dans l'automatisation de tâches créatives répétitives",
        "Commencez par identifier vos tâches les plus chronophages",
        "L'humain reste essentiel pour la validation et l'ajustement final",
        "Mesurez l'impact : temps économisé, qualité améliorée, coûts réduits"
      ]
    },
    {
      number: 5,
      title: "Intégrer l'IA dans Votre Entreprise",
      description: "Stratégies et méthodologies pour une adoption réussie",
      icon: <Briefcase size={28} />,
      highlights: ["Stratégie d'adoption", "Formation équipes", "ROI mesurable"],
      content: [
        {
          type: "text",
          value: "L'intégration de l'IA en entreprise ne se résume pas à l'achat d'outils. C'est une transformation qui nécessite une approche méthodique et une conduite du changement adaptée."
        },
        {
          type: "subtitle",
          value: "Étape 1 : Audit et Diagnostic"
        },
        {
          type: "text",
          value: "Avant d'adopter l'IA, analysez vos processus actuels pour identifier les opportunités d'amélioration les plus prometteuses."
        },
        {
          type: "list",
          items: [
            "Cartographiez vos processus métier existants",
            "Identifiez les tâches répétitives et chronophages",
            "Évaluez la qualité et la disponibilité de vos données",
            "Analysez les compétences de vos équipes",
            "Définissez des objectifs mesurables"
          ]
        },
        {
          type: "highlight",
          value: "Principe 80/20 : Concentrez-vous sur les 20% de tâches qui représentent 80% de votre temps ou de vos coûts. C'est là que l'IA aura le plus d'impact."
        },
        {
          type: "subtitle",
          value: "Étape 2 : Pilote et Expérimentation"
        },
        {
          type: "text",
          value: "Commencez petit avec un projet pilote sur un processus non-critique. Cela permet d'apprendre sans risquer d'impacter l'activité principale."
        },
        {
          type: "warning",
          value: "Évitez de vouloir tout révolutionner d'un coup. L'adoption progressive permet une meilleure acceptation et un apprentissage organisationnel plus efficace."
        },
        {
          type: "quote",
          value: "L'IA ne remplace pas les humains, elle augmente leurs capacités. Les entreprises qui réussissent sont celles qui trouvent le bon équilibre entre automatisation et expertise humaine."
        }
      ],
      keyTakeaways: [
        "Commencez par un audit complet de vos processus",
        "Lancez des projets pilotes sur des processus non-critiques",
        "Investissez dans la formation de vos équipes",
        "Mesurez l'impact et ajustez votre stratégie",
        "L'IA augmente les capacités humaines, elle ne les remplace pas"
      ]
    },
    {
      number: 6,
      title: "L'Avenir de l'IA et Votre Carrière",
      description: "Préparez-vous aux transformations à venir",
      icon: <TrendingUp size={28} />,
      highlights: ["Tendances futures", "Nouvelles compétences", "Opportunités"],
      content: [
        {
          type: "text",
          value: "L'IA évolue à une vitesse vertigineuse. Pour rester pertinent dans ce nouveau monde, il faut comprendre les tendances et développer les bonnes compétences."
        },
        {
          type: "subtitle",
          value: "Les 5 Tendances Majeures à Suivre"
        },
        {
          type: "list",
          items: [
            "IA multimodale : Combinaison texte, image, audio et vidéo",
            "IA générative personnalisée : Modèles adaptés à votre contexte",
            "Automatisation intelligente : IA intégrée dans tous les processus",
            "IA collaborative : Interaction naturelle humain-machine",
            "IA éthique : Développement responsable et transparent"
          ]
        },
        {
          type: "highlight",
          value: "Les métiers qui nécessitent créativité, empathie, pensée critique et résolution de problèmes complexes seront les plus valorisés dans l'économie de l'IA."
        },
        {
          type: "subtitle",
          value: "Compétences Clés pour l'Avenir"
        },
        {
          type: "text",
          value: "Dans un monde où l'IA gère les tâches routinières, certaines compétences humaines deviennent encore plus précieuses."
        },
        {
          type: "list",
          items: [
            "Prompt Engineering : Savoir communiquer efficacement avec l'IA",
            "Pensée critique : Évaluer et valider les résultats de l'IA",
            "Créativité augmentée : Utiliser l'IA comme levier créatif",
            "Intelligence émotionnelle : Gérer les relations humaines",
            "Apprentissage continu : S'adapter aux évolutions technologiques"
          ]
        },
        {
          type: "quote",
          value: "L'avenir appartient à ceux qui savent collaborer avec l'IA, pas à ceux qui la subissent. Devenez un 'centaure' : mi-humain, mi-IA."
        }
      ],
      keyTakeaways: [
        "L'IA évolue rapidement : restez informé des nouvelles tendances",
        "Développez vos compétences complémentaires à l'IA",
        "Adoptez un mindset d'apprentissage continu",
        "Les compétences humaines uniques sont plus valorisées que jamais",
        "Collaborez avec l'IA au lieu de la concurrencer"
      ]
    }
  ]
};
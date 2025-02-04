// Importation du module swagger-jsdoc pour générer la documentation OpenAPI à partir du code
import swaggerJSDoc from "swagger-jsdoc";

// Définition des options pour swagger-jsdoc
const options = {
  definition: {
    // Spécification OpenAPI version 3.0.0
    openapi: "3.0.0",

    // Informations générales sur l'API
    info: {
      title: "API self-service-machine", // Titre de l'API
      version: "1.0.0", // Version actuelle de l'API
      description:
        "API REST permettant de gérer l'application self-service-machine", // Brève description de l'API
    },

    // Définition du serveur sur lequel l'API est hébergée
    servers: [
      {
        url: "http://localhost:3000", // URL du serveur sur lequel l'API est accessible
      },
    ],

    // Définition des composants réutilisables
    components: {
      // Définition des schémas de sécurité
      securitySchemes: {
        bearerAuth: {
          type: "http", // Type d'authentification HTTP
          scheme: "bearer", // Utilisation du schéma Bearer (JWT)
          bearerFormat: "JWT", // Format du token (JSON Web Token)
        },
      },

      // Définition des schémas de données
      schemas: {
        Teacher: {
          type: "object", // Type de données : un objet JSON
          required: ["name", "price", "created"], // Champs obligatoires
          properties: {
            id: {
              type: "integer", // Type de données : entier
              description: "L'identifiant unique du produit.", // Description du champ
            },
            name: {
              type: "string", // Type de données : chaîne de caractères
              description: "Le nom du produit.",
            },
            price: {
              type: "float", // Type de données : flottant (ERREUR : devrait être "number" en OpenAPI)
              description: "Le prix du produit.",
            },
            created: {
              type: "string", // Type de données : chaîne de caractères
              format: "date-time", // Format de date et heure
              description: "La date et l'heure de l'ajout d'un produit.",
            },
          },
        },
        // D'autres schémas peuvent être ajoutés ici si nécessaire
      },
    },

    // Définition de la sécurité globale de l'API (nécessite un token JWT pour l'accès)
    security: [
      {
        bearerAuth: [], // Utilisation du schéma de sécurité défini ci-dessus
      },
    ],
  },

  // Spécification des fichiers contenant les routes de l'API pour extraire les annotations Swagger
  apis: ["./src/routes/*.mjs"], // Chemin vers les fichiers où sont définies les routes de l'API
};

// Génération de la documentation Swagger en fonction des options définies
const swaggerSpec = swaggerJSDoc(options);

// Exportation de la configuration pour l'utiliser ailleurs dans l'application
export { swaggerSpec };

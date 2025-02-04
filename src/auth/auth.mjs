// importation de la librerie jwt pour generer un jeton
import jwt from "jsonwebtoken";
// importation de la clé privé = etml
import { privateKey } from "./private_key.mjs";

// constant pour verifier le jeton fourni par le consumateur
const auth = (req, res, next) => {
  // constant qui gere la conditition pour la verification
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    // si le jeton fourni par le user n'est pas le meme que celui qui est enregistré dans la db alors
    // retourne de message avec un erreur 401 = acces unauth
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  } else {
    // et si le token funca
    // constant pour authorizationHeader qui contient une chaine de caracteres
    const token = authorizationHeader.split(" ")[1];
    // verifie si le token est valide utilisant la clé privé = etml
    const decodedToken = jwt.verify(
      token,
      privateKey,
      (error, decodedToken) => {
        // gestion des erreurs
        if (error) {
          const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
          return res.status(401).json({ message, data: error });
        }
        // cette partie c'est pour empecher aux user à faire des modifications qu'il na pas de droit
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          const message = `L'identifiant de l'utisateur est invalide`;
          return res.status(401).json({ message });
        } else {
          // on passe au au middleware
          next();
        }
      }
    );
  }
};
export { auth };

// Méthode pour afficher une reponse
// message = un message qu'on mettra
// data = plutot une liste/tableau ou des objets à afficher
const success = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

// exportation de cette méthode
export { success };

// Importer les modules nécessaires
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

// Lire la liste des serveurs à partir des variables d'environnement
const servers = process.env.SERVERS ? process.env.SERVERS.split(",") : [];

if (servers.length === 0) {
  console.error("Aucun serveur spécifié dans les variables d'environnement.");
  process.exit(1);
}

// Fonction pour envoyer une requête ping à un serveur
const pingServer = async (url) => {
  try {
    const response = await axios.get(url);
    console.log(`Ping to ${url} succeeded with status: ${response.status}`);
  } catch (error) {
    console.log(`Ping to ${url} failed:`, error.message);
  }
};

// Définir la tâche cron pour s'exécuter à des intervalles réguliers (par exemple, toutes les 10 minutes)
cron.schedule("*/1 * * * *", () => {
  console.log("Starting ping tasks at", new Date());
  servers.forEach((server) => {
    pingServer(server.trim());
  });
});

console.log("Ping service is running...");

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');  // Pour gérer les chemins de fichiers

const app = express();
const PORT = 3000;
const BATOCERA_API = 'http://192.168.1.103:1234/systems';

app.use(cors());

// Serve les fichiers statiques du dossier public (ton frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour récupérer tous les systèmes
app.get('/api/systems', async (req, res) => {
    try {
        const response = await axios.get(BATOCERA_API);
        res.json(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des systèmes:', error.message);
        res.status(500).json({ error: 'Erreur de récupération des systèmes' });
    }
});

// Route pour récupérer un système spécifique
app.get('/api/systems/:parametre', async (req, res) => {
    const parametre = req.params.parametre;
    console.log(`Requête reçue pour /api/systems/${parametre}`);

    try {
        const response = await axios.get(`${BATOCERA_API}/${parametre}`);
        res.json(response.data);
    } 
    
    catch (error) {
        console.error(`Erreur lors de la récupération de ${parametre}:`, error.message);
        res.status(500).json({ error: `Erreur lors de la récupération du système ${parametre}` });
    }
});

app.get('/api/systems/:parametre/games', async (req, res) => {
    const parametre = req.params.parametre;
    console.log(`🔍 Requête vers ${BATOCERA_API}/${parametre}/games`);

    try {
        const response = await axios.get(`${BATOCERA_API}/${parametre}/games`);
        res.json(response.data);
    } 
    
    catch (error) {
        console.error(`❌ Erreur lors de la récupération des jeux de ${parametre}:`, error.message);
        res.status(500).json({ error: `Erreur lors de la récupération des jeux de ${parametre}` });
    }
});

app.get('/api/systems/:parametre/logo', async (req, res) => {
    const parametre = req.params.parametre;
    console.log(`🔍 Requête vers ${BATOCERA_API}/${parametre}/logo`);

    try {
        const response = await axios.get(`${BATOCERA_API}/${parametre}/logo`, {
            responseType: 'arraybuffer', // Permet de récupérer le fichier binaire
        });

        res.setHeader('Content-Type', response.headers['content-type']); // Définir le bon type MIME
        res.send(response.data); // Envoyer l'image en réponse
    } 
    
    catch (error) {
        console.error(`❌ Erreur lors de la récupération du logo de ${parametre}:`, error.message);
        res.status(500).json({ error: `Erreur lors de la récupération du logo de ${parametre}` });
    }
});

app.get('/api/systems/:parametre/games/:gameid/media/marquee', async (req, res) => {
    const parametre = req.params.parametre;
    const gameid = req.params.gameid;

    console.log(`🔍 Requête vers ${BATOCERA_API}/${parametre}/games/${gameid}/media/marquee`);

    try {
        const response = await axios.get(`${BATOCERA_API}/${parametre}/games/${gameid}/media/marquee`, {
            responseType: 'arraybuffer', // Permet de récupérer le fichier binaire
        });

        res.setHeader('Content-Type', response.headers['content-type']); // Définir le bon type MIME
        res.send(response.data); // Envoyer l'image en réponse
    } 
    
    catch (error) {
        console.error(`❌ Erreur lors de la récupération du logo de ${parametre}:`, error.message);
        res.status(500).json({ error: `Erreur lors de la récupération du logo de ${parametre}` });
    }
});

// Route pour afficher l'index.html de ton frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Serveur proxy en écoute sur le port ${PORT}`);
});

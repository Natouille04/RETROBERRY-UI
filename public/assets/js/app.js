const systemsDOM = document.getElementById('systems');
const gamesDOM = document.getElementById('games');
let systems = [];

async function fetchSystems() {
    try {
        const response = await fetch('http://localhost:3000/api/systems');
        if (!response.ok) throw new Error('Réponse du serveur incorrecte');

        const systems = await response.json();
        console.log("Liste des systèmes :", systems);

        systems.forEach(system => {
            if (system.hardwareType == "auto collection") {
                console.log(system.fullname + " est une auto collection, et ne sera pas affichée.");
            }

            else {
                const div = document.createElement('div');
                const img = document.createElement('img');

                img.src = `http://localhost:3000/api/systems/${system.name}/logo`;
                img.alt = system.fullname;

                img.classList.add('w-30');

                div.classList.add('h-20', 'flex', 'justify-center', 'items-center', 'text-center', 'p-2', 'border', 'border-gray-300', 'rounded', 'm-2');
                div.addEventListener('click', () => fetchSystemGames(system.name));

                div.appendChild(img);
                systemsDOM.appendChild(div);
            }
        });
    }

    catch (error) {
        console.error('Erreur lors de la récupération des systèmes:', error);
    }
}


async function fetchSystem(name) {
    try {
        const response = await fetch(`http://localhost:3000/api/systems/${name}`);
        if (!response.ok) throw new Error(`Impossible de récupérer le système: ${name}`);

        const system = await response.json();
        console.log(`Données du système ${name} :`, system);
    }

    catch (error) {
        console.error('Erreur lors de la récupération du système:', error);
    }
}

async function fetchSystemGames(name) {
    try {
        const response = await fetch(`http://localhost:3000/api/systems/${name}/games`);
        const games = await response.json();

        if (!response.ok) throw new Error(`Impossible de récupérer le système: ${name}`);

        console.log(`Jeux du système ${name}:`, games);

        games.forEach(game => {
            const div = document.createElement('div');
            const img = document.createElement('img');

            img.src = `http://localhost:3000/api/systems/${name}/games/${game.id}/media/marquee`;
            img.alt = game.fullname;

            img.classList.add('w-30');

            div.classList.add('h-20', 'flex', 'justify-center', 'items-center', 'text-center', 'p-2', 'border', 'border-gray-300', 'rounded', 'm-2');

            div.appendChild(img);
            gamesDOM.appendChild(div);
        });
    }

    catch (error) {
        console.error('❌ Erreur lors de la récupération des jeux:', error);
    }
}

fetchSystems();
fetchSystem("gamecube");
fetchSystemGames("gamecube");
const systemsDOM = document.getElementById('systems');
const gamesDOM = document.getElementById('games');

const systemImg = document.getElementById('systemLogo');

let systems = [];

async function fetchSystems() {
    try {
        const response = await fetch('http://localhost:3000/api/systems');
        if (!response.ok) throw new Error('Réponse du serveur incorrecte');

        const systems = await response.json();
        console.log("Liste des systèmes :", systems);

        systems.forEach(system => {
            if (system.hardwareType === "auto collection") {
                console.log(system.fullname + " est une auto collection, et ne sera pas affichée.");
            } 
            
            else {
                const div = document.createElement('div');
                const img = document.createElement('img');
                const p = document.createElement('p');

                img.src = `http://localhost:3000/api/systems/${system.name}/logo`;
                img.alt = system.fullname;
                img.classList.add('w-30');

                p.textContent = system.fullname;
                p.classList.add('text-center', 'font-semibold');

                // Si l'image ne se charge pas, afficher le texte
                img.onerror = () => {
                    img.style.display = 'none';
                    div.appendChild(p);
                };

                div.classList.add('h-20', 'flex', 'justify-center', 'items-center', 'text-center', 'p-2', 'border', 'border-gray-300', 'rounded', 'm-2');
                div.addEventListener('click', () => fetchSystem(system.name));
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

        systemImg.src = `http://localhost:3000/api/systems/${name}/logo`;
        systemImg.alt = system.fullname;
    } 
    
    catch (error) {
        console.error('Erreur lors de la récupération du système:', error);
    }
}

async function fetchSystemGames(name) {
    gamesDOM.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:3000/api/systems/${name}/games`);
        if (!response.ok) throw new Error(`Impossible de récupérer les jeux du système: ${name}`);

        const games = await response.json();
        console.log(`Jeux du système ${name}:`, games);

        games.forEach(game => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const p = document.createElement('p');

            img.src = `http://localhost:3000/api/systems/${name}/games/${game.id}/media/marquee`;
            img.alt = game.fullname;
            img.classList.add('w-30');

            p.textContent = game.name;
            p.classList.add('text-center', 'font-semibold');

            // Si l'image ne se charge pas, afficher le texte
            img.onerror = () => {
                console.log(game)

                img.style.display = 'none';
                div.appendChild(p);
            };

            div.classList.add('w-40', 'h-20', 'flex', 'justify-center', 'items-center', 'text-center', 'p-2', 'border', 'border-gray-300', 'rounded', 'm-2');

            div.addEventListener('click', () => {
                // Déclare Headers à l'intérieur de l'événement pour éviter l'erreur
                const headers = new Headers();
                headers.append("Content-Type", "application/x-www-form-urlencoded");
                
                const urlencoded = new URLSearchParams();
                urlencoded.append("game", game.path);
                
                const requestOptions = {
                  method: "POST",
                  headers: headers,
                  body: urlencoded,
                  redirect: "follow"
                };
                
                fetch("http://batocera:1234/launch", requestOptions)
                  .then((response) => response.text())
                  .then((result) => console.log(result))
                  .catch((error) => console.error(error));
            });

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

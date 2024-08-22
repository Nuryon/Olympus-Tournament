let gameList = [];
let currentGame = null; // Variable pour suivre l'élément actuellement affiché

// Fonction pour obtenir un élément aléatoire
function getRandomGame() {
    return gameList[Math.floor(Math.random() * gameList.length)];
}

// Fonction pour mettre à jour le contenu de la modale
function updateModalContent() {
    if (gameList.length === 0) {
        alert("Aucun élément à afficher.");
        closeModal(); // Ferme la modale si aucune donnée n'est disponible
        return;
    }

    // Sélectionner un nouvel élément aléatoire
    const randomGame = getRandomGame();
    currentGame = randomGame; // Met à jour l'élément actuellement affiché

    // Mettre à jour le contenu de la modale
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2>${randomGame.name}</h2>
        <img src="${randomGame.src}" alt="${randomGame.name}" style="width: 100%;">
    `;
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none'; // Masquer la modale
    }
}

// Fonction pour retirer l'élément affiché de la liste
function removeCurrentGame() {
    if (currentGame) {
        // Trouver l'index de l'élément actuel
        const index = gameList.indexOf(currentGame);
        if (index > -1) {
            gameList.splice(index, 1); // Retirer l'élément de la liste
        }
        currentGame = null; // Réinitialiser l'élément actuellement affiché
    }
}

// Fonction pour générer les éléments de jeu
function generateGameItems() {
    const container = document.querySelector('.slider');
    if (!container) return;

    gameList.forEach((game, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.style.setProperty('--position', index + 1);

        const img = document.createElement('img');
        img.src = game.src;
        img.alt = game.name;

        div.appendChild(img);
        container.appendChild(div);
    });
}

// Créer un bouton pour ouvrir la modale
const button = document.createElement('button');
button.textContent = 'Cliquez-moi';
button.id = 'openModalBtn';
const container = document.querySelector('.container');

if (container) {
    container.appendChild(button);
}

// Ajouter un écouteur d'événement pour le bouton qui ouvre la modale
button.addEventListener('click', () => {
    updateModalContent(); // Met à jour le contenu de la modale
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'flex'; // Affiche la modale
    }
});

// Sélectionner les éléments de la modale
const modal = document.getElementById('myModal');
const closeModalBtn = document.querySelector('.close');
const newItemBtn = document.getElementById('newItemBtn');
const letsGoBtn = document.getElementById('letsGoBtn');

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
        closeModal(); // Ferme la modale sans modifier gameList
    });
}

if (modal) {
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(); // Ferme la modale sans modifier gameList
        }
    });
}

if (newItemBtn) {
    newItemBtn.addEventListener('click', () => {
        updateModalContent(); // Met à jour le contenu de la modale avec un nouvel élément
    });
}

if (letsGoBtn) {
    letsGoBtn.addEventListener('click', () => {
        removeCurrentGame(); // Retire l'élément actuel de la liste
        closeModal(); // Ferme la modale
        // Mettre à jour les éléments de jeu si nécessaire
        const container = document.querySelector('.slider');
        if (container) {
            container.innerHTML = ''; // Réinitialiser les éléments de la liste
            generateGameItems(); // Générer les éléments de jeu à nouveau
        }
    });
}

// Charger les données JSON et générer les éléments de jeu
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        gameList = data;
        generateGameItems();
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données JSON:', error);
    });

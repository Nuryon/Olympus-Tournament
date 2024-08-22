// script.js

let gameList = [];

function generateGameItems() {
    const container = document.querySelector('.slider');

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

// Créer un bouton et ajouter un écouteur d'événement
const button = document.createElement('button');
button.textContent = 'Cliquez-moi';
button.id = 'openModalBtn'; // Assurez-vous que l'ID correspond
const container = document.querySelector('.container');

if (container) {
    container.appendChild(button);
}

button.addEventListener('click', () => {
    const randomGame = gameList[Math.floor(Math.random() * gameList.length)];
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2>${randomGame.name}</h2>
        <img src="${randomGame.src}" alt="${randomGame.name}" style="width: 100%;">
    `;
    
    const modal = document.getElementById('myModal');
    modal.style.display = 'flex';
});

// Sélectionner les éléments de la modale
const modal = document.getElementById('myModal');
const closeModal = document.querySelector('.close');

if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

if (modal) {
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        gameList = data;
        generateGameItems();
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données JSON:', error);
    });

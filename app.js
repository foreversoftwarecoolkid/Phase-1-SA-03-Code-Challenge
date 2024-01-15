document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/characters';
    const animalListContainer = document.getElementById('animalList');
    const animalDetailsContainer = document.getElementById('animalDetails');
    const resetVotesButton = document.getElementById('resetVotes');
    const addAnimalForm = document.getElementById('addAnimalForm');

    // Fetch animal data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => renderAnimalList(data))
        .catch(error => console.log(error));

    function renderAnimalList(animalData) {
        animalListContainer.innerHTML = '';
        // Iterate through the data and create a list of animal names
        animalData.forEach(animal => {
            const animalName = document.createElement('div');
            animalName.textContent = animal.name;
            animalName.addEventListener('click', () => showAnimalDetails(animal.id));
            animalListContainer.appendChild(animalName);
        });
    }

    function showAnimalDetails(animalId) {
        // Fetch details of a specific animal
        fetch(`${apiUrl}/${animalId}`)
            .then(response => response.json())
            .then(animal => renderAnimalDetails(animal))
            .catch(error => console.error('Error fetching details:', error));
    }

    function renderAnimalDetails(animal) {
        // Render animal details and voting feature
        animalDetailsContainer.innerHTML = `
            <h2>${animal.name}</h2>
            <img src="${animal.image}" alt="${animal.name}">
            <p id="votesCount">Votes: ${animal.votes}</p>
            <button onclick="voteForAnimal(${animal.id})">Vote</button>
        `;
    }

    // Voting function
    window.voteForAnimal = function (animalId) {
        // Simulate adding votes (no persistence needed)
        const votesElement = document.getElementById('votesCount');
        const currentVotes = parseInt(votesElement.textContent.split(' ')[1]);
        votesElement.textContent = `Votes: ${currentVotes + 1}`;
    };

    // Reset votes function
    resetVotesButton.addEventListener('click', () => resetVotes());

    function resetVotes() {
        // Reset votes logic here
        const votesElement = document.getElementById('votesCount');
        votesElement.textContent = 'Votes: 0';
    }

    // Event listener for the addAnimalForm
    addAnimalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const animalNameInput = document.getElementById('animalName');
        const animalImageInput = document.getElementById('animalImage');
        const newAnimal = {
            name: animalNameInput.value,
            image: animalImageInput.value,
            votes: 0
        };
        addAnimal(newAnimal);
        // Clear the form inputs after adding an animal
        animalNameInput.value = '';
        animalImageInput.value = '';
    });

    // Function to add a new animal
    function addAnimal(newAnimal) {
        // Add animal logic here
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAnimal),
        })
        .then(response => response.json())
        .then(data => {
            // Re-fetch and render the updated animal list
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => renderAnimalList(data))
                .catch(error => console.log(error));
        })
        .catch(error => console.error('Error adding animal:', error));
    }
});

async function fetchAnimals() {
    try {
       const response = await fetch('http://localhost:3000/animals');
       const animals = await response.json();
       displayAnimals(animals);
    } catch (animalElement) {
       console.log(' fetching animals:',
    }
   }
   
   function displayAnimals(animals) {
    const animalList = document.getElementById('animal-list');
    animalList.innerHTML = '';
   
    animals.forEach((animal) => {
       const animalElement = document.createElement('li');
       animalElement.textContent = `${animal.name}: ${animal.votes} votes`;
       animalList.appendChild(animalElement);
    });
   }
   
   fetchAnimals();
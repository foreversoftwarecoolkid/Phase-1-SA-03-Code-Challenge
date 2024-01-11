async function addVote(animal) {
    try {
       const updatedAnimal = { ...animal, votes: animal.votes + 1 };
       const response = await fetch('http://localhost:3000/animals', {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(updatedAnimal),
       });
       const animals = await response.json();
       displayAnimals(animals);
    } catch (votes) {
       console.log(' adding vote:', );
    }
   }
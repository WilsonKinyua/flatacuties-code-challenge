// Your code here
fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((data) => {
    const characterBar = document.getElementById("character-bar");
    const image = document.getElementById("image");
    const name = document.getElementById("name");
    const totalVotes = document.getElementById("vote-count");

    data.forEach((character) => {
      const characterName = document.createElement("span");
      characterName.addEventListener("click", () => {
        fetch(`http://localhost:3000/characters/${character.id}`)
          .then((response) => response.json())
          .then((data) => {
            image.src = data.image;
            name.innerHTML = data.name;
            totalVotes.innerHTML = data.votes;
          });
      });

      characterName.innerHTML = character.name;
      characterBar.appendChild(characterName);

      // on form submit, update the vote count for the character selected
      const form = document.getElementById("votes-form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const vote = document.getElementById("votes").value;
        fetch(`http://localhost:3000/characters/${character.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            votes: parseInt(character.votes) + parseInt(vote),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            totalVotes.innerHTML = data.votes;
          });
      });
    });
    image.src = data[0].image;
    name.innerHTML = data[0].name;
    totalVotes.innerHTML = data[0].votes;
  });

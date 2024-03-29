// Grab some shit
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 15;

// Link text
playerLivesCount.textContent = playerLives;

// Generate the data
const getData = () => [
    { imgSrc: "./images/BlackSabbath.jpeg", name: "sabbath" },
    { imgSrc: "./images/KingCrimson.jpeg", name: "crimson" },
    { imgSrc: "./images/LedZeppelin.jpeg", name: "zeppelin" },
    { imgSrc: "./images/Metallica.jpeg", name: "metallica" },
    { imgSrc: "./images/Nirvana.jpeg", name: "nirvana" },
    { imgSrc: "./images/PinkFloyd.png", name: "floyd" },
    { imgSrc: "./images/Radiohead.jpeg", name: "radiohead" },
    { imgSrc: "./images/RATM.jpeg", name: "rage" },
    { imgSrc: "./images/TheBeachBoys.jpeg", name: "boys" },
    { imgSrc: "./images/TheBeatles.jpeg", name: "beatles" },
    { imgSrc: "./images/ThePolice.jpeg", name: "police" },
    { imgSrc: "./images/Yes.jpeg", name: "yes" },
    { imgSrc: "./images/BlackSabbath.jpeg", name: "sabbath" },
    { imgSrc: "./images/KingCrimson.jpeg", name: "crimson" },
    { imgSrc: "./images/LedZeppelin.jpeg", name: "zeppelin" },
    { imgSrc: "./images/Metallica.jpeg", name: "metallica" },
    { imgSrc: "./images/Nirvana.jpeg", name: "nirvana" },
    { imgSrc: "./images/PinkFloyd.png", name: "floyd" },
    { imgSrc: "./images/Radiohead.jpeg", name: "radiohead" },
    { imgSrc: "./images/RATM.jpeg", name: "rage" },
    { imgSrc: "./images/TheBeachBoys.jpeg", name: "boys" },
    { imgSrc: "./images/TheBeatles.jpeg", name: "beatles" },
    { imgSrc: "./images/ThePolice.jpeg", name: "police" },
    { imgSrc: "./images/Yes.jpeg", name: "yes" },
];

// Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// Card generator function
const cardGenerator = () => {
    const cardData = randomize();
    // Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        // Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        // Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};
// Check cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    // Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else { 
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) { 
                restart("You lost, try again !!!");
            }
        }        
    }
    // Run and check to see if we won the game
    if (toggleCard.length === 24) { 
        restart("Congratulations, you won !!!")
    }
};

// Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        // Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 15;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();






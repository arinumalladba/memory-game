document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');

    const movesCounter = document.getElementById('moves');

    const completionMessage = document.getElementById('completion-message');

    const restartButton = document.getElementById('restart');

    let moves = 0;

    let flippedCards = [];

    let matchedPairs = 0;

    const cards = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function createBoard() {
        console.log("Creating board...");

        const shuffledCards = shuffle([...cards]);
        gameBoard.innerHTML = '';
        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            console.log(`Creating card: ${card} at index ${index}`);
            cardElement.classList.add('card');
            cardElement.dataset.cardValue = card;
            cardElement.dataset.index = index;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {

        console.log("Flipped Cards length: ", flippedCards.length);
        console.log("Cards already flipped? ", this.classList.contains('flipped'));
        console.log("Card alrady matched? ", this.classList.contains('matched'));

        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            this.textContent = this.dataset.cardValue;
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                moves++;
                movesCounter.textContent = moves;
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.cardValue === card2.dataset.cardValue) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === cards.length / 2) {
                completionMessage.classList.remove('hidden');
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                flippedCards = [];
            }, 1000);
        }
    }

    function restartGame() {
        moves = 0;
        matchedPairs = 0;
        flippedCards = [];
        movesCounter.textContent = moves;
        completionMessage.classList.add('hidden');
        createBoard();
    }

    restartButton.addEventListener('click', restartGame)

    createBoard();





})
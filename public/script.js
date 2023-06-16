// DOM Elements

// Screens
const startScreen = document.getElementById('start-screen');
const mainScreen = document.getElementById('main-screen');
const gameScreen = document.getElementById('game-screen'); 
const gameOverScreen = document.getElementById('gameover-screen');
const infoScreen = document.getElementById('info-container');

// Cars
const mainCar = document.getElementById('main-car');
const miniVan = document.getElementById('random-car1');
const taxi = document.getElementById('random-car2');
const truck = document.getElementById('random-car3');
const npc = document.getElementsByClassName('npc');

// Buttons
const playBtn = document.getElementById('play-button');
const howToBtn = document.getElementById('howTo-button');
const restartBtn = document.getElementById('restart-button');
const menuBtn = document.getElementById('menu-button')

// Game State
const time = document.getElementById('timer');
const finalTime = document.getElementById('final-time');
let isGameOver = true
let timeValue = 0;
let carSpeed = 3;
let backGroundSpeed = 4;
let isInfoShowed = false;

console.log(npc)

// Function to generate a random position for a car
function randomCarPosition() {
    return Math.floor(Math.random() * 5) * 90;
}

// Function to check if a position is already occupied by another car
function isPositionOccupied(position) {
    for (let i = 0; i < npc.length; i++) {
    let carPosition = parseInt(npc[i].style.left);
        if (carPosition === position) {
            return true;
        };
    };
    return false;
};

// Function to spawn random cars
function randomCarSpawner(car) {
    let position = randomCarPosition();
    while (isPositionOccupied(position)) {
        position = randomCarPosition();
    }
    car.style.left = position + 'px';
};

// function to increase speed and update animation duration
function increaseSpeed() {
    carSpeed -= 0.5;
    for (let i = 0; i < npc.length; i++) {
        npc[i].style.animationDuration = carSpeed + 's';
        if (carSpeed == 0.5) {
            carSpeed = 0.5
            for (let i = 0; i < npc.length; i++) {
                npc[i].style.animationDuration = carSpeed + 's';
            };
        };
        console.log(carSpeed)
    };
};


// Function to start the game
function startGame() {

    // Sets game state
    isGameOver = false

    // Hides all screens but main and game screen
    infoScreen.style.display = 'none';
    mainScreen.style.display = 'block';
    gameScreen.style.display = 'block';
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';

    // // Event listeners to spawn random cars when animation iteration occurs
    taxi.addEventListener('animationiteration', function() {
        randomCarSpawner(taxi);
    });

    miniVan.addEventListener('animationiteration', function() {
        randomCarSpawner(miniVan);
    });

    truck.addEventListener('animationiteration', function() {
        randomCarSpawner(truck);
    });

    // Timer
    let intervalId2 = setInterval(function() {
        timeValue++
        time.textContent = timeValue
        if (isGameOver) {
            clearInterval(intervalId2)
            finalTime.textContent = timeValue
        }
    }, 1000);

    // Increases car speed
    let intervalId3 = setInterval(function() {
        increaseSpeed()
        if (isGameOver) {
            clearInterval(intervalId3)
        }
    }, 5000)

    // Checks if game is over
    setInterval(gameOver, 10);
}   


// Adds an event listener to play button and runs the startGame function
playBtn.addEventListener('click', startGame);


// Adds an event listener to how to button and runs the info function
howToBtn.addEventListener('click', info);


// Adds an event listener to restart button and runs the restart function
restartBtn.addEventListener('click', restart);


// Adds an event listener to menu button and runs the menu function
menuBtn.addEventListener('click', menu);


// Function that checks for collision
function gameOver() {
    
    // Gets the left position of the main car
    let mainCarLeft = parseInt(window.getComputedStyle(mainCar).getPropertyValue('left'));

    // Gets the left and top position of the miniVan
    let miniVanLeft = parseInt(window.getComputedStyle(miniVan).getPropertyValue('left'));
    let miniVanTop = parseInt(window.getComputedStyle(miniVan).getPropertyValue('top'));

    // Gets the left and top position of taxi
    let taxiLeft = parseInt(window.getComputedStyle(taxi).getPropertyValue('left'));
    let taxiTop = parseInt(window.getComputedStyle(taxi).getPropertyValue('top'));

    // Gets the left and top position of truck
    let truckLeft = parseInt(window.getComputedStyle(truck).getPropertyValue('left'));
    let truckTop = parseInt(window.getComputedStyle(truck).getPropertyValue('top'));
  
    if (
        // Checks if the main car and the other cars has the same left position
        (mainCarLeft === miniVanLeft && miniVanTop > 600 && miniVanTop < 700) ||
        (mainCarLeft === taxiLeft && taxiTop > 600 && taxiTop < 700) ||
        (mainCarLeft === truckLeft && truckTop > 600 && truckTop < 700)
    ) {
        finalTime.textContent = timeValue;
        mainScreen.style.display = 'none';
        gameScreen.style.display = 'none'
        gameOverScreen.style.display = 'block'
        startScreen.style.display = 'none';
        isGameOver = true
    };
};

// Pops up the instructions
function info() {
    if (!isInfoShowed) {
        infoScreen.style.display = 'block';
        isInfoShowed = true;
    } else if (isInfoShowed) {
        infoScreen.style.display = 'none';
        isInfoShowed = false;
    };
};

// Restarts the whole game 
function restart() {
    // Resets game state
    isGameOver = false
    timeValue = 0

    // Resets carSpeed
    carSpeed = 3
    for (let i = 0; i < npc.length; i++) {
        npc[i].style.animationDuration = carSpeed + 's';
    }

    // Called start game function to restart the game
    startGame()
}

// Returns to main menu
function menu() {
    // Resets game state
    isGameOver = true
    timeValue = 0
    carSpeed = 3
    for (let i = 0; i < npc.length; i++) {
        npc[i].style.animationDuration = carSpeed + 's';
    }

    // Chages back to start screen
    mainScreen.style.display = 'none'
    gameScreen.style.display = 'none'
    gameOverScreen.style.display = 'none'
    startScreen.style.display = 'block'
}


// allows main car to move up, down, left, and right
window.addEventListener('keydown', function(event) {
    if (event.key == 'ArrowRight') {
        let mainCarLeft = parseInt(window.getComputedStyle(mainCar).getPropertyValue('left'));
        if (mainCarLeft < 300) {
            mainCar.style.left = mainCarLeft + 90 + 'px'
        };
    } else if (event.key == 'ArrowLeft') {
        let mainCarLeft = parseInt(window.getComputedStyle(mainCar).getPropertyValue('left'));
        if (mainCarLeft > 0) {
            mainCar.style.left = mainCarLeft - 90 + 'px'
        };
    } else if (event.key == 'ArrowUp') {
        let mainCarTop = parseInt(window.getComputedStyle(mainCar).getPropertyValue('top'));
        if (mainCarTop > 20) {
            mainCar.style.top = mainCarTop - 90 + 'px'
        };
    } else if (event.key == 'ArrowDown') {
        let mainCarTop = parseInt(window.getComputedStyle(mainCar).getPropertyValue('top'));
        if (mainCarTop < 700) {
            mainCar.style.top = mainCarTop + 90 + 'px'
        };
    };
});

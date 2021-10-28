let score = document.querySelector('.score');
let road = document.querySelector('.road');
let start_button = document.querySelector('.start_button');




// created a object  for detecting which key is press by user
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }
let player = { speed: 10, score: 0 }




// adding event listner to know which key is pressed
addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
addEventListener('keyup', (e) => {
    keys[e.key] = false;
});



// moving my car 
function moveCar() {
    let car = document.querySelector('.car');
    if (keys.ArrowUp && car.y > 0) {
        car.y -= player.speed;
    }
    if (keys.ArrowDown == true && car.y < (road.height - car.height)) {
        car.y += player.speed;
    }
    if (keys.ArrowLeft == true && car.x > 0) {
        car.x -= player.speed;
    }
    if (keys.ArrowRight == true && car.x < (road.width - (car.width + 20))) {
        car.x += player.speed;
    }

    car.style.top = `${car.y}px`;
    car.style.left = `${car.x}px`;

}



// moving lines
function moveLine() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(elem => {
        if (elem.y > road.height) {
            elem.y = 0;
        }
        elem.y += player.speed;
        elem.style.top = `${elem.y}px`;
    })
}



// moging enemy cars 
function moveEnemyCars() {
    let enemyCars = document.querySelectorAll('.enemy');
    let car = document.querySelector('.car');
    enemyCars.forEach((elem) => {
        if (isCollision(car, elem)) {
            endGame();
        }
        if (elem.y > road.height) {
            elem.y = 0;
            elem.style.left = `${Math.floor(Math.random() * ((road.width - car.width) - 10))}px`;
            elem.style.backgroundImage = `url(./img/${Math.floor(Math.random() * 8)}.png)`;
        }
        elem.y += player.speed;
        elem.style.top = `${elem.y}px`;
    })
}


// defining play game function 
function PlayGame() {


    if (player.start === true) {
        window.requestAnimationFrame(PlayGame);
        moveCar();
        moveLine();
        moveEnemyCars();

        // To show score in screen
        player.score++;
        let score = document.querySelector('.score');
        score.innerText = `Score ${player.score}`;
    }

}



/// adding event listner to start game 
start_button.addEventListener('click', start);
function start() {

    road.innerHTML = '';
    player.score = 0;
    player.start = true;
    window.requestAnimationFrame(PlayGame);

    //hiding start button
    start_button.style.display = 'none';

    // creating a car
    let car = document.createElement('div');
    car.classList.add('car');
    car.style.backgroundImage = `url(./img/car.png)`;
    road.appendChild(car);

    // getting mycar postion 
    let carPosition = car.getBoundingClientRect();
    car.x = carPosition.x;
    car.y = carPosition.y;
    car.width = carPosition.width;
    car.height = carPosition.height;
    car.x = 0; // for setting car left position

    // getting road position
    let roadPosition = road.getBoundingClientRect();
    road.width = roadPosition.width;
    road.height = roadPosition.height;

    // creating roadlines 
    for (let i = 0; i < 5; i++) {
        let line = document.createElement('div');
        line.classList.add('line');
        road.appendChild(line);
        line.y = (i * 150);
        line.style.top = `${line.y}px`;
        line.style.left = `${(road.width / 2) - 5}px`;
        // console.log(line.y);
    }


    // creating enemy cars 
    for (let i = 0; i < 3; i++) {
        let enemy = document.createElement('div');
        enemy.classList.add('enemy');
        road.appendChild(enemy);
        enemy.y = (i * 250);
        // enemy.style.top = `${enemy.y}px`;
        enemy.style.left = `${Math.floor(Math.random() * ((road.width - car.width - 20)))}px`;
        enemy.style.backgroundImage = `url(./img/${i}.png)`;
    }

}



// function for decting collision 
function isCollision(car, enemy) {
    // CD car Dimension or ED enemy dimension
    CD = car.getBoundingClientRect();
    ED = enemy.getBoundingClientRect();
    // console.log(car);

    return !(CD.left > ED.right || CD.right < ED.left ||
        CD.top > ED.bottom || CD.bottom < ED.top)
}



// end game function 
function endGame() {
    player.start = false;
    start_button.style.display = 'block';
    start_button.children[0].innerText = `Play Again`;
}























































































































// const score = document.querySelector('.score');
// const road = document.querySelector('.road');
// const Game_container = document.querySelector('.Game_container');
// Game_container.style.backgroundImage = `url('./img/background.jpg')`;


// // here we defined the object to know which key is pressed 
// let keys = {
//     ArrowUp: false,
//     ArrowDown: false,
//     ArrowRight: false,
//     ArrowLeft: false
// }

// // player object 
// let player = { speed: 50, score: 0, start: true, collisionValue: true };
// let enemyObj = { speed: 10 }

// // we added the event listner to window onject to get the key value
// addEventListener('keydown', (e) => {

//     keys[e.key] = true;

// })

// addEventListener('keyup', (e) => {
//     keys[e.key] = false;

// });



// // adding event listner to start button to start game 

// const start_button = document.querySelector('.start_button');

// start_button.addEventListener('click', start);


// function start() {

//     if (player.start == false) {
//         document.location.reload();
//     }
//     road.innerHTML = ``;
//     player.start = true;

//     start_button.style.display = 'none';
//     // this is car div 
//     let car = document.createElement('div');
//     car.classList.add('car');
//     let img = document.createElement('img');
//     img.src = `./img/car.png`;
//     car.appendChild(img);
//     road.appendChild(car);

//     // taking the values of player car position
//     player.Y = car.offsetTop;
//     player.X = car.offsetLeft;

//     roadlines();
//     enemyCar();
//     moveLines();
//     moveCar();
//     moveEnemy(car);

//     setInterval(() => {
//         if (player.start == true) {
//             player.score += 1;
//             score.innerHTML = `score: ${player.score}`;
//         }
//     }, 10);
//     // console.log(player.start);
// }



// // console.log(road.getBoundingClientRect());// for getting width,heigth, position etc


// // carmoving function 

// function moveCar() {

//     let car = document.querySelector('.car');
//     addEventListener('keydown', () => {

//         if (keys.ArrowUp && player.Y > 22) { player.Y -= player.speed; }
//         else if (keys.ArrowDown && player.Y < 672) { player.Y += player.speed; }
//         else if (keys.ArrowRight && player.X < 410) { player.X += player.speed; }
//         else if (keys.ArrowLeft && player.X > 0) { player.X -= player.speed; }

//         car.style.top = `${player.Y}px`;
//         car.style.left = `${player.X}px`;
//         // console.log(player.Y, player.X);
//     });
// }

// // road lines 

// function roadlines() {

//     for (let i = 0; i < 5; i++) {
//         let line = document.createElement('div');
//         line.classList.add('line');
//         line.y = i * 150;
//         line.style.top = `${line.y}px`;
//         road.appendChild(line);
//         // console.log(line.y);
//     }

// }


// // moveline function 

// function moveLines() {

//     const line = document.querySelectorAll('.line');

//     setInterval(() => {
//         if (player.start == true) {
//             // console.log('hi line');
//             line.forEach(elem => {
//                 if (elem.y >= 700) {
//                     elem.y -= 750;
//                 }
//                 elem.y += enemyObj.speed;
//                 elem.style.top = `${elem.y}px`;
//             });
//         }
//     }, 20);

// }


// /// enemy car generator 

// function enemyCar() {
//     for (let i = 0; i < 3; i++) {
//         let enemy = document.createElement('div');
//         let img = document.createElement('img');
//         img.src = `./img/${i}.png`;
//         enemy.appendChild(img);
//         enemy.classList.add('enemy');
//         enemy.y = i * 190;
//         enemy.style.top = `${enemy.y}px`;
//         enemy.style.left = `${Math.floor(Math.random() * 410)}px`;
//         road.appendChild(enemy);
//         // console.log(line.y);
//     }
// }


// // moveenemy function 

// function moveEnemy(car) {

//     const enemy = document.querySelectorAll('.enemy');


//     setInterval(() => {

//         if (player.start == true) {
//             // console.log('hi enemy');
//             enemy.forEach((elem, i) => {

//                 if (collision(car, elem)) {
//                     gameEnd();

//                     // player.collisionValue = true;
//                 }

//                 if (elem.y >= 700) {
//                     elem.y -= 750;
//                     elem.children.src = `./img/$${Math.floor(Math.random() * 8)}.png`;
//                     elem.style.left = `${Math.floor(Math.random() * 440)}px`;
//                 }
//                 elem.y += enemyObj.speed;
//                 elem.style.top = `${elem.y}px`;
//                 // console.log(elem.y);
//             });
//         }
//     }, 20);

// }

// // game end function

// function gameEnd() {
//     player.start = false;
//     start_button.style.display = 'block';
//     start_button.children[0].innerText = `Score: ${player.score}`;


//     // car.remove();
// }



// /// defining function for collision 

// function collision(a, b) {
//     aRect = a.getBoundingClientRect();
//     bRect = b.getBoundingClientRect();
//     // console.log(aRect.top);

//     return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
//         (aRect.right < bRect.left) || (aRect.left > bRect.right))

// }



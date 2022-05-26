let game = document.querySelector("#game");
let mouse;
let purple = "#440a87";
let mousetrap;
let green = "#0a8387";
let cheese;
let yellow = "#F9F871";
let ctx = game.getContext("2d"); 
let score = document.querySelector('#score');
let movement = document.querySelector('#movement');
 
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);
 
class Crawler {
   constructor(x, y, color, width, height){
       this.x = x;
       this.y = y;
       this.color = color;
       this.height = height;
       this.width = width;
       this.alive = true;
   }
 
   render() {
       ctx.fillStyle = this.color;
       ctx.fillRect(this.x, this.y, this.width, this.height)
   }
}
 

 

window.addEventListener("DOMContentLoaded", function (p){
 let randomX = Math.floor(Math.random() * game.width) - 80;
 let randomY = Math.floor(Math.random() * game.height) - 80;
 let cheeseX = Math.floor(Math.random() * game.width) - 50;
 let cheeseY = Math.floor(Math.random() * game.height) - 40;
 
 mouse = new Crawler(100, 100, purple, 60, 70);
 mousetrap = new Crawler(randomX, randomY, green, 80, 80);
cheese = new Crawler(cheeseX, cheeseY, yellow, 40, 50);
  
  const runGame = setInterval(gameLoop, 120);
})
 
// KEYBOARD INTERACTION LOGIC

function movementHandler(p){
   console.log("the key that was pressed was: " + p.key);
 
   // if(p.key === "ArrowUp"){
 
   // } else if(p.key === "ArrowDown"){
 
   // }
 
   // basic if/else logic and syntax
   // if (condition){
   //     run this code
   // } else {
   //     run this code
   // }
 
   // ternary operator basic logic
   // condition ? yes : no
 
   switch (p.key){
       case "ArrowUp":
         
           mouse.y > 0 ?  mouse.y -= 10  :  null;
           break
       case "ArrowDown":
           mouse.y < (game.height - mouse.height) ? mouse.y += 10 : null;
           break
       case "ArrowLeft":
           mouse.x > 0 ? mouse.x -= 10 : null;
           break
       case "ArrowRight":
           mouse.x < (game.width - mouse.width) ? mouse.x += 10 : null;
           break
   }
 
   console.log(mouse);
 
}
 
document.addEventListener("keydown", movementHandler)
 
function gameLoop(){
    if(cheese.alive) {
        detectCheese()
        detectHit()
    }
   ctx.clearRect(0, 0, game.width, game.height);
   movement.textContent = `X: ${mouse.x}\n Y: ${mouse.y}`;
   if (mouse.alive){
       mouse.render();
        // let hit = detectHit(mouse, mousetrap);
       // let point = detectCheese(mouse, cheese);
   }
   if (cheese.alive){
       cheese.render();
    }
    if (!cheese.alive && mousetrap.alive){
    let x = Math.floor(Math.random() * game.width) - 50;
    let y = Math.floor(Math.random() * game.height) - 40;
    cheese = new Crawler(x, y, yellow, 40, 50);
    mousetrap.alive = false;
    let x2 = Math.floor(Math.random() * game.width) - 80;
    let y2 = Math.floor(Math.random() * game.height) - 80;
    mousetrap = new Crawler(x2, y2, green, 80, 80);
    }
   mouse.render();
   mousetrap.render();
  
}
 
function detectHit(){
   let hitTest =
       mouse.y +mouse.height > mousetrap.y &&
    mouse.y < mousetrap.y + mousetrap.height &&
       mouse.x + mouse.width > mousetrap.x &&
       mouse.x < mousetrap.x + mousetrap.width; 
 
   if (hitTest){
      mousetrap.alive = false;
      cheese.alive = false;
    let gameScore = Number(score.textContent); 
       let newScore = gameScore - 100;
       score.textContent = newScore;
       if (confirm("Oh No, the trap got you!")) {
           window.location.reload();
       }
   }
}

 function detectCheese(){
    let cheeseTest =
        mouse.y + mouse.height > cheese.y &&
        mouse.y < cheese.y + cheese.height &&
        mouse.x + mouse.width > cheese.x &&
        mouse.x < cheese.x + cheese.width; 
  
    if (cheeseTest){
        cheese.alive = false;
        // if (mousetrap) x and y are within 10px of cheese x y, then player1 will lose life and game restarts
        // else cheese is further away, collect cheese and collect point
        let gameScore = Number(score.textContent); 
       let newScore = gameScore + 100;
       score.textContent = newScore;
       
   } else{
       return false;
   }
        
    
 }
 
// function deleteCheese() {
//    cheese.alive = false;
//    setTimeout(function(){
//    let x = Math.floor(Math.random() * game.width - 100) + 50; 
//        let y = Math.floor(Math.random() * game.height -100) + 50;
//       cheese = new Crawler(x, y, "#440a87", 40, 80)
//    }, 1000)
//    return true;
// }
 
 
// function addNewcheese() {
//     mouse.alive = false;
//     setTimeout(function(){
//         let x = Math.floor(Math.random() * game.width - 100) + 50; 
//         let y = Math.floor(Math.random() * game.height -100) + 50;
//        mouse = new Crawler(x, y, "#440a87", 40, 80)
//     }, 1000)
//     return true;
//  }
  
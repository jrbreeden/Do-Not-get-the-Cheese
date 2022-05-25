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
 let randomX = Math.floor(Math.random() * game.width);
 let randomY = Math.floor(Math.random() * game.height);
 let cheeseX = Math.floor(Math.random() * game.width);
 let cheeseY = Math.floor(Math.random() * game.height);
 
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
   ctx.clearRect(0, 0, game.width, game.height);
   movement.textContent = `X: ${mouse.x}\n Y: ${mouse.y}`;
   if (mouse.alive){
       mouse.render();
       let hit = detectHit(mouse, mousetrap);
       let point = detectCheese(mouse, cheese);
   }
   if (cheese.alive){
       cheese.render();
    
   }
   mouse.render();
   mousetrap.render();
  
}
 
function detectHit(p1, obstacle){
   let hitTest =
       p1.y + p1.height > obstacle.y &&
       p1.y < obstacle.y + obstacle.height &&
       p1.x + p1.width > obstacle.x &&
       p1.x < obstacle.x + obstacle.width; 
 
   if (hitTest){
      let gameScore = Number(score.textContent); 
       let newScore = gameScore - 100;
       score.textContent = newScore;
       return false;
   } else{
       return false;
   }
}

 function detectCheese(p1, cheese){
    let cheeseTest =
        p1.y + p1.height > cheese.y &&
        p1.y < cheese.y + cheese.height &&
        p1.x + p1.width > cheese.x &&
        p1.x < cheese.x + cheese.width; 
  
    if (cheeseTest){
        cheese.alive = false;
        // if (mousetrap) x and y are within 10px of cheese x y, then player1 will lose life and game restarts
        // else cheese is further away, collect cheese and collect point
        let gameScore = Number(score.textContent); 
       let newScore = gameScore + 100;
       score.textContent = newScore;
       return false;
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
  
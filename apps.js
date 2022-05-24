et game = document.querySelector("#game");
let mouse;
let mousetrap;
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
 

 

window.addEventListener("DOMContentLoaded", function (e){
  mousetrap = new Crawler(10, 20, "#440a87", 20, 20);
   mouse = new Crawler(100, 100, "#0a8387", 40, 80);
  
   const runGame = setInterval(gameLoop, 120);
})
 
// KEYBOARD INTERACTION LOGIC
 
function movementHandler(e){
   console.log("the key that was pressed was: " + e.key);
 
   // if(e.key === "ArrowUp"){
 
   // } else if(e.key === "ArrowDown"){
 
   // }
 
   // basic if/else logic and syntax
   // if (condition){
   //     run this code
   // } else {
   //     run this code
   // }
 
   // ternary operator basic logic
   // condition ? yes : no
 
   switch (e.key){
       case "ArrowUp":
         
           mousetrap.y > 0 ?  mousetrap.y -= 10  :  null;
           break
       case "ArrowDown":
           mousetrap.y < (game.height - mousetrap.height) ? mousetrap.y += 10 : null;
           break
       case "ArrowLeft":
           mousetrap.x > 0 ? mousetrap.x -= 10 : null;
           break
       case "ArrowRight":
           mousetrap.x < (game.width - mousetrap.width) ? mousetrap.x += 10 : null;
           break
   }
 
   console.log(mousetrap);
 
}
 
document.addEventListener("keydown", movementHandler)
 
function gameLoop(){
   ctx.clearRect(0, 0, game.width, game.height);
   movement.textContent = `X: ${mousetrap.x}\n Y: ${mousetrap.y}`;
   if (mouse.alive){
       mouse.render();
       let hit = detectHit(mousetrap, mouse);
   }
 
   mousetrap.render();
}
 
function detectHit(p1, p2){
   let hitTest =
       p1.y + p1.height > p2.y &&
       p1.y < p2.y + p2.height &&
       p1.x + p1.width > p2.x &&
       p1.x < p2.x + p2.width; 
 
   if (hitTest){
       
  let gameScore = Number(score.textContent); 
       let newScore = gameScore + 100;
       return addNewMouse();
   } else{
       return false;
   }
}
 
function addNewShrek() {
   shrek.alive = false;
   setTimeout(function(){
       let x = Math.floor(Math.random() * game.width - 100) + 50; 
       let y = Math.floor(Math.random() * game.height -100) + 50;
      
       
           x = 50
       
       mouse = new Crawler(x, y, "#bada55", 40, 80)
   }, 1000)
   return true;
}
 
 

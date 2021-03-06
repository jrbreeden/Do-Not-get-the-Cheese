let game = document.querySelector("#game");
// console.log("testing")
let ctx = game.getContext("2d"); 
let score = document.querySelector('#score');
let movement = document.querySelector('#movement');
let mouseImage = document.querySelector("#mouse");
let cheeseImage = document.querySelector("#cheese");
let mousetrapImage = document.querySelector("#mousetrap");

 let randomX = Math.floor(Math.random() * (game.width - 80));
 let randomY = Math.floor(Math.random() * (game.height - 80));
 let cheeseX = Math.floor(Math.random() * (game.width - 50));
 let cheeseY = Math.floor(Math.random() * (game.height - 40));
    
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

const runGame = setInterval(gameLoop, 60);
 


class Crawler {
   constructor(x, y, image, width, height){
       this.x = x;
       this.y = y;
       this.image = image;
       this.height = height;
       this.width = width;
       this.alive = true;
   }
 


   render() {
    //    ctx.fillStyle = this.color;
    //    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    
   }
   


}
let mouse = new Crawler(100, 100, mouseImage, 60, 70);
let mousetrap = new Crawler(randomX, randomY, mousetrapImage, 80, 80);
let cheese = new Crawler(cheeseX, cheeseY, cheeseImage, 40, 50);
 

 


 
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
  //  if(cheese.alive) {
  //   cheese.render();
        
  //  }
   
   ctx.clearRect(0, 0, game.width, game.height);
   movement.textContent = `X: ${mouse.x}\n Y: ${mouse.y}`;
   if (mouse.alive){
       mouse.render();
        // let hit = detectHit(mouse, mousetrap);
       // let point = detectCheese(mouse, cheese);
   }
   
    if (!cheese.alive && mousetrap.alive){
    let x = Math.floor(Math.random() * (game.width -50));
    let y = Math.floor(Math.random() * (game.height - 40));
    cheese = new Crawler(x, y, cheeseImage, 40, 50);
    mousetrap.alive = false;
    let x2 = Math.floor(Math.random() * (game.width - 80));
    let y2 = Math.floor(Math.random() * (game.height - 80));
    mousetrap = new Crawler(x2, y2, mousetrapImage, 80, 80);}


   mouse.render();
   mousetrap.render();
  cheese.render();
   detectCheese();
   detectHit();
   
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
      mouse.alive = false;
    let gameScore = Number(score.textContent); 
       let newScore = gameScore - 100;
       score.textContent = newScore;
     console.log("Oh No, the trap got you!")
      document.location.reload();
       
    //    if (confirm("Oh No, the trap got you!")) {
    //        window.location.reload();
     //  }
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
       checkWinner();
   } else{
       return false;
   }
        
    
 }
 
function checkWinner() {
  if (score.textContent == 1000) {
      setTimeout(() => {
      alert("You won!");
      }, 500)
  }
}
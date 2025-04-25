/**
 * ICS4U - Mr. Brash 🐿️
 * 
 * 17 - Canvas Animation
 * 
 * Author:
 * 
 */

'use strict';

import Player from "./player.js";
import { CANVAS, CTX, MS_PER_FRAME, KEYS,ground,RandInt, FLOOR } from "./globals.js";
import Cactus from './cactus.js';
// Globals
const HERO = new Player(20, 50, 48, 48);
let ctr = 0
let cacti = [new Cactus(),new Cactus(),new Cactus(),new Cactus()]
let score = 0 
// console.log("hyllo", localStorage.getItem("hi"))

if(isNaN(localStorage.getItem("hi"))){
  localStorage.setItem("hi","0")
}
// localStorage.setItem("hi","0")
let HIscore = Number(localStorage.getItem("hi"))
// console.log("hello", HIscore)
let index = 0
ground.x_pos = 0
ground.x_pos2 = 1150
let alive = false
let score_color = "white"
let hi_color = "grey"


let frame_time = performance.now()

// Event Listeners
document.addEventListener("keydown", keypress);

// Disable the context menu on the entire document
document.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
  return false; 
});

/**
 * The user pressed a key on the keyboard 
 */
function keypress(event) {
  // console.log("hola")
  if ([KEYS.W,KEYS.UP_ARROW,KEYS.SPACE].includes(event.keyCode)  && alive){
    HERO.jump()
  }
  if( KEYS.ENTER == event.keyCode && !alive){
    //  console.log("hey")
    alive = true
    for (let i of cacti){
      i.create()
      i.type = 6

    }
    score_color = "white"
    hi_color = "grey"
    score = 0
    update()
  }
}

function Game_start(){
  if(!alive){
    requestAnimationFrame(Game_start)
  }
  /*** Desired FPS Trap ***/ 
  const NOW = performance.now() 
  const TIME_PASSED = NOW - frame_time 
   
  if (TIME_PASSED < MS_PER_FRAME) return 
   
  const EXCESS_TIME = TIME_PASSED % MS_PER_FRAME 
  frame_time = NOW - EXCESS_TIME 
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); 

  CTX.fillStyle = "grey ";
  CTX.font = "30px press-start-2p";
  CTX.fillText("Press Enter To Start",250,150);
  CTX.fillStyle = score_color;
  CTX.font = "20px press-start-2p";
  CTX.fillText("SCORE "+score,20 ,50 ); 
  CTX.fillStyle = hi_color;
  CTX.font = "20px press-start-2p";
  CTX.fillText("HI "+HIscore,250,50)

  CTX.drawImage(ground,0,103,1150,26,ground.x_pos,300,1150,28) 
  CTX.drawImage(ground,1151,103,1149,26,ground.x_pos2,300,1150,28) 
  HERO.update();

}
/**
 * The main game loop
 */
function update() {
  // Prepare for the next frame
  if(alive){
    requestAnimationFrame(update)
  }
   
  /*** Desired FPS Trap ***/ 
  const NOW = performance.now() 
  const TIME_PASSED = NOW - frame_time 
   
  if (TIME_PASSED < MS_PER_FRAME) return 
   
  const EXCESS_TIME = TIME_PASSED % MS_PER_FRAME 
  frame_time = NOW - EXCESS_TIME 
  /*** END FPS Trap ***/ 
  
  // Clear the canvas 
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); 
   
  ground.x_pos -= 10 
  ground.x_pos2 -= 10 
 
  CTX.drawImage(ground,0,103,1150,26,ground.x_pos,300,1150,28) 
  CTX.drawImage(ground,1151,103,1149,26,ground.x_pos2,300,1150,28) 
  for (let i of cacti){ 
    // console.log(i) 
    if (i.type != 6){ 
       
      CTX.drawImage(ground,i.sx,i.sy,i.sw,i.sh,i.dx,i.dy,i.sw,i.sh) 
      i.dx -= 10 
      if(i.dx+1 < HERO.right){ 
        if(HERO.right > i.dx && HERO.left < i.dx + i.sw ){ 
          if(HERO.bottom > FLOOR - i.sh){ 
            alive = false 
          } 
        } 
      } 
    } 
  } 
 
  if (ground.x_pos <= -1150){ 
    ground.x_pos = 1150 
  } 
  if (ground.x_pos2 <= -1150){ 
    ground.x_pos2 = 1150 
  } 
  // Draw our hero 
  if (ctr % 45 == 0){ 
    if (!RandInt(0,2)){ 
      // console.log(index) 

      cacti[index].type = RandInt(0,6)
      cacti[index].create() 
      index ++
      if(index > 3){
        index = 0
      }
    }
  }
  ctr ++
  if(ctr == 451){
    // console.log("wooow  ")
    ctr = 1
  }
  if (ctr % 7 == 0){
    score ++
    if(score > HIscore){
      HIscore++
      localStorage.setItem("hi",HIscore)
      
    }else if(score == HIscore){
      hi_color = "white"
      score_color = "grey"
    }

  }
  CTX.fillStyle = score_color;
  CTX.font = "20px press-start-2p";
  CTX.fillText("SCORE "+score,20 ,50 ); 
  CTX.fillStyle = hi_color;
  CTX.font = "20px press-start-2p";
  CTX.fillText("HI "+HIscore,250,50)
  HERO.update();
  if (!alive){
    // console.log("hola",HIscore)
    index = 0
    CTX.fillStyle = "grey ";
    CTX.font = "70px press-start-2p";
    CTX.fillText("GAME OVER",250,150);
    // return

  } 
}

// Start the animation
// update()

Game_start()
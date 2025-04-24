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
import Cactus from "./cactus.js";

// Globals
const HERO = new Player(20, 50, 48, 48);
let ctr = 0
let cacti = [new Cactus(),new Cactus(),new Cactus(),new Cactus()]
let score = 0 
if(localStorage.getItem("hi") == null){
  localStorage.setItem("hi","0")
}
let HIscore = 0
let index = 0
ground.x_pos = 0
ground.x_pos2 = 1150
let alive = true


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
  if ([KEYS.W,KEYS.UP_ARROW,KEYS.SPACE].includes(event.keyCode)  && alive){
    HERO.jump()
  }
  if([KEYS.W,KEYS.UP_ARROW,KEYS.SPACE].includes(event.keyCode) && !alive){
    console.log("hey")
    alive = true
    for (let i of cacti){
      i.create()
      i.type = 6

    }
    score = 0
    update()
  }
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
      // console.log("hey") 

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
    ctr = 0
  }
  if (ctr % 7 == 0){
    score ++
    if(score >= HIscore){
      HIscore++
    }
  }
  CTX.fillStyle = "white ";
  CTX.font = "20px press-start-2p";
  CTX.fillText("SCORE "+score + "  "+ "HI "+HIscore,20 ,50 ); 
  HERO.update();
  if (!alive){
    CTX.fillStyle = "grey ";
    CTX.font = "70px press-start-2p";
    CTX.fillText("GAME OVER",250,150);
    // return

  } 
}

// Start the animation
update()

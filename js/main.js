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
import { CANVAS, CTX, MS_PER_FRAME, KEYS,ground,randint } from "./globals.js";
import Cactus from "./cactus.js";

// Globals
const HERO = new Player(20, 50, 48, 48);
let counter = 0

ground.x_pos = 0
ground.x_pos2 = 1150

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
  if ([KEYS.W,KEYS.UP_ARROW,KEYS.SPACE].includes(event.keyCode)){
    HERO.jump()
  }
}
let cacti = []
for (let i = 0; i<6; i++){
  cacti.push(new Cactus(0,0))
}
/**
 * The main game loop
 */
function update() {
  // Prepare for the next frame
  requestAnimationFrame(update)
  
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

  if (ground.x_pos <= -1150){
    ground.x_pos = 1150
  }
  if (ground.x_pos2 <= -1150){
    ground.x_pos2 = 1150
  }
  // Draw our hero
  counter += 1
  if(counter % 45 == 0){
    if(!randint(0,3)){
      console.log("julian cadieux")
    }
  }
  HERO.update();
  
}

// Start the animation
update()

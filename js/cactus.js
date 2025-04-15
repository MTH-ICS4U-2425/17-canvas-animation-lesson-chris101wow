import { CTX, CANVAS, GRAVITY, FLOOR, ground,randint } from "./globals.js"
let cactuses  = [
    
]
export default class Cactus{
    constructor(x,y){
    this.type = cactuses[randint(0,4)]

    this.position = {
        x: x,
        y: y
      }
    }


}

console.log(randint(0,6))
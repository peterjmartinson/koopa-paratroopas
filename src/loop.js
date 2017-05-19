window.onload = (function() {

  'use strict';

function gameLoop () {
    
    window.canvas.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    window.goomba.render();
    window.goomba.moveX();
    window.goomba.moveY();
    window.goomba.collisionDetection();
    window.mario.render();
    window.mario.moveX();
    window.mario.moveY();
    window.mario.collisionDetection();
    window.requestAnimationFrame(gameLoop);
}

  gameLoop();

}());

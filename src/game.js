/**
 * src/game.js
 *
 * Contains all game logic (points, positions of characters, etc.)
 *
*/


(function() {
  
  'use strict';
  
  var canvas = {};

  function init() {
    canvas = document.getElementById('game');
    canvas.width = 640;
    canvas.height = 480;
    window.canvas = canvas;
  }

  init();

}());
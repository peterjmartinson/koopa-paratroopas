/**
 * src/background.js
 *
 * draws the background AND the foreground (stuff characters can walk on)
 *
*/
(function() {

  'use strict';

  // canvas
  var DOM = {};

  DOM.$canvas = document.getElementById("game");
  DOM.$canvas.width  = 1280;
  DOM.$canvas.height = 480;
  var ctx     = DOM.$canvas.getContext("2d");

  // new Image()
  var landscape = new Image();
  landscape.src = "assets/landscape_tileset.png";

  // new Tile( 'f', x, y ) puts the tile down!
  function Tile (type, x, y) {
    var image   = landscape,
        width   = 16,
        height  = 16,
        column, row;

    switch (type) {
      case 'f':// floor tile
        column = 0;
        row    = 0;
        break;
      case 'B':// top brick
        column = 1;
        row    = 0;
        break;
      case 'b':// normal brick
        column = 2;
        row    = 0;
        break;
      case '#':// dead question block
        column = 3;
        row    = 0;
        break;
      case '?':// question block
        column = 24;
        row    = 0;
        break;
      case 'h':// hard block
        column = 0;
        row    = 1;
        break;
      case 'r':// rock block
        column = 1;
        row    = 1;
        break;
      case 'c':// castle block
        column = 2;
        row    = 1;
        break;
      case 't':// tree trunk
        column = 7;
        row    = 1;
        break;
      case '[':// vertical pipe spout, left
        column = 0;
        row    = 8;
        break;
      case ']':// vertical pipe spout, right
        column = 1;
        row    = 8;
        break;
      case '^':// horizontal pipe spout, top
        column = 2;
        row    = 8;
        break;
      case '=':// horizontal pipe, top
        column = 3;
        row    = 8;
        break;
      case 'J':// pipe junction, top
        column = 4;
        row    = 8;
        break;
      case '!':// vertical pipe, left
        column = 0;
        row    = 9;
        break;
      case '|':// vertical pipe, right
        column = 1;
        row    = 9;
        break;
      case 'v':// horizontal pipe spout, bottom
        column = 2;
        row    = 9;
        break;
      case '_':// horizontal pipe, bottom
        column = 3;
        row    = 9;
        break;
      case '7':// pipe junction, bottom
        column = 4;
        row    = 9;
        break;
      case '/':// hill slope, left
        column = 8;
        row    = 10;
        break;
      case '-':// hill top
        column = 9;
        row    = 10;
        break;
      case '`':// hill slope, right
        column = 10;
        row    = 10;
        break;
      case 'm':// hill, dots left
        column = 8;
        row    = 11;
        break;
      case 'M':// hill
        column = 9;
        row    = 11;
        break;
      case 'H':// hill, dots right
        column = 10;
        row    = 11;
        break;
      case '0':// small tree
        column = 13;
        row    = 8;
        break;
      case 'O':// large tree, top
        column = 14;
        row    = 8;
        break;
      case 'o':// large tree, bottom
        column = 14;
        row    = 9;
        break;
      case 'q':// bush left
        column = 11;
        row    = 11;
        break;
      case '%':// bush center
        column = 12;
        row    = 11;
        break;
      case 'p':// bush right
        column = 13;
        row    = 11;
        break;
      case '(':// cloud top, left
        column = 0;
        row    = 22;
        break;
      case '*':// cloud top, center
        column = 1;
        row    = 22;
        break;
      case ')':// cloud top, right
        column = 2;
        row    = 22;
        break;
      case '{':// cloud bottom, left
        column = 0;
        row    = 23;
        break;
      case 'C':// cloud bottom, center
        column = 1;
        row    = 23;
        break;
      case '}':// cloud bottom, right
        column = 2;
        row    = 23;
        break;
      case '.':// do nothing!  placeholder
        break;
      default:
        column = 29;
        row    = 0;
        break;
    }

    // render the tile
    image.addEventListener('load', function() {// "window.onload"
      ctx.drawImage(
        image,
        16 * column,
        16 * row,
        width,
        height,
        x,
        y,
        width,
        height);
    });

  }

  // ============= Define the World
  function World (level) {
    return {
      when   : levels[level].when,
      length : levels[level].foreground[0].length,
      render : function() {
        for (let vert = 0; vert < 16; vert++) {
          for (let horiz = 0; horiz < this.length; horiz++) {
            Tile(levels[level].background[vert].substring(horiz,horiz+1), horiz*16, vert*16);
          }
        }
        for (let vert = 0; vert < 16; vert++) {
          for (let horiz = 0; horiz < this.length; horiz++) {
            Tile(levels[level].foreground[vert].substring(horiz,horiz+1), horiz*16, vert*16);
          }
        }
      }
    }
  }

  // ============= Define the level geography
  var levels = [];

  levels.push({  // level 0, just so level one is index = 1
    background : [
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '        ..        ',
    '        ..        ',
    '        ..        ',
    '..................',
    '..................'
    ],
    foreground : [
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '        []        ',
    '        !|        ',
    '        !|        ',
    'ffffffff!|ffffffff',
    'ffffffff!|ffffffff'
    ],
    when       : 'day'
  });
  
  levels.push({  // level 1
    background : [
    '                                                                          ',
    '                                                                          ',
    '                                                                          ',
    '                                                                          ',
    '    (***)                                                                 ',
    '    {CCC}                                                                 ',
    '           .                                                              ',
    '                                    ..                                    ',
    '                                    ..                                    ',
    '                                    ..                                    ',
    '     .   .....         O            ..              -                     ',
    '                       o   ..       ..             /m`                    ',
    '                 ..  0 t   ..    .....            /mMH`                   ',
    '   q%p    q%%%p  ..  t t   ..    .....           /mMMMH`                  ',
    '.........................................     ............................',
    '.........................................     ............................'
    ],
    foreground : [
    '                                                                        []',
    '                                                                        !|',
    '                                                                        !|',
    '                                                                        !|',
    '                                                                        !|',
    '                                                                        !|',
    '           ?                                                            !|',
    '                                    []                                  !|',
    '                                    !|                                  !|',
    '                                    !|                                  !|',
    '     ?   B?B#B                      !|                                  !|',
    '                           []       !|                                  !|',
    '                 []        !|    ^==J|                                  !|',
    '                 !|        !|    v__7|                                  !|',
    'ffffffffffffffffffffffffffffffffffff!|fff chr ffffffffffffffffffffffffff!|',
    'ffffffffffffffffffffffffffffffffffff!|fff     ffffffffffffffffffffffffff!|'
    ],
    when : "day"
  });

  var level_0 = new World(0);
  var level_1 = new World(1);
  level_1.render();


}());

angular.module('Game', ['myApp', 'Grid', 'Logger', 'Player']);
angular.module('Game').constant('WHITE_PIECE', '\u26C0')
                      .constant('WHITE_KING', '\u26C1')
                      .constant('BLACK_PIECE', '\u26C2')
                      .constant('BLACK_KING', '\u26C3')
                      .constant('BLACK_WINS', 1)
                      .constant('WHITE_WINS', 2)
                      .constant('NUM_PLAYERS', 2)
                      .constant('WHITE_PLAYER', 'White Player')
                      .constant('BLACK_PLAYER', 'Black Player')
angular.module('Game').service('Game', function(Grid, WHITE_PIECE, WHITE_KING, 
   BLACK_PIECE, BLACK_KING, BOARDSIZE, BLACK_WINS, WHITE_WINS, NUM_PLAYERS, 
   Logger, Player, WHITE_PLAYER, BLACK_PLAYER) {
   var ex = {}
     , that = {}

   ex.isBlack = function(square) {
      var x = square.x, y = square.y;
      var k = ( y % 2 === 0 ? 0 : 1 );
      return (((y*BOARDSIZE)+x+k)%2 === 0);
   }

   ex.init = function() {
      Grid.init(BOARDSIZE);      
      return this;
   }

   ex.styleSquares = function( styleFunc ) {
      Grid.forEach( styleFunc );
      return this;
   }

   that.setUpPieces = function() {
      Grid.forEach(function(square) {
         if (square.y < 3) {
            if (!ex.isBlack(square)) {
               square.symbol = WHITE_PIECE,
               square.owner = WHITE_PLAYER
            }
         }
         if (BOARDSIZE - square.y < 4) {
            if (!ex.isBlack(square)) {
               square.symbol = BLACK_PIECE,
               square.owner = BLACK_PLAYER
            }
         }
      });
   }

   that.hasBlackPiece = function(square) {
      return square.symbol === BLACK_PIECE;
   }

   that.hasWhitePiece = function(square) {
      return square.symbol === WHITE_PIECE;
   }

   ex.getGrid = Grid.getGrid;

   ex.startGame = function() {
      that.setUpPieces();
      that.players = [{
         name: WHITE_PLAYER,
      },{
         name: BLACK_PLAYER 
      }];
      that.turn = 0;
   }

   that.gameStatus = function() {
      var whitePieces = 0, blackPieces = 0
      Grid.forEach(function(square){
         if (that.hasBlackPiece(square)) {
            blackPieces++;
         }
         if (that.hasWhitePiece(square)) {
            whitePieces++;
         }
      });
      if (blackPieces===0) {
         return WHITE_WINS;
      } else if( whitePieces === 0){
         return BLACK_WINS;
      }
      return false;
   }

   that.makeMove = function(player, cb) {
      Logger.log('Waiting for ' + player.name + ' to make a move');
      //Player.requestMove();
   }

   ex.gameLoop = function(roundOverCB, gameOverCB) {
      var gameStatus = that.gameStatus();
      if (gameStatus===WHITE_WINS || gameStatus === BLACK_WINS) {
         gameOverCB(gameStatus);
         return this;
      } else {
         var player = ex.whoseTurn();
         that.makeMove( player, function(move) {
            that.turn++;
            roundOverCB();
            ex.gameLoop();
         });
      }
   }

   ex.pieceChosen = function(square) {
      if (ex.pieceIsMoveable(square)) {
         Grid.forEach(function(square) {
            square.isSelected = false;
         });
         square.isSelected = true;
      }
      console.log(Grid.getGrid());
   }

   ex.pieceIsMoveable = function(square) {
      if (square.owner) {
         if (square.owner === ex.whoseTurn().name) {
            return true;
         }
      }
      return false;
   }

   ex.whoseTurn = function() {
      return angular.copy(that.players[ that.turn % NUM_PLAYERS ]);
   }

   return ex;
});

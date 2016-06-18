function Game() {
  this.generateRandomTile = _.shuffle([2,2,2,2,4,4])
  this.board = this.generateBoard();

};

Game.prototype.generateBoard = function() {
  var board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]


  board[Math.floor((Math.random() * 4))].splice(Math.floor((Math.random() * 4)), 1, this.generateRandomTile.pop())
  board[Math.floor((Math.random() * 4))].splice(Math.floor((Math.random() * 4)), 1, this.generateRandomTile.pop())

  return board
};

Game.prototype.findRandomOpenTile = function() {
  var randCellX = Math.floor((Math.random() * 4))
  var randCellY = Math.floor((Math.random() * 4))
  if (this.board[randCellX][randCellY] === 0) {
    return [ randCellX, randCellY ]
  } else {
    return this.findRandomOpenTile();
  };
};

Game.prototype.populateRandomOpenTile = function() {
  var position = this.findRandomOpenTile()
  this.board[ position[0] ][ position[1] ] = _.sample(this.generateRandomTile)
}

Game.prototype.combineLeft = function(board) {
  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[i].length; j++) {
      if (board[i][j] === board[i][j + 1]) {
        board[i][j] *= 2
        if (j === 0) {
          if (board[i][j + 2] === 0) {
            board[i][j + 1] = 0;
          } else if (board[i][j + 2] != 0) {
            board[i][j + 1] = board[i][j + 2];
            board[i][j + 2] = board[i][j + 3];
            board[i][j + 3] = 0;
          }
        } else if (j === 1) {
           if (board[i][j + 2] === 0) {
            board[i][j + 1] = 0;
          } else if (board[i][j + 2] != 0) {
            board[i][j + 1] = board[i][j + 2];
            board[i][j + 2] = 0;
          }
        } else if (j === 2) {
            board[i][j + 1] = 0;
        };
      };
    };
  };
};

Game.prototype.moveLeft = function() {
  var changedArray = this.board.map(function(row) {
    var compactArr = _.compact(row)
    var tempArr = new Array(4 - (compactArr.length))
    return compactArr.concat(tempArr.fill(0))
  });

  this.combineLeft(changedArray);
  if (this.board.join() === changedArray.join()) {
      this.board = changedArray;
  } else {
    this.board = changedArray;
    this.populateRandomOpenTile();
  }
  return this;
};

Game.prototype.moveRight = function() {
  var reverseArray = this.reverseRows(this.board);

  this.board = reverseArray;
  this.moveLeft();

  var rightArray = this.reverseRows(this.board);

  this.board = rightArray
  return this;
};

Game.prototype.moveUp = function() {
  this.board = _.unzip(this.board);

  this.moveLeft();

  this.board = _.unzip(this.board);
  return this;
};

Game.prototype.moveDown = function() {
  this.board = _.unzip(this.board);

  var reverseArrayDown = this.reverseRows(this.board);

  this.board = reverseArrayDown;
  this.moveLeft();

  var downArray = this.reverseRows(this.board);

  this.board = downArray;

  this.board = _.unzip(this.board);

  return this;
};

Game.prototype.reverseRows = function(arr) {
  return arr.map(function(row) {
    return row.reverse();
  });
};

Game.prototype.displayBoard = function() {
  this.board.forEach(function(row) {
    console.log(row);
  });
};

Game.prototype.isWon = function() {
  var num = 0
  this.board.forEach(function(row) {
    row.forEach(function(cell){
      if(cell === 256) {
        num = 256
      };
    }.bind(num));
  }.bind(num));
  return num
};

Game.prototype.isLost = function() {
  var lost = false
  if( this.checkLostRowOne() + this.checkLostRowTwoThree() + this.checkLostRowFour() === 16 ) {
    lost = true
  };
  return lost
};

Game.prototype.checkLostRowOne = function() {
  var lose = 0
  for( var i=0; i < 1; i++ ) {
    for( var j=0; j < this.board[i].length; j++ ) {
      if( this.board[i][j] != 0 ) {
        if( j === 0 ) {
          if( this.board[i][j] != this.board[i][j + 1] &&  this.board[i][j] != this.board[i + 1][j]) {
            lose += 1
          }
        } else if( j === 3 ) {
          if( this.board[i][j] != this.board[i][j - 1] &&  this.board[i][j] != this.board[i + 1][j]) {
            lose += 1
          }
        } else {
           if( this.board[i][j] != this.board[i][j + 1] && this.board[i][j] != this.board[i][j - 1] &&  this.board[i][j] != this.board[i + 1][j]) {
            lose += 1
          };
        };
      };
    };
  };
  return lose
};

Game.prototype.checkLostRowTwoThree = function() {
  var lose = 0
  for( var i=1; i < 3; i++ ) {
    for( var j=0; j < this.board[i].length; j++ ) {
      if( this.board[i][j] != 0 ) {
        if( j === 0 ) {
          if( this.board[i][j] != this.board[i][j + 1] &&  this.board[i][j] != this.board[i + 1][j] && this.board[i][j] != this.board[i - 1][j]) {
            lose += 1
          }
        } else if( j === 3 ) {
          if( this.board[i][j] != this.board[i][j - 1] &&  this.board[i][j] != this.board[i + 1][j] && this.board[i][j] != this.board[i-1][j]) {
            lose += 1
          }
        } else {
           if( this.board[i][j] != this.board[i][j + 1] && this.board[i][j] != this.board[i][j - 1] && this.board[i][j] != this.board[i + 1][j] && this.board[i][j] != this.board[i - 1][j]) {
            lose += 1
          };
        };
      };
    };
  };
  return lose
};

Game.prototype.checkLostRowFour = function() {
  var lose = 0
  for( var i=3; i < 4; i++ ) {
    for( var j=0; j < this.board[i].length; j++ ) {
      if( this.board[i][j] != 0 ) {
        if( j === 0 ) {
          if( this.board[i][j] != this.board[i][j + 1] &&  this.board[i][j] != this.board[i - 1][j]) {
            lose += 1
          }
        } else if( j === 3 ) {
          if( this.board[i][j] != this.board[i][j - 1] &&  this.board[i][j] != this.board[i - 1][j]) {
            lose += 1
          }
        } else {
           if( this.board[i][j] != this.board[i][j + 1] && this.board[i][j] != this.board[i][j - 1] &&  this.board[i][j] != this.board[i - 1][j]) {
            lose += 1
          };
        };
      };
    };
  };
  return lose
};

Game.prototype.determineColor = function(selector) {
  if (selector.text() === "2") {
    selector.css("background-color", "#eee4da");
    selector.css("color", "#776e65");
  } else if (selector.text() === "4") {
    selector.css("background-color", "#ede0c8");
    selector.css("color", "#776e65");
  } else if (selector.text() === "8") {
    selector.css("background-color", "#f2b179");
    selector.css("color", "white");
  } else if (selector.text() === "16") {
    selector.css("background-color", "#f59563");
    selector.css("color", "white");
  } else if (selector.text() === "32") {
    selector.css("background-color", "#f67c5f");
    selector.css("color", "white");
  }  else if (selector.text() === "64") {
    selector.css("background-color", "#f65e3b");
    selector.css("color", "white");
  }  else if (selector.text() === "128") {
    selector.css("background-color", "#edcf72");
    selector.css("color", "white");
  } else if (selector.text() === "256") {
    selector.css("background-color", "#edcc61");
    selector.css("color", "white");
  } else if (selector.text() === "512") {
    selector.css("background-color", "#edc850");
    selector.css("color", "white");
  };
};




// Not in use but may be needed
// Game.prototype.rotate = function( array ) {
//   var newArray = []
//   for (var i = 0; i < array.length; i++) {
//     newArray.push([]);
//   };

//   for(var i = 0; i < array.length; i++) {
//     for(var j = 0; j < array[0].length; j++) {
//       newArray[j].push(array[i][j]);
//     };
//   };
//   return newArray;
// };

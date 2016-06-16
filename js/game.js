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

Game.prototype.combineLeft = function() {
  for (i = 0; i < this.board.length; i++) {
    for (j = 0; j < this.board[i].length; j++) {
      if (this.board[i][j] === this.board[i][j + 1]) {
        this.board[i][j] *= 2
        if (j === 0) {
          if (this.board[i][j + 2] === 0) {
            this.board[i][j + 1] = 0;
          } else if (this.board[i][j + 2] != 0) {
            this.board[i][j + 1] = this.board[i][j + 2];
            this.board[i][j + 2] = this.board[i][j + 3];
            this.board[i][j + 3] = 0;
          }
        } else if (j === 1) {
           if (this.board[i][j + 2] === 0) {
            this.board[i][j + 1] = 0;
          } else if (this.board[i][j + 2] != 0) {
            this.board[i][j + 1] = this.board[i][j + 2];
            this.board[i][j + 2] = 0;
          }
        } else if (j === 2) {
            this.board[i][j + 1] = 0;
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

  if (this.board.join() === changedArray.join()) {
      this.board = changedArray;
      this.combineLeft();
  } else {
    this.board = changedArray;
    this.combineLeft();
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

Game.prototype.determineColor = function(selector) {
  if (selector.text() === "2") {
    selector.css("background-color", "#eee4da");
  } else if (selector.text() === "4") {
    selector.css("background-color", "#ede0c8");
  } else if (selector.text() === "8") {
    selector.css("background-color", "#f2b179");
  } else if (selector.text() === "16") {
    selector.css("background-color", "#f59563");
  } else if (selector.text() === "32") {
    selector.css("background-color", "#f67c5f");
  }  else if (selector.text() === "64") {
    selector.css("background-color", "#f65e3b");
  }  else if (selector.text() === "128") {
    selector.css("background-color", "#edcf72");
  } else if (selector.text() === "256") {
    selector.css("background-color", "#edcc61");
  } else if (selector.text() === "512") {
    selector.css("background-color", "#edc850");
  };
};

Game.prototype.displayBoard = function() {
  this.board.forEach(function(row) {
    console.log(row);
  });
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

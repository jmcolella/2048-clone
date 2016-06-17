$(document).ready(function() {
  var game = new Game();
  $(document).keyup(function(e){
    var x = e.keyCode;
    if (x == 32) {
      var newBoard = game.board;
      for(i = 0; i < newBoard.length; i++) {
        for(j = 0; j < newBoard[i].length; j++) {
          if (newBoard[i][j] != 0) {
            $("#row-" + (i+1)).find(".cell-" + (j+1)).text(newBoard[i][j]);
            game.determineColor($("#row-" + (i+1)).find(".cell-" + (j+1)));
          };
        };
      };
      $("#begin-message").hide();
    } else if (x == 37) {
      game.moveLeft();
      for(i = 0; i < game.board.length; i++) {
        for(j = 0; j < game.board[i].length; j++) {
          $("#row-" + (i+1)).find(".cell-" + (j+1)).html("");
          $("#row-" + (i+1)).find(".cell-" + (j+1)).css("background-color", "#cdc1b4");
          if (game.board[i][j] != 0) {
            $("#row-" + (i+1)).find(".cell-" + (j+1)).text(game.board[i][j]);
            game.determineColor($("#row-" + (i+1)).find(".cell-" + (j+1)));
          };
        };
      };
      if(game.isWon() === 256) {
        $("#win-message").show();
        $(document).off('keyup');
         setTimeout(function(){
          window.location.reload();
        }, 5000);
      };
    } else if (x == 39) {
      game.moveRight();
      for(i = 0; i < game.board.length; i++) {
        for(j = 0; j < game.board[i].length; j++) {
          $("#row-" + (i+1)).find(".cell-" + (j+1)).html("");
          $("#row-" + (i+1)).find(".cell-" + (j+1)).css("background-color", "#cdc1b4");
          if (game.board[i][j] != 0) {
            $("#row-" + (i+1)).find(".cell-" + (j+1)).text(game.board[i][j]);
            game.determineColor($("#row-" + (i+1)).find(".cell-" + (j+1)));
          };
        };
      };
      if(game.isWon() === 256) {
        $("#win-message").show();
        $(document).off('keyup');
         setTimeout(function(){
          window.location.reload();
        }, 5000);
      };
    } else if (x == 38) {
      game.moveUp();
      for(i = 0; i < game.board.length; i++) {
        for(j = 0; j < game.board[i].length; j++) {
          $("#row-" + (i+1)).find(".cell-" + (j+1)).html("");
          $("#row-" + (i+1)).find(".cell-" + (j+1)).css("background-color", "#cdc1b4");
          if (game.board[i][j] != 0) {
            $("#row-" + (i+1)).find(".cell-" + (j+1)).text(game.board[i][j]);
            game.determineColor($("#row-" + (i+1)).find(".cell-" + (j+1)));
          };
        };
      };
      if(game.isWon() === 256) {
        $("#win-message").show();
         setTimeout(function(){
          window.location.reload();
        }, 5000);
      };
    }  else if (x == 40) {
      game.moveDown();
      for(i = 0; i < game.board.length; i++) {
        for(j = 0; j < game.board[i].length; j++) {
          $("#row-" + (i+1)).find(".cell-" + (j+1)).html("");
          $("#row-" + (i+1)).find(".cell-" + (j+1)).css("background-color", "#cdc1b4");
          if (game.board[i][j] != 0) {
            $("#row-" + (i+1)).find(".cell-" + (j+1)).text(game.board[i][j]);
            game.determineColor($("#row-" + (i+1)).find(".cell-" + (j+1)));
          };
        };
      };
      if(game.isWon() === 256) {
        $("#win-message").show();
        $(document).off('keyup');
        setTimeout(function(){
          window.location.reload();
        }, 5000);
      };
    };
  });
});



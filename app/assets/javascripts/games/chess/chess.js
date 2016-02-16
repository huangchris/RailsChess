// ♔♚	White King
// ♕♛	White Queen
// ♖	White Rook
// ♗♝	White Bishop
// ♘♞	White Knight
// ♙	White Pawn
// ♚	Black King
// ♛	Black Queen
// ♖♜	Black Rook
// ♝	Black Bishop
// ♞	Black Knight
// ♟ Black Pawn

var Pawn = function(color){
  this.color = color;
  this.toString = (color === "white" ? "♙" : "♟" );
}

Pawn.prototype.validMove = function(fromPos, toPos, board){
  // row, column
  if (this.color === "white"){
    if (toPos[0] === fromPos[0] + 1 || (fromPos[0] === 1 && toPos[0] === 3 && fromPos[1] === toPos[1])){
      return fromPos[1] === toPos[1] ||
        (board[toPos[0]][toPos[1]] &&
          Math.abs(fromPos[1] - toPos[1]) === 1 &&
          board[toPos[0]][toPos[1]].color !== this.color)
    }
  }else{
    if (toPos[0] === fromPos[0] - 1 || (fromPos[0] === 6 && toPos[0] === 4 && fromPos[1] === toPos[1])){
      return fromPos[1] === toPos[1] ||
        (board[toPos[0]][toPos[1]] &&
          Math.abs(fromPos[1] - toPos[1]) === 1 &&
          board[toPos[0]][toPos[1]].color !== this.color)
    }
  }
  return false;
}

var Rook = function(color){
  this.color = color
  this.toString = (color === "white" ? "♖" : "♜" );
}
Rook.prototype.validMove = function(fromPos, toPos, board){
  return (fromPos[0] === toPos[0] || fromPos[1] === toPos[1])
  // figure out piece jumping later -- scan across all points between the two for pieces
}

var Knight = function(color){
  this.color = color;
  this.toString = (color === 'white' ? "♘" : "♞")
}

Knight.prototype.validMove = function(fromPos, toPos, board){
  if (board[toPos[0]][toPos[1]] && board[toPos[0]][toPos[1]].color === this.color){
    return false;
  }
  return (Math.abs(fromPos[0] - toPos[0]) === 1 && Math.abs(fromPos[1] - toPos[1]) === 2) ||
    (Math.abs(fromPos[0] - toPos[0]) === 2 && Math.abs(fromPos[1] - toPos[1]) === 1);
}

var Bishop = function(color){
  this.color = color;
  this.toString = (color === 'white' ? "♗" : "♝" );
}

Bishop.prototype.validMove = function(fromPos, toPos, board){
  return Math.abs(fromPos[0] - toPos[0]) === Math.abs(fromPos[1] - toPos[1]);
}

var Queen = function(color){
  this.color = color;
  this.toString = (color === 'white' ? "♕" : "♛")
}

Queen.prototype.validMove = function(fromPos, toPos, board){
  return Bishop.prototype.validMove(fromPos, toPos, board) ||
    Rook.prototype.validMove(fromPos, toPos, board);
}

var King = function(color){
  this.color = color;
  this.toString = (color === 'white' ? "♔" : "♚" )
}

King.prototype.validMove = function(fromPos, toPos, board){
  return Math.abs(fromPos[0] - toPos[0]) < 2 && Math.abs(fromPos[1] - toPos[1]) < 2
}

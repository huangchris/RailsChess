(function(root) {
  'use strict';
  root.Chess = React.createClass({
    getInitialState: function(){
      return {selected: null};
    },
    componentWillMount:function(){
      this.pieces = [];
      this.pieces.push(["R","N","B","Q","K","B","N","R"])
      this.pieces.push(["P","P","P","P","P","P","P","P"])
      for (var i = 0; i < 4; i++) {
        this.pieces.push([])
      }
      this.pieces.push(["P","P","P","P","P","P","P","P"])
      this.pieces.push(["R","N","B","Q","K","B","N","R"])
    },
    makeRow: function(rowNum){
      var colLetters = {0:"A", 1: "B", 2:"C", 3:"D", 4:"E",5:"F",6:"G",7:"H"}
      return [0,1,2,3,4,5,6,7].map(function(i){
        var piece = (this.pieces[rowNum][i]) ?
          this.pieces[rowNum][i] :
          null;
        var selected = (this.state.selected && this.state.selected[0] === rowNum && this.state.selected[1] === i) ?
          "selected-square" : ""
        if((rowNum + i) % 2 === 0){
          return <div data-pos={[rowNum,i]}
                      className={"black-square " + selected}
                      onClick={this.clickPiece}
                      key={"r"+(rowNum + 1)+"c"+colLetters[i]}>
                      {piece}</div>
        }else{
          return <div className={"white-square " + selected}
                      data-pos={[rowNum,i]}
                      onClick={this.clickPiece}
                      key={"r"+(rowNum + 1)+"c"+colLetters[i]}>
                      {piece}</div>
        }
      }.bind(this))
    },
    clickPiece: function(e){
      var toPos = e.target.dataset.pos.split(",").map(function(i){return parseInt(i)});
      if (this.state.selected){ // and myTurn === true
        var fromPos = this.state.selected;
        if(fromPos[0] !== toPos[0] || fromPos[1] !== toPos[1]){
          this.pieces[toPos[0]][toPos[1]] = this.pieces[fromPos[0]][fromPos[1]];
          this.pieces[fromPos[0]][fromPos[1]] = null; // this isn't updating this.board.
        }
        this.setState({selected: null});
      }else{
        this.setState({selected: toPos})
      }
    },
    makeBoard: function(){
      // if(this.board){
      //   return this.board;
      // }else{
        this.board = [0,1,2,3,4,5,6,7].map(function(i){
          return <div className="board-row" key={"row"+i}>{this.makeRow(i)}</div>
        }.bind(this)).reverse();
        return this.board;
      // }
    },
    render: function(){
      return <div>{this.makeBoard()}</div>
    }
  })

  root.ChessSquare = React.createClass({
    render:function(){
      if (this.props.piece){
        return <div className={this.props.color + "-square"}
                    key={"r"+(rowNum + 1)+"c"+colLetters[i]}>
                    {this.props.piece}
        </div>
      }
    }
  })
}(this));

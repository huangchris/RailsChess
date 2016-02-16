(function(root) {
  'use strict';
  root.Game = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {board: this.makeStartingBoard()};
    },
    makeStartingBoard:function(){
      var board = [];
      var whitePawns = [];
      for (var i = 0; i < 8; i++) {
        whitePawns.push(new Pawn('white'))
      }
      var blackPawns = [];
      for (var i = 0; i < 8; i++) {
        blackPawns.push(new Pawn('black'))
      }
      var whiteRow = [];
        whiteRow.push(new Rook('white'))
        whiteRow.push(new Knight('white'))
        whiteRow.push(new Bishop('white'))
        whiteRow.push(new Queen('white'))
        whiteRow.push(new King('white'))
        whiteRow.push(new Bishop('white'))
        whiteRow.push(new Knight('white'))
        whiteRow.push(new Rook('white'))

      var blackRow = []
        blackRow.push(new Rook('black'))
        blackRow.push(new Knight('black'))
        blackRow.push(new Bishop('black'))
        blackRow.push(new Queen('black'))
        blackRow.push(new King('black'))
        blackRow.push(new Bishop('black'))
        blackRow.push(new Knight('black'))
        blackRow.push(new Rook('black'))
      board.push(whiteRow);
      board.push(whitePawns);
      for (var i = 0; i < 4; i++) {
        board.push([])
      } // push 4 blank rows
      board.push(blackPawns);
      board.push(blackRow);
      return board;
    },
    componentWillMount: function(){
      if (this.props.name === ""){
        this.history.pushState("","/new")
      }else if(typeof this.GameChannel === 'undefined'){
        this.GameChannel = joinGame(this); //probably need to pass component to channel
      }
      $(window).unload(function(){
        this.GameChannel && this.GameChannel.unsubscribe();
      }.bind(this))
    },
    componentWillUnmount:function(){
      this.GameChannel && this.GameChannel.unsubscribe() && delete this.GameChannel;
      $(window).off('unload')
    },
    updateBoard:function(data){
      console.log(data.fromPos);
      console.log(data.toPos);
      this.state.board[data.toPos[0]][data.toPos[1]] = this.state.board[data.fromPos[0]][data.fromPos[1]]
      this.state.board[data.fromPos[0]][data.fromPos[1]] = null
      this.forceUpdate();
    },
    // games: {'chess': <Chess/>, 'ghost': <Ghost/>},
    render: function(){
      // var game = this.games[this.props.game];
      // return <div>{game}</div>
      return <Chess board={this.state.board} channel={this.GameChannel}/>
    }
  })
}(this));

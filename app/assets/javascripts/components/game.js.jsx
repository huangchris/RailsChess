(function(root) {
  'use strict';
  root.Game = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {board: this.makeStartingBoard(), notifications: "", players: [], currentPlayer: ""};
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
    play: function(fromPos, toPos){
      this.setState({notification: ""})
      debugger;
      if(this.state.currentPlayer === this.props.name &&
          this.state.board[fromPos[0]][fromPos[1]].color === this.state.color){
        this.GameChannel.play({fromPos: fromPos, toPos: toPos})
      }else{
        this.setState({notification: "Either it's not your turn or that's not your piece"})
      }
    },
    identifyColor: function(){
      this.setState({color: (this.state.players.indexOf(this.props.name) === 0 ? "white" : "black")})
    },
    forfeit: function(){
      this.GameChannel.perform('forfeit')
      this.setState({notification: "You have forfeited this game."})
      this.GameChannel && this.GameChannel.unsubscribe() && delete this.GameChannel;
      setTimeout(function(){this.history.pushState("","/home")}.bind(this),2000)
    },
    // games: {'chess': <Chess/>, 'ghost': <Ghost/>},
    render: function(){
      // var game = this.games[this.props.game];
      // return <div>{game}</div>
      return <div>
          <strong>{this.state.notification}</strong>
          <div>{this.state.players}</div>
          <div>{this.state.currentPlayer}</div>
          <div>You are {this.state.color}!</div>
          <Chess board={this.state.board} play={this.play}/>
          <button onClick={this.forfeit}>Forfeit</button>
        </div>
    }
  })
}(this));

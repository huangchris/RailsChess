(function(root) {
  'use strict';
  root.Game = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {board: this.makeStartingBoard()};
    },
    makeStartingBoard:function(){
      var board = [];
      var pawns = ["P","P","P","P","P","P","P","P"];
      var backRow = ["R","N","B","Q","K","B","N","R"];
      board.push(backRow.slice())
      board.push(pawns.slice())
      for (var i = 0; i < 4; i++) {
        board.push([])
      }
      board.push(pawns.slice())
      board.push(backRow.slice())
      return board;
    },
    componentWillMount: function(){
      if (this.props.name === ""){
        this.history.pushState("","/new")
      }else if(typeof this.GameChannel === 'undefined'){
        this.GameChannel = joinGame(this); //probably need to pass component to channel
      }
      $(window).unload(function(){
        debugger;
        this.GameChannel && this.GameChannel.unsubscribe();
      }.bind(this))
    },
    componentWillUnmount:function(){
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

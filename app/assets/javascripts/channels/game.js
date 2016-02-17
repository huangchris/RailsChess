function joinGame(reactGame){
  return Cable.subscriptions.create("GameChannel",{
    connected: function(){},
    disconnected: function(){},
    received: function(data){
      console.log('received message:' + data.action)
      // reactGame.setState()
      switch (data.action) {
        case 'login':
          // save the players to show names, figure out if you're white or black
          reactGame.setState({players: data.players, currentPlayer: data.currentPlayer})
          reactGame.identifyColor();
          break;
        case 'play':
          // pass message on to wherever game state is being saved
          reactGame.updateBoard(data.message)
          break;
        case 'forfeit':
          // if not self, say "You win!"
          if(data.message !== reactGame.props.name){
            reactGame.setState({notification: data.message + " has forfeited! You win!"})
          }
          break;
      }
    },
    play: function(data){
      this.perform('play', data)
    }
  })
}

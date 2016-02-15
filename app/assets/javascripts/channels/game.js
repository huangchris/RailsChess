function joinGame(reactGame){
  return Cable.subscriptions.create("GameChannel",{
    connected: function(){},
    disconnected: function(){},
    received: function(){
      // reactGame.setState()
    },
    play: function(data){
      this.perform('play', {message: data})
    }
  })
}

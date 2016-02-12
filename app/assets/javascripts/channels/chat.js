function joinChat(reactLobby){
  return Cable.subscriptions.create("ChatChannel",{
    connected: function(){
      this.perform('login',{name: reactLobby.props.name});
    },
    disconnected: function(){
      // I don't think this works... so I'm calling it explicitly before unsubscribe.
      // Probably not intended way to handle. Better would be to have cookies and
      // current_user. update.  we'll get there.
      this.perform('logout', {name: reactLobby.props.name});
      return true; // so we can chain.
    },
    received: function(data){
      console.log('someone spoke:' + [data.action, data.message]);
      switch (data.action) {
        case 'speak':
          reactLobby.setState({messages: reactLobby.state.messages.concat(data.message)});
          break;
        case 'login':
          reactLobby.setState({users: data.message})
          break;
        case 'logout':
          newUserList = spliceLoggedOut(reactLobby.state.users, data.message)
          message = reactLobby.state.messages.concat([{message: data.message + "has logged out"}])
          reactLobby.setState({users: data.message})
          break;
      }
    },
    speak: function(message){
      this.perform('speak', {message: message, sender: reactLobby.props.name});
    }
  });
}

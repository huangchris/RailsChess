function joinChat(reactLobby){
  return Cable.subscriptions.create("ChatChannel",{
    connected: function(){},
    disconnected: function(){},

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
    },
    logout: function(){
      this.perform('logout', {name: reactLobby.props.name});
    }
  });
}
function spliceLoggedOut(list, user){
  debugger;
  var userList = list.slice();
  var index = userList.indexOf(user);
  userList.splice(index);
  return userList;
}

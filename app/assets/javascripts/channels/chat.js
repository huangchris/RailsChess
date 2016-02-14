function joinChat(reactLobby){
  return Cable.subscriptions.create("ChatChannel",{
    connected: function(){
      console.log('chatchannel connected')
      // this.perform('update_user_list')
    },
    disconnected: function(){},

    received: function(data){
      console.log('someone spoke:' + [data.action, data.message]);
      switch (data.action) {
        case 'speak':
          reactLobby.setState({messages: reactLobby.state.messages.concat(data.message)});
          break;
        case 'login':
        var messages = reactLobby.state.messages.concat([{message: data.message + " has logged in"}]);
        var users = reactLobby.state.users.concat([data.message]);
          reactLobby.setState({users: users, messages: messages});
          break;
        case 'logout':
          var newUserList = spliceLoggedOut(reactLobby.state.users, data.message);
          var messages = reactLobby.state.messages.concat([{message: data.message + " has logged out"}]);
          reactLobby.setState({users: newUserList, messages: messages});
          break;
        case 'users':
          reactLobby.setState({users: data.message});
          break;
        case 'challenge':
          console.log('received challenge');
          reactLobby.setState({challenged: data.message});
          break;
        case 'challenge_response':
          console.log("got an answer: " + data.message.response);
          if(data.message.response){
            reactLobby.history.pushState("","/game")
          }else{
            var messages = reactLobby.state.messages.concat([{message: "your challenge has been declined"}]);
            reactLobby.setState({makeChallenge: null, messages: messages})
          }
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
  var userList = list.slice();
  var index = userList.indexOf(user);
  userList.splice(index);
  return userList;
}

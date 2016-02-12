(function(root) {
  'use strict';
  root.Lobby = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {messages: [], users: []}
    },
    componentWillMount: function(){
      if (this.props.name === ""){
        this.history.pushState("","/new")
      }else{
        this.ChatChannel = joinChat(this);
      }
    },
    componentWillUnmount: function(){
      debugger;
      this.ChatChannel && this.ChatChannel.disconnected() && this.ChatChannel.unsubscribe();
    },
    watchForSubmit: function(e){
      debugger;
      if(e.key === 'Enter'){
        debugger;
        e.preventDefault();
        this.ChatChannel.speak(e.target.value);
      }
    },
    render: function(){
      var messages = this.state.messages.map(function(message){
        return <li>{message.sender}<p>{message.message}</p></li>
      })
      return <div>
        <div>Users online: {this.state.users}</div>
        <div>Messages:</div>
        <ul>
          {messages}
        </ul>
        <textarea onKeyPress={this.watchForSubmit}></textarea>
      </div>
    }
  })
}(this));

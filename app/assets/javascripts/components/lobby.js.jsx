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
      console.log("unmount lobby")
      this.ChatChannel && this.ChatChannel.logout() && this.chatChannel.unsubscribe();
      // the order these events are happening is causing a small problem (warning).
      delete this.chatChannel;
    },
    watchForSubmit: function(e){
      if(e.key === 'Enter'){
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

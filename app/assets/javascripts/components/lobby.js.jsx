(function(root) {
  'use strict';
  root.Lobby = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {messages: [], users: []}
    },
    componentWillMount: function(){
      // if(this.props.name === ""){
      //   this.history.pushState(null,"/new")
      // }
    },
    componentDidMount: function(){
      if (this.props.name === ""){
        this.history.pushState("","/new")
      }else if(typeof this.ChatChannel === 'undefined'){
        this.ChatChannel = joinChat(this);
      }
      $(window).unload(function(){
        this.ChatChannel && this.ChatChannel.unsubscribe();
      }.bind(this))
    },
    componentWillUnmount: function(){
      console.log("unmount lobby")
      this.ChatChannel && this.ChatChannel.unsubscribe() && delete this.chatChannel;
      // the order these events are happening is causing a small problem (warning).
      $(window).off('unload')
    },
    watchForSubmit: function(e){
      if(e.key === 'Enter'){
        e.preventDefault();
        this.ChatChannel.speak(e.target.value);
        e.target.value = '';
      }
    },
    issueChallenge: function(e){
      this.setState({makeChallenge: e.target.dataset.id})
      e.preventDefault();
    },
    unChallenge: function(e){
      e.preventDefault();
      this.setState({makeChallenge: null});
    },
    acceptChallenge:function(){
      this.ChatChannel.perform('challenge_response', {users: this.state.challenged, response: true})
      this.setState({challenged: false});
    },
    declineChallenge:function(){
      this.ChatChannel.perform('challenge_response', {users: this.state.challenged, response: false})
      this.setState({challenged: false});
    },
    render: function(){
      var users = this.state.users.sort().map(function(user,idx){
        if (this.state.makeChallenge === user){
          return <li key={"usr"+idx}>
            <a data-id={user} href="#lobby" onClick={this.unChallenge}>{user}</a>
            <Challenge user={user}
                        self={this.props.name}
                        channel={this.ChatChannel}
                        unChallenge={this.unChallenge}></Challenge>
          </li>
        }else if(this.props.name === user){
          return <li key={"usr"+idx}>{user}</li>
        }
        return <li key={"usr"+idx}>
          <a data-id={user} href="#lobby" onClick={this.issueChallenge}>{user}</a>

          </li>
      }.bind(this))
      var messages = this.state.messages.map(function(message,idx){
        return <li key={"msg" + idx}>{message.sender}<p>{message.message}</p></li>
      })
      if(this.state.challenged){
        // this should be a subcomponent... and used for all sorts of notifications
        var challenge =<div>
          <strong>You've been challenged by {this.state.challenged.sender}!</strong>
          <button onClick={this.acceptChallenge}>Accept</button>
          <button onClick={this.declineChallenge}>Decline</button>
          </div>
      }
      return <div>
        {challenge}
        <div>Users online:</div>
        <ul>{users}</ul>
        <div>Messages:</div>
        <ul>
          {messages}
        </ul>
        <textarea onKeyPress={this.watchForSubmit}></textarea>
      </div>
    }
  })
}(this));

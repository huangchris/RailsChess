(function(root) {
  'use strict';
  root.Lobby = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {messages: [], users: []}
    },
    componentWillMount: function(){
      if(this.props.name === ""){
        this.history.pushState(null,"/new")
      }
    },
    componentDidMount: function(){
      if (this.props.name === ""){
        this.history.pushState("","/new")
      }else{
        this.ChatChannel = joinChat(this);
      }
    },
    componentWillUnmount: function(){
      console.log("unmount lobby")
      this.ChatChannel && this.ChatChannel.unsubscribe() && delete this.chatChannel;
      // the order these events are happening is causing a small problem (warning).
    },
    watchForSubmit: function(e){
      if(e.key === 'Enter'){
        e.preventDefault();
        this.ChatChannel.speak(e.target.value);
        e.target.value = '';
      }
    },
    issueChallenge: function(e){
      this.setState({challenged: e.target.dataset.id})
      e.preventDefault();
    },
    unChallenge: function(e){
      e.preventDefault();
      this.setState({challenged: null});
    },
    render: function(){
      var users = this.state.users.sort().map(function(user,idx){
        if (this.state.challenged === user){
          return <li key={"usr"+idx}>
            <a data-id={user} href="#lobby" onClick={this.unChallenge}>{user}</a>
            <Challenge user={user}
                        self={this.props.name}
                        channel={this.chatChannel}
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
      return <div>
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

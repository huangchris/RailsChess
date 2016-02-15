(function(root) {
  'use strict';
  root.Challenge = React.createClass({
    getInitialState: function(){
      return {cSent: false}
    },
    // props: user:(username), channel(chatChannel)
    issueChallenge: function(){
      console.log("Challenge issued");
      this.props.channel.perform('challenge', {sender: this.props.self, recipient: this.props.user});
      this.setState({cSent: true})
    },
    render: function(){
      if(this.state.cSent){
        return <div>Challenge Sent! Waiting for a response...</div>
      }
      else{
        return <div><p>Challenge {this.props.user} to a match?</p>
        <button onClick={this.issueChallenge}>Yes</button>
        <button onClick={this.props.unChallenge}>Cancel</button>
        </div>
      }
    }
  })
}(this));

(function(root) {
  'use strict';
  root.Challenge = React.createClass({
    // props: user:(username), channel(chatChannel)
    issueChallenge: function(){
      console.log("Challenge issued")
      // this.props.channel.perform('challenge', {sender: this.props.self, recipient: this.props.user});
    },
    render: function(){
      return <div><p>Challenge {this.props.user} to a match?</p>
      <button onClick={this.issueChallenge}>Yes</button>
      <button onClick={this.props.unChallenge}>Cancel</button>
      </div>
    }
  })
}(this));

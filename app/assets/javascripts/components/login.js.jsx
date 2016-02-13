/* global ActionCable */
(function(root) {
  'use strict';
  root.Login = React.createClass({
    mixins: [ReactRouter.History, React.addons.LinkedStateMixin],
    getInitialState: function(){
      return {name: ""};
    },
    componentDidMount: function(){
      if(this.props.name !== ""){
        this.history.pushState("","/home");
      }
    },
    inputHandler: function(e){
      if (e.key === "Enter"){
        e.preventDefault();
        this.login();
      }
    },

    login: function(){
      var data = this.state;
      $.post({
        url: "/users",
        data: data,
      }).success(this.createSocket) //promises?
    },

    createSocket: function(){
      root.Cable = ActionCable.createConsumer();
      this.props.updateState(this.state);
      this.history.pushState("","/home");
    },

    render: function(){
      return <div >Enter a username:
        <input id="name" type="text"
               onKeyPress={this.inputHandler}
               valueLink={this.linkState("name")}></input>
        <input type='submit' onClick={this.login}></input>
      </div>;
    }
  });
}(this));

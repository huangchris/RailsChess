(function(root) {
  'use strict';
  root.Game = React.createClass({
    mixins: [ReactRouter.History],
    componentWillMount: function(){
      if(this.props.name === ""){
        this.history.pushState(null,"/new")
      }
    },
    render: function(){
      return <div>Game Board goes here</div>
    }
  })
}(this));

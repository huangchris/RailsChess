(function(root) {
  'use strict';
  root.Game = React.createClass({
    mixins: [ReactRouter.History],
    componentWillMount: function(){
      // if(this.props.name === ""){
      //   this.history.pushState(null,"/new")
      // } #already handled by master component?
    },
    games: {'chess': <Chess/>},
    render: function(){
      // var game = this.games[this.props.game];
      // return <div>{game}</div>
      return <Chess/>
    }
  })
}(this));

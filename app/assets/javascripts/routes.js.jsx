this.App = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return { name: ""}
  },
  componentWillMount: function(){
    if(this.state.name === ""){
      this.history.pushState(null,"/new")
    }
  },

  updateState: function(newState){
    this.setState(newState);
  },

  render: function() {
    var childrenWithProps = React.Children.map(this.props.children, function(child){
      return React.cloneElement(child, { updateState: this.updateState,
                                         name: this.state.name });
    }.bind(this))
    return <div><p>Hello {this.state.name}!</p>
     {childrenWithProps}
    </div>
  }
})
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
MyRoutes = (
  <Router>
    <Route path = "/" component={App}>
      <Route path="new" component={Login}/>
      <Route path="lobby" component={Lobby}></Route>
      <Route path="home" component={Lobby}></Route>
      <Route path="/game" component={Game}></Route>
    </Route>
  </Router>
)

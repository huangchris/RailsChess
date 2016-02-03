this.App = React.createClass({
  mixins: [ReactRouter.History],
  componentDidMount: function(){
    debugger;
    this.history.pushState(null,"/new")
  },
  render: function() {
    return <div><p>New Component</p>
     {this.props.children}
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
      <Route path="home" component={Lobby}></Route>
      <Route path="/game" component={Game}></Route>
    </Route>
  </Router>
)

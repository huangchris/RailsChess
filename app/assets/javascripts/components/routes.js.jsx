this.App = React.createClass({
  render: function() {
    return <div>New Component {this.props.children}</div>
  }
})
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
MyRoutes = (
    <Route path="/" handler={App}>

    </Route>
)

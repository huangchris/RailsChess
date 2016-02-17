## README

* 2016-02-02 Updated to rails 5 beta2.  Added file `action_cable/process/logging.rb`
  to gem, to handle an error with a missing file
* 2017-02-15 Logging in from multiple tabs can cause problems with disconnected from
  channels. --GameChannel, looks for "GameChannel" instead of "GameChannel#{id}"
    So current_user.game_id is disappearing somehow.
  * loading game should synchronize game-states--can be done by having `login` call
    respond with board state if you were already logged in. (in the future will be
    from server side)
## To dos:
[] fix channel disconnect--_hard to replicate--mostly shows up when loading with syntax errors_
[X] Don't move opponent's pieces
[] use redis to store game state on server
[] better move validation, check/checkmate
[X] forfeit buttton
[] list of taken pieces
[] show players and who's turn it is--validate before making move requests.
[] rotate black's board or give button to do yourself.
[] move most code from game to chess, so game just chooses a game component to render
[] learn how to rescue the actioncable server when channels don't close properly
[] push to heroku

## README

* 2016-02-02 Updated to rails 5 beta2.  Added file `action_cable/process/logging.rb`
  to gem, to handle an error with a missing file
* 2017-02-15 Logging in from multiple tabs can cause problems with disconnected from
  channels. --GameChannel, looks for "GameChannel" instead of "GameChannel#{id}"
    So current_user.game_id is disappearing somehow.
  * loading game should synchronize game-states--can be done by having `login` call
    respond with board state if you were already logged in. (in the future will be
    from server side)

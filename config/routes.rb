# == Route Map
#
# Prefix Verb URI Pattern Controller#Action
#   root GET  /           session#main
#             /cable      #<ActionCable::Server::Base:0x007fe44cbb36a8 @mutex=#<Thread::Mutex:0x007fe44cbb3658>, @pubsub=nil, @channel_classes=nil, @worker_pool=nil, @stream_event_loop=nil, @remote_connections=nil>
#

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  root 'session#main'
  mount ActionCable.server => '/cable'
end

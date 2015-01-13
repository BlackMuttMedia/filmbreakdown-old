class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def home
  	render text: "Welcome! Here is where you go to look up the movies and to write about them! What movies? That's up to you! What are some of your favorites? Say what works. Say what doesn't. Have fun!"
  end

  def story
  	render text: "The story. This is what we're trying to get across.  But what works? What makes it good? Bad? You tell us!"
  end
end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  require 'themoviedb'

  before_filter :set_config
  Tmdb::Api.key("89a1a6500311a41b1a4c35541871e047")

  def set_config
  	@configuration = Tmdb::Configuration.new
  end

  def home
  	render text: "Welcome! Here is where you go to look up the movies and to write about them! What movies? That's up to you! What are some of your favorites? Say what works. Say what doesn't. Have fun!"
  end

  def story
  	render text: "The story. This is what we're trying to get across.  But what works? What makes it good? Bad? You tell us!"
  end
end

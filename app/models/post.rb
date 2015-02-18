class Post < ActiveRecord::Base
  acts_as_votable
	belongs_to :category
	belongs_to :imdb_title
end

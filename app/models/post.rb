class Post < ActiveRecord::Base
  acts_as_votable
	belongs_to :category
	
  belongs_to :described_genre, :foreign_key => 'genre_id', :class_name => 'Genre'
  belongs_to :user

  # Validations
  validates :content, :presence => true
end

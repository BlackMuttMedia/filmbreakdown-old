class Post < ActiveRecord::Base
  acts_as_votable
	belongs_to :category

  has_and_belongs_to_many :described_genres, :class_name => 'Genre'
  belongs_to :user

  # Validations
  validates :content, :presence => true
end

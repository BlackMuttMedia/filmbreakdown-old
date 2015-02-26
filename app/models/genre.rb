class Genre < ActiveRecord::Base
  has_many :descriptions, :foreign_key => 'genre_id', :class_name => 'Post'

  def add_description(post)
    self.descriptions << post
  end
end

class Genre < ActiveRecord::Base
  has_and_belongs_to_many :descriptions, :class_name => 'Post'

  def add_description(post)
    self.descriptions << post
  end
end

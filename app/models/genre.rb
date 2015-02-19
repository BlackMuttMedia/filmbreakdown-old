class Genre < ActiveRecord::Base
  has_many :descriptions, :foreign_key => 'post_id', :class_name => 'Post'
end

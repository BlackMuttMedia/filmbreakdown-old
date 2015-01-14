class Shot < ActiveRecord::Base
	belongs_to :imdb_title
	belongs_to :user, :class_name => "User", :foreign_key => "submitted_by"
end

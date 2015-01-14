class ImdbTitle < ActiveRecord::Base
	has_many :posts
	has_many :shots
end

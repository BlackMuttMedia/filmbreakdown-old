class User < ActiveRecord::Base
	has_many :posts

	validates :firstName, length: { maximum: 50 }
	validates :lastName, length: { maximum: 50}
end

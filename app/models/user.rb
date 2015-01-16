class User < ActiveRecord::Base
	has_many :posts
	has_many :shots, :foreign_key => "submitted_by", :class_name => "Shot"

	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :firstName, length: { maximum: 50 }, presence: true
	validates :lastName, length: { maximum: 50}, presence: true
	validates :email, length: { maximum: 255}, presence: true, 
		uniqueness: {case_sensitive: false },
		format: { with: VALID_EMAIL_REGEX }
end

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup 
  	@user = User.new(firstName: "Jimmy", lastName: "Userpants", email: "user@example.com")
  end

  test "should be valid" do
  	assert @user.valid?
  end

  test "first name should be present" do
  	@user.firstName = '     '
  	assert_not @user.valid?
  end

  test "last name should be present" do
  	@user.lastName = '     '
  	assert_not @user.valid?
  end

  test "email should be present" do
  	@user.email = '     '
  	assert_not @user.valid?
  end

  test "first name should not be too long" do
    @user.firstName = "a" * 51
    assert_not @user.valid?
  end

  test "last name should not be too long" do
    @user.lastName = "a" * 51
    assert_not @user.valid?
  end

  test "email should not be too long" do
    @user.email = "a" * 244 + "@example.com"
    assert_not @user.valid?
  end

  test "email should be formatted properly" do
  	@user.email = "abc@domain.com"
  	assert @user.valid?
  	@user.email = "ablah"
  	assert_not @user.valid?
  end
end

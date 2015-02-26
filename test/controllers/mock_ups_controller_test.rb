require 'test_helper'

class MockUpsControllerTest < ActionController::TestCase
  test "should get category" do
    get :category
    assert_response :success
  end

  test "should get film" do
    get :film
    assert_response :success
  end

  test "should get genree" do
    get :genree
    assert_response :success
  end

  test "should get post" do
    get :post
    assert_response :success
  end

  test "should get shot" do
    get :shot
    assert_response :success
  end

  test "should get structure" do
    get :structure
    assert_response :success
  end

  test "should get user" do
    get :user
    assert_response :success
  end

end

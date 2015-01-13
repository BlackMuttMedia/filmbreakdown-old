require 'test_helper'

class ImdbTitlesControllerTest < ActionController::TestCase
  setup do
    @imdb_title = imdb_titles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:imdb_titles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create imdb_title" do
    assert_difference('ImdbTitle.count') do
      post :create, imdb_title: { name: @imdb_title.name, titleKey: @imdb_title.titleKey, year: @imdb_title.year }
    end

    assert_redirected_to imdb_title_path(assigns(:imdb_title))
  end

  test "should show imdb_title" do
    get :show, id: @imdb_title
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @imdb_title
    assert_response :success
  end

  test "should update imdb_title" do
    patch :update, id: @imdb_title, imdb_title: { name: @imdb_title.name, titleKey: @imdb_title.titleKey, year: @imdb_title.year }
    assert_redirected_to imdb_title_path(assigns(:imdb_title))
  end

  test "should destroy imdb_title" do
    assert_difference('ImdbTitle.count', -1) do
      delete :destroy, id: @imdb_title
    end

    assert_redirected_to imdb_titles_path
  end
end

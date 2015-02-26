class GenresController < ApplicationController
  before_action :set_genre, only: [:edit, :update, :destroy]

  # GET /genres
  # GET /genres.json
  def index
    @genres = Genre.all
  end

  # GET /genres/1
  # GET /genres/1.json
  def show
    @tmdb_id = params[:id]
    if(@tmdb_id == nil)
      redirect_to '/genres/'
    end
    @tmdb_id = @tmdb_id.split('-')[0]

    @genre = Genre.find_by(tmdb_id: @tmdb_id)
    @tmdb_genre = Tmdb::Genre.detail(@tmdb_id)
    
    if(@tmdb_genre == nil)
      redirect_to '/genres/'
    end

    @name = @tmdb_genre.name

    if(@genre == nil && @tmdb_genre != nil)
      @genre = Genre.new({ tmdb_id: @tmdb_id, name: @name })
      @genre.save
    end
    @user_id = current_user ? current_user.id : -1
    puts current_user
    
  end

  # GET /genres/new
  def new
    @genre = Genre.new
  end

  # GET /genres/1/edit
  def edit
  end

  # POST /genres
  # POST /genres.json
  def create
    @genre = Genre.new(genre_params)

    respond_to do |format|
      if @genre.save
        format.html { redirect_to @genre, notice: 'Genre was successfully created.' }
        format.json { render :show, status: :created, location: @genre }
      else
        format.html { render :new }
        format.json { render json: @genre.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /genres/1
  # PATCH/PUT /genres/1.json
  def update
    respond_to do |format|
      if @genre.update(genre_params)
        format.html { redirect_to @genre, notice: 'Genre was successfully updated.' }
        format.json { render :show, status: :ok, location: @genre }
      else
        format.html { render :edit }
        format.json { render json: @genre.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /genres/1
  # DELETE /genres/1.json
  def destroy
    @genre.destroy
    respond_to do |format|
      format.html { redirect_to genres_url, notice: 'Genre was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # POST /genres/add_description
  # POST /genres/add_description.json
  def add_description
    parentId = params["parentId"]
    content = params["content"]
    userId = params["userId"]

    @post = Post.new
    @post.content = content
    @post.genre_id = parentId
    @post.user_id = userId

    if @post.save
      render :json =>
      {
        :status => 'ok',
        :message => 'Post saved!',
        :object => @post
      }.to_json
    else
      render :json =>
      {
        :status => 'error',
        :message => @post.errors.full_messages.to_sentence,
        :object => @post
      }.to_json
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_genre
      @genre = Genre.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def genre_params
      params[:genre]
    end
end

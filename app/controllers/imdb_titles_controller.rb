class ImdbTitlesController < ApplicationController
  before_action :set_imdb_title, only: [:show, :edit, :update, :destroy]

  # GET /imdb_titles
  # GET /imdb_titles.json
  def index
    @imdb_titles = ImdbTitle.all
  end

  # GET /imdb_titles/1
  # GET /imdb_titles/1.json
  def show
  end

  # GET /imdb_titles/new
  def new
    @imdb_title = ImdbTitle.new
  end

  # GET /imdb_titles/1/edit
  def edit
  end

  # POST /imdb_titles
  # POST /imdb_titles.json
  def create
    @imdb_title = ImdbTitle.new(imdb_title_params)

    respond_to do |format|
      if @imdb_title.save
        format.html { redirect_to @imdb_title, notice: 'Imdb title was successfully created.' }
        format.json { render :show, status: :created, location: @imdb_title }
      else
        format.html { render :new }
        format.json { render json: @imdb_title.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /imdb_titles/1
  # PATCH/PUT /imdb_titles/1.json
  def update
    respond_to do |format|
      if @imdb_title.update(imdb_title_params)
        format.html { redirect_to @imdb_title, notice: 'Imdb title was successfully updated.' }
        format.json { render :show, status: :ok, location: @imdb_title }
      else
        format.html { render :edit }
        format.json { render json: @imdb_title.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /imdb_titles/1
  # DELETE /imdb_titles/1.json
  def destroy
    @imdb_title.destroy
    respond_to do |format|
      format.html { redirect_to imdb_titles_url, notice: 'Imdb title was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_imdb_title
      @imdb_title = ImdbTitle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def imdb_title_params
      params.require(:imdb_title).permit(:titleKey, :name, :year)
    end
end

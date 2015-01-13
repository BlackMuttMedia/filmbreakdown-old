json.array!(@imdb_titles) do |imdb_title|
  json.extract! imdb_title, :id, :titleKey, :name, :year
  json.url imdb_title_url(imdb_title, format: :json)
end

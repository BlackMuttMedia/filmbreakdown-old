json.array!(@films) do |film|
  json.extract! film, :id, :tmdb_id
  json.url film_url(film, format: :json)
end

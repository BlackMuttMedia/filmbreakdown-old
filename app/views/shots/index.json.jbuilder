json.array!(@shots) do |shot|
  json.extract! shot, :id, :imdb_title_id, :submitted_by, :start_time, :end_time
  json.url shot_url(shot, format: :json)
end

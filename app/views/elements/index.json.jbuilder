json.array!(@elements) do |element|
  json.extract! element, :id, :title, :description, :element_type_id
  json.url element_url(element, format: :json)
end

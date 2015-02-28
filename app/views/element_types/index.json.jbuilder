json.array!(@element_types) do |element_type|
  json.extract! element_type, :id, :title, :description
  json.url element_type_url(element_type, format: :json)
end

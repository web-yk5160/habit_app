json.array! @redo do |r|
  json.id r.id
  json.name r.name
  json.note r.note
  json.start_date r.start_date
  json.done r.done
  json.goal r.goal
end

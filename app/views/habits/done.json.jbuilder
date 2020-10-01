json.array! @done do |d|
  json.id d.id
  json.name d.name
  json.note d.note
  json.start_date d.start_date
  json.done d.done
  json.goal d.goal
end

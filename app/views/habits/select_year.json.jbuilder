json.array! @select_year do |year|
  json.id year.id
  json.name year.name
  json.note year.note
  json.start_date year.start_date
  json.status year.status
  json.goal year.goal
  json.done year.done
end

EMAIL = 'test@example.com'
PASSWORD = 'password'

# テストユーザーが存在しないときだけ作成
User.find_or_create_by!(email: EMAIL) do |user|
  user.password = PASSWORD
  puts 'ユーザーの初期データインポートに成功しました。'
end

Category.create([
  { name: '健康'},
  { name: '運動'},
  { name: '心の健康'},
  { name: '生産性'},
  { name: 'お金'},
  { name: '自己投資'},
  { name: '趣味'},
  { name: '家事'},
  { name: '人間関係'},
  { name: 'ビジネス'}
])

require "csv"

CSV.foreach('db/csv_data/seed_habits.csv', headers: true) do |row|
  Template.create(
    name: row['name'],
    category_id: row['category_id'],
  )
end

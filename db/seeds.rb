# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "seeding data..."

50.times do 
    User.create(username: Faker::Internet.unique.username, email: Faker::Internet.unique.email, password: Faker::Internet.password, name: Faker::Name.name, birthdate: Faker::Date.birthday(min_age: 16, max_age: 95)) 
end

50.times do 
    Product.create(name: Faker::Commerce.unique.product_name, price: Faker::Commerce.price, purchase_link: Faker::Internet.url) 
end

100.times do 
    Userproduct.create(user_id: rand(1..51), product_id: rand(1..50)) 
end


puts "done seeding"


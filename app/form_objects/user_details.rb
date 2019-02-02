class UserDetails
  include ActiveModel::Model

  attr_accessor :first_name, :last_name, :email, :fats, :carbs, :proteins, :calories

  def save
    user = User.find_or_create_by(email: email) do |user|
      user.first_name = first_name
      user.last_name = last_name
    end

    user.daily_targets.create(
      fats: fats,
      carbs: carbs,
      proteins: proteins,
      calories: calories
    )
  end
end

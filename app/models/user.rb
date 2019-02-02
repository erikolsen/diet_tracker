class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :rememberable, :validatable, :trackable
  def daily
    OpenStruct.new({
      protein: 30,
      fats: 30,
      carbs: 40,
      calories: 2000
    })
  end

  def daily_target
    OpenStruct.new({
      protein: 10,
      fats: 10,
      carbs: 10,
      calories: 2000
    })
  end
end

class User < ApplicationRecord
  has_many :daily_targets
  has_many :days

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :rememberable, :validatable, :trackable

  def daily
    @daily ||= days.find_by(start_time: Date.today.beginning_of_day)
  end

  def todays_meals
    @todays_meals ||= days.find_by(start_time: Date.today.beginning_of_day)&.meals
  end

  def current_daily_target
    daily_targets.order(:created_at).last
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end

class Day < ApplicationRecord
  serialize :meals, Array
  belongs_to :user

  EMPTY_MEAL = {
    protein: { grams: 0, notes: ''},
    carbs: { grams: 0, notes: ''},
    fats: { grams: 0, notes: ''},
    total: 0
  }

  def fresh_meals(size=4)
    Array.new(size, EMPTY_MEAL)
  end

  def total_calories
    2000
  end

  def total_proteins
    160
  end

  def total_fats
    100
  end

  def total_carbs
    100
  end
end

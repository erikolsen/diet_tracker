class CreateDailyTargets < ActiveRecord::Migration[5.2]
  def change
    create_table :daily_targets do |t|
      t.integer :fats
      t.integer :carbs
      t.integer :proteins
      t.integer :calories
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

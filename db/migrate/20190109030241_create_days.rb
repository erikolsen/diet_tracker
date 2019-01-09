class CreateDays < ActiveRecord::Migration[5.2]
  def change
    create_table :days do |t|
      t.datetime :start_time
      t.text :meals
      t.bigint :user_id

      t.timestamps
    end
  end
end

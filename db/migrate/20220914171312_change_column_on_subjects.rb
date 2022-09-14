class ChangeColumnOnSubjects < ActiveRecord::Migration[6.1]
  def change
    change_column :subjects, :room_number, :string
    remove_column :subjects, :integer
  end
end

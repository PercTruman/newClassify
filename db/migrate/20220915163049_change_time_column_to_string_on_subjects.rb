class ChangeTimeColumnToStringOnSubjects < ActiveRecord::Migration[6.1]
  def change
    change_column :subjects, :time, :string
  end
end

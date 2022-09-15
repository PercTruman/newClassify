class ChangeTimeColumnOnSubjects < ActiveRecord::Migration[6.1]
  def change
    change_column :subjects, :time, :text
  end
end

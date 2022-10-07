class AddUserIdColumnToAllOtherModels < ActiveRecord::Migration[6.1]
  def change
    add_column :teachers, :user_id, :integer
    add_column :subjects, :user_id, :integer
    add_column :student_subjects, :user_id, :integer
    add_column :students, :user_id, :integer
  end
end

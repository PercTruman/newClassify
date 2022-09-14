class RemoveSubjectIdFromSubjects < ActiveRecord::Migration[6.1]
  def change
    remove_column :subjects, :subject_id
  end
end

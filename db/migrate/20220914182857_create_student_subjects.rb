class CreateStudentSubjects < ActiveRecord::Migration[6.1]
  def change
    create_table :student_subjects do |t|
      t.integer :subject_id
      t.integer :student_id

      t.timestamps
    end
  end
end

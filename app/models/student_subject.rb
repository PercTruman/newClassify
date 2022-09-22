class StudentSubject < ApplicationRecord
    belongs_to :subject
    belongs_to :student
    validates :student_id, presence: true
   
end

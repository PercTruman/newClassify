class StudentSubject < ApplicationRecord
    belongs_to :subject
    belongs_to :student
    validates :student_id, presence: true

    # validate :cannot_match_student_id_with_subject_id

    # def cannot_match_student_id_with_subject_id
    #     unless :student_subject
    #         errors.add(:student_subject, "Student has already been assigned to this class.")
    #     end
    # end
   
end

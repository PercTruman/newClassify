class StudentSubject < ApplicationRecord
    belongs_to :subject
    belongs_to :student
    belongs_to :user
    validates :student_id, presence: true
    validates :user_id, presence: true

end

class StudentSubject < ApplicationRecord
    belongs_to :subject
    belongs_to :student
    validates :student_id, presence: true, uniqueness: true
    accepts_nested_attributes_for :student
end

class Student < ApplicationRecord
    has_many :subjects, through: :student_subjects
    validates :name, presence: true, uniqueness: true
end

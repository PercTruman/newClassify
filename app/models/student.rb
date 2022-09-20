class Student < ApplicationRecord
    has_many :student_subjects
    has_many :subjects, through: :student_subjects

    accepts_nested_attributes_for :student_subjects
    validates :name, presence: true, uniqueness: true

    
end

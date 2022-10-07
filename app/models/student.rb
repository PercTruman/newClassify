class Student < ApplicationRecord
    has_many :student_subjects
    has_many :subjects, through: :student_subjects
    belongs_to :user

   
    validates :name, presence: true, uniqueness: true

    
end

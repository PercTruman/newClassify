class Subject < ApplicationRecord
    belongs_to :teachers
    has_many :students, through: :student_subjects

    validates  :name, presence: true :room_number, presence: true :time, presence: true 
end

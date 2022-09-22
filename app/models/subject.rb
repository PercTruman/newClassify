class Subject < ApplicationRecord
    belongs_to :teacher
    has_many :student_subjects
    has_many :students, through: :student_subjects

    validates  :name, :room_number, :time, :teacher_id, presence: true
end

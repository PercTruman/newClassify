class Subject < ApplicationRecord
    belongs_to :teacher
    has_many :students, through: :student_subjects

    # validates  :name, presence: true :room_number, presence: true :time, presence: true 
    validates  :name, :room_number, :time, presence: true 
end

class Subject < ApplicationRecord
    belongs_to :teacher
    belongs_to :user
    has_many :student_subjects
    has_many :students, through: :student_subjects
    validates  :name, uniqueness: true
    validates  :name, :room_number, :time, :teacher_id, presence: true
    validates :user_id, presence: true

end

class SubjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :room_number, :time, :teacher_id
  belongs_to :teacher
  has_many :students, through: :student_subjects
end

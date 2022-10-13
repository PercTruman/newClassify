class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :students
  has_many :teachers
  has_many :student_subjects
  has_many :students
  has_many :subjects
end

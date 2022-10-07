class User < ApplicationRecord
    has_secure_password
    has_many :teachers
    has_many :subjects
    has_many :student_subjects
    has_many :students
end

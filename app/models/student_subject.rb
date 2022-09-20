class StudentSubject < ApplicationRecord
    belongs_to :subject
    belongs_to :student

    accepts_nested_attributes_for :student
end

class Teacher < ApplicationRecord
    has_many :subjects
    belongs_to :user

    validates :name, presence: true, uniqueness: true
    validates :user_id, presence: true

end

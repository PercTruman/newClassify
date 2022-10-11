class Teacher < ApplicationRecord
    has_many :subjects
    belongs_to :user

    validates :name, presence: true
    validates :user_id, presence: true

end

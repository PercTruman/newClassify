class TeachersController < ApplicationController

    def index
    
        teachers = current_user.teachers
        render json: teachers, status: :ok
    end

    def create
        teachers = Teacher.new(teacher_params)
    
        if teachers.save
          render json: current_user.teachers, status: :created
        else
          render json: teachers.errors, status: :unprocessable_entity
        end
    end

    private

    def teacher_params
        params.permit(:name, :user_id)
    end
end

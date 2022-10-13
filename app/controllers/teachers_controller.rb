class TeachersController < ApplicationController

    def index
    
        teachers = current_user.teachers
        render json: teachers, status: :ok
    end

    def create
        teacher = current_user.teachers.new(teacher_params)
    
        if teacher.save
          render json: teacher, status: :created
        else
          render json: teacher.errors, status: :unprocessable_entity
        end
    end

    private

    def teacher_params
        params.permit(:name, :user_id)
    end
end

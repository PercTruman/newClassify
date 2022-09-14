class TeachersController < ApplicationController

    def index
        teachers = Teacher.all
        render json: teachers, status: :ok
    end

    def create
        teacher = Teacher.new(teacher_params)
    
        if teacher.save
          render json: teacher, status: :created
        else
          render json: teacher.errors, status: :unprocessable_entity
        end
    end

    private

    def teacher_params
        params.permit(:name)
    end
end

class StudentsController < ApplicationController
    def index
        students = Student.all.sort_by(&:name)

        render json: students, status: :ok
    end

    def create
        def create
            student = Student.new(student_params)
        
            if student.save
              render json: student, status: :ok
            else
              render json: student.errors, status: :unprocessable_entity
            end
        end
    end

    private

    def student_params
        params.permit(:name)
    end
end
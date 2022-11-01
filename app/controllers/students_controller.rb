class StudentsController < ApplicationController
    def index
        students = current_user.students
        render json: students, status: :ok
    end


    def create
        students = Student.new(student_params)
           if students.save
               render json: current_user.students, status: :created
            else
              render json: students.errors, status: :unprocessable_entity
            end
        end
    

    private

    def student_params
        params.permit(:name, :user_id)
    end
end

class StudentSubjectsController < ApplicationController
    def create
        student_subject = student_subject.create(student_subject_params)
        if student_subject.valid?
            render json: student_subject, status: :created
        else render json: {error: student_subject.errors.full_messages},status::unprocessable_entity
        end
    end

    private
     def student_subject_params
        params.permit(:student_id, :subject_id)
     end

end

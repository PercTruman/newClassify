class StudentSubjectsController < ApplicationController
    def create
        params[:valuePairs].each do 
            student_id = [0]
            subject_id = [0][1]
            studentClass = [student_id, subject_id]
         
        end
         student_subject = StudentSubject.create(student_subject_params)
            if student_subject.valid?
                render json: student_subject, status: :created
            else 
                render json: {error: student_subject.errors.full_messages},status: :unprocessable_entity
            end
    
    end

    private
     def student_subject_params
        params.permit([:valuePairs])
     end

end


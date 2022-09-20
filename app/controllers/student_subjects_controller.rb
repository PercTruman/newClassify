

class StudentSubjectsController < ApplicationController
    def create
        subject = Subject.find_by(id: params[:id])
        params[:indexArray].each do |index|
            
            student_subject = StudentSubject.create([{ :student_id => index ,  :subject_id => subject[:id] }])
                byebug
                if student_subject
                    render json: student_subject, status: :created
                else 
                    render json: {error: student_subject.errors.full_messages},status: :unprocessable_entity
                end
             end
    end

    private
     def student_subject_params
        params.permit(:subject_id, :student_id)
     end

end




class StudentSubjectsController < ApplicationController

rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    def index
        student_subjects = StudentSubject.all
        render json: student_subjects
    end

    def create
       
        student_subject_array = []
        subject = Subject.find_by(id: params[:id])
        params[:indexArray].each do |index|
                student_subject = StudentSubject.create!([{ :student_id => index, :subject_id => subject[:id] }])
                student_subject_array << student_subject
                end
             
             render json: student_subject_array, status: :created
    end

    private
     def student_subject_params
        params.permit(:subject_id, :student_id)
     end

     def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
     end

end


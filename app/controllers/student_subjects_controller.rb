

class StudentSubjectsController < ApplicationController

   rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


    def index
        student_subjects = current_user.student_subjects
        render json: student_subjects
    end

    def create
  
         student_subject_array = []
         params[:indexArray].each do |index|
            student_subjects = current_user.student_subjects.find_or_create_by!(student_id: index, subject_id: params[:id], user_id: params[:user_id])
       
            student_subject_array << student_subjects
         end
         render json: student_subject_array, status: :created
    end

    private

     def student_subject_params
        params.permit(:subject_id, :student_id, :user_id)
     end

     def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
     end

    

end


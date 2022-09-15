class SubjectsController < ApplicationController

    def index
        subjects = Subject.all
        render json: subjects,  status: :ok
    end

    def show
        subject = Subject.find_by(id: params[:id])
        if subject
             render json: subject, include: :students
        else
            render json: subject.errors, status: :not_found
        end
    end

     def create
         subject = Subject.new(subject_params)
            
        if subject.save
             render json: subject, status: :ok
        else
            render json: subject.errors, status: :unprocessable_entity
        end
    end

    private
    def subject_params
        params.permit(:name, :room_number, :time, :teacher_id)
    end
 end
        
    


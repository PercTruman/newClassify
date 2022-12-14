class SubjectsController < ApplicationController

    def index
        subject = current_user.subjects
        render json: subject, status: :ok
    end

    def show
        subject = current_user.subjects.find_by(id: params[:id])
        if subject
             render json: subject
        else
            render json: {error: "Subject Not Found"}, status: :not_found
        end
    end

     def create
       
         subjects = Subject.new(subject_params)
            
        if subjects.save
             render json: current_user.subjects, status: :ok
        else
            render json: {error: "This form is either complete, or this class name has been taken."}, status: :unprocessable_entity
        end
    end

    def update
        subject = current_user.subjects.find_by(id: params[:id])
         if subject 
            subject.update(subject_params)
            render json: subject, status: :ok
        else
            render json: {error: "Not found"}, status: :not_found
        end
        
    end

    def destroy
        subject = Subject.find_by(id: params[:id])
        if subject
            subject.destroy
            head :no_content, status: :ok
            
        else
            render json: {error: "Class Not Found"}, status: :not_found
        end

    end

    private
    def subject_params
        params.permit(:name, :room_number, :time,  :teacher, :teacher_id, :user_id, :id)
    end
 end
        
    


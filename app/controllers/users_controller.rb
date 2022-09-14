class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id #adds teacher instance to session
            render json: user, status: :ok
        else 
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end

    def me #checking if logged in
        if current_user
          render json: current_user, status: :ok
        else
          render json: {error:"Not authenticated"}, status: :unauthorized
        end
      end

    private
    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end
end

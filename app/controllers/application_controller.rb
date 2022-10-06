class ApplicationController < ActionController::API
  include ActionController::Cookies

  private
  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) #find_by will return nil if not found, so you can generate exceptions. checks if we have a current_user stored; if not, make one
  end

  def authenticate_user
    render json: {errors: "Not Authorized"}, status: :unauthorized unless current_user #will throw an error unless a current_user exists
  end

end

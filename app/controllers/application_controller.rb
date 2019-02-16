class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
  end

  def after_sign_in_path_for(resource)
    if resource.current_daily_target
      new_user_day_path(resource, date: Date.today)
    else
      new_user_daily_target_path(resource)
    end
  end
end

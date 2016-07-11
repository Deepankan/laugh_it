class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  before_filter :get_category


  def get_category
  	@category = Type.all.map{|h| {id: h.id, name: h.name}}
  end
end

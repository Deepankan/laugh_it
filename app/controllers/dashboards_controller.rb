class DashboardsController < ApplicationController

	def popular
		@get_name = Type.find_by_name("Popular Jokes").name
		@get_info = Type.find_by_name("Popular Jokes").texts.paginate(:page => params[:page], :per_page => 10)

	end

	def get_list
          @get_name = Type.find_by_id(params[:id]).name 
          @get_info = Type.find_by_id(params[:id]).texts.paginate(:page => params[:page], :per_page => 10)

		
	end

	def submit_joke
        
        Type.find_by_id(params[:category]).texts.find_or_create_by(content: params[:content])
		redirect_to root_path
	end


end

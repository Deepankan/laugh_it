class DashboardsController < ApplicationController

	def popular
		get_type = Type.first
		  
		 if get_type
			@get_name = get_type.name 	
			@get_info = get_type.texts.paginate(:page => params[:page], :per_page => 10)
		 else
		 	@get_name = "No data present"
		    @get_info = []
		 end

	end

	def get_list

		 get_type = Type.find_by_id(params[:id])
          
        if get_type
			@get_name = get_type.name 	
			@get_info = get_type.texts.paginate(:page => params[:page], :per_page => 10)
		 else
		 	@get_name = "No data present"
		    @get_info = []
		 end
		
	end

	def submit_joke
        
        Type.find_by_id(params[:category]).texts.find_or_create_by(content: params[:content])
		redirect_to root_path
	end


end

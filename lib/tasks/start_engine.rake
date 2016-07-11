task :start_engine => :environment do
require 'open-uri'

 p '------------------------Started---------------------------------------------------'
   begin
   	
   
	get_category = Nokogiri::HTML(open(API_URL))

	#category_name = get_category.css('div.jokes-nav a').map(&:text).delete_if{|x| x !~ /\w/}
    #category_link = get_category.css('div.jokes-nav a').map{|h| h['href']}
    
    get_page_info = get_category.css('div.jokes-nav a').map{|h| {h.text => h['href']}}

    get_page_info.each do |k|
    p "-------------------------#{k} Category-----------------------------------------"
    	 type = Type.find_or_create_by(name: k.keys[0])
    	  get_detail = Nokogiri::HTML(open(k.values[0]))
    	  joke = get_detail.css('div.joke-text').map{|h| h.text.strip}
          joke.each do |h|
          	 p "-------------------------#{h} Content-----------------------------------------"
          	type.texts.find_or_create_by(content: h)
            p h
            p "--------------------------_End----------------------------------------------------ssssssss"
          end
    p '------------------------------End Category-----------------------------------------------'      
    end
    
   
   p '------------------------End---------------------------------------------------'
	rescue Exception => e
	    p '-------------____Sonething went wrong---------------------------'
	    p e	
	end
end

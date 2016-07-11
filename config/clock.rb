require 'clockwork'
require './config/boot'
require './config/environment'
module Clockwork
handler do |job|

  case job
    when 'get_url.job'
  p "--------------------Started------------------------------------------------------"
  
  p "---------------------Hi------------------------------"

   
   p '------------------------End---------------------------------------------------'
 







    else
      puts "Couldn't find your job!"
    end

end

#every(30.seconds, 'get_url.job')

every(1.days, 'Send Messages') {
   p "---------------------Hi------------------------------"
    
  require 'nokogiri'
  require 'open-uri'


p '------------------------Started---------------------------------------------------'
   begin
    
   
  get_category = Nokogiri::HTML(open("http://www.laughfactory.com/jokes/"))

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

         category_link = get_detail.css('li.next a')
         while  category_link.present? and get_next = category_link[0]['href']
           get_detail = Nokogiri::HTML(open(get_next))
           joke = get_detail.css('div.joke-text').map{|h| h.text.strip}
            joke.each do |h|
               p "-------------------------#{h} Content-----------------------------------------"
              type.texts.find_or_create_by(content: h)
              p h
              p "--------------------------_End----------------------------------------------------ssssssss"
            end
            category_link = get_detail.css('li.next a')
         end




    p '------------------------------End Category-----------------------------------------------'      
    end
    
   
   p '------------------------End---------------------------------------------------'
  rescue Exception => e
      p '-------------____Sonething went wrong---------------------------'
      p e 
  end









   p "---------------------Bye------------------------------"
}

  # handler receives the time when job is prepared to run in the 2nd argument
  # handler do |job, time|
  #   puts "Running #{job}, at #{time}"
  # end

 # every(10.seconds, 'frequent.job')
 # every(3.minutes, 'less.frequent.job')
  #every(1.hour, 'hourly.job')

  #every(1.day, 'midnight.job', :at => '00:00')



end
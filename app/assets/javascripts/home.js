$(document).ready(function(e) {
	
});
function show_channels(channel_type){
	var he = $("#suggested_channels_container").height();
	//$("#my_channels_container").css('height',he+'px');
	if(channel_type==0){
		$("#my_channel_tab").removeClass('active');
		$("#channel_tab").addClass('active');
		$("#my_channels_container").hide();
		$("#suggested_channels_container").fadeIn();
	}
	if(channel_type==1){
		$("#channel_tab").removeClass('active');
		$("#my_channel_tab").addClass('active');
		$("#suggested_channels_container").hide();
		$("#my_channels_container").fadeIn();
		$.ajax({
				data : '',
				url  : HTTP_SITE+'home/get_my_channels',
				type : "POST",
				success : function(response){
					if(response!=''){
					var res = $.parseJSON(response);
					var html = '';
					$.each(res.my_channels,function (index, channel) {
						if(channel){
							
						html += '<div class="featured"><h2><a href="'+HTTP_SITE+'channels/'+channel.channel_seoname+'">'+channel.channel_name+'</a> &nbsp;<img src="'+HTTP_IMAGES+'un-favorite.png" onmouseover="hover_images(\'un-favorite.png\',\'un-favorite-hover.png\',\'1\',\'my_channel_fav_'+channel.channel_id+'\')" onmouseout="hover_images(\'un-favorite.png\',\'un-favorite-hover.png\',\'0\',\'my_channel_fav_'+channel.channel_id+'\')" alt="Remove From Favorite" title="Remove From Favorite" style="cursor:pointer" class="fav_heart_btn" onclick="add_to_favorite_channel('+channel.channel_id+')" id="my_channel_fav_'+channel.channel_id+'" /></h2><div class="customized">';
						if(res.login_user==channel.user_id && channel.user_id!=0){
							html += '<a href="'+HTTP_SITE+'build-my-channel/edit/'+channel.channel_id+'">Customize Channel</a>';
						}
						html += '</div><div class="customized-number" id="my_channel_showing_'+channel.channel_id+'">';
              if(channel.channel_list && channel.channel_list.length>0){
                  if(channel.channel_list.length>=5){
                      html += '1 - 5 of '+channel.channel_list.length;
                  }else{
                      html += '1 - '+channel.channel_list.length+' of '+channel.channel_list.length;
                  }
              }else{
                html += '0 - 0 of 0';
              }
 
              html +='</div>';
			  if(channel.channel_list && channel.channel_list.length>0){
				  html += '<div class="videos-line"><div class="video-left prev" id="my_prev'+channel.channel_id+'"></div><div class="video-thumbs" id="my_channel_'+channel.channel_id+'" channel_id="'+channel.channel_id+'">';
				  $.each(channel.channel_list,function (index, play_list) {
                          html += '<div class="video-thumb"><div class="caption-v7"><div class="small-play"><a href="'+HTTP_SITE+'channels/'+channel.channel_seoname+'/'+play_list.video_id+'"><img src="'+HTTP_IMAGES+'play-small.png" alt="" title=""/></a></div><a href="'+HTTP_SITE+'channels/'+channel.channel_seoname+'/'+play_list.video_id+'">'+play_list.video_longtitle+'</a></div><a href="'+HTTP_SITE+'channels/'+channel.channel_seoname+'/'+play_list.video_id+'"><img src="'+play_list.video_thumb+'" alt="" title="" width="180" height="101" /></a></div>';
				  });
				  html += '</div><div class="video-right next" id="my_next'+channel.channel_id+'"></div></div>';
			  }else{
				  html += '<div class="video-message-bg"><div class="video-message-center"><strong>There are no videos in '+channel.channel_name+'.</strong> <br />Share More videos with your friends on facebook and see what they like.</div></div>';
			  }
             /*<a href="#">More Shows »</a>*/
              html += '<div class="more-jokes"></div></div>';	
				  	
						}});
					apply_slider_on_playlist(html);
					
					}
				}
		});
	}
}
function apply_slider_on_playlist(html){
	$("#my_channels_container").html(html);
	 	$('#my_channels_container > .featured > .videos-line > .video-thumbs').each(function(index, element) {
        var id = $(this).attr('channel_id');
		//alert(id);
		$("#my_channel_"+id).carouFredSel({
                circular: false,
                infinite: false,
                auto 	: false,
				items   : {
					visible	: 5
				},
                prev	: {	
                    button	: "#my_prev"+id
                },
                next	: { 
                    button	: "#my_next"+id
                },
				scroll		: {
					onAfter : function( data ) { 
						$(this).trigger("currentPosition", function( pos ) {
							var start_from = (pos+1);
							var total = $("> *", this).length;
							var end_at = start_from+5;
							var txt = '';
							if(end_at>total){
								txt = start_from+' - '+total+' of '+total;
							}else{
								txt = start_from+' - '+(end_at-1)+' of '+total;
							}							
							$("#my_channel_showing_"+id).html(txt);
						});
						/*setTimeout(function() { 
							$("#foo2").animate({ opacity: 0.5 }, 500);
							$("#foo2_play").show();
							data.items.visible.find("div").slideUp();
						}, 5000);
			
						data.items.old.find("div").hide();
						data.items.visible.find("div").slideDown();*/
					}
				}
        });
    });
	
 	$(".fav_heart_btn").tipTip({edgeOffset: 10});
	
}
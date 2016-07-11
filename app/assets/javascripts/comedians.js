$(document).ready(function(e) {
   
});
var is_ajax = '';
//this function will call when we scroll down 
$(window).scroll(function(){
	
	if($(window).scrollTop() == $(document).height() - $(window).height()){
		
		var is_search = $("#is_search").val();
		var is_featured = $("#is_featured").val();
		if(is_search=='0' && is_featured=='0'){
			if(is_ajax) return false;
			load_more_comedians();
		}
	}
}); 
function load_more_comedians(){
	$("#is_featured").val('0');
	var total_comedians = parseInt($("#total_comedian").val());
	var showing_comedians = parseInt($("#comedians_cont > div.comedian-box:last").attr('count'));
	if(total_comedians > showing_comedians){
		var current_character = $("#current_character").val();
		$(".loading-img").css('visibility','visible');
		is_ajax = $.ajax({
				data : 'character='+current_character+'&last_record='+showing_comedians,
				url  : HTTP_SITE+'comedian/load_more_comedians',
				type : "POST",
				success : function(response){
					$(".loading-img").css('visibility','hidden');
					var res = $.parseJSON(response);
					
					var html = comedian_html(res,showing_comedians);
					
					$("#comedians_cont").append(html);
					//$('.comedian-box').matchHeight();
					//$('.comedian-box').matchHeight();
					is_ajax = '';
					
				}
		});
	}
	
	
}
function load_by_character(character){
	
	if(character=='featured'){
		$("#is_featured").val('1');
	}else{
		$("#is_featured").val('0');
	}
	$("#current_character").val(character);
	$("#is_search").val('0');
	$("#comedians_cont").html('');
	//$(".loading-img").fadeIn();
	$("#filter_container > li > a").removeClass('active');
	$("#current_character_showing").html('Letter: '+character);
	$("#char_"+character).addClass('active');
	$.ajax({
		  data : 'character='+character,
		  url  : HTTP_SITE+'comedian/load_comedians_by_character',
		  type : "POST",
		  success : function(response){
			  $(".loading-img").css('visibility','hidden');
			  var res = $.parseJSON(response);
			  if(res.total_comedians!=0){
			  
			//  var html = '';
			  showing_comedians = 0;
			  var total_comedians = res.total_comedians;
			  $("#total_comedian").val(total_comedians);
			   var html = comedian_html(res,showing_comedians);
			  
			  $("#comedians_cont").append(html);
			  //$('.comedian-box').matchHeight();
			  //$('.comedian-box').matchHeight();
			  }else{
				  var html = no_results();
				  $("#comedians_cont").append(html);	
			  }
		  }
		});
	
}
function search_comedian(){
	var cname = $("#search_comedian").val();
	$("#is_featured").val('0');
	$("#current_character_showing").html('Letter: '+cname);
	if(cname.length>2){
		$("#comedians_cont").html('');
		$("#filter_container > li > a").removeClass('active');
		$("#is_search").val('1');
		$("#comedians_cont > div.left-comedians-box").remove();
		$(".loading-img").css('visibility','visible');
		
		$.ajax({
			  data : 'kw='+cname,
			  url  : HTTP_SITE+'comedian/search_comedian_by_name',
			  type : "POST",
			  success : function(response){
				  $(".loading-img").css('visibility','hidden');
				  var res = $.parseJSON(response);
				  if(res.comedians.length>0){
				  $("#comedians_cont").html('');
				  var html = comedian_html(res,0);
				  $("#comedians_cont").append(html);
				  }else{
					  $("#comedians_cont").html('');
					  var html = no_results();
					  $("#comedians_cont").append(html);	
				  }
			  }
			});
	}else{
		if(cname==''){
			load_by_character('all');
		}
		//return false;
	}
}
function no_results(){
	var html = '<div style="width:100%; background:none; padding:15px; text-align:center;"><img src="'+HTTP_IMAGES+'not-found-search.png" align="center" style="width:auto; height:auto; border:0; padding:0;"></div>';
	return html;
}
function comedian_html(res,showing_comedians){
	var html = '';
	$.each(res.comedians,function (index, comedian) {
			showing_comedians++;
					  if(comedian.comedian_id){
						  var comedian_image = 'no-image-available.jpg';
						  if(comedian.comedian_thumbimageurl)
							  comedian_image = 'comedians/'+comedian.comedian_thumbimageurl;
						  var display_name = comedian.comedian_fullname;
						  						  
						  var profile_link = 'javascript:void(0)';
						  if(comedian.comedian_bioavailable==1){
							  //var full_name = comedian.comedian_fullname.replace(' ','-');
							  profile_link = HTTP_SITE+''+comedian.comedian_seoname;
						  }
						 
						  html +='<div class="comedian-box" style="height:420px;" count="'+showing_comedians+'" ><h4>'+comedian.comedian_fullname+'</h4><figure><img src="'+HTTP_IMAGES+''+comedian_image+'"  alt="comedian image" /></figure>';
						  if(comedian.comedian_bioavailable==1){
						  		html += '<a class="profile-btn" href="'+profile_link+'">View Profile</a>';
					  	  }else{
							  	html += '<a class="profile-btn" href="javascript:void(0)">View Profile</a>';
							  }
						 
						   
						    var disp_vid = 1;
						    if(comedian.has_videos==1){
							  html += '<div class="thumbnail-links">';
							  
							  $.each(comedian.comedian_videos,function(index,vid){
								  html+='<div class="thumbnail"><img src="'+vid.video_thumb+'"  alt="video image" /></div>';
								  if(disp_vid==2){ return false;}
								  disp_vid++;
							  });
							  
							  
							  if(comedian.comedian_videos.length>2)	
							    html +='<a href="'+profile_link+'" class="more">Watch More Videos</a>';						  
							  	html += '</div>';
						  }
						  if(comedian.comedian_biotext!=''){
							  var biotext=comedian.comedian_biotext;
							  html +='<div class="box-content"><p>'+biotext+'</p></div>';
						  } 
						 
						  html +='</div>';
					  }
				  });
	return html;
}

///////////////////////comedian profile/////////////////////////////////

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function like_comedian(like,comedian_id){
	$("#like_comedian_btn").addClass('like-gray').removeClass('like');
	$("#dislike_comedian_btn").addClass('dislike-gray').removeClass('dislike');
	$.ajax({
		  data : 'like='+like+'&comedian_id='+comedian_id,
		  url  : HTTP_SITE+'comedian/comedian_liked_by_user',
		  type : "POST",
		  success : function(response){
			  if(like==1){
				  $("#like_comedian_btn").addClass('like').removeClass('like-gray');
				  $("#like_comedian_btn").attr('onclick','');
				  $("#dislike_comedian_btn").attr('onclick',"like_comedian('-1','"+comedian_id+"')");
			  }
			  else{
				  $("#dislike_comedian_btn").addClass('dislike').removeClass('dislike-gray');
				  $("#dislike_comedian_btn").attr('onclick','');
				  $("#like_comedian_btn").attr('onclick',"like_comedian('1','"+comedian_id+"')");
			  }
		  }
		});
}
function add_remove_favorite(comedian_id){
	$.ajax({
		  data : 'comedian_id='+comedian_id,
		  url  : HTTP_SITE+'comedian/comedian_add_remove_favorite',
		  type : "POST",
		  success : function(response){
			  if(response=='1')
			  	$("#comedian_favorite").html('Remove from favorites');
			  else if(response=='0')
			  	$("#comedian_favorite").html('Add to favorites');
		  }
		});
}

function post_comedian_twitter(comedian_username){
	var is_tw_id = $("#is_tw_id").val();
	
	if(is_tw_id==''){
		alert("Your twitter account is not connected with your account.");
		return false;
	}
	$("#tw_post_btn").hide();
	$("#twitter_loading").fadeIn();
	var text = $("#post_to_twitter").val();
	
	$.ajax({
		data : 'text='+text,
		url  : HTTP_SITE+'comedian/post_comedian_on_tw',
		type : "POST",
		success : function(response){
			
			var res = eval('('+response+')');
			$("#twitter_loading").hide();
			$("#tw_post_btn").show();
			$("#post_to_twitter").val('@'+comedian_username+' ');
			if(res.posted=='1'){
				$("#tw_post_message").css('color','#009900');
				$("#tw_post_message").html('Tweet posted successfully.');
				$("#tw_post_message").show();
			}else if(res.no_tw=='1'){
				$("#tw_post_message").css('color','#ff0000');
				$("#tw_post_message").html('Your twitter account is not connected.');
				$("#tw_post_message").show();
				
			}else{
				$("#tw_post_message").css('color','#ff0000');
				$("#tw_post_message").html(res.message);
				$("#tw_post_message").show();
				
			}
			
			
		}
		});
		return false;
}
function not_login(){
	alert('Please login to share on your twitter');
	return false;
}
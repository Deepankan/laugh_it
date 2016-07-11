function valid_search(){
	var kw = $("#kw").val();
	if(kw==''){
		alert("Please provide search keyword");
		$("#kw").focus();
		return false;
	}
	return true;
}
///////////////////////Load more magazines///////////////////
var magazines_current_page = 2;
function loadmoremagazines(){
	var total_magazines = $("#total_magazines").val();
	var magazines_perpage = $("#magazines_per_page").val();
	var offset = (magazines_current_page-1)*magazines_perpage;
	var kw = $("#kw").val();
	$("#loaderBtn").hide();
	$("#magazine_moreloader").fadeIn();
	$.ajax({
			data : 'offset='+offset+'&magazines_perpage='+magazines_perpage+'&kw='+kw,
			url  : HTTP_SITE+'magazine/loadmoremagazines',
			type : "GET",
			success : function(response){
				$("#magazine_moreloader").hide();
				data = JSON.parse(response);
				
				magazines_current_page++;
				var html = getMagazinesHtml(response);
				$("#magazines_container > .magazine-detail-content").last().after(html);
				if(data.magazinescount==5)
				$("#loaderBtn").show();//location.reload(true);	
			}
	});
}
function getMagazinesHtml(data){
	data = JSON.parse(data);
	magazines = data.magazines;
	var html = '';
	$.each(magazines,function(index,magazine){
		html += '<div class="magazine-detail-content"><figure><img src="'+magazine.magimage_guid+'" alt="" /></figure><div class="magazine-sec-description"><span>'+magazine.magarticle_publishdate+'</span><h4>'+magazine.magarticle_title+'</h4>';
		var byname='';
		if(magazine.contributors){
			$.each(magazine.contributors,function(index,magazine_contributor){
			byname+=magazine_contributor.magcontributor_displayname+",";
			});
		}
		var magarticle_htmltext=magazine.magarticle_htmltext ;
		magarticle_htmltext=magarticle_htmltext.substr(1,200);
		html += '<h6>by '+byname+'</h6><p>'+magarticle_htmltext+'</p><a href="#" class="readmore-btn">Read More</a></div></div>';
   
   
    });
	return html;
}
/////////////////end loadmore magazines///////////////////////
function submit_magazine(){
	var form_data = $("#submit_magazine_form").serialize();
	var magazine_text = $("#magazine_text").val();
	$("#magazine_error").hide();
	if(magazine_text==''){
		$("#magazine_text").focus();
		$("#magazine_error").show();
		return false;
	}
	$("#magazine_loading").show();
	$("#magazine_loading").html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25" style="margin-top:0px;"> ');
	$.ajax({
				data : form_data,
				url  : HTTP_SITE+'magazine/submit_new_magazine',
				type : "POST",
				success : function(response){
					var res = eval('('+response+')');
					if(res.saved=='1'){
						$("#magazine_text").val('');
						$("#submit_name").val('');
						$("#magazine_category").val('');
						$("#is_anonymous").attr('checked',false);
						$("#magazine_loading").html('Your magazine has been submitted successfully!  If approved by our amazing team of humor experts, it will be added to our site soon!');
					}else if(res.magazine_text=='1'){
						$("#magazine_error").show();
						$("#magazine_loading").hide();
					}
					
					//location.reload(true);	
				}
		});
		
		return false;
}


FB.init({appId: fb_app_id, status: true, cookie: true});

      function postToFeed(url,caption,magazine_id) {

        // calling the API ...
		var description = $("#magazine_"+magazine_id).html();
        var obj = {
          method: 'feed',
          redirect_uri: url,
          link: url,
          picture: HTTP_IMAGES+'logo.png',
          name: 'Laugh Factory',
          caption: caption,
          description: description
        };

        function callback(response) {
			
          //document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
        }

        FB.ui(obj, function() {
			
        });
      }


//fb post
function post_magazine_on_facebook(magazine_id){
	var is_fb_id = $("#is_fb_id").val();
	
	if(is_fb_id==''){
		alert("Your facebook account is not connected with your account.");
		return false;
	}
	$("#magazine_loader_"+magazine_id).show();
	$.ajax({
		data : 'magazine_id='+magazine_id,
		url  : HTTP_SITE+'magazine/post_magazine_on_fb',
		type : "POST",
		success : function(response){
			var res = eval('('+response+')');
			$("#magazine_loader_"+magazine_id).hide();
			if(res.posted=='1'){
				alert('Magazine posted successfully on your facebook');
			}else if(res.no_fb=='1'){
				alert("Your facebook account is not connected with your account.");
			}else{
				alert(res.message);
			}
			
			
		}
		});
		return false;
}
function post_magazine_on_twitter(magazine_id){
	var is_tw_id = $("#is_tw_id").val();
	
	if(is_tw_id==''){
		alert("Your twitter account is not connected with your account.");
		return false;
	}
	$("#magazine_loader_"+magazine_id).show();
	$.ajax({
		data : 'magazine_id='+magazine_id,
		url  : HTTP_SITE+'magazine/post_magazine_on_tw',
		type : "POST",
		success : function(response){
			$("#magazine_loader_"+magazine_id).hide();
			var res = eval('('+response+')');
			
			if(res.posted=='1'){
				alert('Magazine posted successfully on your twitter');
			}else if(res.no_tw=='1'){
				alert("Your twitter account is not connected with your account.");
			}else{
				alert(res.message);
			}
			
			
		}
		});
		return false;
}
function not_login(){
	alert('Please login to share on your facebook');
	return false;
}
function magazines_rating(val,magazine_id){
	//$("#thumbs_main_"+magazine_id).hide();
	$.ajax({
		data : 'magazine_id='+magazine_id+'&val='+val,
		url  : HTTP_SITE+'magazine/add_magazine_rating',
		type : "POST",
		success : function(response){
			
			var res = $.parseJSON(response);
			if(res.action=="added"){
				if(val=='1'){
					$("#thumbs_"+val+"_"+magazine_id).removeClass('thumup-magazine3').addClass('thumup-magazine3_active');
				}else{
					$("#thumbs_"+val+"_"+magazine_id).removeClass('thumdown-magazine3').addClass('thumdown-magazine3_active');
				}
			}else if(res.action=="removed"){
				if(val=='1'){
					$("#thumbs_"+val+"_"+magazine_id).removeClass('thumup-magazine3_active').addClass('thumup-magazine3');
				}else{
					$("#thumbs_"+val+"_"+magazine_id).removeClass('thumdown-magazine3_active').addClass('thumdown-magazine3');
				}
			}else if(res.action=="updated"){
				if(val=='1'){
					$("#thumbs_-1_"+magazine_id).removeClass('thumdown-magazine3_active').addClass('thumdown-magazine3');
					$("#thumbs_1_"+magazine_id).removeClass('thumup-magazine3').addClass('thumup-magazine3_active');
				}else{
					$("#thumbs_-1_"+magazine_id).removeClass('thumdown-magazine3').addClass('thumdown-magazine3_active');
					$("#thumbs_1_"+magazine_id).removeClass('thumup-magazine3_active').addClass('thumup-magazine3');
				}
				
			}
			$("#thumbs_up_number_"+magazine_id).html(res.up);
			$("#thumbs_down_number_"+magazine_id).html(res.down);
			//$("#thumbs_main_"+magazine_id).show();
		}
		});
}
$(document).ready(function(e) {
        /*$("#suggested_channel_list").carouFredSel({
                height  : 74,
				circular: false,
                infinite: false,
                auto 	: false,
				items   : {
					visible	: 8
				},
                prev	: {	
                    button	: ".prev"
                },
                next	: { 
                    button	: ".next"
                },
				scroll		: {
					onAfter : function( data ) { 
						$(this).trigger("currentPosition", function( pos ) {
							var start_from = (pos+1);
							var total = $("> *", this).length;
							var end_at = start_from+8;
							var txt = '';
							if(end_at>total){
								txt = start_from+' - '+total+' of '+total;
							}else{
								txt = start_from+' - '+(end_at-1)+' of '+total;
							}		
										
							$("#suggested_numbers").html(txt);
						});
						
					}
				}
        });
		$("#suggested_channel_list").css('visibility','visible');*/
});


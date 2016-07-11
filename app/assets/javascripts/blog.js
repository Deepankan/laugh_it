function get_post(entry_id){
	$("#blog_recent > li > a ").removeClass('active');
	$("#recent_"+entry_id).addClass('active');
	$("#blog_main_cont").html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="50" style="margin-left:205px; margin-top:15px;"/>');
	$.ajax({
			data : 'entry_id='+entry_id,
			url  : HTTP_SITE+'comedian/get_blog_entry_by_id',
			type : "POST",
			success : function(response){
				var res = $.parseJSON(response);
				if(res.entry){
				var html = '<div class="line"><h3>'+res.entry.comedianblogentry_headline+'</h3><div class="date-blog">Posted on '+res.entry.comedianblogentry_releasedate+'<span style="float:right;" >Author : '+res.entry.comedianblogentry_authorname+'</span></div><div class="line"><p>'+res.entry.comedianblogentry_entryhtml+'</p></div><div class="hr-line"></div></div>';
				$("#blog_main_cont").html(html);
				}else{
					var cid = $("#current_comedian_id").val();
					get_recent_posts(cid);
				}
			}
	});
	
}
function get_recent_posts(comedian_id){
	$("#blog_recent > li > a ").removeClass('active');
	$("#blog_recent > li:first > a").addClass('active');
	$("#blog_main_cont").html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="50" style="margin-left:205px; margin-top:15px;"/>');
	$.ajax({
			data : 'comedian_id='+comedian_id,
			url  : HTTP_SITE+'comedian/get_blog_entries_recent',
			type : "POST",
			success : function(response){
				var res = $.parseJSON(response);
				var res = $.parseJSON(response);
				var html = '';
				$.each(res.entries,function(index,entry){
				html += '<div class="line"><h3>'+entry.comedianblogentry_headline+'</h3><div class="date-blog">Posted on '+entry.comedianblogentry_releasedate+'<span style="float:right;" >Author : '+entry.comedianblogentry_authorname+'</span></div>';
				if(entry.image!=''){
					html += '<div class="blog-img"><img '+entry.image+' style="max-width:678px" /></div>';
				}
				html +='<div class="line"><p>'+entry.comedianblogentry_entryhtml+' ... <a href="javascript:void(0)" onclick="get_post(\''+entry.comedianblogentry_id+'\')">Read more</a></p></div><div class="hr-line"></div></div>';
				});
				$("#blog_main_cont").html(html);
			}
	});
}
function get_archive_posts(year,month,comedian_id){
	$("#blog_main_cont").html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="50" style="margin-left:205px; margin-top:15px;"/>');
	$.ajax({
			data : 'year='+year+'&month='+month+'&comedian_id='+comedian_id,
			url  : HTTP_SITE+'comedian/get_blog_entries_archive',
			type : "POST",
			success : function(response){
				var res = $.parseJSON(response);
				var html = '';
				$.each(res.entries,function(index,entry){
				html += '<div class="line"><h3>'+entry.comedianblogentry_headline+'</h3><div class="date-blog">Posted on '+entry.comedianblogentry_releasedate+'<span style="float:right;" >Author : '+entry.comedianblogentry_authorname+'</span></div>';
				if(entry.image!=''){
					html += '<div class="blog-img"><img '+entry.image+' style="max-width:678px" /></div>';
				}
				html +='<div class="line"><p>'+entry.comedianblogentry_entryhtml+' ... <a href="javascript:void(0)" onclick="get_post(\''+entry.comedianblogentry_id+'\')">Read more</a></p></div><div class="hr-line"></div></div>';
				});
				$("#blog_main_cont").html(html);
			}
	});	
}
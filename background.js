class dcExtension {

	constructor(){

		this.get_submissions();
		this.get_comments();

	}

	get_submissions(){

		var extension = this;

		$.ajax({
			url: 'http://localhost/dc-full-install/wp-json/knpv-get/get-submissions/',
			type: 'GET',
			data: 'authkey=Here979Nick04)',
			success: function(data){

				var response = JSON.parse(data);
				
				var pending = response.filter(function(o) { return o.post_status == 'pending' }).length;
				var publish = response.filter(function(o) { return o.post_status == 'publish' }).length;

				$('#pendingSubmissions a').text(pending);
				$('#publishSubmissions a').text(publish);				

			}
		});
	}	

	get_comments(){

		var extension = this;

		$.ajax({
			url: 'http://localhost/dc-full-install/wp-json/knpv-get/get-comment-count/',
			type: 'GET',
			data: 'authkey=Here979Nick04)',
			success: function(data){

				$('#pendingComments a').text(data.moderated);

			}
		});
	}	

}

$(document).ready(function(){

	new dcExtension();

	$('body').on('click', 'a', function(){
		chrome.tabs.create({url: $(this).attr('href')});
		return false;
	});

})
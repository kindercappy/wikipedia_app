//https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=India

function loadData(e){
	if(e.keyCode==13){
		//alert('Yolo');
		e.preventDefault();
		var searchVal = ($(this).val());
		//console.log(searchVal);
		var baseUrl =  'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
		var fullUrl = baseUrl + searchVal;
		var ul = $('ul');
		ul.text("");
		console.log(fullUrl);
		$.ajax({
			url: fullUrl,
			dataType: 'jsonp',
			success: function(data){
				// console.log(data[1]);
				var listHeadArray = [];
				var dataHeadArray = data[1];
				var dataContentArray = data[2];
				var dataLinkArray = data[3];
				//Loop thru the array for Headings
				if (data[1].length > 0) {
					for(var i = 0; i < data[1].length; i++){
						// var header = '<h4>' + dataHeadArray[i] + '</h4>';
						// var content = '<p>' + dataContentArray[i] + '</p>';
						// var links = '<a href="' + dataLinkArray[i] + '" target="_blank">' + header + content  + '</a>';
						// var list = '<li>'+ links +'</li>';
						var header = '<h4>' + dataHeadArray[i] + '</h4>';
						var content = '<p>' + dataContentArray[i] + '</p>';
						var list = '<li>' + header + content + '</li>';
						var links = '<a target="_blank" href="' + dataLinkArray[i] + '">' + list + '</a>';
						listHeadArray.push(links);
					}
				}
				ul.hide();
				ul.append(listHeadArray);
				ul.show();
				$('li').animate({
					opacity: 1,
					width : '97%'
				},800);
				// console.log(list);
			}
		});
	}
	//return false;
}

$(document).ready(function(){
	var search = $('#search');
	//CLEAR THE SEARCH FIELD ON EVERY LOAD
	search.val("");

	search.on('keypress',loadData);
	var delay_time = 0;
	$("a").each(function() {
	    $(this).delay(delay_time).animate({"top" : "+=20px"}, "fast");
	    delay_time += 200;
	});
});
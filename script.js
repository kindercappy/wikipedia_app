function loadData(e){
	if(e.keyCode==13){
		e.preventDefault();
		var searchVal = ($(this).val());
		var baseUrl =  'https://en.Wikipedia.org/w/api.php?action=opensearch&format=json&search=';
		var fullUrl = baseUrl + searchVal;
		var ul = $('ul');
		//Clear the ul before another search
		ul.text("");
		console.log(fullUrl);
		var weatherRequestTimedout = setTimeout(function(){
			ul.append("<h1>Oops! couldn't fetch data...please check back later!</h1>");
		},5000);
		$.ajax({
			url: fullUrl,
			dataType: 'jsonp',
			success: function(data){
				if (data !== "") {
					clearTimeout(weatherRequestTimedout);
				}
				var listHeadArray = [];
				var dataHeadArray = data[1];
				var dataContentArray = data[2];
				var dataLinkArray = data[3];
				//Loop thru the array for Content
				if (data[1].length > 0) {
					for(var i = 0; i < data[1].length; i++){
						var header = '<h4>' + dataHeadArray[i] + '</h4>';
						var content = '<p>' + dataContentArray[i] + '</p>';
						var list = '<li>' + header + content + '</li>';
						var links = '<a target="_blank" href="' + dataLinkArray[i] + '">' + list + '</a>';
						// console.log(data);
						// if (links == "") {
						// 	links = "<h1>Please search again!</h1>";
						// }
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
			}
		});
	}
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
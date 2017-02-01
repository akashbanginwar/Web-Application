	(function (){

    $(init);

	var fullStreetName = [];
	
	$.ajax({
                //url: "http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0",
                url:"https://retsint.voitrix.com/listings?sortBy=price&dir=asc&q=Santa%20Barbara",
				dataType: "json",
                success: autoComplete
            });
			
			function autoComplete(values) {
				for (var x in values) {
					//var movie = movies[m];
					var listing = values[x];
					fullStreetName[x] = listing.fullStreetName;
					//console.log(fullStreetName[x]);
				}
			}
			
		var options = {
			data: fullStreetName
		};
		
		$("#search").easyAutocomplete(options);
		
    function init()
    {
        $("#searchMovie").click(searchMovie);
        var movieTitle = $("#search");
        var tbody = $("#container"); //table.find("tbody");
        var template = $("#template").clone();
        tbody.empty();

        function searchMovie()
        {
            var title = movieTitle.val();
			
			
			if(document.getElementById('Ascending').checked) {
	
				var x = $("#Ascending").val();
				
				}
				else if(document.getElementById('Descending').checked) {
				  var x = $("#Descending").val();
				}
			
			
			
			
			

            $.ajax({
                //url: "http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0",
                url:"https://retsint.voitrix.com/listings?sortBy=price&dir="+ x +"&q="+title,
				dataType: "json",
                success: renderMoviesWithTemplate
            });
        }

        function renderMoviesWithTemplate(movies)
        {
            console.log(movies);

            tbody.empty();

            for(var m in movies)
            {
                var movie = movies[m];
                var title = movie.fullStreetName;
                var plot = movie.listPrice;
                
                var imdbUrl = movie.urlIMDB;
				var latitude = movie.latitude;
				var longitude = movie.longitude;
				var agentEmail = movie.agentEmail;
				console.log("Lati"+ latitude +"log"+longitude );

                var tr = template.clone();

                tr.find(".link")
                    .attr("href", imdbUrl)
                    .html(title);

                tr.find(".plot")
                    .html(plot);
					
					tr.find(".mail")
                    .attr("href", agentEmail)
                    .html(agentEmail);
					console.log("agent"+agentEmail);

                //tr.find(".poster")
                //    .attr("src", posterUrl);

                tbody.append(tr);
            }
        }
		
		
		
		//map
		
		    var position = [34.443199, -119.764985 ];


    function initialize(position) {

        var myOptions = {
            zoom: 14,
            streetViewControl: true,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('googlemaps'),
            myOptions);


        latLng = new google.maps.LatLng(position[0], position[1]);

        map.setCenter(latLng);

        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP
        });


    }

    google.maps.event.addDomListener(window, 'load', function() {
		initialize(position);
	});

      
    }
})();
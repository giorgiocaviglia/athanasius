var api = athanasius.api();

api.getPerson(person_id, function(response){
	
	if (!response.status)
		return;
	
	var data = response.results;
		
	d3.select(".page-header")
		.append("h1")
		.text(data[0]['PrimaryName']+ " ")
		.append("small")
		.text(data[0]['_types'][0])
	
	var list = d3.select("#info-list")
		.selectAll("div.info-row")
		.data(d3.entries(data[0]))
		.enter().append("div")
			.attr("class", "info-row")
			.append("dl")
			.attr("class","dl-horizontal")
			
	list.append("dt")
		.html(function(d){return d.key;})
	// hbib	<-- by giorgio uboldi
	list.append("dd")
		.html(function(d){return d.value;})
	
	
	
	api.getPersonCorrespondents(person_id, function(response_correspondents){
		
		if (!response_correspondents.status)
			return;
		
		if (!response_correspondents.count) {
			// d3.select("#results").html("No results. Sorry.")
			return;
		}

	    var data = response_correspondents.results;
		console.log(d3.values(data).map(function(d){ return d.data; }))
		
		var corr_div = d3.select("#page-info")
			.append("div")
		
		corr_div.append("h3")
			.html("Correspondents")
		
		
		var dataTable = athanasius.utils.datatable()
			.data(d3.values(data).map(function(d){
				d.data.LettersSent = d.letters_sent ? d.letters_sent : ""
				d.data.LetterReceived = d.letters_received ? d.letters_received : ""
				return d.data;
			}))
			.target(corr_div.node())
			.paginate(true)
			.keys(function(d){ return ['PrimaryName','BirthYear','DeathYear','Gender','LettersSent','LetterReceived']; })
			.label("_types","Types")
			.label("PrimaryName","Name (Primary)")
			.handle("_types", function(d){ return "<span class='label'>" + d3.values(d['_types']).map(function(v){return v;}).join(",") + "</span>"; })
			.handle("PrimaryName", function(d){ return "<a href='/explore/persons/"+ api.getObjectId(d['_id']) +"'>" + d['PrimaryName'] + "</a>" })
			.on("selected",function(d){console.log(d);})
		
		
		
		
	})	
	
})
var api = athanasius.api();

api.getPerson(person_id, function(response){
	
	if (!response.status)
		return;
	
	var data = response.results[0];
		
	d3.select(".page-header")
		.append("h2")
		.text(data['PrimaryName']+ " ")
		.append("small")
		.text("(" + data['BirthYear'] + "-" + data['DeathYear'] + ")")
	
		console.log(data)
	
	var baseList = [
		{
			'key' : 'Date of birth',
			'value' : data['BirthDateRaw'] != "" ? data['BirthDateRaw'] : "-"
		},
		{
			'key' : 'Place of birth',
			'value' : data['BirthPlaceRaw'] != "" ? data['BirthPlaceRaw'] : "-"
		},
		{
			'key' : 'Date of death',
			'value' : data['DeathDateRaw'] != "" ? data['DeathDateRaw'] : "-"
		},
		{
			'key' : 'Place of death',
			'value' : data['DeathPlaceRaw'] != "" ? data['DeathPlaceRaw'] : "-"
		},
		{
			'key' : 'Aliases',
			'value' : data['Aliases'] != "" ? data['Aliases'] : "-"
		},
	]
	
	var list = d3.select("#bio-info-base")
		.selectAll("div.info-row")
		.data(baseList)
		.enter().append("div")
			.attr("class", "info-row")
			.append("dl")
			.attr("class","dl-horizontal")
			
	list.append("dt")
		.html(function(d){return d.key;})
	list.append("dd")
		.html(function(d){return d.value;})
		
	// ===== more
		
	var moreList = [
		{
			'key' : 'Occupation',
			'value' : data['Occupation'] != "" ? data['Occupation'] : "-"
		},
		
	]
	
	var list = d3.select("#bio-info-more")
		.selectAll("div.info-row")
		.data(moreList)
		.enter().append("div")
			.attr("class", "info-row")
			.append("dl")
			.attr("class","dl-horizontal")
			
	list.append("dt")
		.html(function(d){return d.key;})
	list.append("dd")
		.html(function(d){return d.value;})
	
	
	api.getPersonLetters(person_id, function(response){
		
		var letters = response.results;
		console.log(letters)
		if (!letters.length)
			return;
		
		var min = data.BirthYear.length > 1 ? data.BirthYear : d3.min(letters.map(function(d){ return d.DateYear; })),
			max = data.DeathYear.length > 1 ? data.DeathYear : d3.max(letters.map(function(d){ return d.DateYear; }))
			max++;
		
		var years = {}
		d3.range(min,max).forEach(function(d){
			years[d] = {'l': { 'letters' : 0 }}; 
		})
		letters.forEach(function(d){
			if (!years[d.DateYear])
				return;
			years[d.DateYear]['l']['letters']++;
		})
		
		var stack = {
			values : {
				l : ['letters']
			},
			years : years
		}
		
		var timestack = ink.vis.timestack()
			.data(stack)
			.dimension('l')
			.target("#timeline")
			.height(150)
			.on("nodeclick",function(d){
				$('.node').popover('hide')
				$(d3.event.target).popover('show')
			})
			.update();
		
		$('.node').popover(
			{
				placement : 'top',
				title : 'Letters per year'
			})
	})
	
	api.getPersonGeoLetters(person_id, function(response){
		
		var data = response.results;
		
		var map = ink.vis.map()
			.target("#map")
			.height(600)
			.data(data)
			.update()
	
		/*$('.dot').popover(
			{
				placement : 'top',
				title : 'Letters per year'
			})
			*/
	})
	
	/*
	
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
	
	*/
	
})
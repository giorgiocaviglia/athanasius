var api = athanasius.api();

athanasius.utils.loading(".loading")

$('#startSearch').click(function(){
	startSearch($('#search').attr("value"))
})

var labels,
	mapped,
	count

$('#search').typeahead({
	
	source: function(q, process){
		api.suggest({ 's': q }, function(data){
			labels = []
			mapped = {}
			count = 0
			data.results.forEach(function(item,i){
				count += item.value;
				mapped[item.field+"_"+item._id] = item // TODO: Migliorare!!!
				labels.push(item.field+"_"+item._id)
			})
			process(labels);
		});
	},
	
	updater : function(item) {
		// TODO: fare roba del filtro
		startSearch(mapped[item]._id, [mapped[item].field], 1)
		return mapped[item]._id;
		
	},
	
	item : '<li><a href="#"><span class="search-value"></span> &nbsp; <span class="search-field"></span></a></li>',
	
	render: function (items) {
				
		var that = this

		items = $(items).map(function (i, item) {
			i = $(that.options.item).attr('data-value', item)
			i.find('.search-value').html(that.highlighter(mapped[item]._id))
			i.find('.search-field').html(mapped[item].field + " <em>" + mapped[item].value + "</em>")
			return i[0]
		})

		if (this.autoSelect) {
			items.first().addClass('active')
    	}
		
		this.$menu.html(items)
		d3.select(this.$menu[0])
			.append("li")
			.attr("class","typeahead-info")
			.append("small")
			.append("a")
			.html(labels.length + " possible matches")
			
		return this
	},
	
	sorter: function (items) {
		
		  function sortOnValue(a,b){
			  return mapped[a].value <= mapped[b].value ? 1 : -1;
		  }
		  
		  return items.sort(sortOnValue)
		  
	},
	
	
	autoSelect : false,
	
	minLength: 3,
	
	items : 10,
	
	shown : true
		
})


function startSearch(query, fields, case_sensitive){
	
	d3.select("#results").html("Please wait while loading results...")
	
	api.search({ 's': query, 'fields': JSON.stringify(fields), 'case_sensitive' : JSON.stringify(case_sensitive)}, function(response){
		
		if (!response.status) {
			d3.select("#results").html(response.errors)
			return;
		}

	    var data = response.results;
		
		if (!data.length) {
			d3.select("#results").html("No results. Sorry.")
			return;
		}
		
		d3.select("#results").html(function(){
			
			var str =  data.length + " results found for <strong>" + query + "</strong>";
			str += fields ? " as <em>" + fields.join(" and ") + "</em>" : "";
			return str;
			
		})
		
		var dataTable = athanasius.utils.datatable()
			.data(d3.values(data))
			.target("#results")
			.paginate(true)
			.keys(function(d){ return ['PrimaryName','BirthYear','DeathYear','Gender','_types']; })
			.label("_types","Types")
			.label("PrimaryName","Name (Primary)")
			.handle("_types", function(d){ return "<span class='label'>" + d3.values(d['_types']).map(function(v){return v;}).join(",") + "</span>"; })
			.handle("PrimaryName", function(d){ return "<a href='/explore/persons/"+ api.getObjectId(d['_id']) +"'>" + d['PrimaryName'] + "</a>" })
			.on("selected",function(d){console.log(d);})
		
	});
}

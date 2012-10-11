var api = athanasius.api(),
	mapper = athanasius.mapper(),
	map,
	collection,
	baseSchema,
	types,
	header,
	tmpId,
	objects;

upload();


// UPLOAD
function upload() {
	
	api.getCollections("",function(response){
		
		if (!response.status)
			return;
				
		d3.select(".dropdown-menu")
			.selectAll("li")
			.data(response.results)
			.enter().append("li")
			.append("a")
			.attr("tabindex","-1")
			.attr("href","#")
			.text(function(d){
				return d.name + " (" +  d._id + ")";
			})
			.on("click",function(d){
				d3.select(".btn-label")
					.text(d.name)
				collection = d._id;
			})
	})

	var request;

	$("#file-input").fileupload({
		url : "../api/upload",
		dataType : 'json',
		done: function(e, data){
				
			if (!data.result.status) {
				console.log("yeah")
				return
			}

			header = data.result.results.header
			tmpId = data.result.results.tmp_id
			
			d3.select("#import-upload")
				.attr("class","step")
			
			choose();
		
		},
		add: function(e,data){
			data.url = "../api/upload/"
			request = data;
			d3.select("#file-info").style("display","block")
			d3.select("#file-info .bar").style("width",0)
			d3.select("#file-name")
				.html("<strong>" + data.files[0].name + "</strong>" + " (" + Math.round(data.files[0].size/1000) + " kb)" )
		},
		fail: function( e, data ){
			console.log("failed!", data.error);
		},
		progress: function(e, data){
			var progress = parseInt(data.loaded / data.total * 100, 10);
			d3.select("#file-info .bar").style("width",progress+"%")
		}

	})

	$("#uploadFile").click(function(){
		request.submit()
	})
	
}

// CHOOSING SCHEMA

function choose(){
	
	d3.select("#import-baseschema")
		.attr("class","step active")
	
	api.getTypes("", function(result){
		
		types = result.results;
		console.log(types)
		athanasius.utils.searchlist()
			.data(types)
			.target("#search-schema")
			.label(function(d){
				return "<span>" + d.label + "</span> <small> " + d.description + "</small>";
			})
			.value(function(d){
				return d._id;
			})
			.filter(function(d, s){ 
				return d.label.toLowerCase().search(s.toLowerCase()) != -1;
			})
			.on("click",function(d){
				
				d3.select("#import-baseschema")
					.attr("class","step")
				
				baseSchema = d._id;
				console.log(collection)
				mapper
					.collection(collection)
					.type(d._id)
					.types(types)
					.attributes(d.attributes);
				mapping();
			})
				
	});
	
}


// MAPPING

function mapping(){
	
	d3.select("#import-map")
		.attr("class","step active")
	
	d3.select("#getCouple")
		.on("click",function(){
			
			map = mapper.map();
			
			d3.select("#import-map")
				.attr("class","step")
			
			// extended map...
			if (map.extended) {
				newSchema();
				return;
			}
			
			merge();
		})	
	
	mapper
		.keys(header)
}


// SCHEMA INFO
function newSchema(){
	
	d3.select("#import-new-schema")
		.attr("class","step active")
	
	d3.select("#new-schema-prefix")
		.text( map['_id'] + "/" + map['collection'] + ":")
	
	
	// aggiungere info su map
	d3.select("#newSchemaSend")
		.on("click",function(){
			
			map['label'] = d3.select("#new-schema-label").property("value")
			map['description'] = d3.select("#new-schema-description").property("value")
			map['_id'] = map['_id'] + "/" + map['collection'] + ":" + d3.select("#new-schema-name").property("value")
			
			d3.select("#import-new-schema")
				.attr("class","step")
				
			merge();
			
		})
		
}


// MERGING
function merge(){
	
	d3.select("#import-merge")
		.attr("class","step active")		

	var data = {};
	data['mapper'] = JSON.stringify(map);
	data['tmp_id'] = tmpId;
			
	api.parse(data,function(result){
		console.log(result)
	})
	
}

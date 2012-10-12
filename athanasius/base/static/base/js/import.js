
function upload() {
    
	api.getCollections("",function(response){
		
		if (response.status != '200')
			return;
	
        console.log(response.result.objects)
        
		d3.select("#collections-list")
			.selectAll("li")
			.data(response.result.objects)
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
				return
			}

            session = {}
			session['header'] = data.result.result.header
			session['session_id'] = data.result.result.session_id
            session['collection'] = collection
			
            document.location = "/import?action=select_schema&session=" + JSON.stringify(session);
		
		},
		add: function(e,data){
            console.log(data)
			data.url = "../api/upload/"
			request = data;
			d3.select("#file-info").style("display","block")
			d3.select("#file-info .bar").style("width",0)
			d3.select("#file-name")
				.html("<strong>" + data.files[0].name + "</strong>" + " (" + Math.round(data.files[0].size/1000) + " kb)" )
		},
		fail: function( e, data ){
			console.log("failed!", e, data.error);
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



function selectSchema(){
	
	api.getSchemas("", function(result){
		
		types = result.result.objects;

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
								                
                session['base_schema'] = d;
                document.location = "/import?action=mapping&session=" + JSON.stringify(session);
                
			})
				
	});
	
}


function mapping(){
	
	api.getSchemas("", function(result){
		
		types = result.result.objects;
        
        var mapper = athanasius.mapper()
        	.collection(collection)
        	.type(baseSchema._id)
        	.attributes(baseSchema.attributes)
            .types(types)
            .keys(header)
    
    	d3.select("#getCouple")
    		.on("click",function(){
			
                map = mapper.map();
			    session['map'] = map;
                
    			// extended map...
    			if (map.extended)
    				document.location = "/import?action=define_new_schema&session=" + JSON.stringify(session);
    			else
                    document.location = "/import?action=merging&session=" + JSON.stringify(session);
    	})	        	
        
        
    });
    
    
}


// SCHEMA INFO
function newSchema(){
	
	d3.select("#new-schema-prefix")
		.text( map['_id'] + "/" + map['collection'] + ":")
	
	// aggiungere info su map
	d3.select("#newSchemaSend")
		.on("click",function(){
			
			map['label'] = d3.select("#new-schema-label").property("value")
			map['description'] = d3.select("#new-schema-description").property("value")
			map['_id'] = map['_id'] + "/" + map['collection'] + ":" + d3.select("#new-schema-name").property("value")
			
            session['map'] = map;
            				
			//merge();
            document.location = "/import?action=merging&session=" + JSON.stringify(session);
			
		})
		
}


// SCHEMA INFO
function merge(){
	
    data = {}
    data['session'] = JSON.stringify(session)
	api.merge(data,function(result){
	    console.log(result)
	})
		
}

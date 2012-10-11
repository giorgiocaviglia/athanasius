
(function(){

	//var athanasius = athanasius || {};
	
	athanasius.mapper = function(){
		
		var mapper = {},
			api = athanasius.api(),
			collection,
			keys,
			target,
			datatable,
			type,
			types,
			attributes,
			extendedAttributes = {}


		mapper.update = function(){
			
            console.log(keys, attributes, type, collection)
            
			if (!keys || !attributes || !type || !collection)
				return mapper;
                
			// name schema
			//updateSchemaName();
			
			// From your file
			 
			var fileList = d3.select("#file-list")
			
			fileList.selectAll(".box-container")
				.remove()
			
			fileList.selectAll("div.box-container")
				.data(keys)
				.enter().append("div")
				.attr("class","box-container")
					.append("div")
					.attr("class","box box-drag")
						.append("i")
						.attr("class","box-icon pull-right icon-circle-arrow-right")

			fileList.selectAll(".box-drag")
				.append("p")
				.attr("class","box-title")
				.html(function(d){ return d.label; })
				//<span class="description light">FieldName</span>
			
			
			// From base schema
			
			var baseList = d3.select("#base-list")
			
			baseList.selectAll("*") // era *
				.remove()
								
			baseList.append("h4")
				.text(type)
					
			baseList.selectAll("div.box-container")
				.data(attributes)
				.enter().append("div")
					.attr("class","box-container")
					.append("p")
						.attr("class","box-title undone")
						.html(function(d){ return d.key; })
				
			baseList.selectAll("div.box-container")
				.append("div")
					.attr("class","box box-drop base")
					.append("span")
						.attr("class","description light")
						.html(function(d){ return d.description; })
			
			
			// extendedschema
			
			var extendList = d3.select("#extend-list")
			
			
						
			$( ".box-drag" ).draggable({
				revert: "invalid",
				helper: "clone",
				start : function(event, ui){
					var width = $(ui.helper.context).width();
					$(ui.helper).css("width",width);
					$(ui.helper).css("z-index","10000");
				}
			});
			
			
			function updateSchemaName() {
				
				if (!d3.values(extendedAttributes).length) {
					d3.select("#new-schema-prefix")
						.text(type)
					d3.select("#new-schema-name")
						.style("display","none")
						.attr("placeholder",athanasius.utils.parseSchema(type).name)
					
					return;
				}
				
				d3.select("#new-schema-prefix")
					.text(type+"/"+collection+":")
			
				d3.select("#new-schema-name")
					.style("display","initial")
					.attr("placeholder",athanasius.utils.parseSchema(type).name)
			}
			
			
			function updateDroppable(){
				// BASE
				$( ".box-drop.base" ).droppable({
					tolerance : "intersect",
					drop: function( e, ui ) {
						
						d3.select(e.target.parentElement).selectAll(".box-drag")
							.remove()
					
						var drop = this;
					
						var width = $(ui.draggable).width(),
							height = $(ui.draggable).height()
							
						var clone = $(ui.draggable[0]).clone();
						
						var data = d3.select(ui.draggable[0]).data()
						d3.select(clone[0]).data(data);
					
					
						d3.select(clone[0]).select(".box-title")
							.attr("class","box-title done")
						d3.select(ui.draggable[0]).select(".box-title")
							.attr("class","box-title done")
						/*d3.select(e.target.parentElement).select(".mapper-title")
							.attr("class","mapper-title done")
						*/	
						d3.select(clone[0]).select("i")
							.attr("class","box-icon pull-right icon-remove")
							.style("cursor","pointer")
							.on("click",function(){
								d3.select(d3.event.target.parentElement).remove();
								delete d3.select(drop).data()[0]["map"];
							})
													
						var offset = $(e.target).offset()
						$(clone).css("top",offset.top)
						$(clone).css("left",offset.left)
						$(clone).css("position","absolute")
						$(clone).css("width",width)
						$(clone).css("height",height)
						$(clone).css("cursor","auto")
						$($(e.target).parent()).append(clone);						
						
						$(this).css("background-color","")
					
						d3.select(this).data()[0]["map"] = data[0];					
							
					},
						
					over: function(event, ui) {
						$(this).css("background-color","#fdffd9")
					},
					out: function(event, ui) {
						$(this).css("background-color","")
					}
						
				});
			}			
			
			// EXTENDED
			$( ".box-drop.extend" ).droppable({
				tolerance : "intersect",
				drop: function( e, ui ) {
						
					d3.select(e.target.parentElement).selectAll(".box-drag")
						.remove()
					
					var drop;
					var newSchema = {};
					
					var popup = d3.select("#new-schema-popup")
						.style("display","block")
					
					//popup.select("#new-singleschema-prefix").text("")
					popup.select("#new-singleschema-name").property("value","");
					popup.select("#new-singleschema-description").property("value","");
					popup.select("#search-singleschema").property("value","");
					
					athanasius.utils.searchlist()
						.data(types)
						.target("#search-singleschema")
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
							newSchema['key'] = d._id+"/"+collection+":";
							//d3.select("#new-singleschema-prefix")
							//	.text(d._id+"/"+collection+":")
						})
					
					d3.select("#add-new-schema")
						.on("click",function(){
							
							newSchema['key'] += d3.select("#new-singleschema-name").property("value");
							newSchema['description'] = d3.select("#new-singleschema-description").property("value");
							newSchema['default'] = ""
							
							var newBoxContainer = extendList
								.insert("div",".box-container.extend")
								.data([newSchema])
								.attr("class","box-container")
								
							newBoxContainer.append("a")
								.attr("class","box-remove pull-right small")
								.html("remove")
								.style("cursor","pointer")
								.on("click",function(){
									newBoxContainer.remove();
									delete newSchema["map"];
									delete extendedAttributes[newSchema['key']];
									//updateSchemaName();
								})
							
							newBoxContainer.append("p")
								.attr("class","box-title undone")
								.html(newSchema['key'])
							
							drop = newBoxContainer
								.append("div")
									.attr("class","box box-drop base")
							
							drop.append("span")
								.attr("class","description light")
								.html(newSchema['description'])
							
							var width = $(ui.draggable).width(),
								height = $(ui.draggable).height()
							
							var clone = $(ui.draggable[0]).clone();
						
							var data = d3.select(ui.draggable[0]).data()
							d3.select(clone[0]).data(data);
					
							d3.select(clone[0]).select(".box-title")
								.attr("class","box-title done")
							d3.select(ui.draggable[0]).select(".box-title")
								.attr("class","box-title done")
					
							d3.select(clone[0]).select("i")
								.attr("class","box-icon pull-right icon-remove")
								.style("cursor","pointer")
								.on("click",function(){
									d3.select(d3.event.target.parentElement).remove();
									delete drop.data()[0]["map"];
									
								})
													
							var offset = $(drop.node()).offset()
							$(clone).css("top",offset.top)
							$(clone).css("left",offset.left)
							$(clone).css("position","absolute")
							$(clone).css("width",width)
							$(clone).css("height",height)
							$(clone).css("cursor","auto")
							$(newBoxContainer.node()).append(clone);						
						
							drop.style("background-color","")
							d3.select(".box-drop.extend").style("background-color","");
							
							drop.data()[0]["map"] = data[0];	
							newSchema['map'] = data[0];
							extendedAttributes[newSchema['key']] = newSchema;
							popup.style("display","none")
							
							//updateSchemaName();
							updateDroppable();
								
						})
						
				},
						
				over: function(event, ui) {
					$(this).css("background-color","#fdffd9")
				},
				out: function(event, ui) {
					$(this).css("background-color","")
				}
						
			});
			
			updateDroppable();
			
			return mapper;
		}
		
		
		mapper.collection = function(x) {
			if (!arguments.length) return collection;
			collection = x;
			mapper.update();
			return mapper;
		}
		
		mapper.keys = function(x) {
			if (!arguments.length) return keys;
			keys = x.map(function(d){
				var obj = {
					'id' : false,
					'label' : d
				}				
				return obj
			});
			mapper.update();
			return mapper;
		}
		
		mapper.attributes = function(x) {
			if (!arguments.length) return attributes;
			attributes = x;
			mapper.update();
			return mapper;
		}
		
		mapper.type = function(x) {
			if (!arguments.length) return type;
			type = x;
			mapper.update();
			return mapper;
		}
		
		mapper.types = function(x) {
			if (!arguments.length) return types;
			types = x;
			mapper.update();
			return mapper;
		}
		
		mapper.map = function() {
			
			var map = {}
			//var typeName = d3.select("#new-schema-name").property("value") != "" ? d3.select("#new-schema-name").property("value") : athanasius.utils.parseSchema(type).name;
			
			map['collection'] = collection;
			map['extended'] = d3.values(extendedAttributes).length > 0 ? true : false;
			map['_id'] = type//map['extended'] ? type + "/" + collection + ":" + typeName : type;
			map['map'] = attributes.concat(d3.values(extendedAttributes));
			
			/*
			map['extend'] = {
				'name' : type+"/"+collection+":"+typeName,
				'map' : d3.values(extendedAttributes)
			}
			*/
			return map;
			
		}
		
		mapper.target = function(x) {
			if (!arguments.length) return target;
			target = typeof x == 'string' ? d3.select(x) : x;
			mapper.update();
			return mapper;
		}
		
		return mapper;
	}
	
	

})();

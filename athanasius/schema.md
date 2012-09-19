

"Date" :
	{
		"start" : {
			"year" : "",
			"month" : "",
			"day" : ""
		},
		"end" : {
			"year" : "",
			"month" : "",
			"day" : ""
		}
	} 


	Mrofl
	=====
	

	node
	
	node.person
	
	node.group
	
	node.place
	

	link
	
	link.letter
	
	link.travel
	
	link.relation
	link.relation.family
	link.relation.family.childOf
	link.relation.family.parentOf
	
	
	
	
	link.event
	link.event.meetWith <Person>
	link.event.meetAt <Place>
	link.travel.travelWith <Person>
	link.travel.travelTo <Place>
	
	link.letter.sentTo <Place>
	link.family.childOf <Person>
	link.family.parentOf <Person>
	link.family.spouseOf <Person>
	
	link.studentOf
	

	EE
	==
	



[
	/* Attributes */
	{
		"_id" : ObjectId,
		"_type" : "attributes",
		"Name" : "Mrofl",
		"Description" : "Mrofl Collection",
		"Sources" : "...",
		"CreationDate" : "",
		"URIFunction" : function(uri) {
			return "http://www.archiveuri.com/" + uri;
		}
	},
		
	/* Types */
	{
		"_id" : ObjectId,
		"_type" : "types",
		"Description" : "The Mrofl basic schema. For more information, please visit <a href='http://mapping.stanford.edu'>http://mapping.stanford.edu</a>"
		"Types" : [
							
			/* link */
			{
				"_id" : ObjectId,
				"_type" : "type" // String or <ObjectId> ?
				"name" : "Mrofl.link",
				"description" : "A generic link between two nodes"
				"keys" : [
					{
						"key" : "Name",
						"description" : "The name of the link"
					},
					{
						"key" : "SourceNode",
						"description" : "The node of this collection"
					},
					{
						"key" : "TargetNode",
						"description" : "The node of the other collection"
					},
					{
						"key" : "Description",
						"description" : "A brief description"
					}
				]
			},
				
			/* link.same */
			{
				"_id" : ObjectId,
				"_type" : "type", <ObjectId>
				"Name" : "Mrofl.link.same",
				"Description" : "This link creates an identity relationship between two nodes (i.e. when two persons are actually the same person)"
				"Keys" : [
					{
						"id" : ObjectId,
						"Key" : "ThisNode",
						"Description" : "The node of this collection"
					},
					{
						"id" : ObjectId,
						"Key" : "ThatNode",
						"Description" : "The node of the other collection"
					}
				],
				"Children" : []
			},
			
			/* link.containedIn */
			{
				"_id" : ObjectId,
				"_type" : "type", <ObjectId>
				"Name" : "Mrofl.link.containedIn",
				"Description" : "This link creates an identity relationship between two nodes (i.e. when two persons are actually the same person)"
				"Keys" : [
					{
						"id" : ObjectId,
						"Key" : "ContainedPlace",
						"Description" : "The place to be contained"
					},
					{
						"id" : ObjectId,
						"Key" : "ContainerPlace",
						"Description" : "The container place"
					}
				],
				"Children" : []
			},
			
			/* link.event */
			{
				"_id" : ObjectId,
				"_type" : "type", <ObjectId>
				"Name" : "Mrofl.link.event",
				"Description" : "This link creates an identity relationship between two nodes (i.e. when two persons are actually the same person)"
				"Keys" : [
					{
						"id" : ObjectId,
						"Key" : "Name",
						"Description" : "The name of the event"
					},
					{
						"id" : ObjectId,
						"Key" : "InvolvedNodes",
						"Description" : "The nodes involved in the event"
					},
					{
						"id" : ObjectId,
						"Key" : "Date",
						"Description" : "The date when event happened"
					},
					{
						"id" : ObjectId,
						"Key" : "Place",
						"Description" : "The place where event happened"
					},
				],
				"Children" : []
			},
			
			/* link.letter */
			{
				"_id" : ObjectId,
				"_type" : "type", <ObjectId>
				"Name" : "Mrofl.link.letter",
				"Description" : "This link represents a letter exchanged between two or more persons"
				"Keys" : [
					{
						"id" : ObjectId,
						"Key" : "Title",
						"Description" : "The title of the letter"
					},
					{
						"id" : ObjectId,
						"Key" : "Authors",
						"Description" : "The author nodes of the letter"
					},
					{
						"id" : ObjectId,
						"Key" : "Recipients",
						"Description" : "The recipient nodes of the letter"
					},
					{
						"id" : ObjectId,
						"Key" : "ShipDate",
						"Description" : "The date of shipping"
					},
					{
						"id" : ObjectId,
						"Key" : "SourcePlace",
						"Description" : "The source place"
					},
					{
						"id" : ObjectId,
						"Key" : "DestinationPlace",
						"Description" : "The destination place"
					},
				],
				"Children" : []
			},
				
			/* node */
			{
				"_id" : ObjectId,
				"_type" : "type", <ObjectId>
				"Name" : "Mrofl.node",
				"Description" : "A basic node",
				"Keys" : [
					{
						"id" : ObjectId,
						"Key" : "Name",
						"Description" : "The name of the node"
					}
				],
				"Children" : []
			},
				
			/* node.person */
			/* use this when you don't know anything more about the person */
			{
				"_id" : ObjectId,
				"_type" : "type", <ObjectId>
				"Name" : "Mrofl.node.person",
				"Description" : "Person node"
				"Keys" : [
					{
						"id" : ObjectId,
						"Key" : "Name",
						"Description" : "The node of this collection"
					},
					{
						"id" : ObjectId,
						"Key" : "BirthDate",
						"Description" : "Date of birth"
					},
					{
						"id" : ObjectId,
						"Key" : "BirthPlace",
						"Description" : "Place of birth"
					},
					{
						"id" : ObjectId,
						"Key" : "DeathDate",
						"Description" : "Date of death"
					},
					{
						"id" : ObjectId,
						"Key" : "DeathPlace",
						"Description" : "Place of death"
					},
					{
						"id" : ObjectId,
						"Key" : "Gender",
						"Description" : "Gender"
					},
				]
				"Children" : []
			},
			
			/* node.group */
			/* use this when you don't know anything more about the group */
			{
				"_id" : ObjectId,
				"_type" : "type", <ObjectId>
				"Name" : "Mrofl.node.group",
				"Description" : "A basic group node",
				"Keys" : [
					{
						"id" : ObjectId,
						"Key" : "Name",
						"Description" : "The name of the node"
					},
					{
						"id" : ObjectId,
						"Key" : "StartDate",
						"Description" : "Date of start"
					},
					{
						"id" : ObjectId,
						"Key" : "EndDate",
						"Description" : "Date of end"
					},
				],
				"Children" : []
			}
				
		]
	},
		
	/* Nodes */
	{
		"_id" : ObjectId,
		"_type" : "nodes",
		"Nodes" : [
				
			{
				"_id" : ObjectId,
				"_type" : "Mrofl.node.person", <ObjectId>
				"Name" : String,
				"BirthDate" : String,
				"BirthPlace" : String,
				"DeathDate" : String,
				"DeathPlace" : String
				"Gender" : String
			}
			
		]
	},
		
	/* Links */
	{
		"_id" : ObjectId,
		"_type" : "links",
		"Links" : [
				
			{
				"_id" : ObjectId,
				"_type" : "Morfl.link.same", <ObjectId>
				"ThisNode" : <ObjectId>,
				"ThatNode" : <ObjectId>,
			}
			
		]
	}
]
	


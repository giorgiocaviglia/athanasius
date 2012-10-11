[
	{
		"_id" : "mrofl:Literal",
		"label" : "Literal",
		"description" : "A Mrofl Literal",
		"attributes" : []
	},

	{
		"_id" : "mrofl:Label",
		"label" : "Label",
		"description" : "A Mrofl Label",
		"attributes" : []
	},

	{
		"_id" : "mrofl:Private",
		"label" : "Private",
		"description" : "A Mrofl Private, used for internal purposes (e.g. Internal Ids)",
		"attributes" : []
	},

	{
		"_id" : "mrofl:Category",
		"label" : "Category",
		"description" : "A Mrofl Category",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:Value",
				"description" : "The value for the Category",
				"default" : ""
			}
		]
	},

	{
		"_id" : "mrofl:Date",
		"label" : "Date",
		"description" : "A Mrofl Date",
		"attributes" : []
	},

	{
		"_id" : "mrofl:Place",
		"label" : "Place",
		"description" : "A Mrofl Place",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:Appellation",
				"description" : "An appellation for the Place",
				"default" : ""
			},
			{
				"key" : "mrofl:Literal/mrofl:Latitude",
				"description" : "The latitude of the Place",
				"default" : ""
			},
			{
				"key" : "mrofl:Literal/mrofl:Longitude",
				"description" : "The longitude of the Place",
				"default" : ""
			},
			{
				"key" : "mrofl:Category/mrofl:FeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)",
				"default" : ""
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},

	{
		"_id" : "mrofl:Person",
		"label" : "Person",
		"description" : "An Mrofl Person",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
	},

	{
		"_id" : "mrofl:Group",
		"label" : "Group",
		"description" : "An Mrofl Group",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:Appellation",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Place/mrofl:GroupPlace",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label",
				"default" : "mrofl:Literal/mrofl:Appellation"
			}
		]
	},

	{
		"_id" : "mrofl:Event",
		"label" : "Event",
		"description" : "An Mrofl Event",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:Appellation",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Person/mrofl:Participant",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Place/mrofl:EventPlace",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label",
				"default" : "mrofl:Literal/mrofl:Appellation"
			}
		]
	},

	{
		"_id" : "mrofl:Event/mrofl:Letter",
		"label" : "Letter",
		"description" : "An Mrofl Letter",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:Title",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Person/mrofl:Author",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Person/mrofl:Recipient",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Place/mrofl:LetterSource",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Date/mrofl:LetterDestination",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Date/mrofl:LetterDate",
				"description" : "",
				"default" : ""
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label",
				"default" : "mrofl:Literal/mrofl:Title"
			}
		]
	}
]

var api = athanasius.api();

items = [
	{
		"_id" : "mrofl:Literal",
		"label" : "Literal",
		"description" : "Primitive Literal value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:CategoryValue",
		"label" : "Category Value",
		"description" : "Primitive value of a Category",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:EventAppellation",
		"label" : "Event Appellation",
		"description" : "Primitive value of an EventAppellation",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:GroupAppellation",
		"label" : "Group Appellation",
		"description" : "Primitive value of an GroupAppellation",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:LetterTitle",
		"label" : "Letter Title",
		"description" : "Primitive value of a LetterTitle",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:MeetingAppellation",
		"label" : "Meeting Appellation",
		"description" : "Primitive value of a MeetingAppellation",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:FirstName",
		"label" : "First Name",
		"description" : "Primitive value of a FirstName",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:FamilyName",
		"label" : "Family Name",
		"description" : "Primitive value of a FamilyName",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:FullName",
		"label" : "Full Name",
		"description" : "Primitive value of a FullName",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Literal/mrofl:Alias",
		"label" : "Alias",
		"description" : "Primitive value of a Alias",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Label",
		"label" : "Label",
		"description" : "Primitive Label value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Category",
		"label" : "Category",
		"description" : "A primitive Category",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:CategoryValue",
				"description" : "A basic value of a Category"
			}
		]
	},
	
	{
		"_id" : "mrofl:Category/mrofl:GeoFeatureType",
		"label" : "Feature Type",
		"description" : "Primitive GeoFeatureType",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Date",
		"label" : "Date",
		"description" : "Primitive Date value, in the format YYYY-MM-DD",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Date/mrofl:BirthDate",
		"label" : "Birth Date",
		"description" : "Primitive BirthDate value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Date/mrofl:DeathDate",
		"label" : "Death Date",
		"description" : "Primitive DeathDate value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Date/mrofl:StartDate",
		"label" : "Start Date",
		"description" : "Primitive StartDate value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Date/mrofl:EndDate",
		"label" : "End Date",
		"description" : "Primitive EndDate value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Date/mrofl:LetterDate",
		"label" : "Letter Date",
		"description" : "Primitive LetterDate value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Latitude",
		"label" : "Latitude",
		"description" : "Primitive Latitude value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Longitude",
		"label" : "Longitude",
		"description" : "Primitive Longitude value",
		"attributes" : []
	},
	
	{
		"_id" : "mrofl:Place",
		"label" : "Place",
		"description" : "A primitive Place",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:PlaceAppellation",
				"description" : "An appellation for the Place"
			},
			{
				"key" : "mrofl:Latitude",
				"description" : "The latitude of the Place"
			},
			{
				"key" : "mrofl:Longitude",
				"description" : "The longitude of the Place"
			},
			{
				"key" : "mrofl:Category/mrofl:GeoFeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Place/mrofl:BirthPlace",
		"label" : "Birth Place",
		"description" : "A primitive Place of Birth",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:PlaceAppellation",
				"description" : "An appellation for the Place"
			},
			{
				"key" : "mrofl:Latitude",
				"description" : "The latitude of the Place"
			},
			{
				"key" : "mrofl:Longitude",
				"description" : "The longitude of the Place"
			},
			{
				"key" : "mrofl:Category/mrofl:GeoFeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Place/mrofl:DeathPlace",
		"label" : "Birth Place",
		"description" : "A primitive Place of Death",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:PlaceAppellation",
				"description" : "An appellation for the Place"
			},
			{
				"key" : "mrofl:Latitude",
				"description" : "The latitude of the Place"
			},
			{
				"key" : "mrofl:Longitude",
				"description" : "The longitude of the Place"
			},
			{
				"key" : "mrofl:Category/mrofl:GeoFeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Place/mrofl:LetterDestination",
		"label" : "Letter Destination",
		"description" : "A primitive Place for letters destination",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:PlaceAppellation",
				"description" : "An appellation for the Place"
			},
			{
				"key" : "mrofl:Latitude",
				"description" : "The latitude of the Place"
			},
			{
				"key" : "mrofl:Longitude",
				"description" : "The longitude of the Place"
			},
			{
				"key" : "mrofl:Category/mrofl:GeoFeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Place/mrofl:LetterSource",
		"label" : "Letter Source",
		"description" : "A primitive Place for letters source",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:PlaceAppellation",
				"description" : "An appellation for the Place"
			},
			{
				"key" : "mrofl:Latitude",
				"description" : "The latitude of the Place"
			},
			{
				"key" : "mrofl:Longitude",
				"description" : "The longitude of the Place"
			},
			{
				"key" : "mrofl:Category/mrofl:GeoFeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Place/mrofl:MeetingPlace",
		"label" : "Meeting Place",
		"description" : "A primitive Place for meeting",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:PlaceAppellation",
				"description" : "An appellation for the Place"
			},
			{
				"key" : "mrofl:Latitude",
				"description" : "The latitude of the Place"
			},
			{
				"key" : "mrofl:Longitude",
				"description" : "The longitude of the Place"
			},
			{
				"key" : "mrofl:Category/mrofl:GeoFeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Place/mrofl:VisitedPlace",
		"label" : "Visited Place",
		"description" : "A primitive Place for visits",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:PlaceAppellation",
				"description" : "An appellation for the Place"
			},
			{
				"key" : "mrofl:Latitude",
				"description" : "The latitude of the Place"
			},
			{
				"key" : "mrofl:Longitude",
				"description" : "The longitude of the Place"
			},
			{
				"key" : "mrofl:Category/mrofl:GeoFeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Place/mrofl:GroupPlace",
		"label" : "Group Place",
		"description" : "A primitive Place for groups",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:PlaceAppellation",
				"description" : "An appellation for the Place"
			},
			{
				"key" : "mrofl:Latitude",
				"description" : "The latitude of the Place"
			},
			{
				"key" : "mrofl:Longitude",
				"description" : "The longitude of the Place"
			},
			{
				"key" : "mrofl:Category/mrofl:GeoFeatureType",
				"description" : "The type of the Place (e.g Country, City, Town)"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:PlaceAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Event",
		"label" : "Event",
		"description" : "A primitive Event",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:EventAppellation",
				"description" : "An appellation for the Event"
			},
			{
				"key" : "mrofl:Person",
				"description" : "A Person related to the event"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The date when the Event started"
			},
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The date when the Event ended"
			},
			{
				"key" : "mrofl:Place",
				"description" : "The Place where the Event happened"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:EventAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Event/mrofl:Letter",
		"label" : "Letter",
		"description" : "A primitive Letter",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:LetterTitle",
				"description" : "The title of the Letter"
			},
			{
				"key" : "mrofl:Person/mrofl:Author",
				"description" : "An author of the Letter"
			},
			{
				"key" : "mrofl:Person/mrofl:Recipient",
				"description" : "A recipient of the Letter"
			},
			{
				"key" : "mrofl:Date/mrofl:LetterDate",
				"description" : "The date related to the Letter"
			},
			{
				"key" : "mrofl:Place/mrofl:LetterSource",
				"description" : "The Place where the Letter has been sent"
			},
			{
				"key" : "mrofl:Place/mrofl:LetterDestination",
				"description" : "The Place where the Letter has been received"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:LetterTitle"
			}
		]
	},
	
	{
		"_id" : "mrofl:Event/mrofl:Meeting",
		"label" : "Meeting",
		"description" : "A primitive Meeting",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:MeetingAppellation",
				"description" : "An appellation for the Meeting"
			},
			{
				"key" : "mrofl:Person/mrofl:Participant",
				"description" : "A Person participating at the Meeting"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The date when the Meeting started"
			},
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The date when the Meeting ended"
			},
			{
				"key" : "mrofl:Place/mrofl:MeetingPlace",
				"description" : "The Place where the Meeting happened"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:MeetingAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Event/mrofl:Visit",
		"label" : "Visit",
		"description" : "A primitive Visit",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:VisitAppellation",
				"description" : "An appellation for the Visit"
			},
			{
				"key" : "mrofl:Person/mrofl:Participant",
				"description" : "A Person participating at the Meeting"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The date when the Visit started"
			},
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The date when the Visit ended"
			},
			{
				"key" : "mrofl:Place/mrofl:MeetingPlace",
				"description" : "The Place where the Visit happened"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:VisitAppellation"
			}
		]
	},
	
	
	{
		"_id" : "mrofl:Event/mrofl:Membership",
		"label" : "Membership",
		"description" : "A primitive Membership",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Member",
				"description" : "A Person member"
			},
			{
				"key" : "mrofl:Group",
				"description" : "The Group"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The date when the Membership started"
			},
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The date when the Membership ended"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:Group"
			}
		]
	},
	
	{
		"_id" : "mrofl:Person",
		"label" : "Person",
		"description" : "A primitive Person",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Participant",
		"label" : "Participant",
		"description" : "A primitive Participant",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Author",
		"label" : "Author",
		"description" : "A primitive Author",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Recipient",
		"label" : "Recipient",
		"description" : "A primitive Recipient",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Member",
		"label" : "Member",
		"description" : "A primitive Member",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
	},
	
	
	{
		"_id" : "mrofl:Person/mrofl:Relative",
		"label" : "Relative",
		"description" : "A Relative",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Child",
		"label" : "Child",
		"description" : "A Child (both for parent or step parent)",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Parent",
		"label" : "Parent",
		"description" : "A Parent",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},	
	
	{
		"_id" : "mrofl:Person/mrofl:Wife",
		"label" : "Wife",
		"description" : "A Wife",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Husband",
		"label" : "Husband",
		"description" : "A Husband",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Sibling",
		"label" : "Sibling",
		"description" : "A Sibling",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},	
	
	{
		"_id" : "mrofl:Person/mrofl:SiblingInLaw",
		"label" : "Sibling in law",
		"description" : "A Sibling in law",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},	
	
	{
		"_id" : "mrofl:Person/mrofl:Aunt",
		"label" : "Aunt",
		"description" : "An Aunt",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},	

	{
		"_id" : "mrofl:Person/mrofl:Uncle",
		"label" : "Uncle",
		"description" : "An Uncle",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Niece",
		"label" : "Niece",
		"description" : "A Niece",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Nephew",
		"label" : "Nephew",
		"description" : "A Nephew",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},	
	
	{
		"_id" : "mrofl:Person/mrofl:Grandparent",
		"label" : "Grandparent",
		"description" : "A grandparent",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Grandchild",
		"label" : "Grandchild",
		"description" : "A grandchild",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:ParentInLaw",
		"label" : "Parent in law",
		"description" : "A parent in law",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:SonInLaw",
		"label" : "Son in law",
		"description" : "A son in law",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},

	{
		"_id" : "mrofl:Person/mrofl:DaughterInLaw",
		"label" : "Daughter in law",
		"description" : "A daughter in law",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},

	{
		"_id" : "mrofl:Person/mrofl:Stepparent",
		"label" : "Step parent",
		"description" : "A step parent",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},

	{
		"_id" : "mrofl:Person/mrofl:Stepsibling",
		"label" : "Step sibling",
		"description" : "A step sibling",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Twin",
		"label" : "Twin",
		"description" : "A twin",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	{
		"_id" : "mrofl:Person/mrofl:Cousin",
		"label" : "Cousin",
		"description" : "A cousin",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:FirstName",
				"description" : "Person's first name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FamilyName",
				"description" : "Person's family name"
			},
			{
				"key" : "mrofl:Literal/mrofl:FullName",
				"description" : "Person's full name"
			},
			{
				"key" : "mrofl:Literal/mrofl:Alias",
				"description" : "Person's alias"
			},
			{
				"key" : "mrofl:Date/mrofl:BirthDate",
				"description" : "Person's birth date"
			},
			{
				"key" : "mrofl:Date/mrofl:DeathDate",
				"description" : "Person's death date"
			},
			{
				"key" : "mrofl:Place/mrofl:BirthPlace",
				"description" : "Person's place of birth"
			},
			{
				"key" : "mrofl:Place/mrofl:DeathPlace",
				"description" : "Person's place of death"
			},
			{
				"key" : "mrofl:Category/mrofl:Gender",
				"description" : "Person's gender"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:FullName"
			}
		]
		
	},
	
	
	
	
	
	
	{
		"_id" : "mrofl:Group",
		"label" : "Group",
		"description" : "A primitive Group",
		"attributes" : [
			{
				"key" : "mrofl:Literal/mrofl:GroupAppellation",
				"description" : "Groups's appellation"
			},
			{
				"key" : "mrofl:Place/mrofl:GroupPlace",
				"description" : "A Place related to the Group"
			},
			{
				"key" : "mrofl:Label",
				"description" : "Indicates the property to use as label (has to be a mrofl:Literal type)",
				"default" : "mrofl:Literal/mrofl:GroupAppellation"
			}
		]
	},
	
	{
		"_id" : "mrofl:Relation",
		"label" : "Relation",
		"description" : "A generic relation",
		"attributes" : [
			{
				"key" : "mrofl:Person",
				"description" : "The first person in the relation"
			},
			{
				"key" : "mrofl:Person",
				"description" : "The second person in the relation"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The beginning date of the relation"
			},			
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The end date of the relation"
			}			
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:Aquaintance",
		"label" : "Aquaintance",
		"description" : "An aquaintance relation",
		"attributes" : [
			{
				"key" : "mrofl:Person",
				"description" : "The first person in the aquaintance"
			},
			{
				"key" : "mrofl:Person",
				"description" : "The second person in the aquaintance"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The beginning date of the aquaintance"
			},			
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The end date of the aquaintance"
			}			
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FriendOf",
		"label" : "Friendship",
		"description" : "A friendship relation",
		"attributes" : [
			{
				"key" : "mrofl:Person",
				"description" : "The first person in the friendship"
			},
			{
				"key" : "mrofl:Person",
				"description" : "The second person in the friendship"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The beginning date of the friendship"
			},			
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The end date of the friendship"
			}			
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation",
		"label" : "Relative",
		"description" : "A generic family relation",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Relative",
				"description" : "The first relative in the generic family relation"
			},
			{
				"key" : "mrofl:Person/mrofl:Relative",
				"description" : "The second relative in the generic family relation"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The beginning date of the generic family relation"
			},			
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The end date of the generic family relation"
			}			
		]
	},	
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:ChildOf",
		"label" : "Child of",
		"description" : "Being the child of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Child",
				"description" : "The child"
			},
			{
				"key" : "mrofl:Person/mrofl:Parent",
				"description" : "The parent"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The beginning date of the relation"
			},			
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:ParentOf",
		"label" : "Parent of",
		"description" : "Being the parent of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Parent",
				"description" : "The parent"
			},
			{
				"key" : "mrofl:Person/mrofl:Child",
				"description" : "The child"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The beginning date of the relation"
			},			
		]
	},		

	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:SpouseOf",
		"label" : "Spouse of",
		"description" : "Being the spouse of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Wife",
				"description" : "The Wife"
			},
			{
				"key" : "mrofl:Person/mrofl:Husband",
				"description" : "The husband"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The date of marriage"
			},			
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The date of divorce"
			},						
		]
	},		
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:SiblingOf",
		"label" : "Sibling of",
		"description" : "Being the sibling of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Sibling",
				"description" : "The first sibling"
			},
			{
				"key" : "mrofl:Person/mrofl:Sibling",
				"description" : "The second sibling"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},			
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:SiblingInLawOf",
		"label" : "Sibling in law of",
		"description" : "Being the sibling in law of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:SiblingInLaw",
				"description" : "The first sibling in law"
			},
			{
				"key" : "mrofl:Person/mrofl:SiblingInLaw",
				"description" : "The second sibling in law"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},				
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:AuntOfNiece",
		"label" : "Aunt of niece",
		"description" : "Being the aunt of a niece",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Aunt",
				"description" : "The aunt"
			},
			{
				"key" : "mrofl:Person/mrofl:Niece",
				"description" : "The niece"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},			
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:AuntOfNephew",
		"label" : "Aunt of nephew",
		"description" : "Being the aunt of a nephew",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Aunt",
				"description" : "The aunt"
			},
			{
				"key" : "mrofl:Person/mrofl:Nephew",
				"description" : "The nephew"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},	
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:UncleOfNiece",
		"label" : "Uncle of niece",
		"description" : "Being the uncle of a niece",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Uncle",
				"description" : "The uncle"
			},
			{
				"key" : "mrofl:Person/mrofl:Niece",
				"description" : "The niece"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},			
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:UncleOfNephew",
		"label" : "Uncle of Nephew",
		"description" : "Being the uncle of a nephew",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Uncle",
				"description" : "The uncle"
			},
			{
				"key" : "mrofl:Person/mrofl:Nephew",
				"description" : "The nephew"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:GrandparentOf",
		"label" : "Grandparent of",
		"description" : "Being the grandparent of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Grandparent",
				"description" : "The grandparent"
			},
			{
				"key" : "mrofl:Person/mrofl:Grandchild",
				"description" : "The grandchild"
			},			
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},					
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:GrandchildOf",
		"label" : "Grandchild of",
		"description" : "Being the grandchild of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Grandchild",
				"description" : "The grandchild"
			},			
			{
				"key" : "mrofl:Person/mrofl:Grandparent",
				"description" : "The grandparent"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:NieceOfAunt",
		"label" : "Niece of",
		"description" : "A primitive NieceOfAunt",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Niece",
				"description" : "The niece"
			},
			{
				"key" : "mrofl:Person/mrofl:Aunt",
				"description" : "The aunt"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The Date when the relation started"
			}
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:NephewOfAunt",
		"label" : "Nephew of",
		"description" : "A primitive NephewOfAunt",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Nephew",
				"description" : "The nephew"
			},
			{
				"key" : "mrofl:Person/mrofl:Aunt",
				"description" : "The aunt"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The Date when the relation started"
			}
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:NieceOfUncle",
		"label" : "Niece of",
		"description" : "A primitive NieceOfUncle",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Nephew",
				"description" : "The niece"
			},
			{
				"key" : "mrofl:Person/mrofl:Aunt",
				"description" : "The uncle"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The Date when the relation started"
			}
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:NephewOfUncle",
		"label" : "Nephew of",
		"description" : "A primitive NephewOfUncle",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Nephew",
				"description" : "The nephew"
			},
			{
				"key" : "mrofl:Person/mrofl:Uncle",
				"description" : "The uncle"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The Date when the relation started"
			}
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:ParentInLaw",
		"label" : "Parent in Law of",
		"description" : "A primitive ParentInLaw",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:ParentInLaw",
				"description" : "The parent in law"
			},
			{
				"key" : "mrofl:Person/mrofl:ChildInLaw",
				"description" : "The child"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The Date when the relation started"
			},
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The Date when the relation ended"
			}
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:ChildInLaw",
		"label" : "Child in Law of",
		"description" : "A primitive ChildInLaw",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:ChildInLaw",
				"description" : "The child"
			},
			{
				"key" : "mrofl:Person/mrofl:ParentInLaw",
				"description" : "The parent in law"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The Date when the relation started"
			},
			{
				"key" : "mrofl:Date/mrofl:EndDate",
				"description" : "The Date when the relation ended"
			}
		]
	},
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:StepparentOf",
		"label" : "Step parent of",
		"description" : "Being the step parent of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Stepparent",
				"description" : "The stepparent"
			},			
			{
				"key" : "mrofl:Person/mrofl:Child",
				"description" : "The child"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},	
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:StepsiblingOf",
		"label" : "Step sibling of",
		"description" : "Being the step sibling of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Stepsibling",
				"description" : "The first stepsibling in the relation"
			},			
			{
				"key" : "mrofl:Person/mrofl:Child",
				"description" : "The second stepsibling in the relation"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},		
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:TwinOf",
		"label" : "Twin of",
		"description" : "Being the twin of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Twin",
				"description" : "The first twin in the relation"
			},			
			{
				"key" : "mrofl:Person/mrofl:Twin",
				"description" : "The second twin in the relation"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	},	
	
	{
		"_id" : "mrofl:Relation/mrofl:FamilyRelation/mrofl:CousinOf",
		"label" : "Cousin of",
		"description" : "Being the cousin of someone",
		"attributes" : [
			{
				"key" : "mrofl:Person/mrofl:Cousin",
				"description" : "The first cousin in the relation"
			},			
			{
				"key" : "mrofl:Person/mrofl:Cousin",
				"description" : "The second cousin in the relation"
			},
			{
				"key" : "mrofl:Date/mrofl:StartDate",
				"description" : "The start date of the relation"
			},			
		]
	}
]


api.getTypes([], function(response){
	
	console.log("Types:", response)
	
})

data = {}
data['items'] = JSON.stringify(items)


api.addTypes(data, function(response){
	
	console.log("sdasda", response)
	
})

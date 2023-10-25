import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from './ship/ship.entity';
import { Repository } from 'typeorm';
import { Timeout } from '@nestjs/schedule';
//===========================================================================================================

const data = [
	{
		"abbr": "AS 39",
		"name": "USS Emory S. Land",
		"base": "Apra Harbor, Guam",
		"type": "Submarine Tenders",
		"mmsi": 338808000
	},
	{
		"abbr": "AS 40",
		"name": "USS Frank Cable",
		"base": "Apra Harbor, Guam",
		"type": "Submarine Tenders",
		"mmsi": 338973000
	},
	{
		"abbr": "CG 54",
		"name": "USS Antietam",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Cruisers",
		"mmsi": 338834000
	},
	{
		"abbr": "CG 55",
		"name": "USS Leyte Gulf",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Cruisers",
		"mmsi": 368846000
	},
	{
		"abbr": "CG 58",
		"name": "USS Philippine Sea",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Cruisers",
		"mmsi": 368891000
	},
	{
		"abbr": "CG 59",
		"name": "USS Princeton",
		"base": "San Diego, California",
		"type": "Guided Missile Cruisers",
		"mmsi": 338824000
	},
	{
		"abbr": "CG 60",
		"name": "USS Normandy",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Cruisers",
		"mmsi": 338936000
	},
	{
		"abbr": "CG 62",
		"name": "USS Robert Smalls",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Cruisers",
		"mmsi": 368776000
	},
	{
		"abbr": "CG 64",
		"name": "USS Gettysburg",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Cruisers",
		"mmsi": 368879000
	},
	{
		"abbr": "CG 65",
		"name": "USS Chosin",
		"base": "San Diego, California",
		"type": "Guided Missile Cruisers",
		"mmsi": 366966000
	},
	{
		"abbr": "CG 67",
		"name": "USS Shiloh",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Cruisers",
		"mmsi": 338912000
	},
	{
		"abbr": "CG 70",
		"name": "USS Lake Erie",
		"base": "San Diego, California",
		"type": "Guided Missile Cruisers",
		"mmsi": 366967000
	},
	{
		"abbr": "CG 71",
		"name": "USS Cape St. George",
		"base": "San Diego, California",
		"type": "Guided Missile Cruisers",
		"mmsi": 368217516
	},
	{
		"abbr": "CVN 68",
		"name": "USS Nimitz",
		"base": "Bremerton, Washington",
		"type": "Aircraft Carriers",
		"mmsi": 303981000
	},
	{
		"abbr": "CVN 69",
		"name": "USS Dwight D. Eisenhower",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Aircraft Carriers",
		"mmsi": 368962000
	},
	{
		"abbr": "CVN 70",
		"name": "USS Carl Vinson",
		"base": "San Diego, California",
		"type": "Aircraft Carriers",
		"mmsi": 369970409
	},
	{
		"abbr": "CVN 71",
		"name": "USS Theodore Roosevelt",
		"base": "San Diego, California",
		"type": "Aircraft Carriers",
		"mmsi": 366984000
	},
	{
		"abbr": "CVN 72",
		"name": "USS Abraham Lincoln",
		"base": "San Diego, California",
		"type": "Aircraft Carriers",
		"mmsi": 369970406
	},
	{
		"abbr": "CVN 73",
		"name": "USS George Washington",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Aircraft Carriers",
		"mmsi": 368913000
	},
	{
		"abbr": "CVN 74",
		"name": "USS John C. Stennis",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Aircraft Carriers",
		"mmsi": 368912000
	},
	{
		"abbr": "CVN 75",
		"name": "USS Harry S. Truman",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Aircraft Carriers",
		"mmsi": 368800000
	},
	{
		"abbr": "CVN 76",
		"name": "USS Ronald Reagan",
		"base": "Yokosuka, Japan",
		"type": "Aircraft Carriers",
		"mmsi": 369970410
	},
	{
		"abbr": "CVN 77",
		"name": "USS George H.W. Bush",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Aircraft Carriers",
		"mmsi": 369970663
	},
	{
		"abbr": "CVN 78",
		"name": "USS Gerald R. Ford",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Aircraft Carriers",
		"mmsi": 338803000
	},
	{
		"abbr": "DDG 100",
		"name": "USS Kidd",
		"base": "Everett, Washington",
		"type": "Guided Missile Destroyers",
		"mmsi": 368011000
	},
	{
		"abbr": "DDG 1000",
		"name": "USS Zumwalt",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926054
	},
	{
		"abbr": "DDG 1001",
		"name": "USS Michael Monsoor",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926267
	},
	{
		"abbr": "DDG 101",
		"name": "USS Gridley",
		"base": "Everett, Washington",
		"type": "Guided Missile Destroyers",
		"mmsi": 369961000
	},
	{
		"abbr": "DDG 102",
		"name": "USS Sampson",
		"base": "Everett, Washington",
		"type": "Guided Missile Destroyers",
		"mmsi": 369867000
	},
	{
		"abbr": "DDG 103",
		"name": "USS Truxtun",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 303882000
	},
	{
		"abbr": "DDG 104",
		"name": "USS Sterett",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 369970119
	},
	{
		"abbr": "DDG 105",
		"name": "USS Dewey",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 382933000
	},
	{
		"abbr": "DDG 106",
		"name": "USS Stockdale",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 368771000
	},
	{
		"abbr": "DDG 107",
		"name": "USS Gravely",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 369970634
	},
	{
		"abbr": "DDG 108",
		"name": "USS Wayne E. Meyer",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 369970036
	},
	{
		"abbr": "DDG 109",
		"name": "USS Jason Dunham",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 369970347
	},
	{
		"abbr": "DDG 110",
		"name": "USS William P. Lawrence",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926457
	},
	{
		"abbr": "DDG 111",
		"name": "USS Spruance",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 338977000
	},
	{
		"abbr": "DDG 112",
		"name": "USS Michael Murphy",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 303966000
	},
	{
		"abbr": "DDG 113",
		"name": "USS John Finn",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926095
	},
	{
		"abbr": "DDG 114",
		"name": "USS Ralph Johnson",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926268
	},
	{
		"abbr": "DDG 115",
		"name": "USS Rafael Peralta",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926053
	},
	{
		"abbr": "DDG 116",
		"name": "USS Thomas Hudner",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 968926291
	},
	{
		"abbr": "DDG 117",
		"name": "USS Paul Ignatius",
		"base": "Rota, Spain",
		"type": "Guided Missile Destroyers",
		"mmsi": 369926407
	},
	{
		"abbr": "DDG 118",
		"name": "USS Daniel Inouye",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926540
	},
	{
		"abbr": "DDG 119",
		"name": "USS Delbert D. Black",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926569
	},
	{
		"abbr": "DDG 120",
		"name": "USS Carl M. Levin",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926693
	},
	{
		"abbr": "DDG 121",
		"name": "USS Frank E. Petersen, Jr.",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 368926310
	},
	{
		"abbr": "DDG 123",
		"name": "USS Lenah H. Sutcliffe Higbee",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 366991470
	},
	{
		"abbr": "DDG 125",
		"name": "USS Jack H. Lucas",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 366991514
	},
	{
		"abbr": "DDG 51",
		"name": "USS Arleigh Burke",
		"base": "Rota, Spain",
		"type": "Guided Missile Destroyers",
		"mmsi": 366986000
	},
	{
		"abbr": "DDG 52",
		"name": "USS Barry",
		"base": "Everett, Washington",
		"type": "Guided Missile Destroyers",
		"mmsi": 366992000
	},
	{
		"abbr": "DDG 53",
		"name": "USS John Paul Jones",
		"base": "Everett, Washington",
		"type": "Guided Missile Destroyers",
		"mmsi": 338807000
	},
	{
		"abbr": "DDG 54",
		"name": "USS Curtis Wilbur",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 368765000
	},
	{
		"abbr": "DDG 55",
		"name": "USS Stout",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 368873000
	},
	{
		"abbr": "DDG 56",
		"name": "USS John S. McCain",
		"base": "Everett, Washington",
		"type": "Guided Missile Destroyers",
		"mmsi": 368721000
	},
	{
		"abbr": "DDG 57",
		"name": "USS Mitscher",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 366996000
	},
	{
		"abbr": "DDG 58",
		"name": "USS Laboon",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 366990000
	},
	{
		"abbr": "DDG 59",
		"name": "USS Russell",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 338962000
	},
	{
		"abbr": "DDG 60",
		"name": "USS Paul Hamilton",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 338916000
	},
	{
		"abbr": "DDG 61",
		"name": "USS Ramage",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 366995000
	},
	{
		"abbr": "DDG 62",
		"name": "USS Fitzgerald",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 338839000
	},
	{
		"abbr": "DDG 63",
		"name": "USS Stethem",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 338831000
	},
	{
		"abbr": "DDG 64",
		"name": "USS Carney",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 338972000
	},
	{
		"abbr": "DDG 65",
		"name": "USS Benfold",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 338816000
	},
	{
		"abbr": "DDG 66",
		"name": "USS Gonzalez",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 368773000
	},
	{
		"abbr": "DDG 67",
		"name": "USS Cole",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 366988000
	},
	{
		"abbr": "DDG 68",
		"name": "USS The Sullivans",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 367198000
	},
	{
		"abbr": "DDG 69",
		"name": "USS Milius",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 367199000
	},
	{
		"abbr": "DDG 70",
		"name": "USS Hopper",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 367197000
	},
	{
		"abbr": "DDG 71",
		"name": "USS Ross",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 368938000
	},
	{
		"abbr": "DDG 72",
		"name": "USS Mahan",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 368972000
	},
	{
		"abbr": "DDG 73",
		"name": "USS Decatur",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 368897000
	},
	{
		"abbr": "DDG 74",
		"name": "USS McFaul",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 368896000
	},
	{
		"abbr": "DDG 75",
		"name": "USS Donald Cook",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 368895000
	},
	{
		"abbr": "DDG 76",
		"name": "USS Higgins",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 368870000
	},
	{
		"abbr": "DDG 77",
		"name": "USS O'Kane",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 338999000
	},
	{
		"abbr": "DDG 78",
		"name": "USS Porter",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 366974000
	},
	{
		"abbr": "DDG 79",
		"name": "USS Oscar Austin",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 338847000
	},
	{
		"abbr": "DDG 80",
		"name": "USS Roosevelt",
		"base": "Rota, Spain",
		"type": "Guided Missile Destroyers",
		"mmsi": 338822000
	},
	{
		"abbr": "DDG 81",
		"name": "USS Winston S. Churchill",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 338821000
	},
	{
		"abbr": "DDG 82",
		"name": "USS Lassen",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 338812000
	},
	{
		"abbr": "DDG 83",
		"name": "USS Howard",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 303852000
	},
	{
		"abbr": "DDG 84",
		"name": "USS Bulkeley",
		"base": "Rota, Spain",
		"type": "Guided Missile Destroyers",
		"mmsi": 303870000
	},
	{
		"abbr": "DDG 85",
		"name": "USS McCampbell",
		"base": "Everett, Washington",
		"type": "Guided Missile Destroyers",
		"mmsi": 303891000
	},
	{
		"abbr": "DDG 86",
		"name": "USS Shoup",
		"base": "Yokosuka, Japan",
		"type": "Guided Missile Destroyers",
		"mmsi": 368006000
	},
	{
		"abbr": "DDG 87",
		"name": "USS Mason",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 369918000
	},
	{
		"abbr": "DDG 88",
		"name": "USS Preble",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 389908000
	},
	{
		"abbr": "DDG 89",
		"name": "USS Mustin",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 369921000
	},
	{
		"abbr": "DDG 90",
		"name": "USS Chafee",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 369933000
	},
	{
		"abbr": "DDG 91",
		"name": "USS Pinckney",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 369939000
	},
	{
		"abbr": "DDG 92",
		"name": "USS Momsen",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 369950000
	},
	{
		"abbr": "DDG 93",
		"name": "USS Chung-Hoon",
		"base": "Pearl Harbor, Hawaii",
		"type": "Guided Missile Destroyers",
		"mmsi": 369952000
	},
	{
		"abbr": "DDG 94",
		"name": "USS Nitze",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 386386420
	},
	{
		"abbr": "DDG 95",
		"name": "USS James E. Williams",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 369962000
	},
	{
		"abbr": "DDG 96",
		"name": "USS Bainbridge",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 369977000
	},
	{
		"abbr": "DDG 97",
		"name": "USS Halsey",
		"base": "San Diego, California",
		"type": "Guided Missile Destroyers",
		"mmsi": 369970407
	},
	{
		"abbr": "DDG 98",
		"name": "USS Forrest Sherman",
		"base": "Norfolk, Virginia",
		"type": "Guided Missile Destroyers",
		"mmsi": 369980000
	},
	{
		"abbr": "DDG 99",
		"name": "USS Farragut",
		"base": "Mayport, Florida",
		"type": "Guided Missile Destroyers",
		"mmsi": 369993000
	},
	{
		"abbr": "ESB 3",
		"name": "USS Lewis B. Puller",
		"base": "Hidd, Bahrain",
		"type": "Expeditionary Sea Base",
		"mmsi": 369464000
	},
	{
		"abbr": "ESB 4",
		"name": "USS Hershel \"Woody\" Williams",
		"base": "Souda Bay, Greece",
		"type": "Expeditionary Sea Base",
		"mmsi": 368926087
	},
	{
		"abbr": "ESB 5",
		"name": "USS Miguel Keith",
		"base": "Apra Harbor, Guam",
		"type": "Expeditionary Sea Base",
		"mmsi": 368926390
	},
	{
		"abbr": "LCC 19",
		"name": "USS Blue Ridge",
		"base": "Yokosuka, Japan",
		"type": "Amphibious Command Ships",
		"mmsi": 369970669
	},
	{
		"abbr": "LCC 20",
		"name": "USS Mount Whitney",
		"base": "Gaeta, Italy",
		"type": "Amphibious Command Ships",
		"mmsi": 369978000
	},
	{
		"abbr": "LCS 10",
		"name": "USS Gabrielle Giffords",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 368926014
	},
	{
		"abbr": "LCS 12",
		"name": "USS Omaha",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 368926056
	},
	{
		"abbr": "LCS 13",
		"name": "USS Wichita",
		"base": "Mayport, Florida",
		"type": "Littoral Combat Ships",
		"mmsi": 369970969
	},
	{
		"abbr": "LCS 14",
		"name": "USS Manchester",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 368926079
	},
	{
		"abbr": "LCS 15",
		"name": "USS Billings",
		"base": "Mayport, Florida",
		"type": "Littoral Combat Ships",
		"mmsi": 368926295
	},
	{
		"abbr": "LCS 16",
		"name": "USS Tulsa",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 368926114
	},
	{
		"abbr": "LCS 17",
		"name": "USS Indianapolis",
		"base": "Mayport, Florida",
		"type": "Littoral Combat Ships",
		"mmsi": 368926296
	},
	{
		"abbr": "LCS 18",
		"name": "USS Charleston",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 368926271
	},
	{
		"abbr": "LCS 19",
		"name": "USS St. Louis",
		"base": "Mayport, Florida",
		"type": "Littoral Combat Ships",
		"mmsi": 368926297
	},
	{
		"abbr": "LCS 21",
		"name": "USS Minneapolis-St. Paul",
		"base": "Mayport, Florida",
		"type": "Littoral Combat Ships",
		"mmsi": 368926299
	},
	{
		"abbr": "LCS 22",
		"name": "USS Kansas City",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 368872000
	},
	{
		"abbr": "LCS 23",
		"name": "USS Cooperstown",
		"base": "Mayport, Florida",
		"type": "Littoral Combat Ships",
		"mmsi": 368926298
	},
	{
		"abbr": "LCS 24",
		"name": "USS Oakland",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 303889000
	},
	{
		"abbr": "LCS 25",
		"name": "USS Marinette",
		"base": "Mayport, Florida",
		"type": "Littoral Combat Ships",
		"mmsi": 36926403
	},
	{
		"abbr": "LCS 26",
		"name": "USS Mobile",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 367999000
	},
	{
		"abbr": "LCS 28",
		"name": "USS Savannah",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 303879000
	},
	{
		"abbr": "LCS 3",
		"name": "USS Fort Worth",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 369970588
	},
	{
		"abbr": "LCS 30",
		"name": "USS Canberra",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 338845000
	},
	{
		"abbr": "LCS 32",
		"name": "USS Santa Barbara",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 366975000
	},
	{
		"abbr": "LCS 34",
		"name": "USS Augusta",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 366998000
	},
	{
		"abbr": "LCS 6",
		"name": "USS Jackson",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 369970885
	},
	{
		"abbr": "LCS 8",
		"name": "USS Montgomery",
		"base": "San Diego, California",
		"type": "Littoral Combat Ships",
		"mmsi": 369970910
	},
	{
		"abbr": "LHA 6",
		"name": "USS America",
		"base": "Sasebo, Japan",
		"type": "Amphibious Assault Ships",
		"mmsi": 369970739
	},
	{
		"abbr": "LHA 7",
		"name": "USS Tripoli",
		"base": "San Diego, California",
		"type": "Amphibious Assault Ships",
		"mmsi": 368926570
	},
	{
		"abbr": "LHD 1",
		"name": "USS Wasp",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Assault Ships",
		"mmsi": 369970799
	},
	{
		"abbr": "LHD 2",
		"name": "USS Essex",
		"base": "San Diego, California",
		"type": "Amphibious Assault Ships",
		"mmsi": 368779000
	},
	{
		"abbr": "LHD 3",
		"name": "USS Kearsarge",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Assault Ships",
		"mmsi": 368702000
	},
	{
		"abbr": "LHD 4",
		"name": "USS Boxer",
		"base": "San Diego, California",
		"type": "Amphibious Assault Ships",
		"mmsi": 368710000
	},
	{
		"abbr": "LHD 5",
		"name": "USS Bataan",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Assault Ships",
		"mmsi": 368958000
	},
	{
		"abbr": "LHD 7",
		"name": "USS Iwo Jima",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Assault Ships",
		"mmsi": 338813000
	},
	{
		"abbr": "LHD 8",
		"name": "USS Makin Island",
		"base": "San Diego, California",
		"type": "Amphibious Assault Ships",
		"mmsi": 369970689
	},
	{
		"abbr": "LPD 17",
		"name": "USS San Antonio",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970631
	},
	{
		"abbr": "LPD 18",
		"name": "USS New Orleans",
		"base": "Sasebo, Japan",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970662
	},
	{
		"abbr": "LPD 19",
		"name": "USS Mesa Verde",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970397
	},
	{
		"abbr": "LPD 20",
		"name": "USS Green Bay",
		"base": "Sasebo, Japan",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970636
	},
	{
		"abbr": "LPD 21",
		"name": "USS New York",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970522
	},
	{
		"abbr": "LPD 22",
		"name": "USS San Diego",
		"base": "San Diego, California",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970638
	},
	{
		"abbr": "LPD 23",
		"name": "USS Anchorage",
		"base": "San Diego, California",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970637
	},
	{
		"abbr": "LPD 24",
		"name": "USS Arlington",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970719
	},
	{
		"abbr": "LPD 25",
		"name": "USS Somerset",
		"base": "San Diego, California",
		"type": "Amphibious Transport Dock",
		"mmsi": 369970850
	},
	{
		"abbr": "LPD 26",
		"name": "USS John P. Murtha",
		"base": "San Diego, California",
		"type": "Amphibious Transport Dock",
		"mmsi": 368926266
	},
	{
		"abbr": "LPD 27",
		"name": "USS Portland",
		"base": "San Diego, California",
		"type": "Amphibious Transport Dock",
		"mmsi": 368926288
	},
	{
		"abbr": "LPD 28",
		"name": "USS Fort Lauderdale",
		"base": "Norfolk, Virginia, U.S.A.",
		"type": "Amphibious Transport Dock",
		"mmsi": 369914078
	},
	{
		"abbr": "LSD 42",
		"name": "USS Germantown",
		"base": "San Diego, California",
		"type": "Dock Landing Ships",
		"mmsi": 368801000
	},
	{
		"abbr": "LSD 44",
		"name": "USS Gunston Hall",
		"base": "Little Creek, Virginia",
		"type": "Dock Landing Ships",
		"mmsi": 368869000
	},
	{
		"abbr": "LSD 45",
		"name": "USS Comstock",
		"base": "San Diego, California",
		"type": "Dock Landing Ships",
		"mmsi": 338805000
	},
	{
		"abbr": "LSD 47",
		"name": "USS Rushmore",
		"base": "Sasebo, Japan",
		"type": "Dock Landing Ships",
		"mmsi": 368948000
	},
	{
		"abbr": "LSD 48",
		"name": "USS Ashland",
		"base": "San Diego, California",
		"type": "Dock Landing Ships",
		"mmsi": 368921000
	},
	{
		"abbr": "LSD 49",
		"name": "USS Harpers Ferry",
		"base": "San Diego, California",
		"type": "Dock Landing Ships",
		"mmsi": 338830000
	},
	{
		"abbr": "LSD 50",
		"name": "USS Carter Hall",
		"base": "Little Creek, Virginia",
		"type": "Dock Landing Ships",
		"mmsi": 368940000
	},
	{
		"abbr": "LSD 51",
		"name": "USS Oak Hill",
		"base": "Little Creek, Virginia",
		"type": "Dock Landing Ships",
		"mmsi": 368928000
	},
	{
		"abbr": "LSD 52",
		"name": "USS Pearl Harbor",
		"base": "San Diego, California",
		"type": "Dock Landing Ships",
		"mmsi": 368786000
	},
	{
		"abbr": "MCM 10",
		"name": "USS Warrior",
		"base": "Sasebo, Japan",
		"type": "Mine Countermeasures Ships",
		"mmsi": 368715000
	},
	{
		"abbr": "MCM 11",
		"name": "USS Gladiator",
		"base": "Manama, Bahrain",
		"type": "Mine Countermeasures Ships",
		"mmsi": 368966000
	},
	{
		"abbr": "MCM 14",
		"name": "USS Chief",
		"base": "Sasebo, Japan",
		"type": "Mine Countermeasures Ships",
		"mmsi": 338968000
	},
	{
		"abbr": "MCM 3",
		"name": "USS Sentry",
		"base": "Manama, Bahrain",
		"type": "Mine Countermeasures Ships",
		"mmsi": 368716000
	},
	{
		"abbr": "MCM 6",
		"name": "USS Devastator",
		"base": "Manama, Bahrain",
		"type": "Mine Countermeasures Ships",
		"mmsi": 366991436
	},
	{
		"abbr": "MCM 7",
		"name": "USS Patriot",
		"base": "Sasebo, Japan",
		"type": "Mine Countermeasures Ships",
		"mmsi": 36968098
	},
	{
		"abbr": "MCM 9",
		"name": "USS Pioneer",
		"base": "Sasebo, Japan",
		"type": "Mine Countermeasures Ships",
		"mmsi": 303821000
	},
	{
		"abbr": "SSBN 737",
		"name": "USS Kentucky",
		"base": "Bangor, Washington",
		"type": "Ballistic Missile Submarines",
		"mmsi": 369970186
	},
	{
		"abbr": "SSBN 740",
		"name": "USS Rhode Island",
		"base": "Kings Bay, Georgia",
		"type": "Ballistic Missile Submarines",
		"mmsi": 369970218
	},
	{
		"abbr": "SSBN 742",
		"name": "USS Wyoming",
		"base": "Kings Bay, Georgia",
		"type": "Ballistic Missile Submarines",
		"mmsi": 369970231
	},
	{
		"abbr": "SSBN 743",
		"name": "USS Louisiana",
		"base": "Bangor, Washington",
		"type": "Ballistic Missile Submarines",
		"mmsi": 369970198
	},
	{
		"abbr": "SSGN 726",
		"name": "USS Ohio",
		"base": "Bangor, Washington",
		"type": "Guided Missile Submarines",
		"mmsi": 369970210
	},
	{
		"abbr": "SSGN 727",
		"name": "USS Michigan",
		"base": "Bangor, Washington",
		"type": "Guided Missile Submarines",
		"mmsi": 369970203
	},
	{
		"abbr": "SSGN 728",
		"name": "USS Florida",
		"base": "Kings Bay, Georgia",
		"type": "Guided Missile Submarines",
		"mmsi": 369970157
	},
	{
		"abbr": "SSGN 729",
		"name": "USS Georgia",
		"base": "Kings Bay, Georgia",
		"type": "Guided Missile Submarines",
		"mmsi": 369970181
	},
	{
		"abbr": "SSN 21",
		"name": "USS Seawolf",
		"base": "Bangor, Washington",
		"type": "Attack Submarines",
		"mmsi": 369970222
	},
	{
		"abbr": "SSN 22",
		"name": "USS Connecticut",
		"base": "Bremerton, Washington",
		"type": "Attack Submarines",
		"mmsi": 369970178
	},
	{
		"abbr": "SSN 23",
		"name": "USS Jimmy Carter",
		"base": "Bangor, Washington",
		"type": "Attack Submarines",
		"mmsi": 369000020
	},
	{
		"abbr": "SSN 725",
		"name": "USS Helena",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 369970185
	},
	{
		"abbr": "SSN 750",
		"name": "USS Newport News",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970208
	},
	{
		"abbr": "SSN 751",
		"name": "USS San Juan",
		"base": "Bremerton, Washington",
		"type": "Attack Submarines",
		"mmsi": 369970219
	},
	{
		"abbr": "SSN 752",
		"name": "USS Pasadena",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 369970213
	},
	{
		"abbr": "SSN 753",
		"name": "USS Albany",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 369970163
	},
	{
		"abbr": "SSN 754",
		"name": "USS Topeka",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970227
	},
	{
		"abbr": "SSN 756",
		"name": "USS Scranton",
		"base": "San Diego, California",
		"type": "Attack Submarines",
		"mmsi": 369970221
	},
	{
		"abbr": "SSN 757",
		"name": "USS Alexandria",
		"base": "San Diego, California",
		"type": "Attack Submarines",
		"mmsi": 369970165
	},
	{
		"abbr": "SSN 758",
		"name": "USS Asheville",
		"base": "Apra Harbor, Guam",
		"type": "Attack Submarines",
		"mmsi": 369970167
	},
	{
		"abbr": "SSN 759",
		"name": "USS Jefferson City",
		"base": "Apra Harbor, Guam",
		"type": "Attack Submarines",
		"mmsi": 369970191
	},
	{
		"abbr": "SSN 760",
		"name": "USS Annapolis",
		"base": "Apra Harbor, Guam",
		"type": "Attack Submarines",
		"mmsi": 369970172
	},
	{
		"abbr": "SSN 761",
		"name": "USS Springfield",
		"base": "Apra Harbor, Guam",
		"type": "Attack Submarines",
		"mmsi": 369970223
	},
	{
		"abbr": "SSN 762",
		"name": "USS Columbus",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970177
	},
	{
		"abbr": "SSN 763",
		"name": "USS Santa Fe",
		"base": "San Diego, California",
		"type": "Attack Submarines",
		"mmsi": 369970220
	},
	{
		"abbr": "SSN 764",
		"name": "USS Boise",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 369970169
	},
	{
		"abbr": "SSN 767",
		"name": "USS Hampton",
		"base": "San Diego, California",
		"type": "Attack Submarines",
		"mmsi": 369970183
	},
	{
		"abbr": "SSN 768",
		"name": "USS Hartford",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970184
	},
	{
		"abbr": "SSN 769",
		"name": "USS Toledo",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970226
	},
	{
		"abbr": "SSN 770",
		"name": "USS Tucson",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970228
	},
	{
		"abbr": "SSN 771",
		"name": "USS Columbia",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970176
	},
	{
		"abbr": "SSN 773",
		"name": "USS Cheyenne",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970173
	},
	{
		"abbr": "SSN 774",
		"name": "USS Virginia",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970229
	},
	{
		"abbr": "SSN 775",
		"name": "USS Texas",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970225
	},
	{
		"abbr": "SSN 776",
		"name": "USS Hawaii",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970158
	},
	{
		"abbr": "SSN 777",
		"name": "USS North Carolina",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970159
	},
	{
		"abbr": "SSN 778",
		"name": "USS New Hampshire",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 369970008
	},
	{
		"abbr": "SSN 779",
		"name": "USS New Mexico",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 369970012
	},
	{
		"abbr": "SSN 780",
		"name": "USS Missouri",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970326
	},
	{
		"abbr": "SSN 781",
		"name": "USS California",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970327
	},
	{
		"abbr": "SSN 782",
		"name": "USS Mississippi",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970328
	},
	{
		"abbr": "SSN 783",
		"name": "USS Minnesota",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 369970641
	},
	{
		"abbr": "SSN 784",
		"name": "USS North Dakota",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970642
	},
	{
		"abbr": "SSN 785",
		"name": "USS John Warner",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 369970640
	},
	{
		"abbr": "SSN 786",
		"name": "USS Illinois",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 368926259
	},
	{
		"abbr": "SSN 787",
		"name": "USS Washington",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 369970958
	},
	{
		"abbr": "SSN 788",
		"name": "USS Colorado",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970959
	},
	{
		"abbr": "SSN 789",
		"name": "USS Indiana",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 369970960
	},
	{
		"abbr": "SSN 790",
		"name": "USS South Dakota",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 368926327
	},
	{
		"abbr": "SSN 791",
		"name": "USS Delaware",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 368926463
	},
	{
		"abbr": "SSN 792",
		"name": "USS Vermont",
		"base": "Pearl Harbor, Hawaii",
		"type": "Attack Submarines",
		"mmsi": 368926486
	},
	{
		"abbr": "SSN 793",
		"name": "USS Oregon",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 368926612
	},
	{
		"abbr": "SSN 794",
		"name": "USS Montana",
		"base": "Norfolk, Virginia",
		"type": "Attack Submarines",
		"mmsi": 368926664
	},
	{
		"abbr": "SSN 795",
		"name": "USS Hyman G. Rickover",
		"base": "Groton, Connecticut",
		"type": "Attack Submarines",
		"mmsi": 366991465
	}
]

const data2 = [
	{
		"abbr": "SD 2010",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338431551
	},
	{
		"abbr": "SD 2011",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338431561
	},
	{
		"abbr": "SD 2012",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338431562
	},
	{
		"abbr": "SD 2013",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338432775
	},
	{
		"abbr": "SD 2014",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338432776
	},
	{
		"abbr": "SD 2015",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338432777
	},
	{
		"abbr": "SD 2016",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338432779
	},
	{
		"abbr": "SD 2017",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338432781
	},
	{
		"abbr": "SD 2018",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338432783
	},
	{
		"abbr": "SD 2019",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338432785
	},
	{
		"abbr": "SD 2020",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338432787
	},
	{
		"abbr": "SD 2021",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434814
	},
	{
		"abbr": "SD 2022",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434815
	},
	{
		"abbr": "SD 2023",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434837
	},
	{
		"abbr": "SD 2024",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434838
	},
	{
		"abbr": "SD 2025",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434844
	},
	{
		"abbr": "SD 2026",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434845
	},
	{
		"abbr": "SD 2027",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434847
	},
	{
		"abbr": "SD 2028",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434848
	},
	{
		"abbr": "SD 2029",
		"name": "USV",
		"base": "n/a",
		"type": "Saildrone Voyager",
		"mmsi": 338434851
	},
]


@Injectable()
export class AppService {

	constructor(
		@InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
	) { }

	getHello(): string {
		return 'Hello World!';
	}


	//@Timeout(3000)
	async handleTimeout() {

		for (let item of data2) {

			const shipData = {
				mmsi: item.mmsi,
				name: item.name,
				base: item.base,
				acronym: item.abbr,
				type: item.type
			}
			await this.shipRepository.save(shipData);
		}

	}
}

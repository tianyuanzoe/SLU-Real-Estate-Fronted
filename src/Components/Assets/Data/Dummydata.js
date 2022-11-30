// Assets
import image1 from "../image1.jpg";
import image2 from "../image2.jpg";
import image3 from "../image3.jpg";
import image4 from "../image4.jpg";
import image5 from "../image5.jpg";
import image6 from "../image6.jpg";
import image7 from "../image7.jpg";
import image8 from "../image8.jpg";
import image9 from "../image9.jpg";
import image10 from "../image10.jpg";
import image11 from "../image11.jpg";
import image12 from "../image12.jpg";
import image13 from "../image13.jpg";
import image14 from "../image14.jpg";
import image15 from "../image15.jpg";
import image16 from "../image16.jpg";

const myListings = [
	{
		id: 1,
		title: "Apartment for rent in Camden",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Camden",
		property_status: "Rent",
		price: 410000,
		rental_frequency: "Day",
		rooms: 4,
		furnished: false,
		pool: false,
		elevator: true,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [47.620190690226345, -122.33202472004675],
		},
		picture1: image3,
	},
	{
		id: 2,
		title: "House for sale in Islington",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Islington",
		property_status: "Sale",
		price: 35000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [47.624359847259996, -122.33023306803365],
		},
		picture1: image1,
	},
	{
		id: 3,
		title: "House for sale in Ealing",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Ealing",
		property_status: "Sale",
		price: 35000000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: false,
		elevator: false,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [47.62062508360973, -122.33309914921774],
		},
		picture1: image5,
	},
	{
		id: 4,
		title: "Office for sale in Lambeth",
		listing_type: "Office",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Lambeth",
		property_status: "Sale",
		price: 2000000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: false,
		elevator: true,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [47.617405245619544, -122.3374665110221],
		},
		picture1: image4,
	},

	{
		id: 5,
		title: "House for sale in Enfield",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Enfield",
		property_status: "Sale",
		price: 5000000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [47.61794117184253, -122.33169136672358],
		},
		picture1: image7,
	},

	{
		id: 6,
		title: "Apartment for rent in Barnet",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Barnet",
		property_status: "Rent",
		price: 150,
		rental_frequency: "Day",
		rooms: 4,
		furnished: false,
		pool: true,
		elevator: true,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [47.62455326161261, -122.32623826765551],
		},
		picture1: image12,
	},

	{
		id: 7,
		title: "Apartment for rent in Bexley",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Bexley",
		property_status: "Rent",
		price: 3600,
		rental_frequency: "Month",
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: true,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [47.6204305272073, -122.32675761051246],
		},
		picture1: image15,
	},

	{
		id: 8,
		title: "Office for rent in Croydon",
		listing_type: "Office",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Croydon",
		property_status: "Rent",
		price: 750,
		rental_frequency: "Week",
		rooms: 4,
		furnished: true,
		pool: false,
		elevator: true,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [51.381870798317266, -0.10379988107433152],
		},
		picture1: image2,
	},

	{
		id: 9,
		title: "House for sale in Hounslow",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Hounslow",
		property_status: "Sale",
		price: 650000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [51.462524898313, -0.37050279898417415],
		},
		picture1: image8,
	},

	{
		id: 10,
		title: "Apartment for sale in Hackney",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Hackney",
		property_status: "Sale",
		price: 150000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [51.552498305814616, -0.047976472350245256],
		},
		picture1: image16,
	},

	{
		id: 11,
		title: "House for rent in Bromley",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Bromley",
		property_status: "Rent",
		price: 500,
		rental_frequency: "Day",
		rooms: 4,
		furnished: true,
		pool: false,
		elevator: false,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [51.41817844947587, 0.010381344327546399],
		},
		picture1: image10,
	},

	{
		id: 12,
		title: "Office for sale in Merton",
		listing_type: "Office",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Merton",
		property_status: "Sale",
		price: 25000000,
		rental_frequency: null,
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [51.417642743624164, -0.18389246063474793],
		},
		picture1: image14,
	},

	{
		id: 13,
		title: "House for sale in Havering",
		listing_type: "House",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Havering",
		property_status: "Sale",
		price: 1000000,
		rental_frequency: null,
		rooms: 4,
		furnished: false,
		pool: true,
		elevator: false,
		cctv: true,
		parking: true,
		location: {
			type: "Point",
			coordinates: [51.5523192864514, 0.25604463764059254],
		},
		picture1: image9,
	},

	{
		id: 14,
		title: "Apartment for rent in Wandsworth",
		listing_type: "Apartment",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Wandsworth",
		property_status: "Rent",
		price: 2500,
		rental_frequency: "Week",
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: false,
		cctv: true,
		parking: false,
		location: {
			type: "Point",
			coordinates: [47.61779825892584, -122.3313643899444],
		},
		picture1: image1,
	},

	{
		id: 15,
		title: "Office for rent in Redbridge",
		listing_type: "Office",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Redbridge",
		property_status: "Rent",
		price: 5000,
		rental_frequency: "Month",
		rooms: 4,
		furnished: true,
		pool: true,
		elevator: true,
		cctv: false,
		parking: true,
		location: {
			type: "Point",
			coordinates: [47.62256972237605, -122.32909465297023],
		},
		picture1: image6,
	},
];

export default myListings;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mapHandler = __webpack_require__(1);

var map = _interopRequireWildcard(_mapHandler);

var _interfaceHandler = __webpack_require__(4);

var ui = _interopRequireWildcard(_interfaceHandler);

var _radio = __webpack_require__(5);

var radio = _interopRequireWildcard(_radio);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//---CSS
map.init(); //---SCRIPTS

radio.init();
ui.init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _data = __webpack_require__(2);

var all_events_2017 = _interopRequireWildcard(_data);

var _data2 = __webpack_require__(3);

var all_events_2016 = _interopRequireWildcard(_data2);

var _data3 = __webpack_require__(6);

var all_events_2018 = _interopRequireWildcard(_data3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _exports = module.exports = {};

var all_events;

var map, buttons;
var holder, title, time, place, description, banner, header;
var current_id;

var zoomer, canvas;

var first_floor, ground_floor;
var current_floor = 0;

function isMobile() {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
				return true;
		} else {
				return false;
		}
}

var mobile_h = 800;
var mobile_w = 975;

_exports.init = function () {
		if (YEAR != undefined) initMap();
};

function initMap() {
		//load data
		if (YEAR == 2016) {
      all_events = all_events_2016;
    } else if (YEAR == 2017) {
      all_events = all_events_2017;
    } else if (YEAR == 2018) {
      all_events = all_events_2018;
    }

		canvas = document.getElementById('myCanvas');
		banner = document.getElementById('banner');
		header = document.getElementById('header');
		// Create an empty project and a view for the canvas:
		paper.setup(canvas);

		$('#first_floor').on('click', switchMap);
		$('#ground_floor').on('click', switchMap);

		holder = document.getElementById('info');
		title = document.getElementById('title');
		time = document.getElementById('time');
		place = document.getElementById('place');
		description = document.getElementById('description');

		paper.project.importSVG("../dist/svg/"+YEAR+"/ground_floor.svg", function (item, origin) {
				ground_floor = item;
				buttons = ground_floor.children.Buttons.children;

				if (!isMobile()) {
						paper.project.view.zoom = 0.75;
						canvas.style.top = '-8%';
						canvas.style.left = '-10%';
						ground_floor.bounds.width = window.innerWidth * 0.8;
						ground_floor.bounds.height = window.innerHeight;'';
				} else {
						ground_floor.bounds.width = mobile_w;
						ground_floor.bounds.height = mobile_h;
				}

				for (var i = 0; i < buttons.length; i++) {
						buttons[i].onMouseDown = handleButton;
				}

				ground_floor.visible = true;
		});

		paper.project.importSVG("../dist/svg/"+YEAR+"/first_floor.svg", function (item, origin) {
				first_floor = item;
				buttons = first_floor.children.Buttons.children;

				if (!isMobile()) {
						first_floor.bounds.width = window.innerWidth * 0.8;
						first_floor.bounds.height = window.innerHeight;
				} else {
						canvas.style.top = '4%';
						canvas.style.left = '2%';
						canvas.style.width = '98%';
						first_floor.bounds.width = mobile_w;
						first_floor.bounds.height = mobile_h;
				}

				for (var i = 0; i < buttons.length; i++) {
						buttons[i].onMouseDown = handleButton;
				}

				first_floor.visible = false;
		});

		// Set initial position.
		canvas.style.position = 'absolute'; // 'absolute' also works.
		// canvas.addEventListener('touchstart', dragStart);
		// canvas.addEventListener('touchmove',  dragMove);
}

function switchMap() {
		canvas.style.opacity = 0;
		toggleFloorText();
		setTimeout(toggleVisibility, 500);
		setTimeout(function () {
				canvas.style.opacity = 1;
		}, 525);
}

function toggleFloorText() {
		if (current_floor == 0) {
				$('#ground_floor').css('opacity', 0.3);
				$('#first_floor').css('opacity', 1);
		} else {
				$('#ground_floor').css('opacity', 1);
				$('#first_floor').css('opacity', 0.3);
		}
}

//TODO clean this up :(
function handleButton(event) {
		var clicked_id = event.target.name.replace('_x3', '');
		clicked_id = clicked_id.replace('_', '');
		if (clicked_id.length > 2 && clicked_id.indexOf('_') > -1) clicked_id = clicked_id.substring(0, clicked_id.length - 2);

		clicked_id = clicked_id.replace('_', '');

		if (clicked_id == current_id) return;

		loadData(clicked_id);
}

function loadData(clicked_id) {
		for (var i = 0; i < all_events.data.length; i++) {
				if (all_events.data[i].number == clicked_id) {
						current_id = clicked_id;
						populate(all_events.data[i]);
						return;
				}
		}
}

function populate(info) {

		if (holder.style.opacity != 1) {
				holder.style.display = "block";
				holder.style.opacity = 1;
		}

		var c = ('rgb(' + info.color.r + ',' + info.color.g + ',' + info.color.b + ');').toString();

		banner.setAttribute('style', 'background-color: ' + c + ';');
		header.innerText = info.program;

		hideContent();

		setTimeout(function () {
				title.innerHTML = info.title;
				time.innerHTML = info.timing;
				place.innerHTML = info.location;
				description.innerHTML = info.description;
		}, 500);

    holder.setAttribute('style', 'color: ' + c + '; border-color:' + c);
    var hr = document.getElementsByTagName('hr');
    for (var i = 0; i < hr.length; i++) {
        hr[i].setAttribute('style', 'background-color: ' + c);
        hr[i].style.opacity = 0;
    }

		setTimeout(showContent, 500);
}

function showContent() {
		var hr = document.getElementsByTagName('hr');
		for (var i = 0; i < hr.length; i++) {
				hr[i].style.opacity = 1;
		}

		title.style.opacity = 1;
		time.style.opacity = 1;
		place.style.opacity = 1;
		description.style.opacity = 1;
}

function hideContent() {
		var hr = document.getElementsByTagName('hr');
		for (var i = 0; i < hr.length; i++) {
				hr[i].style.opacity = 0;
		}

		title.style.opacity = 0;
		time.style.opacity = 0;
		place.style.opacity = 0;
		description.style.opacity = 0;
}

function toggleVisibility() {
		if (current_floor == 0) {
				ground_floor.visible = false;
				first_floor.visible = true;
				current_floor = 1;
		} else {
				first_floor.visible = false;
				ground_floor.visible = true;
				current_floor = 0;
		}
}

var targetStartX, targetStartY, touchStartX, touchStartY;
function dragStart(e) {
		targetStartX = parseInt(e.target.style.left);
		targetStartY = parseInt(e.target.style.top);
		touchStartX = e.touches[0].pageX;
		touchStartY = e.touches[0].pageY;
}

function dragMove(e) {
		// Calculate touch offsets
		var touchOffsetX = e.touches[0].pageX - touchStartX,
		    touchOffsetY = e.touches[0].pageY - touchStartY;
		// Add touch offsets to original target coordinates,
		// then assign them to target element's styles.
		e.target.style.left = targetStartX + touchOffsetX + 'px';
		e.target.style.top = targetStartY + touchOffsetY + 'px';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports = module.exports = {};

// 2017 data
_exports.data = [
//***** GREEN BUTTONS - FILM *****
{
	_id: "green41",
	category: "Exhibitions & Showcases",
	number: "41",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "What Degas Saw",
	location: "Rm. 019 - Editing Lab",
	timing: "6 - 8pm",
	description: "Exhibition of children’s books created by students in the Sound, Image, Story class and inspired by the book What Degas Saw and the experiences they had upon first arrival in Abu Dhabi.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "red54",
	category: "Exhibitions & Showcases",
	number: "54",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Capturing Science",
	location: "Costume Shop Hallway",
	timing: "6 - 8pm",
	description: "Exhibition of photographs created by Science and Art students who participated in a three-day workshop with award-winning Science Photographer Enrico Sacchetti. Images showcase our Science laboratories and demonstrate how to look at science and technology with the eye of an abstract artist.",
	program: "Vis Arts",
	tags: ["visarts"],
	floor: "first"
}, {
	_id: "pink55",
	category: "Exhibitions & Showcases",
	number: "55",
	color: {
		name: "pink",
		r: 251,
		g: 75,
		b: 152
	},
	title: "Digital Curation",
	location: "Rm. 118",
	timing: "6 - 8pm",
	description: "The students of CADT-UH 1018 (Digital Curation) will present drafts of their project curating some aspect of open cultural data in web published multimedia essays using Omeka and Neatline.",
	program: "Interactive Media",
	tags: ["im"],
	floor: "first"
}, {
	_id: "green16",
	category: "Installations",
	number: "16",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "Be In The Spotlight!!!",
	location: "In front of the Equipment Center",
	timing: "6 - 8pm",
	description: "If you have never been on a film set you surely need to come and take a seat. Bring your phone with you. It's the time for some fancy and amazing selfies.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "green34",
	category: "Open Studios",
	number: "34",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "Cool Kit: NYUAD Film Gear",
	location: "In front of the Equipment Center",
	timing: "6 - 8pm",
	description: "Visit our Equipment Center to see and learn more about the amazing filmmaking and photography equipment available to NYUAD arts students.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "green24",
	category: "Screenings",
	number: "24",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "'Film and New Media' Makes Films!",
	location: "Room 101 - Basement Screening ",
	timing: "6 - 8pm",
	description: "A selection of films will be screened from each of the Film and New Media practice classes, including Sound Image Story, Intermediate Film, Directing the Non-Actor, Docu-Fiction and Capstone Projects. Located on the B1 level directly below the Red Theater.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "green27",
	category: "Workshops & Demos",
	number: "27",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "Acting for the Camera with Scandar Copti",
	location: "Rm. 006 - MultiPurpose Room",
	timing: "6 - 8pm",
	description: "Join Prof Scandar Copti for a series of Singular Drama acting exercises. No experience necessary!",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "green29",
	category: "Workshops & Demos",
	number: "29",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "Traveling By Green Screen",
	location: "Rm. 021 - Green Screen Stage",
	timing: "6 - 8pm",
	description: "Travel to exotic lands while staying in the studio. Learn how chroma key technology works as a special effect for film and video.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "green28",
	category: "Workshops & Demos",
	number: "28",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "Lights, Camera, Action",
	location: "Rm. 025 - Sound Stage",
	timing: "6 - 8pm",
	description: "Visit our purpose built set in the Sound Stage which will be equipped with professional lights cameras and lights. Watch the action or take part as an actor or member of our production crew.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
},

//***** YELLOW BUTTONS - INTERACTIVE MEDIA *****
{
	_id: "pink42",
	category: "Exhibitions & Showcases",
	number: "42",
	color: {
		name: "pink",
		r: 251,
		g: 75,
		b: 152
	},
	title: "Alternate Realities",
	location: "Rm. 153 - Interactive Media Classroom",
	timing: "6 - 8pm",
	description: "Experience virtual realities created by Interactive Media students! These will range from space exploration to drifting in memories and powered by the latest VR technology.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
}, {
	_id: "pink17",
	category: "Installations",
	number: "17",
	color: {
		name: "pink",
		r: 251,
		g: 75,
		b: 152
	},
	title: "Lumarca",
	location: "Rm. 029 - Interactive Media Lab",
	timing: "6 - 8pm",
	description: "Come see the Lumarca, an amazing project that uses projection on a cube of strings to create three dimensional images in motion.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "ground"
}, {
	_id: "pink18",
	category: "Installations",
	number: "18",
	color: {
		name: "pink",
		r: 251,
		g: 75,
		b: 152
	},
	title: "Hole in the Floor",
	location: "Rm. 155 - Interactive Media Studio",
	timing: "6 - 8pm",
	description: "Don't fall down! A live streaming video feed revealing the floor below.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
}, {
	_id: "pink20",
	category: "Installations",
	number: "20",
	color: {
		name: "pink",
		r: 251,
		g: 75,
		b: 152
	},
	title: "DJ Booth Zoetrope",
	location: "East Plaza",
	timing: "8 - 9pm",
	description: "A 12-screen layout of an audio-responsive 3D world.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
}, {
	_id: "pink19",
	category: "Installations",
	number: "19",
	color: {
		name: "pink",
		r: 251,
		g: 75,
		b: 152
	},
	title: "Color Matrix",
	location: "Space between Rm. 153 & Rm. 155",
	timing: "6 - 8pm",
	description: "A projection mapping of color patterns on a pixel wooden display, accompanied by the Student Coffee Group's latest brews.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
}, {
	_id: "pink35",
	category: "Open Studios",
	number: "35",
	color: {
		name: "pink",
		r: 251,
		g: 75,
		b: 152
	},
	title: "IM Class Projects",
	location: "Rm. 029 - Interactive Media lab",
	timing: "6 - 8pm",
	description: "The lab comes to life for the evening with projects from the Interactive Media courses, student assistants, and faculty. Stop in and play with interactive installations, software art, robots, web applications, and handmade electronics.",
	program: "Interactive Media",
	tags: ["interative media"],
	floor: "ground"
}, {
	_id: "pink36",
	category: "Open Studios",
	number: "36",
	color: {
		name: "pink",
		r: 251,
		g: 75,
		b: 152
	},
	title: "Howler Radio",
	location: "Rm. 155 - Interactive Media Studio",
	timing: "6 - 8pm",
	description: "Howler Radio DJs conduct live interviews with Arts faculty and play songs selected for art making, art teaching, and art buying.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
},
//***** BLUE BUTTONS - MUSIC *****
{
	_id: "blue52",
	category: "Exhibitions & Showcases",
	number: "52",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Surround Sound Film Showcase",
	location: "Rm. 111 - Music Composition Room",
	timing: "6 - 8pm",
	description: "Showcase of 5.1 audio surround film mix.",
	program: "Music",
	tags: ["music"],
	floor: "first"
}, {
	_id: "blue53",
	category: "Exhibitions & Showcases",
	number: "53",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Music Student Works & Showreel",
	location: "Rm. 112 - Music Classroom",
	timing: "6 - 8pm",
	description: "Visit a screen-based exhibition of Music student projects and watch a short showreel featuring Music program offerings.",
	program: "Music",
	tags: ["music"],
	floor: "first"
}, {
	_id: "blue13",
	category: "Performances & Exhibitions",
	number: "13",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Live Band recording at NYUAD Music Studios",
	location: "Rm. 141, 142, 143: Studio A & B",
	timing: "6 - 8pm",
	description: "Student performers demonstrate a live recording session with Prof Matteo Marciano. Learn techniques for placing microphones, recording room acoustics, signal flow, and live mixing.",
	program: "Music",
	tags: ["music"],
	floor: "first"
}, {
	_id: "purple02",
	category: "Performances & Exhibitions",
	number: "02",
	color: {
		name: "purple",
		r: 152,
		g: 37,
		b: 251
	},
	title: "Attitude Dance Club: Call & Open",
	location: "Black Box Lobby",
	timing: "6 - 6:15pm",
	description: "Many arts festivals and carnivals around the world have a parade for calling the inauguration of the actual event. This is an experimental piece in which performers are part of the crowd and then part of a central stage. Our movement exercises with the audience, voices in the air, and palms clapping, will call you to explore bits of theater, flamenco, samba and contemporary dance as you make your way into the Open Studios.",
	program: "SIG",
	tags: ["sig"],
	floor: "ground"
}, {
	_id: "blue23",
	category: "Installations",
	number: "23",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Dreaming The Dream",
	location: "Rm. 036 - Innovation Studio",
	timing: "7 - 8pm",
	description: "An immersive audio experience where you can find movement in the static. Interact with the audio environment and create your own composition through binaural recordings.",
	program: "Music",
	tags: ["music"],
	floor: "ground"
}, {
	_id: "blue11",
	category: "Performance",
	number: "11",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Music Faculty Composers & Performers",
	location: "Rm. 036 - Innovation Studio",
	timing: "6 - 7pm",
	description: "Music Faculty Composers & Performers, including works featuring innovative technologies.",
	program: "Music",
	tags: ["music"],
	floor: "ground"
}, {
	_id: "blue10",
	category: "Performance",
	number: "10",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Music Student Performances",
	location: "Rm. 10 Music Ensemble Room",
	timing: "6 - 8pm",
	description: "An informal session in which students of the Music Program share pieces they are preparing this semester.",
	program: "Music",
	tags: ["music"],
	floor: "ground"
}, {
	_id: "blue12",
	category: "Performances",
	number: "12",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "LIVE Electronic Music Performance and VJ",
	location: "Rm. 116 - MultiPurpose Class Room",
	timing: "6 - 7:30pm",
	description: "Electronic music performances and exhibitions featuring Arts Instructor Omar Shoukri and student artist Harshini Karunaratne.",
	program: "Music",
	tags: ["music"],
	floor: "first"
}, {
	_id: "blue01",
	category: "Peformance/Exhibitions",
	number: "01",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Live DJ Performance",
	location: "East Plaza",
	timing: "4 - 6pm",
	description: "Arts Instructor Omar Shoukri’s EMP students perform a warm-up DJ set to welcome attendees to Open Studios.",
	program: "Music",
	tags: ["music"],
	floor: "ground"
}, {
	_id: "blue15",
	category: "Performances",
	number: "15",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "DJ Dance Party Finale",
	location: "East Plaza",
	timing: "8 - 9pm",
	description: "Our custom-built DJ booth becomes Mission Control for an audiovisual journey through space. Come dance through the NYUAD nebula with interactive projection maps and the cool vibes of Arts Instructor Omar Shoukri.",
	program: "Music",
	tags: ["music"],
	floor: "ground"
}, {
	_id: "blue09",
	category: "Performances",
	number: "09",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Music Faculty & Student Performances",
	location: "Blue Hall",
	timing: "6 - 8pm",
	description: "Performances by Music Program Faculty & Students, including original works.",
	program: "Music",
	tags: ["music"],
	floor: "ground"
}, {
	_id: "blue26",
	category: "Screenings",
	number: "26",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Crumb: Voice of the Whale",
	location: "Blue Hall Lobby",
	timing: "6 - 8pm",
	description: "Playback of Chamber Music Concert Series performance from the 5th of October of George Crumb's 'Voice of the Whale'.",
	program: "Music",
	tags: ["music"],
	floor: "ground"
}, {
	_id: "blue33",
	category: "Workshops & Demos",
	number: "33",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "DJing 'the Old-School Way'",
	location: "Rm. 133 - DJ Studio",
	timing: "6 - 8pm",
	description: "Arts Instructor Omar Shoukri’s EMP students perform a live DH set on the Native Instruments Traktor system using analog turntables. Guests will get a sneak peak into the world of DJ performance and manipulating digital music tracks with analog tools.",
	program: "Music",
	tags: ["music"],
	floor: "first"
},
//***** ORANGE BUTTONS - THEATER *****
{
	_id: "orange21",
	category: "Installations",
	number: "21b",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Stage Designs for Sitt Marie Rose - Collaborative Arts Class",
	location: "Design Studio 124",
	timing: "6 - 8pm",
	description: "Based on an imagined adaptation of the first chapter of 'Sitt Marie Rose', a short novel by Etel Adnan, the students from 'Collaborative Arts', taught by Assistant Professor of Practice of Theater Tomi Tsunoda, have created set, light, and sound designs.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "orange04",
	category: "Performances",
	number: "04",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Open Rehearsal for the Mainstage Student Theater Production",
	location: "Black Box",
	timing: "7 - 8pm",
	description: "The creative team and cast open the doors of the Black Box to welcome guests for a behind-the-scene peek inside the rehearsal room for the Fall Mainstage Student Production of Olivier Kemeid's The Aeneid, directed by visiting artist, Sarah Cameron Sunde. For the safety and respect of performers, please turn off cell phones and refrain from talking during the rehearsal.",
	program: "Theater",
	tags: ["theater"],
	floor: "ground"
}, {
	_id: "orange03",
	category: "Performances",
	number: "03",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Theater Program Student-Led Project (SLP) Work-in-Progress: Liene Pekuse",
	location: "Studio 014",
	timing: "6 - 8pm",
	description: "NYUAD Theater Program Student-Led Projects (SLP) provide both majors and non-majors the opportunity to conduct, direct, or present theater projects for the NYUAD community including workshops, staged readings, and small-scale productions. Join us for a behind-the-scenes, work-in-progress look at Leine Pekuse's SLP before its debut later this semester.",
	program: "Theater",
	tags: ["theater"],
	floor: "ground"
}, {
	_id: "orange2",
	category: "Performances",
	number: "21",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Theater Program Student-Led Project (SLP) Work-in-Progress: Christie Leone & Larayb Abrar",
	location: "Studio 045 - Mini Black Box",
	timing: "6 - 8pm",
	description: "NYUAD Theater Program Student-Led Projects (SLP) provide both majors and non-majors the opportunity to conduct, direct, or present theater projects for the NYUAD community including workshops, staged readings, and small-scale productions. Join us for behind-the-scenes, work-in-progress looks at Christie Leone and Larayb Abrar SLPs before their debut later this semester.",
	program: "Theater",
	tags: ["theater"],
	floor: "ground"
}, {
	_id: "orange06",
	category: "Performances",
	number: "06",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Short Performances - Directing Class",
	location: "Studio 144",
	timing: "6 - 8pm",
	description: "View short plays chosen from Suzan Lori Parks and Samuel Beckett performed and directed by students in 'Directing' taught by Associate Arts Professor of Theater Joanna Settle. Performances every 15 minutes.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "orange07",
	category: "Performances",
	number: "07",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Readings - Introduction to Playwriting",
	location: "Studio 146",
	timing: "6 - 8pm",
	description: "Listen to works-in-process from students in Fundamentals of Playwriting taught by Visiting Associate Professor of Practice of Theater, Abhishek Majumdar.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "orange25",
	category: "Screenings",
	number: "25",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "'36.5 / A Duration Performance With The Sea' by Sarah Cameron Sunde",
	location: "Black Box Lobby",
	timing: "6 - 8pm",
	description: "Watch Mainstage Student Theater Production Director Sarah Cameron Sunde epic durational performance piece on sea levels and climate change spanning seven years and six continents.",
	program: "Theater",
	tags: ["theater"],
	floor: "ground"
},
//***** RED BUTTONS - VIS ARTS *****
{
	_id: "red43",
	category: "Exhibitions & Showcases",
	number: "43",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Foundations of 3D: Works in Progress",
	location: "Rm. 015",
	timing: "6 - 8pm",
	description: "The 'Foundations of 3D' students have self-curated in order to present finished and in-progress works.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "ground"
}, {
	_id: "red44",
	category: "Exhibitions & Showcases",
	number: "44",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Foundations of 3D (2016) Exhibition: Modular Cubes",
	location: "",
	timing: "6 - 8pm",
	description: "Installation of modular works produced by Spring 2016 sculpture students with Professor Sandra Peters.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "ground"
}, {
	_id: "red45",
	category: "Exhibitions & Showcases",
	number: "45",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Major Talent: Work by Art History and Visual Art Majors",
	location: "Rm. 030 - Hallway (behind)",
	timing: "6 - 8pm",
	description: "Exhibition showcasing selected works by Vis Arts majors.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "ground"
}, {
	_id: "red46",
	category: "Exhibitions & Showcases",
	number: "46",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Photography as Art & Practice: Exhibition",
	location: "Rm. 165 - Hallway",
	timing: "6 - 8pm",
	description: "Works-in-progress of students from Vis Arts' 'Photography as Art & Practice' course.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "red47",
	category: "Exhibitions & Showcases",
	number: "47",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Painting by Seeing",
	location: "Rm. 174 - Mixed Media Studio",
	timing: "6 - 8pm",
	description: "Works-in-progress from John Torreano’s Painting by Seeing class.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "red48",
	category: "Exhibitions & Showcases",
	number: "48",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Foundations of 2D: Exhibition",
	location: "Rm. 174 - Hallway",
	timing: "6 - 8pm",
	description: "Works-in-progress of students from Vis Arts 'Foundations of 2D' Course.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "red49",
	category: "Exhibitions & Showcases",
	number: "49",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Fiber Studio Exhibit",
	location: "Rm. 157 - Costume Shop",
	timing: "6 - 8pm",
	description: "A Collaborative Quilt/Embroidery as Mark-making/Felt Books",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "red050",
	category: "Exhibitions & Showcases",
	number: "50",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Foundations of 4D: Rejection",
	location: "The Cube & Rm. 043",
	timing: "6 - 8pm",
	description: "Students conduct artistic research regarding the universal experience of breaking up. They share personal break up letters, interperet them as artists, and choose members of the community to respond uniquely to these letters.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "ground"
}, {
	_id: "red051",
	category: "Exhibitions & Showcases",
	number: "51",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Vision: Figure Experiments",
	location: "Costume Shop Hallway",
	timing: "6 - 8pm",
	description: "Sandra Peters' core class Vision explores gesture-based figure drawing.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "red22",
	category: "Installations",
	number: "22",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "The Impossible Pictograms",
	location: "Throughout Arts Center",
	timing: "6 - 8pm",
	description: "Students of the Wayfinding Class design formally correct pictograms for impossible solutions to design problems around campus and showcase their work throughout the building in relation to its features.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "ground"
}, {
	_id: "red38",
	category: "Open Studios",
	number: "38",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Jenga, Trebuchet, and More",
	location: "Rm. 030 - Scene Shop",
	timing: "6 - 8pm",
	description: "Join Andrew Riedemann in the Scene Shop for a tour: play life-size jenga, hurl tennis balls with a wooden catapult, and watch the CNC router perform air cuts... and more!",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "ground"
}, {
	_id: "red37",
	category: "Open Studios",
	number: "37",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Wood Shop Projects",
	location: "Rm. 041 - Woodshop",
	timing: "6 - 8pm",
	description: "Come and explore our amazing Wood Shop with Arts Instructor Dan Osleeb. Watch demos, view fine woodworking examples, and learn more about Tool Training Workshops for students.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "ground"
}, {
	_id: "red39",
	category: "Open Studios",
	number: "39",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Capstone Open Studios",
	location: "Vis Arts Capstone Studios",
	timing: "6 - 8pm",
	description: "Visual Arts Senior Capstone student research spaces featuring new work and works-in-progress.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "red40",
	category: "Open Studios",
	number: "40",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Faculty Open Studios",
	location: "Vis Arts Faculty Studios",
	timing: "6 - 8pm",
	description: "Arts faculty research and production spaces featuring new works and works-in-progress.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "red08",
	category: "Performances",
	number: "08",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Walking Art",
	location: "Rm. 174 - Mixed Media Studio",
	timing: "6 - 8pm",
	description: "Artists collaborate with models to transform them into walking, breathing artworks: from glow-in-the-dark galaxies, to mythical creatures and moving statues, come watch the magic happen.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "blue5",
	category: "Performances",
	number: "05",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Four6",
	location: "Elevator Lobby",
	timing: "7 - 7:30pm",
	description: "A live performance of one of John Cage's classic 'indeterminate' scores representing the viral network at play.",
	program: "Music",
	tags: ["music"],
	floor: "ground"
}, {
	_id: "orange14",
	category: "Performances",
	number: "14",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Launch Initiation Happening",
	location: "Converges on East Plaza",
	timing: "8 - 8:15pm",
	description: "Take to the halls and join the coundown as we converge on Mission Contol to ignite our evening's finale.",
	program: "Arts Center",
	tags: ["arts center"],
	floor: "ground"
}, {
	_id: "red30",
	category: "Workshops & Demos",
	number: "30",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "'Walking Art' Photoshoot",
	location: "Rm. 043 - 4D Studio",
	timing: "6 - 8pm",
	description: "Artists collaborate with models to transform them into walking, breathing artworks: from glow-in-the-dark galaxies, to mythical creatures and moving statues, come watch the human artworks be professionally photographed!",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "ground"
}, {
	_id: "red31",
	category: "Workshops & Demos",
	number: "31",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "T-shirts Silkscreening",
	location: "Rm. 161 - Collaboratory Studio",
	timing: "6 - 7pm",
	description: "Watch how T-shirts get printed on the octopus! Yes, that is really what the machine is called.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
}, {
	_id: "red32",
	category: "Rm. 157 - Costume Shop",
	number: "32",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Loom Info Sessions - Give It a Try!",
	location: "Rm. 157 - Costume Shop",
	timing: "6 - 7pm",
	description: "Come meet the looms that are now part of the NYUAD Visual Arts landscape! Sit at the loom and give this ancient and contemporary technology a try! A collective cloth will be woven.",
	program: "Vis Arts",
	tags: ["vis arts"],
	floor: "first"
},
//***** FOOD BUTTONS *****
{
	_id: "crepe",
	category: "Food",
	number: "crepe",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Crêpes!",
	location: "Rm. 013",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: "first"
}, {
	_id: "drinks",
	category: "Food",
	number: "drinks",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Drinks!",
	location: "Rm. 006, 045, 161",
	timing: "6 - 9pm",
	description: "To quench all kinds of thirsts!",
	program: "Catering",
	tags: ["food"],
	floor: ""
}, {
	_id: "popcorn",
	category: "Food",
	number: "popcorn",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Popcorn!",
	location: "Rm. 025",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "sweets",
	category: "Food",
	number: "sweets",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Sweets!",
	location: "throughout the Arts Center",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: ""
}, {
	_id: "sushi",
	category: "Food",
	number: "sushi",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Sushi!",
	location: "Rm. 143",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: "first"
}, {
	_id: "veg",
	category: "Food",
	number: "",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Veg!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "Veg",
	category: "Food",
	number: "Veg",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Veggie Heaven!",
	location: "Rm. 176",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: "first"
}, {
	_id: "coffee",
	category: "Food",
	number: "coffee",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Coffee SIG!",
	location: "Rm. 153",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: "first"
}, {
	_id: "mezze",
	category: "Food",
	number: "mezze",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Mezze!",
	location: "East Elevator lobby",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: "first"
}, {
	_id: "asian",
	category: "Food",
	number: "asian",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Asian!",
	location: "Nomad Pad",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: "first"
}, {
	_id: "mexican",
	category: "Food",
	number: "mexican",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Mexican!",
	location: "West Elevator lobby",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: "first"
}, {
	_id: "schwarma",
	category: "Food",
	number: "schwarma",
	color: {
		name: "grey",
		r: 107,
		g: 98,
		b: 110
	},
	title: "Falafel & Schwarma!",
	location: "Rm. 045",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Catering",
	tags: ["food"],
	floor: "ground"
}];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports = module.exports = {};

// 2016 data
_exports.data = [
//***** BLUE BUTTONS - EXHIBITIONS & SHOWCASES *****
{
	_id: "blue_1",
	category: "Exhibitions & Showcases",
	number: "1",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Music Technology Fundamentals",
	location: "Rm. 116",
	timing: "6 - 9pm",
	description: "Showcase of interactive audio and visual installations by students in the Music Technology Fundamentals course.",
	program: "Music",
	tags: ["music", "technology"],
	floor: "first"
}, {
	_id: "blue_2",
	category: "Exhibitions & Showcases",
	number: "2",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "IM Lab",
	location: "IM Lab, Rm. 029",
	timing: "6 - 9pm",
	description: "The lab will be alive all evening with projects from all of the IM courses, student assistants, and faculty.Courses participating include Circuit Breakers!, Intro to Interactive Media, Politics of Code, and Mashups - Creating with Web APIs.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "ground"
}, {
	_id: "blue_3",
	category: "Exhibitions & Showcases",
	number: "3",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Yes Logo",
	location: "East Stairwell Corridor (First Floor)",
	timing: "6 - 9pm",
	description: "Works-in-progress of students of Vis Arts’ Yes Logo course. Students have been commissioned from WWF UAE to design the logo for the UAE institution working in association with WWF.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "blue_4",
	category: "Exhibitions & Showcases",
	number: "4",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Collaborative Art",
	location: "Design Studio, Rm. 124",
	timing: "6 - 9pm",
	description: "Current work of students in Theater’s Collaborative Art course.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "blue_5",
	category: "Exhibitions & Showcases",
	number: "5",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Painting by Seeing: Private Theater, Public Meaning",
	location: "Mixed Media Studio, Rm. 174",
	timing: "6 - 9pm",
	description: "Works-in-progress of students from Vis Arts’ Painting by Seeing course.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "blue_6",
	category: "Exhibitions & Showcases",
	number: "6",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Foundations of 3D",
	location: "Sculpture Studio, Rm. 043, Vis Arts Sculpture Hallway",
	timing: "6 - 9pm",
	description: "Works-in-progress of students from Vis Arts’ Foundations of 3D course.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_7",
	category: "Exhibitions & Showcases",
	number: "7",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Foundations of 2D",
	location: "Vis Arts Mixed Media Hallway",
	timing: "6 - 9pm",
	description: "Works-in-progress of students from Vis Arts’ Foundations of 2D course.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_8",
	category: "Exhibitions & Showcases",
	number: "8",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Photography as Art & Practice",
	location: "Vis Arts Print/Photo Hallway",
	timing: "6 - 9pm",
	description: "Works-in-progress of students from Vis Arts’ Photography as Art & Practice course.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_9",
	category: "Exhibitions & Showcases",
	number: "9",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "The Melanin Project by Ayah Rashid",
	location: "The Cube, Arts Center Lobby, The Cube Annex, Blue Recital Hall Corridor",
	timing: "6 - 9pm",
	description: "Curated by NYUAD student Ayah Rashid, The Melanin Project exhibits the works of nine, African-American photographers from Howard University in Washington, D.C.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_10",
	category: "Exhibitions & Showcases",
	number: "10",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Above below, below below by John Torreano",
	location: "The Project Space, Arts Center Lobby",
	timing: "6 - 9pm",
	description: "Work by NYUAD Vis Arts Prof. John Torreano",
	program: "Visual Arts",
	tags: ["visual arts", "john torreano"],
	floor: "ground"
}, {
	_id: "blue_11_a",
	category: "Exhibitions & Showcases",
	number: "11",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "The Sketchbook Project by Anastasiia Zubareva",
	location: "Vis Arts Collaboratory, Rm. 161, Vis Arts Hallways",
	timing: "6 - 9pm",
	description: "Follow The Sketchbook Project around the Vis Arts hallways to see sketchbooks of various NYUAD student, staff, and faculty.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_11_b",
	category: "Exhibitions & Showcases",
	number: "11",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "The Sketchbook Project by Anastasiia Zubareva",
	location: "Vis Arts Collaboratory, Rm. 161, Vis Arts Hallways",
	timing: "6 - 9pm",
	description: "Follow The Sketchbook Project around the Vis Arts hallways to see sketchbooks of various NYUAD student, staff, and faculty.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "blue_12",
	category: "Exhibitions & Showcases",
	number: "12",
	color: {
		name: "blue",
		r: 74,
		g: 137,
		b: 240
	},
	title: "Poetry Chapbooks from NYUAD Students: Out of the Archives",
	location: "West Elevator Atrium (First Floor)",
	timing: "6 - 9pm",
	description: "Several years of student-made chapbooks will come out of the NYUAD library special collections and into the lobby of the Arts Center. Visitors may handle, read, inspect these works--and get inspired to make their own chapbook at the work table next to the display.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
},
//***** GREEN BUTTONS - SCREENINGS *****
{
	_id: "green_1",
	category: "Screenings",
	number: "1",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "JINN",
	location: "In front of Rm. 036",
	timing: "6 - 9pm",
	description: "A choreomusical work conceived and performed by Professor Carlos Guedes, Program Head of Music, Nella Turkki, Cristina Ioan, and Kirk Woolford.",
	tags: ["music", "carlos guedes"],
	floor: "zero"
}, {
	_id: "green_2",
	category: "Screenings",
	number: "2",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "Transwater",
	location: "Rm. 116",
	timing: "6 - 9pm",
	description: "A short film by Instructor Omar Shoukri exploring the topics of identity and existence throuhg the lens of water.",
	program: "Music",
	tags: ["music", "film", "omar shoukri"],
	floor: "first"
}, {
	_id: "green_3",
	category: "Screenings",
	number: "3",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "INWARD",
	location: "Rm. 146",
	timing: "6 - 9pm",
	description: "A short film produced and directed by Instructor Omar Shoukri.",
	program: "Music",
	tags: ["music", "film", "omar shoukri"],
	floor: "first"
}, {
	_id: "green_4",
	category: "Screenings",
	number: "4",
	color: {
		name: "green",
		r: 133,
		g: 173,
		b: 58
	},
	title: "NYUAD Student Films",
	location: "Rm. 118",
	timing: "6 - 9pm",
	description: "Works from Film Capstone, and Sound, Image & Story courses.",
	program: "Film",
	tags: ["film"],
	floor: "first"
},
//***** YELLOW BUTTONS - PERFORMANCES & EVENTS *****
{
	_id: "yellow_1",
	category: "Performances & Events",
	number: "1",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Electronic Music DJ Sets",
	location: "Arts Center Plaza",
	timing: "6 - 9pm",
	description: "Ongoing DJ sets by students of Electronic Music Production class with Instructor Omar Shoukri.",
	program: "Music",
	tags: ["music", "omar shoukri"],
	floor: "zero"
}, {
	_id: "yellow_2",
	category: "Performances & Events",
	number: "2",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Selected Works by John Cage and Kurt Schwitters: NYUAD Vocal Ensemble",
	location: "Arts Center Lobby",
	timing: "6 - 6:15pm, 7 - 7:15pm, 8 - 8:15pm",
	description: "Performances of John Cage’s “ear for EAR Antiphonies” and “William’s Mix,” plus Kurt Schwitters’ “Scherzo” from “Ur Sonate” by Professors Clare and David Lesser and the NYUAD Vocal Ensemble.",
	program: "Music",
	tags: ["music"],
	floor: "zero"
}, {
	_id: "yellow_3",
	category: "Performances & Events",
	number: "3",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Piano Performances by Professor David Lesser",
	location: "Blue Hall",
	timing: "6:30pm, 7:30pm, 8:30pm",
	description: "Live performance. by Prof. David Lesser",
	program: "Music",
	tags: ["music"],
	floor: "zero"
}, {
	_id: "yellow_4",
	category: "Performances & Events",
	number: "4",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Live Broadcast: Howler Radio",
	location: "Rm. 155",
	timing: "6 - 9pm",
	description: "Howler Radio will be broadcasting live the whole night at <a target='_blank' href='http://radio.nyuad.im'>radio.nyuad.im</a>.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
}, {
	_id: "yellow_5",
	category: "Performances & Events",
	number: "5",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "First Drafts: Readings of Scenes from 8 new plays by NYUAD playwriting students",
	location: "Rm. 144",
	timing: "7 - 8:30pm",
	description: "Works-in-process by students of Visiting Professor Abhishek Majumdar.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "yellow_6",
	category: "Performances & Events",
	number: "6",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Artist talk and Q&A with Vikram Divecha",
	location: "Mixed Media Studio, Rm. 174",
	timing: "7:30 - 8pm",
	description: "Professor Salwa Mikdadi will lead an artist talk and Q&A with UAE-based artist Vikram Divecha.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "yellow_7",
	category: "Performances & Events",
	number: "7",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Music by Carlos Guedes",
	location: "Rm. 010",
	timing: "6:45pm, 7:45pm",
	description: "Professor Carlos Guedes’, Program Head of Music, “Mimo” for Alto Flute, “1985.2” for Soprano Sax and fixed media electronics. Cristina Ioan on Alto Flute, and Emil Sein on Soprano Saxophone.",
	program: "Music",
	tags: ["music", "carlos guedes"],
	floor: "ground"
}, {
	_id: "yellow_8",
	category: "Performances & Events",
	number: "8",
	color: {
		name: "yellow",
		r: 253,
		g: 221,
		b: 56
	},
	title: "Poetry Reading: Advanced Poetry Workshop plus Open Mic",
	location: "West Elevator Atrium (First Floor)",
	timing: "7:30 - 8:30pm",
	description: "Students in Advanced Poetry Workshop will read their works- in-progress: including instant odes to Open Studios! Other willing poets (experienced and new) are welcome to read during the open mic session.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
},
//***** PINK BUTTONS - INSTALLATIONS *****
{
	_id: "pink_1",
	category: "Installations",
	number: "1",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Sounds of Sir Bani Yas",
	location: "Rm. 036",
	timing: "6 - 9pm",
	description: "A haptic installation by Mac Davel Kalumbi, Laura Waltje, Professor Carlos Guedes, Program Head of Music, and collaborators.",
	program: "Music",
	tags: ["music", "carlos guedes"],
	floor: "ground"
}, {
	_id: "pink_2",
	category: "Installations",
	number: "2",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Sym:sis",
	location: "Rm. 112",
	timing: "6 - 9pm",
	description: "Instructor João Menezes’ audio visual installation illustrating the relationship between real time computer graphics and a 4 channel sound composition.",
	program: "Music",
	tags: ["music", "joão menezes"],
	floor: "first"
}, {
	_id: "pink_3",
	category: "Installations",
	number: "3",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Fractured",
	location: "Outside IM Lab, Rm. 029",
	timing: "6 - 9pm",
	description: "Look into the fractured mirror. An interactive installation piece by James Hosken.",
	program: "Interactive Media",
	tags: ["interactive media", "james hosken"],
	floor: "ground"
}, {
	_id: "pink_4",
	category: "Installations",
	number: "4",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Drone Dazzle Dance",
	location: "Arts Center Plaza",
	timing: "9pm",
	description: "Don’t miss this interactive drone experience. Bring your phones!",
	program: "Interactive Media",
	tags: ["interactive media", "james hosken"],
	floor: "ground"
}, {
	_id: "pink_5",
	category: "Installations",
	number: "5",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Video Projection by Harshini Karunaratne",
	location: "Arts Center Lobby",
	timing: "6 - 6:15pm, 7 - 7:15pm, 8-8:15pm",
	description: "A real-time Video Projection by Harshini Karunaratne to accompany John Cage’s 'ear for EAR Antiphonies.'!",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "pink_6",
	category: "Installations",
	number: "6",
	color: {
		name: "pink",
		r: 255,
		g: 72,
		b: 152
	},
	title: "Ei Zwei",
	location: "East Elevator Atrium",
	timing: "6 - 9pm",
	description: "An interactive installation by Jimena Reyes Gonzalez, Sheba Vohra, and Hindi AlTantawi.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
},
//***** RED BUTTONS - OPEN STUDIOS *****
{
	_id: "red_1",
	category: "Open Studios",
	number: "1",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Music Composition Room",
	location: "Rm. 111",
	timing: "6 - 9pm",
	description: "Music on Music on Music",
	program: "Music",
	tags: ["music"],
	floor: "first"
}, {
	_id: "red_2",
	category: "Open Studios",
	number: "2",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Costume Shop",
	location: "Rm. 157",
	timing: "6 - 9pm",
	description: "Tour the shop with Costume Instructor Judi Olson. Get dressed up with costumes and interact with a live video feed.",
	program: "Theater",
	tags: ["theater"],
	floor: "first"
}, {
	_id: "red_3",
	category: "Open Studios",
	number: "3",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Student Black Box Theater",
	location: "Rm. 045",
	timing: "6 - 9pm",
	description: "Tour this unique theater space, and view documentaries from multiple NYUAD Theater Program productions.",
	program: "Theater",
	tags: ["theater"],
	floor: "ground"
}, {
	_id: "red_4",
	category: "Open Studios",
	number: "4",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Equipment Center",
	location: "Rm. 018",
	timing: "6 - 9pm",
	description: "The Equipment Center is the hub of all filmmaking activity. Come by, meet the staff, and get some hands on experience with some of the latest cameras and equipment.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "red_5",
	category: "Open Studios",
	number: "5",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Vis Arts Co-Working Studio",
	location: "Rm. 015",
	timing: "6 - 9pm",
	description: "The Co-Working Studio is a unique mentorship opportunity for a select group of emerging visual artists and curators. Now featured in the Co-Working Studio: 'Venezuela:land of contrasts' by Sara Pan Algarra and Carlos Paez, 'Truck Art' by the Pakistan Student Association, Selected works-in-progress by the Fall 2016 Co-Working Studio Cohort.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "red_6",
	category: "Open Studios",
	number: "6",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Scene Shop",
	location: "Rm. 030",
	timing: "6 - 9pm",
	description: "Join Scene Shop Supervisor Andrew Riedemann for a tour of the Scene Shop: play life-size jenga, take a try at using a wooden catapult, and watch the CNC Router perform air cuts.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "red_7",
	category: "Open Studios",
	number: "7",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Vis Arts Capstones",
	location: "Vis Arts Studios Rm.160 - 171",
	timing: "6 - 9pm",
	description: "Featuring:<ul><li>Sophie Arni - Rm.166</li><li>Shamsa Al Dhaheri - Rm.171</li><li>Sherina Al Sowaidi - Rm.162</li><li>Noor Al Mehairbi - Rm.168</li><li>Souhail Wardi - Rm. 164</li><li>Saber L Williams - Rm.160</li><li>Agustina Zegers - Rm.169</li></ul>",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "red_8_a",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "ground"
}, {
	_id: "red_8_b",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "ground"
}, {
	_id: "red_8_c",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "first"
}, {
	_id: "red_8_d",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "first"
}, {
	_id: "red_8_e",
	category: "Open Studios",
	number: "8",
	color: {
		name: "red",
		r: 238,
		g: 43,
		b: 52
	},
	title: "Open Studios: Arts Professors & Instructors",
	location: "Arts Studios Rm.013, 042, 046, 167 - 179",
	timing: "8 - 9pm",
	description: "Featuring:<ul><li>Sandra Peters - Rm.013</li><li>Jonny Farrow - Rm.046</li><li>David Darts - Rm.042</li><li>Tarek Al Ghoussein - Rm.176</li><li>Wendy Bednarz - Rm.178</li><li>Joanne Savio</li><li>Goffredo Puccetti - Rm.179</li><li>Laura Schneider - Rm.167</li><li>Meredith Meer</li></ul>",
	program: "Arts",
	tags: ["arts"],
	floor: "first"
},
//***** TEAL BUTTONS - WORKSHOPS & DEMOS *****
{
	_id: "teal_1",
	category: "Workshops & Demos",
	number: "1",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Tracking",
	location: "Music Studio A & B",
	timing: "6 - 9pm",
	description: "Watch live recordings and learn new producing techniques with Instructor Matteo Marciano.",
	program: "Music",
	tags: ["music"],
	floor: "first"
}, {
	_id: "teal_2",
	category: "Workshops & Demos",
	number: "2",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Electronics Play Station",
	location: "IM Lab, Rm. 029",
	timing: "6 - 9pm",
	description: "Basic electronics and components will be readily available to play with and create experimental circuits.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "ground"
}, {
	_id: "teal_3",
	category: "Workshops & Demos",
	number: "3",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Alternate Realities",
	location: "Rm. 153",
	timing: "6:30 - 8:30pm",
	description: "Get lost in Virtual Reality with Professor Pierre Depaz and the HTC Vive.",
	program: "Interactive Media",
	tags: ["interactive media"],
	floor: "first"
}, {
	_id: "teal_4",
	category: "Workshops & Demos",
	number: "4",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Direct a Scene",
	location: "Sound Stage, Rm. 025",
	timing: "6 - 8pm",
	description: "Watch a real film set in action! Students will set up lights, cameras, and direct actors. Please note: this will be a working set, so please silence your phones, and enjoy the show.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "teal_5",
	category: "Workshops & Demos",
	number: "5",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Video Editing Crash Course: Avid",
	location: "Editing Lab, Rm. 019",
	timing: "6:30 - 7:30pm",
	description: "Tour the Editing Lab, the Arts Center’s state-of-the art editing facility, and meet the University’s Avid-certified trainer, Instructor Maruan Manaja.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "teal_6",
	category: "Workshops & Demos",
	number: "6",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Acting 101",
	location: "Rm. 021",
	timing: "8 - 9pm",
	description: "Professor Scandar Copti, Program Head of Film & New Media, will be conducting a series of acting exercises. No prior experience needed! So please come, and join the short exercises to try acting yourself.",
	program: "Film",
	tags: ["film"],
	floor: "ground"
}, {
	_id: "teal_7",
	category: "Workshops & Demos",
	number: "7",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Silkscreening",
	location: "Print/Photo Studio, Rm. 165",
	timing: "6 - 7:30pm",
	description: "Mixed Media Instructor Laura Schneider demonstrates the art of silkscreen. Practice pulling your own screen to create your own custom t-shirt or tote bag.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
}, {
	_id: "teal_8",
	category: "Workshops & Demos",
	number: "8",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "5-Minute Dovetail Joinery",
	location: "Wood Shop, Rm. 041",
	timing: "6 - 9pm",
	description: "Sculpture Instructor Dan Osleeb demonstrates how to make a dovetail joint in just 5 minutes.",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "ground"
}, {
	_id: "teal_9",
	category: "Workshops & Demos",
	number: "9",
	color: {
		name: "teal",
		r: 51,
		g: 179,
		b: 162
	},
	title: "Make a Chapbook: Fill it with Instant Odes to Open Studios",
	location: "West Elevator Atrium (First Floor)",
	timing: "6 - 7:30pm",
	description: "Make your own chapbook to take around the Arts Center and fill with “instant odes to open studios.” Learn non-adhesive binding techniques and get a mini-lesson on the age-old poetic form, “the ode.”",
	program: "Visual Arts",
	tags: ["visual arts"],
	floor: "first"
},
//***** FOOD BUTTONS *****
{
	_id: "chicken",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Chicken!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "samosa",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Samosas!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "popcorn",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Popcorn!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "sweets",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Sweets!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "sushi",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Sushi!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "drinks",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Drinks!",
	location: "",
	timing: "6 - 9pm",
	description: "Who's thirsty?",
	program: "Arts",
	tags: ["food"],
	floor: ""
}, {
	_id: "veg",
	category: "Food",
	number: "",
	color: {
		name: "orange",
		r: 246,
		g: 131,
		b: 50
	},
	title: "Veg!",
	location: "",
	timing: "6 - 9pm",
	description: "Yummy!",
	program: "Arts",
	tags: ["food"],
	floor: ""
}];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports = module.exports = {};

var socket, overlay, countdown, stream;

_exports.init = function () {
  overlay = document.getElementById('overlay');
  countdown = document.getElementById('countdown');
  stream = document.getElementById('stream');

  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  if (SOCKET_SERVER != undefined && !iOSSafari) {
    initSocket();
  } else {
    console.log('not supported for socket connection');
  }
};

function initSocket() {
  //TODO check if the 'onend' event actually exists 
  // countdown.addEventListener('onend', function(){
  //   countdown.style.display = "none";
  //   stream.style.display = "block";
  // });

  socket = io.connect(SOCKET_SERVER);

  socket.on('connect', function () {
    console.log('connected to socket server!');
  });

  socket.on('update-status', function (data) {
    if (data.countdown) {
      countdown.style.display = "block";
      countdown.play();
    } else {
      countdown.style.display = "none";
    }

    if (data.stream) {
      stream.style.display = "block";
      // stream.setAttribute('class', 'streaming');

      if (!isMobile()) {
        stream.style.width = "125%";
        stream.style.height = '105%';
      } else {
        // stream.style.width = "125%";
        stream.style.marginLeft = '0%';
      }
    }

    stream.src = "../dist/loading-darts.gif";
  });

  socket.on('display-countdown', function () {
    if (stream.style.display == "block") stream.style.display = "none";

    countdown.style.display = "block";
    countdown.play();
  });

  socket.on('hide-countdown', function () {
    countdown.style.display = "none";
    countdown.pause();
    countdown.currentTime = 0;

    stream.style.display = "block";
    stream.src = "../dist/loading-darts.gif";
  });

  socket.on('display-stream', function () {
    if (countdown.style.display == "block") countdown.style.display = "none";

    stream.style.display = "block";
    if (!isMobile()) {
      stream.style.width = "125%";
      stream.style.height = '105%';
    } else {
      // stream.style.width = "125%";
      stream.style.marginLeft = '0%';
    }
  });

  socket.on('hide-stream', function () {
    stream.src = "../dist/loading-darts.gif";
    stream.style.width = "100%";
    stream.style.height = '100%';

    if (isMobile()) {
      stream.style.marginLeft = '0%';
    }
  });

  socket.on('new-frame', function (data) {
    // stream.crossOrigin = "Anonymous";
    stream.src = data;
  });
}

function isMobile() {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Safari/i)) {
    return true;
  } else {
    return false;
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports = module.exports = {};

var beat;
_exports.init = function () {
  document.getElementById("audio-player").volume = 0;

  document.getElementById("howler_logo").onclick = toggleAudio;
  document.getElementById("howler_logo").addEventListener('keypress', function (e) {
    if (e.key === " ") toggleAudio();
  });
};

function toggleAudio() {
  if (document.getElementById("audio-player").volume == 1) {
    document.getElementById("audio-player").volume = 0;
    clearInterval(beat);
  } else {
    document.getElementById("audio-player").volume = 1;
    beat = setInterval(pulse, 800);
  }
}

function pulse() {
  if (document.getElementById("howler_logo").style.opacity == 0.2) document.getElementById("howler_logo").style.opacity = 1;else document.getElementById("howler_logo").style.opacity = 0.2;
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

"use strict";

var _exports = module.exports = {};

// 2018 data
_exports.data = [
  {
  _id: "46",
  category: "",
  number: "46",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Student Film Screenings",
  location: "Basement Room 101",
  timing: "ongoing",
  description: "A short show reel of excerpts from FNM student films that includes beginning work through Capstone productions.",
  program: "Film & New Media",
  tags: ["film"],
  floor: "ground"
},
{
  _id: "47",
  category: "",
  number: "47",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Lights Camera Action!",
  location: "Sound Stage 020",
  timing: "ongoing",
  description: "Try your hand at cinematography, act in a mini-movie or slip into the back soundstage for a Green Screen that will whisk you across the globe.",
  program: "Film & New Media",
  tags: ["film"],
  floor: "ground"
},
{
  _id: "48",
  category: "",
  number: "48",
  color: {
    name: "purple",
    r: 159,
    g: 100,
    b: 122
  },
  title: "Gore and Lights",
  location: "Outside Basement 101",
  timing: "ongoing",
  description: "Special Effects Makeup workshop: create your own scars and then film the results!",
  program: "Film & New Media",
  tags: ["film"],
  floor: "ground"
},
{
  _id: "56",
  category: "",
  number: "56",
  color: {
    name: "unknown",
    r: 0,
    g: 0,
    b: 0
  },
  title: "FNM Bells & Whistles",
  location: "Outside Equipment Center",
  timing: "ongoing",
  description: "Highlighted equipment from the will be available for guests to examine and test-drive.",
  program: "Film & New Media",
  tags: ["film"],
  floor: "ground"
},
{
  _id: "1",
  category: "",
  number: "1",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "How do we react to telepresence?",
  location: "Roaming",
  timing: "ongoing",
  description: "A roving platform (robot-esque) allows people in one location to transport themselves elsewhere.",
  program: "Interactive Media",
  tags: ["im"],
  floor: "first"
},
{
  _id: "9",
  category: "",
  number: "9",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Confuzzled",
  location: "029 IM Lab",
  timing: "ongoing",
  description: "Can you find the puzzle pieces before your friend? Play to find out!",
  program: "Interactive Media",
  tags: ["im"],
  floor: "ground"
},
{
  _id: "10",
  category: "",
  number: "10",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Jeontongchum (전통춤)",
  location: "Hallway near 025",
  timing: "ongoing",
  description: "This interactive installation emulates the wavy dance motions of Korean traditional dance, which viewers can activate.",
  program: "Interactive Media",
  tags: ["im"],
  floor: "ground"
},
{
  _id: "11",
  category: "",
  number: "11",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Le Papillon (The Butterfly)",
  location: "154",
  timing: "ongoing",
  description: "Enter the world of butterflies.",
  program: "Interactive Media",
  tags: ["im"],
  floor: "first"
},
{
  _id: "12",
  category: "",
  number: "12",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Take a Break",
  location: "Upstairs by Red Theater",
  timing: "ongoing",
  description: "An immersive resting experience that widens your global scope through childhood memories.",
  program: "Interactive Media",
  tags: ["im"],
  floor: ""
},
{
  _id: "13",
  category: "",
  number: "13",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Through the Looking Glass",
  location: "Outside 006",
  timing: "ongoing",
  description: "This two-sided interactive installation connects visitors on the inside and the outside.",
  program: "Interactive Media",
  tags: ["im"],
  floor: "ground"
},
{
  _id: "132",
  category: "",
  number: "132",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Through the Looking Glass",
  location: "Outside 006",
  timing: "ongoing",
  description: "This two-sided interactive installation connects visitors on the inside and the outside.",
  program: "Interactive Media",
  tags: ["im"],
  floor: "ground"
},
{
  _id: "14",
  category: "",
  number: "14",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Facepalm",
  location: "Next to the Cube",
  timing: "onging",
  description: "An interactive installation powered by projection mapping and OpenCV facial recognition, providing an uncanny yet intimate feeling from texturizing the face on the body.",
  program: "Interactive Media",
  tags: ["im"],
  floor: "ground"
},
{
  _id: "15",
  category: "",
  number: "15",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Interactive Media Playground",
  location: "029 IM Lab",
  timing: "6-8 PM",
  description: "The lab comes to life for the evening with projects from the Interactive Media program. Stop in and learn how to make LED jewelry, play some games, see the generative art prints, check out the hackathon apps, listen to the oscillators, and maybe even talk to the telepresence robot!",
  program: "Interactive Media",
  tags: ["im"],
  floor: "ground"
},
{
  _id: "18",
  category: "",
  number: "18",
  color: {
    name: "dark_blue",
    r: 51,
    g: 69,
    b: 125
  },
  title: "Howler Radio",
  location: "Room 155",
  timing: "6-8 PM",
  description: "Howler Radio DJs conduct interviews with faculty and play specially curated Open Studios tunes.",
  program: "Interactive Media",
  tags: ["im"],
  floor: "first"
},
{
  _id: "19",
  category: "",
  number: "19",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Alternate Realities (VR)",
  location: "153",
  timing: "6-8 PM",
  description: "Want to glide through a fantasy hillscape, or experience the isolation of low-earth orbit? Slip on a headset and find yourself transported into the virtual worlds created by Interactive Media students!",
  program: "Interactive Media",
  tags: ["im"],
  floor: "first"
},
{
  _id: "34",
  category: "",
  number: "34",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "The Unnatural Nature",
  location: "Outside 006",
  timing: "ongoing",
  description: "Pull down the balloons, take a deep breath.",
  program: "Interactive Media",
  tags: ["im"],
  floor: "ground"
},
{
  _id: "4",
  category: "",
  number: "4",
  color: {
    name: "green",
    r: 159,
    g: 190,
    b: 123
  },
  title: "Recording Arts and Music Technology Live Demo",
  location: "141 Recording Studio A",
  timing: "ongoing",
  description: "Recording a live band performing in all our studio facilities: live room, drum booth, vocal booth, Foley booth!",
  program: "Music",
  tags: ["music"],
  floor: "first"
},
{
  _id: "20",
  category: "",
  number: "20",
  color: {
    name: "dark_blue",
    r: 51,
    g: 69,
    b: 125
  },
  title: "Music Program Performances",
  location: "Blue Hall",
  timing: "7-8:30",
  description: "Students and Faculty from the Music Program present an eclectic program of instrumental performances.",
  program: "Music",
  tags: ["music"],
  floor: "ground"
},
{
  _id: "21",
  category: "",
  number: "21",
  color: {
    name: "dark_blue",
    r: 51,
    g: 69,
    b: 125
  },
  title: "Student Performances, Works In Progress, and Open Instruction",
  location: "009 and 010",
  timing: "6-7:30",
  description: "Visitors can observe musical instruction and rehearsals in action, along with an array of performances.",
  program: "Music",
  tags: ["music"],
  floor: "ground"
},
{
  _id: "23",
  category: "",
  number: "23",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Faculty Composer Recordings & Scores Exhibited",
  location: "Room 111",
  timing: "ongoing",
  description: "Recent recordings by NYUAD Faculty Composers, with musical scores for perusal.",
  program: "Music",
  tags: ["music"],
  floor: "first"
},
{
  _id: "24",
  category: "",
  number: "24",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "The Sound of Mumbai",
  location: "Outside 118",
  timing: "ongoing",
  description: "Footage from the course trip to Mumbai, including studio sessions.",
  program: "Music",
  tags: ["music"],
  floor: "first"
},
{
  _id: "35",
  category: "",
  number: "35",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Angular Intersection",
  location: "036 Innovation Studio",
  timing: "ongoing",
  description: "An Audio Visual piece that uses Lissajous curves to illustrate the symbiosis between audio & video.",
  program: "Music",
  tags: ["music"],
  floor: "ground"
},
{
  _id: "52",
  category: "",
  number: "52",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Massive Dance Party",
  location: "West Lobby",
  timing: "8:30 PM",
  description: "Just what it sounds like!",
  program: "Music",
  tags: ["music"],
  floor: "ground"
},
{
  _id: "17",
  category: "",
  number: "17",
  color: {
    name: "green",
    r: 159,
    g: 190,
    b: 123
  },
  title: "Open Tech Rehearsal",
  location: "Black Box Theater",
  timing: "7:30-8 PM",
  description: "The creative team and cast of our student led production open the doors to welcome guests for a sneak peek into the fall show.",
  program: "Theater",
  tags: ["theater"],
  floor: "ground"
},
{
  _id: "36",
  category: "",
  number: "36",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Playwright’s Kiosk, Tipi",
  location: "Left lobby side",
  timing: "ongoing",
  description: "",
  program: "Theater",
  tags: ["theater"],
  floor: "ground"
},
{
  _id: "37",
  category: "",
  number: "37",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Playwright’s Kiosk, Cabin",
  location: "Right lobby side",
  timing: "ongoing",
  description: "Students of ‘ Fundamentals of Playwriting’ will be working like street poets. Pick a theme and get a customized scene!",
  program: "Theater",
  tags: ["theater"],
  floor: "ground"
},
{
  _id: "51",
  category: "",
  number: "51",
  color: {
    name: "dark_blue",
    r: 51,
    g: 69,
    b: 125
  },
  title: "Untitled, a performance",
  location: "Room 146",
  timing: "ongoing",
  description: "Participate in a performance about gender expectations.",
  program: "Theater",
  tags: ["theater"],
  floor: "first"
},
{
  _id: "53",
  category: "",
  number: "53",
  color: {
    name: "dark_blue",
    r: 51,
    g: 69,
    b: 125
  },
  title: "SURVEYS THE PRAIRIE OF YOUR ROOM",
  location: "Room 144",
  timing: "5:30-6:10 PM",
  description: "Witness Relocation will share a special draft showing of their new duet exploring behavior in liminal spaces and states.",
  program: "Theater",
  tags: ["theater"],
  floor: "first"
},
{
  _id: "54",
  category: "",
  number: "54",
  color: {
    name: "dark_blue",
    r: 51,
    g: 69,
    b: 125
  },
  title: "Soundpainting Performance",
  location: "West Lobby",
  timing: "6:15-6:30PM",
  description: "Tomi Tsunoda leads students from her class in an exhibition performance.",
  program: "Theater",
  tags: ["theater"],
  floor: "ground"
},
{
  _id: "55",
  category: "",
  number: "55",
  color: {
    name: "green",
    r: 159,
    g: 190,
    b: 123
  },
  title: "Dance/Theater in Liminal Spaces Workshop Showing",
  location: "Room 144",
  timing: "6:30-6:50 PM",
  description: "Witness Relocation will share will share techniques and materials with participants.",
  program: "Theater",
  tags: ["theater"],
  floor: "first"
},
{
  _id: "3",
  category: "",
  number: "3",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Documentary Forms: Poetry, Art, Video & Installation",
  location: "043 Design Studio",
  timing: "ongoing",
  description: "The students in Documentary Forms showcase their research, the materials they are using, and their encounters with the historical and the lyrical real!",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "5",
  category: "",
  number: "5",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "The Womanhood Project",
  location: "The Cube",
  timing: "ongoing",
  description: "Student group exhibition.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "6",
  category: "",
  number: "6",
  color: {
    name: "green",
    r: 159,
    g: 190,
    b: 123
  },
  title: "Woodshop Open House",
  location: "041 Woodshop",
  timing: "ongoing",
  description: "Come in for a tour of the woodshop, select student and instructor works will be on display.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "7",
  category: "",
  number: "7",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Under Pressure",
  location: "C3 Lobby",
  timing: "ongoing",
  description: "A collection of underwater photographs that captures the exquisite character of sea creatures.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "25",
  category: "",
  number: "25",
  color: {
    name: "unknown",
    r: 0,
    g: 0,
    b: 0
  },
  title: "Loom Demonstration",
  location: "157 Costume Shop",
  timing: "6-7 PM",
  description: "Come see our looms in action! See examples of fiber arts and take a turn weaving Watch a demonstration of our 300-year-old barn loom!",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "26",
  category: "",
  number: "26",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Foundations of 3D Works in Progress/Art and Architecture",
  location: "015",
  timing: "ongoing",
  description: "Works in clay, mixed media, photography, and more will be on display in and around 015.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "27",
  category: "",
  number: "27",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Projects in Painting/Foundations of 2D Student Exhibition",
  location: "174 Mixed Media Studio",
  timing: "ongoing",
  description: "",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "28",
  category: "",
  number: "28",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Foundations of Photography Student Works",
  location: "Outside 165",
  timing: "ongoing",
  description: "",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "29",
  category: "",
  number: "29",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Print Studio I Student Works",
  location: "165 Print/Photo Studio",
  timing: "ongoing",
  description: "",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "31",
  category: "",
  number: "31",
  color: {
    name: "green",
    r: 159,
    g: 190,
    b: 123
  },
  title: "Silkscreen Printing Demo",
  location: "165 Print/Photo Studio",
  timing: "ongoing",
  description: "Live demonstration of silkscreen printing process on t-shirts.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "32",
  category: "",
  number: "32",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Walking Art Project",
  location: "174 Mixed Media Studio",
  timing: "6-8:30 PM",
  description: "Body painting event with 30 student artists working live to create walking works of art with body paint and costumes.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "33",
  category: "",
  number: "33",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Darkroom Tour",
  location: "165 Print/Photo Studio",
  timing: "ongoing",
  description: "Come see the dark room where students work with photo chemicals, enlargers and safe lights to develop and print their analog photographs.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "39",
  category: "",
  number: "39",
  color: {
    name: "purple",
    r: 159,
    g: 100,
    b: 122
  },
  title: "Ukranian Painting Workshop",
  location: "Upper landing near 161",
  timing: "6-8 PM",
  description: "Join the Ukranian SIG and artisan to learn about traditional painting. Create your own masterpiece!",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "40",
  category: "",
  number: "40",
  color: {
    name: "purple",
    r: 159,
    g: 100,
    b: 122
  },
  title: "Custom Coaster Workshop",
  location: "041 and 043",
  timing: "6-8 PM",
  description: "Cut out a wooden coaster in the Woodshop (041), then use the laser cutter to cut a custom design in the Design Studio (043).",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "41",
  category: "",
  number: "41",
  color: {
    name: "purple",
    r: 159,
    g: 100,
    b: 122
  },
  title: "Button-making Workshop",
  location: "043 Design Studio",
  timing: "7-8:30 PM",
  description: "Design your own button pin with our button making machine!",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "42",
  category: "",
  number: "42",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Scene Shop Giant Games",
  location: "030 Scene Shop",
  timing: "ongoing",
  description: "Play giant versions of Jenga, cornhole, ring toss, and launch a trebuchet while you check out the shop!",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "43",
  category: "",
  number: "43",
  color: {
    name: "orange",
    r: 242,
    g: 157,
    b: 34
  },
  title: "Putting for Pleasure and Politics",
  location: "Plaza outside Arts Center",
  timing: "ongoing (Opening Ceremony at 6 PM)",
  description: "Play through this artist-designed mini-golf course and confront contemporary issues. Register your spot at the course.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "44",
  category: "",
  number: "44",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Discomfort",
  location: "Project Space Gallery",
  timing: "ongoing (Opening Reception at 6:30 PM)",
  description: "New artworks by David Darts exploring and playfully confronting uncomfortableness.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "45",
  category: "",
  number: "45",
  color: {
    name: "dark_blue",
    r: 51,
    g: 69,
    b: 125
  },
  title: "Walking Art Catwalk",
  location: "Arts Center Lobby",
  timing: "8:30 PM",
  description: "Not your traditional catwalk! Don’t miss this show of Walking Artworks, created by students and inspired by everything from Van Gogh paintings to manga and geometry.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "49",
  category: "",
  number: "49",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Impossible Pictograms",
  location: "Outside 043 Design Studio",
  timing: "ongoing",
  description: "Check out the pictograms designed by the Wayfinding class!",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "50",
  category: "",
  number: "50",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Arabic Typography Display",
  location: "Outside 043 Design Studio",
  timing: "ongoing",
  description: "",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
},
{
  _id: "57",
  category: "",
  number: "57",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Aerospace SIG Display",
  location: "By Red Theater upstairs",
  timing: "ongoing",
  description: "",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "58",
  category: "",
  number: "58",
  color: {
    name: "blue",
    r: 90,
    g: 145,
    b: 179
  },
  title: "Fiber Studio Student Works",
  location: "157 Costume Shop",
  timing: "ongoing",
  description: "Come see embroidery, knitting, crocheting, quilting, weaving, and more! Check out the authentic 17th century barn loom on display!",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "first"
},
{
  _id: "59",
  category: "",
  number: "59",
  color: {
    name: "dark_blue",
    r: 51,
    g: 69,
    b: 125
  },
  title: "Modern Dance Performance",
  location: "East Lobby",
  timing: "6:30 PM and 7:30 PM",
  description: "The Attitude Dance SIG and K. Korobkova perform short original choreography.",
  program: "Visual Arts",
  tags: ["visarts"],
  floor: "ground"
}
];


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);

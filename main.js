import Pins from "pins";import {    SwitchButton,    SwitchButtonBehavior} from 'switch';let percentage = 50;
let deviceURL = "";
let weight = 1.9;
Handler.bind("/discover", Behavior({    onInvoke: function(handler, message){        deviceURL = JSON.parse(message.requestText).url;    },}));

Handler.bind("/morePercentage", Behavior({    onInvoke: function(handler, message){
    	if (percentage != 100){        	percentage++;
        }    }}));

Handler.bind("/lessPercentage", Behavior({    onInvoke: function(handler, message){        if (percentage != 0){        	percentage--;
        	pictureURL = "images/feednow.png";
        	fed = 0;
        }    }}));

Handler.bind("/moreWeight", Behavior({    onInvoke: function(handler, message){
    	if (weight != 2.9){        	weight = weight * 10;
        	weight ++;
        	weight = weight/10;
        }    }}));

Handler.bind("/lessWeight", Behavior({    onInvoke: function(handler, message){        if (weight != 1.0){        	weight = weight * 10;
        	weight --;
        	weight = weight/10;
        }    }}));
class ApplicationBehavior extends Behavior {    onDisplayed(application) {
    	application.shared = true;        application.discover("device.app");    }    onQuit(application) {
    	application.forget("device.app");
    	application.shared = false;    }}application.behavior = new ApplicationBehavior();let bigTextStyle = new Style({ font: "bold 50px", color: "white" });let regularTextStyle = new Style({ font: "bold 30px", color: "white" });let smallTextStyle = new Style({ font: "bold 20px", color: "white" });let xsmallTextStyle = new Style({ font: "bold 10px", color: "white" });let headerTextStyle = new Style({ font: "bold 20px Century Gothic", color: "white" });let backgroundSkin = new Skin({ fill : "#009FE9" });let textStyle = new Style({ font: "bold 40px", color: "white" });let OpenContainer = Container.template($ => ({    top: 0, bottom: 0, left: 0, right: 0,    skin: new Skin({ fill: $.backgroundColor }),    behavior: Behavior({    	onTouchBegan: function(content){        },        onTouchEnded: function(content){            application.remove(currentScreen);            currentScreen = new ProfileScreen({backgroundColor: "white"});            application.add(currentScreen);        },        onToggleLight(container, value) {            container.boo.string = value;        }      }),    contents: [        Picture($, { height: 100,left: 70, right:70,bottom:120,top:70, url:"images/cheepfeeds.png"}),        Label($, {name:"boo", bottom: 170, left:0, right:0,style: new Style({ font: "bold 15px Century Gothic", color:"white" }),        	string: "E N T E R"})    ]}));let ProfileScreen = Column.template($ => ({    top: 0, bottom: 0, left: 0, right: 0,    skin: new Skin({ fill: "white" }),    behavior: Behavior({        onCreate: function(content){            application.add(navProfile)        }      }),    contents: [    	Picture($, { top:0,url:"images/profiletitle.png"}),        Picture($, { height:227,url:"images/profile.png"}),        Picture($, { left: 0, right:0,top:0, url:"images/info.png"}),        Label($, {top:-45,right:22,style: new Style({ font: " 18px Century Gothic", color:"white" }),            string: weight.toString() + " oz"}),                Picture($, { height:40,top: 13,url:"images/links.png"}),    ]}));let ProfileScreen2 = Column.template($ => ({    top: 0, bottom: 0, left: 0, right: 0,    skin: new Skin({ fill: "white" }),    behavior: Behavior({        onCreate: function(content){
        	        	if (fed == 1 && percentage != 100){
        		pictureURL = "images/feednow.png";        		fed = 0;        	}        },      }),    contents: [        Picture($, { top:0,url:"images/profiletitle.png"}),        Picture($, { height:227,url:"images/profile.png"}),        Picture($, { left: 0, right:0,top:0, url:"images/info.png"}),        Label($, {top:-45,right:22,style: new Style({ font: " 18px Century Gothic", color:"white" }),            string: weight.toString() + " oz"}),                Picture($, { height:40,top: 13,url:"images/links.png"}),    ]}));let data = { index:1 };  // Used to determine which transition to run nextlet screenColors = ['#5EFF56', '#537F51', '#85CC82', '#2F7F2B'];  //Used to determine color of numbered screenslet currentScreen = new OpenContainer({backgroundColor: "#009FE9"});
application.add(currentScreen);var schedule = 1 var beforeBell = 1var afterBell = 0let MySwitchTemplate = SwitchButton.template($ => ({    height: 50, width: 100, top:0, right:0,    Behavior: class extends SwitchButtonBehavior {        onValueChanged(container){			if (beforeBell == 1) {            	beforeBell = 0            }            else {            	beforeBell = 1            }                    }    }}));var feed = 0;
var fed = 0;
var pictureURL = "images/feednow.png";
var justfed = 0;var FeedScreen = Column.template($ => ({    top: 0, bottom: 0, left: 0, right: 0,    skin: new Skin({ fill: "white" }),    behavior: Behavior({      }),    contents: [        Picture($, { top:0,url:"images/feedtitle.png"}),
        Picture($, { height:150,top:10,url:"images/food.png"}),
        Label($, {top: 10, left:0,right:0,style: new Style({ font: "bold 22px Century Gothic", color:"gray" }),        		  string: "1 teaspoon bird food"}),
        Picture($, { top:12,url:pictureURL, active: true, 
        	behavior: Behavior({				onTouchBegan(picture) {
					if (fed == 0 && percentage != 100) {						picture.url = "images/feednowclicked.png";
						fed = 1
					}				},
				onTouchEnded(picture) {
					if (fed = 1 && percentage != 100) { 						picture.url = "images/fed.png";
						pictureURL = "images/fed.png";
						percentage = 100;
						if (beforeBell == 1){
							if (deviceURL != "") {
			                    new Message(deviceURL + "fed").invoke(Message.JSON);
				            }
				        }
				        else {
				        	if (deviceURL != "") {
			                    new Message(deviceURL + "fedno").invoke(Message.JSON);
				            }
				        }
		                    
					}				}			})		}),                Label($, {top: 15, left:10,style: new Style({ font: "bold 22px Century Gothic", color:"gray" }),        		  string: "Extra feeding settings/info"}),        new Line({        	left:0, right:0, top:0,        	contents:[        		Label($, {top: 15, left:20, style: new Style({ font: "bold 20px Century Gothic", color:"gray" }),        		  string: "Ring bell before feeding"}),        		new MySwitchTemplate({ top: 10,right: 0, value: beforeBell, name: "before"  }),        	]        }),      	new Line({      		left:0, right:0, top:0,      		contents:[        		Label($, {top: 5, left:20, style: new Style({ font: "bold 20px Century Gothic", color:"#009FE9" }),        		  string: "Food container is " + percentage + "% full"}),        	]        }),	    Picture($, { height:40,top:26,url:"images/links2.png"}),    ]}));/* Navigation Buttons */var NavButton = Container.template($ => ({    active: true, top: 2, bottom: 2, right: 2, left: 2,    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                  fill: "transparent",                   borders: {left: 1, right: 1, top: 1, bottom: 1},                   stroke: "transparent"                });            this.downSkin = new Skin({              fill: "transparent",               borders: {left: 1, right: 1, top: 1, bottom: 1},               stroke: "transparent"            });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;        },        onTouchEnded: function(content){            content.skin = this.upSkin;            application.remove(currentScreen);  // Remove the old screen from the application            application.remove(navHome);            currentScreen = new $.nextScreen;  // Make the new screen            application.add(currentScreen);  // Add the new screen to the application        },    }),}));var NavLink = Container.template($ => ({    active: true, top: 2, bottom: 2, right: 2, left: 2,    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                  fill: "transparent",                   borders: {left: 1, right: 1, top: 1, bottom: 1},                   stroke: "transparent"                });            this.downSkin = new Skin({              fill: "transparent",               borders: {left: 1, right: 1, top: 1, bottom: 1},               stroke: "transparent"            });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;        },        onTouchEnded: function(content){            content.skin = this.upSkin;            application.remove(currentScreen);  // Remove the old screen from the application            application.remove(navProfile);            application.add(navProfile);            currentScreen = new $.nextScreen;  // Make the new screen            application.add(currentScreen);  // Add the new screen to the application        },    }),}));/* Navigation Bars */var navProfile = new Line({ bottom: 0, height: 50, left:0,right: 0,    skin: new Skin({ fill: "black" }),    contents: [    	new NavLink({ nextScreen: ProfileScreen2 }),        new NavLink({ nextScreen: FeedScreen }),    ]});var navHome = new Column({ bottom: 150, height: 50, left: 0, right: 0,    skin: new Skin({ fill: "transparent" }),
        contents: [        new NavButton({ string: "E N T E R", nextScreen: ProfileScreen }),    ]});application.add(navHome);
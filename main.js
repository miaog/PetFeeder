import Pins from "pins";
let deviceURL = "";
let weight = 1.9;


Handler.bind("/morePercentage", Behavior({
    	if (percentage != 100){
        }

Handler.bind("/lessPercentage", Behavior({
        	pictureURL = "images/feednow.png";
        	fed = 0;
        }

Handler.bind("/moreWeight", Behavior({
    	if (weight != 2.9){
        	weight ++;
        	weight = weight/10;
        }

Handler.bind("/lessWeight", Behavior({
        	weight --;
        	weight = weight/10;
        }

    	application.shared = true;
    	application.forget("device.app");
    	application.shared = false;
        	
        		pictureURL = "images/feednow.png";
application.add(currentScreen);
var fed = 0;
var pictureURL = "images/feednow.png";
var justfed = 0;
        Picture($, { height:150,top:10,url:"images/food.png"}),
        Label($, {top: 10, left:0,right:0,style: new Style({ font: "bold 22px Century Gothic", color:"gray" }),
        Picture($, { top:12,url:pictureURL, active: true, 
        	behavior: Behavior({
					if (fed == 0 && percentage != 100) {
						fed = 1
					}
				onTouchEnded(picture) {
					if (fed = 1 && percentage != 100) { 
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
		                    
					}
    
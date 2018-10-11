
var settingsStatus = true;

$(document).ready(function(){
    console.log("Ready");
    // app.receivedEvent('deviceready');

    // alert("Connecting to server");
    
    // var socket = io("http://dronedazzledance-hosken.rhcloud.com:8080");
    // io.connect();

    
    
    // socket.on('connect', function() {
    //   socket.on('text', function(text) {
    //     alert(text);
    //    });

    //   socket.on('sync', function(text) {
    //     //alert(text);
    //     counter = 0;
    //    });
    //  });

    // alert("Connected to server");

    var flashSketch;

    flashSketch = new p5(sketch, "sketch-holder");

    $("#settings").click(function(){
        $('#info').toggle();

        if (settingsStatus){
            $("#settings").html("Open Settings");
        }
        else{
            $("#settings").html("Close Settings");            
        }

        settingsStatus = !settingsStatus;
    });

});

        


var sketch = function(p){

    var flash = false;
    var bgCol;
    var counter;

    p.setup = function(){
        console.log("Setup Sketch")
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.frameRate(32);
        p.counter = 0;
    }

    p.draw = function(){

        if(p.flash){
            p.background(p.bgCol);
        }else{
            p.background(0);
        }

        patternController(p);
    }

}



var patternController = function(p){

        var choice = document.querySelector('input[name="pattern"]:checked').value;

        if(choice == "01"){
                console.log("1")
                p.bgCol = p.color(255,0,0);
                pattern01(p,p.counter);
        }
        if(choice == "02"){
                console.log("2")
                p.bgCol = p.color(0,255,0);
                pattern02(p,p.counter);
        }
        if(choice == "03"){
                console.log("3")
                p.bgCol = p.color(0,0,255);
                pattern03(p,p.counter);
        }
        
        p.counter += 1;

    }

var onFlash = function(p, timeOn){
    console.log("True")
    p.flash = true;

    setTimeout(function(){
        console.log("False")
        p.flash = false;
    }, timeOn)

}







var pattern01 = function(p,counter){
    // bgCol = p.color(255,0,0);

    var quarter = 1000/p.frameRate();
    var beat = quarter*4;
    if(counter % 64 == 8){
        onFlash(p,beat*3);
    }
    if(counter % 64 == 32){
        onFlash(p,beat*3);
    }
    if(counter % 64 == 56){
        onFlash(p,beat);
    }

    if(counter == 64){
        counter = 0;
    }
}

var pattern02 = function(p,counter){
    // bgCol = p.color(0,255,0);

    var quarter = 1000/p.frameRate();
    var beat = quarter*4;

    if(counter % 64 == 8){
        onFlash(p,beat);
    }
    if(counter % 64 == 16){
        onFlash(p,beat);
    }
    if(counter % 64 == 24){
        //onFlash(p,beat*5);
    }
    if(counter % 64 == 32){
        //onFlash(p,beat);
    }
    if(counter % 64 == 40){
        onFlash(p,beat);
    }
    if(counter % 64 == 48){
        //onFlash(p,beat);
    }
    if(counter % 64 == 56){
        onFlash(p,beat);
    }
    if(counter % 64 == 0){
        //onFlash(p,beat);
    }

    if(counter == 64){
        counter = 0;
    }
}

var pattern03 = function(p,counter){
    // bgCol = p.color(0,0,255);

    var quarter = 1000/p.frameRate();
    var beat = quarter*4;

    if(counter % 64 == 8){
        onFlash(p,beat*3);
    }

    if(counter % 64 == 24){
        onFlash(p,beat*3);
    }

    if(counter % 64 == 40){
        onFlash(p,beat*7);
    }

    if(counter == 64){
        counter = 0;
    }
}

/*

//P5

var currentFill = 0;
var flashProb = false;
var counter = 0;

//p5 Sketch
var sketch = function(p){

    var slider01;
    var col;
    var bgCol = p.color(255,0,0);

    p.setup = function(){
        col = Math.random() * (255);
        console.log("Setup Sketch")
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.frameRate(32);
    }

    p.draw = function(){
        if(flash){
            p.background(bgCol);
        }else{
            p.background(0);
        }
        
        p.fill(255);
        p.text(p.frameRate(),10, 10);

        p.fill(currentFill)
        p.rect(0,100,window.innerWidth,110);

        //patternController(p);
    }
    var patternController = function(p){

        var choice = document.querySelector('input[name="pattern"]:checked').value;

        if(choice == "01"){
                bgCol = p.color(255,0,0);
                pattern01(p,counter);
        }
        if(choice == "02"){
                bgCol = p.color(0,255,0);
                pattern02(p,counter);
        }
        if(choice == "03"){
                bgCol = p.color(0,0,255);
                pattern03(p,counter);
        }
        
        counter += 1;

    }
}


var onFlash = function(p, timeOn){
    flash = true;
    setTimeout(offFlash(), timeOn)

}

var offFlash = function(){
    flash = false;
}

var pattern01 = function(p,counter){

    var quarter = 1000/p.frameRate();
    var beat = quarter*4;

    if(counter % 64 == 8){
        onFlash(p,beat*3);
    }
    if(counter % 64 == 32){
        onFlash(p,beat*3);
    }
    if(counter % 64 == 56){
        onFlash(p,beat);
    }

    if(counter == 64){
        counter = 0;
    }
}

var pattern02 = function(p,counter){

    var quarter = 1000/p.frameRate();
    var beat = quarter*4;

    if(counter % 64 == 8){
        onFlash(p,beat);
    }
    if(counter % 64 == 16){
        onFlash(p,beat);
    }
    if(counter % 64 == 24){
        //onFlash(p,beat*5);
    }
    if(counter % 64 == 32){
        //onFlash(p,beat);
    }
    if(counter % 64 == 40){
        onFlash(p,beat);
    }
    if(counter % 64 == 48){
        //onFlash(p,beat);
    }
    if(counter % 64 == 56){
        onFlash(p,beat);
    }
    if(counter % 64 == 0){
        //onFlash(p,beat);
    }

    if(counter == 64){
        counter = 0;
    }
}

var pattern03 = function(p,counter){

    var quarter = 1000/p.frameRate();
    var beat = quarter*4;

    if(counter % 64 == 8){
        onFlash(p,beat*3);
    }

    if(counter % 64 == 24){
        onFlash(p,beat*3);
    }

    if(counter % 64 == 40){
        onFlash(p,beat*7);
    }

    if(counter == 64){
        counter = 0;
    }
}



*/






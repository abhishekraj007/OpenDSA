/*
    global JSAV, window
    Written by Jieun Chon and Cliff Shaffer
*/

(function() {
  "use strict";

  var av, // The JSAV object
      priceAnswerBox,
      totalAnswerBox,
      priceAnswer,
      totalAnswer,
      position,
      array = [],
      priceBoxLabel,
      totalBoxLabel,
      clickedLabel,
      priceBox,
      totalBox,
      labelLeft;

  var iterationEX1PRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    clickbox: function(){
      var newLabelLeft = labelLeft;
      if(this == priceBox || this == priceBoxLabel.element){
        var price = prompt("Please enter the current price.", "0");
        if(price != ""){
          priceBoxLabel.value(price);
          while(price >= 10){
            newLabelLeft -= 5.5;
            price /= 10;
          }
          priceBoxLabel.css({left: newLabelLeft});
        }
      } else {
        var total = prompt("Please enter the current total.", "0");
        if(total != ""){
          totalBoxLabel.value(total);
          while(total >= 10){
            newLabelLeft -= 5.5;
            total /= 10;
          }
          totalBoxLabel.css({left: newLabelLeft});
        }
      }
    },

      // Reinitialize the exercise.
    reset: function() {
      position = Math.floor(Math.random() * 2) + 1;

      // Reset the value of global variables.
      iterationEX1PRO.userInput = false;

      // Clear the old JSAV canvas.
      if ($("#IterationEX1PRO")) { $("#IterationEX1PRO").empty(); }

      // Set up the display
      av = new JSAV("IterationEX1PRO");


// --------------- Create random array ----------------
      var arraySize = 5;
      priceAnswer = 0;
      totalAnswer = 0;
      for(var i = 0; i < arraySize; i++){ // Give random numbers in range 1..2
          array[i] = Math.floor(Math.random() * 10) + 1;
      }

      priceAnswer = array[position];
      for(var i = 0; i <= position; i++){
        totalAnswer += array[i];
      }

      // console.log(totalAnswer + " " + priceAnswer);

      var leftMargin = 280,
          topMargin = 0,
          rect_left = leftMargin - 150,
          rect0_top = topMargin + 0,
          rect_top = topMargin + 40,
          topMargin = rect_top + 20;

      var nodegap = 40;


      // blue boxes, floor 1
      var topblue = av.g.rect(rect_left, rect0_top, 280, 35, 10).addClass("bluebox");
      var botblue = av.g.rect(rect_left, rect0_top + 295, 280, 35, 10).addClass("bluebox");

      // floor 2
      av.g.rect(rect_left, rect_top, 250, 35, 10).addClass("box");
      av.g.rect(rect_left, rect_top + 20, 50, 15).addClass("box"); // for no-roung on the corner

      //floor 3 and the JSAV array contains array
      av.g.rect(rect_left, rect_top + 25, 30, 60, 10).addClass("box").css({opacity: 0.6});
      av.g.rect(rect_left + 73, rect_top + 25, 30, 60, 10).addClass("box").css({opacity: 0.9});
      var arr = av.ds.array(array, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

      //floor 4, long purple
      av.g.rect(rect_left, rect_top + 76, 300, 30, 10).addClass("box");

      //floor 5, left big purple box
      av.g.rect(rect_left, rect_top + 80, 110, 170, 10).addClass("box");
      av.g.rect(rect_left, rect_top + 76, 50, 15).addClass("box");

      //mid blue/calculate boxes ( and "set total = ..." blue box )
      var midblue1 = av.g.rect(rect_left + 130, rect_top + 120, 150, 66, 10).addClass("bluebox");
      var midblue2 = av.g.rect(rect_left + 220, rect_top + 139, 20, 32, 15).addClass("calbox");
      var midblue3 = av.g.rect(rect_left + 235, rect_top + 120, 100, 66, 10).addClass("calbox");
      var outline = av.g.rect(rect_left + 130, rect_top + 120, 205, 66, 10).addClass("yellowout");

      // last purple floor
      av.g.rect(rect_left + 90, rect_top + 200, 240, 50, 10).addClass("box");

      // ------------------ labels ------------------------

        var initlabel = av.label("set total = 0", {left: rect_left + 5, top: rect_top - 60});
        initlabel.addClass("labels").addClass("midlabel");

        var label1 = av.label("for each item", {left: rect_left + 5, top: rect_top - 20});
        label1.addClass("labels");

        var label2 = av.label("price", {left: rect_left + 22, top: rect_top + 55});
        label2.addClass("labels");

        var label3 = av.label("do", {left: rect_left + 35, top: rect_top + 120});
        label3.addClass("labels");

        var pricelabel = av.label("set total =", {left: rect_left + 140, top: rect_top + 123});
        pricelabel.addClass("labels");
        pricelabel.addClass("smalllabel");

        var pricelabel = av.label("total + price", {left: rect_left + 235, top: rect_top + 123});
        pricelabel.addClass("labels");
        pricelabel.addClass("smalllabel");

        var valuelabel = av.label("", {left: rect_left + 390, top: rect_top + 111});
        valuelabel.addClass("labels");
        valuelabel.addClass("valuelabel");


        // <<--------------- STATE BOX ----------------->>

        //Total and Price boxes' label x position.
        var stateX = 500;
        var stateY = - 20;
        var stateLabel = av.label("STATE", {left: stateX, top: stateY});

        labelLeft = stateX + 25;

        stateLabel.addClass("statelabel");

        var stateBox = av.g.rect(stateX - 25, stateY + 50, 110, 280).addClass("statebox");


        // price box and label
        av.label("price", {left: stateX + 5, top: stateY + 55}).addClass("statelabellarge");;

        // total box and label
        av.label("total", {left: stateX + 5, top: stateY + 173}).addClass("statelabellarge");



        priceBox = av.g.rect(stateX - 5, stateY + 105, 70, 70).addClass("bluebox");
        priceBoxLabel = av.label("", {left: labelLeft - 19, top: stateY + 105});
        priceBoxLabel.addClass("labels");
        priceBoxLabel.addClass("midlabel");


        totalBox = av.g.rect(stateX - 5, stateY + 220, 70, 70).addClass("bluebox");
        totalBoxLabel = av.label("", {left: labelLeft - 19, top: stateY + 220});
        totalBoxLabel.addClass("labels");
        totalBoxLabel.addClass("midlabel");




        priceBox.click(iterationEX1PRO.clickbox);
        totalBox.click(iterationEX1PRO.clickbox);
        // priceBoxLabel.element.click(iterationEX1PRO.clickbox);
        // totalBoxLabel.element.click(iterationEX1PRO.clickbox);
        //

// --------------- Move array to the right position
      var nextleft = leftMargin - 120;
      var nodegap = 40;

        for(var i = 0; i < position; i++){
              nextleft -= nodegap;
        }
        arr.css({left: nextleft});

      av.displayInit();
      av.recorded();

    },

    // Initialise the exercise
    initJSAV: function() {
      priceAnswerBox = document.getElementById('priceAnswerBox');
      totalAnswerBox = document.getElementById('totalAnswerBox');

      iterationEX1PRO.reset();

      // Set up handler for reset button
      $("#reset").click(function() {
        iterationEX1PRO.reset();
      });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      return priceBoxLabel.value() == priceAnswer && totalBoxLabel.value() == totalAnswer;
    },
  };

  window.iterationEX1PRO = window.iterationEX1PRO || iterationEX1PRO;
}());

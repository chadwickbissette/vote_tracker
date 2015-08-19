'use strict'

$(document).ready(function(){

  var Photo = function(fileLocation) { //constructor
    this.path = fileLocation;
    this.vote = 1;
  };

  var Tracker = function() {
    this.photoArray = [];
    this.leftPhoto = '';
    this.rightPhoto = '';
  };

  Tracker.prototype.getRandomInt = function() {
    return (Math.floor(Math.random()*(14-1+1))+1)-1;
  };

  Tracker.prototype.setPhoto = function(){
    this.leftPhoto = this.photoArray[this.getRandomInt()];
    this.rightPhoto = this.photoArray[this.getRandomInt()];
      while (this.leftPhoto.path == this.rightPhoto.path) {
        this.rightPhoto = this.photoArray[this.getRandomInt()];
      }
  };

  Tracker.prototype.displayPhotos = function() {
    $('#photo1').attr("src",this.leftPhoto.path);
    $('#photo2').attr("src",this.rightPhoto.path);
    this.highlight();
  };


  Tracker.prototype.highlight = function(highlightIt) {
    //Remove existing highlighting (if any)
    $('#photo1').attr("class", "central");
    $('#photo2').attr("class", "central");
    //Highlight Element
    if (highlightIt){
      highlightIt.attr("class", "central highlight");
    }
  };

  Tracker.prototype.incrementVote = function(winner){
    winner.vote = winner.vote + 1;
  };

  Tracker.prototype.returnWinnerElement = function(){
      if (this.leftPhoto.vote > this.rightPhoto.vote) {
        return $('#photo1');

      } else if (this.leftPhoto.vote < this.rightPhoto.vote){
          return $('#photo2');
        }
  };

  Tracker.prototype.listenForVote = function(){
    $('#photo1').on('click', function(){
      tracker1.incrementVote(tracker1.leftPhoto);
      var winnerDomLocation = tracker1.returnWinnerElement();
      tracker1.displayWinner(winnerDomLocation);
      }
    );

    $('#photo2').on('click', function(){
      tracker1.incrementVote(tracker1.rightPhoto);
      var winnerDomLocation = tracker1.returnWinnerElement();
      tracker1.displayWinner(winnerDomLocation);
    });
  };

  Tracker.prototype.drawTheChart = function(){
    $('#chart').attr("class", "central");
    var leftPercentage = Math.ceil(this.leftPhoto.vote/(this.leftPhoto.vote + this.rightPhoto.vote)*100);
    var rightPercentage = (100 - leftPercentage);

    var chartData = [
      {
        value: rightPercentage,
        color: "blue",
        highlight: "blue",
        label:"red"
      },
      {
        value: leftPercentage,
        color: "red",
        highlight: "red",
        label:"blue"
      }
    ];

    var chartOptions = {animateScale: true};

    var chart = document.getElementById("chart").getContext("2d");
    new Chart(chart).Pie(chartData, chartOptions);

  };

  Tracker.prototype.encourageNext = function (){
    $('#thebutton').attr("class", "button");
    $('#thebutton').on('click', function(){
      $('#thebutton').attr("class", "button noDisplay");
      $('#chart').attr("class", "central noDisplay");
      tracker1.waitingForVote();
    });
  };

  Tracker.prototype.waitingForVote = function() {
    this.setPhoto();
    this.displayPhotos();
    this.listenForVote();
  };

  Tracker.prototype.displayWinner = function(winner) {
    this.drawTheChart();
    tracker1.highlight(winner);
    tracker1.encourageNext();
  };


  //Set the process in motion by instantiating a tracker, all 14 photos, and calling State 1 method
  var tracker1 = new Tracker();

  var numberPhotos = 14;
  for (var i = 0; i < numberPhotos; i++){
    tracker1.photoArray.push(new Photo('img/kittens/photo' + (i+1) +'.jpg'));
  }

  tracker1.waitingForVote();
});


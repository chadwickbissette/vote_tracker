'use strict'

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
  var theLeftPhotoElement = document.getElementById("photo1");
  theLeftPhotoElement.attributes[0].value = this.leftPhoto.path;

  var theRightPhotoElement = document.getElementById("photo2");
  theRightPhotoElement.attributes[0].value = this.rightPhoto.path;
};


Tracker.prototype.highlight = function(highlightIt) {
  //Remove existing highlighting (if any)
  document.getElementById('photo1').className = "central";
  document.getElementById('photo2').className = "central";
  //Highlight Element
  if (highlightIt){
    highlightIt.className = "central highlight";
  }
};

Tracker.prototype.incrementVote = function(winner){
  winner.vote = winner.vote + 1;
};

Tracker.prototype.returnWinnerElement = function(){
    if (this.leftPhoto.vote > this.rightPhoto.vote) {
      var winnerElementLocation = document.getElementById("photo1");

    } else if (this.leftPhoto.vote < this.rightPhoto.vote){
        var winnerElementLocation = document.getElementById("photo2");
      }
    return winnerElementLocation;
};

Tracker.prototype.listenForVote = function(){
  var theLeftPhotoElement = document.getElementById("photo1");
  theLeftPhotoElement.addEventListener('click', function(){
    tracker1.incrementVote(tracker1.leftPhoto);
    var winnerDomLocation = tracker1.returnWinnerElement();
    tracker1.displayWinner(winnerDomLocation);
    }
  );

  var theRightPhotoElement = document.getElementById("photo2");
  theRightPhotoElement.addEventListener('click', function(){
    tracker1.incrementVote(tracker1.rightPhoto);
    var winnerDomLocation = tracker1.returnWinnerElement();
    tracker1.displayWinner(winnerDomLocation);
  });
};

Tracker.prototype.drawTheChart = function(){
  var canvasElement = document.getElementById("chart");
  canvasElement.attributes[1].value = "centrals";
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
  var canvasElement = document.getElementById("chart");
  var voteAgainButton = document.getElementById("thebutton");
  voteAgainButton.attributes[1].value = "button";
  voteAgainButton.addEventListener('click', function(){
    voteAgainButton.attributes[1].value = "button noDisplay";
    canvasElement.attributes[1].value = "central noDisplay";
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


//Set the process in motion by instantiating a tracker and calling State 1 method
var tracker1 = new Tracker();

tracker1.photoArray.push(new Photo('img/kittens/photo1.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo2.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo3.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo4.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo5.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo6.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo7.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo8.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo9.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo10.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo11.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo12.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo13.jpg'));
tracker1.photoArray.push(new Photo('img/kittens/photo14.jpg'));

tracker1.waitingForVote();





// the old "waiting dof vote TODO list":
  //recieve click and increment the vote count
  //event listener on each photo
  //drawTheChart()?
  //giveUserOptionToVoteAgain()?
  //event listener will call dispalyWinner()
  //call displayPhoto()
  //recieveVote()

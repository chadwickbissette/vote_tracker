'use strict'

var photoArray; //array of photo objects that carry the path and the vote
//tally, and perhaps the name too.

//[{}, {}, {}...]

var Photo = function(fileLocation) { //constructor
  this.path = fileLocation;
  this.vote = 1;
  this.index = //where it lives in photoArray

}

var photo1 = new Photo('img/photo1.jpg')//example
...
...
...
var photo14 = new Photo('img/photo14.jpg')//example

var Tracker = function() {
  this.leftPhoto
  this.rightPhoto

}

Photo.prototype.highlight = function() {
//highlight photo after clicked
};

Tracker.prototype.waitingForVote = function() {
//recieve click and increment the vote count

//event listener on each photo

//drawTheChart()?

//giveUserOptionToVoteAgain()?

//event listener will call dispalyWinner()

//call displayPhoto()

//recieveVote()
};

Tracker.prototype.getRandomInt = function() {
//generate random number to select image from photoArray
};

Tracker.prototype.displayPhotos = function() {
//display random photos

//prevent picking same photo twice
// if(photo1 === photo2) then re-roll

};

Tracker.prototype.displayWinner = function() {

//event listner will call waitingForVote()

//call highlight()
};

//DOM 'document.getElementById'

var photo1 = new Photo('img/photo1.jpg');//example
var photo2 = new Photo('img/photo2.jpg');
var photo3 = new Photo('img/photo3.jpg');
var photo4 = new Photo('img/photo4.jpg');
var photo5 = new Photo('img/photo5.jpg');
var photo6 = new Photo('img/photo6.jpg');
var photo7 = new Photo('img/photo7.jpg');
var photo8 = new Photo('img/photo8.jpg');
var photo9 = new Photo('img/photo9.jpg');
var photo10 = new Photo('img/photo10.jpg');
var photo11 = new Photo('img/photo11.jpg');
var photo12 = new Photo('img/photo12.jpg');
var photo13 = new Photo('img/photo13.jpg');
var photo14 = new Photo('img/photo14.jpg')//example

var Tracker = function() {
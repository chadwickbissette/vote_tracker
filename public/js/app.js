'use strict'

$(document).ready(function(){

  // Tracker.prototype.ajaxCall = function(){
    $.ajax({
      url: 'https://api.imgur.com/3/album/DDoWy',
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID e7de3c2457cfbe0'
      }
    })
    .done(function(obtained){
      var photos = obtained.data.images;

        var Photo = function(fileLocation) {
          this.path = fileLocation;
          this.vote = 1;
        };

        var Tracker = function(blank) {
          this.photoArray = [];
          this.leftPhoto = blank;
          this.rightPhoto = blank;
        };

        var tracker1 = new Tracker('blank');

        for(var i=0; i<photos.length; i++){
          tracker1.photoArray.push(new Photo(photos[i].link))
          // tracker1.photoArray[i].path = photos[i].link;
        }
        Tracker.prototype.getRandomInt = function() {
          return (Math.floor(Math.random()*(14-1+1))+1)-1;
        };

        Tracker.prototype.setPhoto = function(){
          tracker1.leftPhoto = tracker1.photoArray[tracker1.getRandomInt()];
          tracker1.rightPhoto = tracker1.photoArray[tracker1.getRandomInt()];
            while (tracker1.leftPhoto.path == tracker1.rightPhoto.path) {
              tracker1.rightPhoto = tracker1.photoArray[tracker1.getRandomInt()];
            }
        };

        Tracker.prototype.displayPhotos = function() {
          $('#photo1').attr("src",tracker1.leftPhoto.path);
          $('#photo2').attr("src",tracker1.rightPhoto.path);
          tracker1.highlight();
        };


        Tracker.prototype.highlight = function(highlightIt) {
          //Remove existing highlighting (if any)
          $('#photo1').attr("class", "central");
          $('#photo2').attr("class", "central");
          //Highlight Element
          if (highlightIt){
            console.dir(highlightIt.attr('id'));
            if (highlightIt.attr('id') == 'photo1'){
              highlightIt.attr("class", "central highlightRed");
            } else if (highlightIt.attr('id') == 'photo2'){
              highlightIt.attr("class", "central highlightBlue");
            }
          }
        };

        Tracker.prototype.incrementVote = function(winner){
          winner.vote = winner.vote + 1;
        };

        Tracker.prototype.returnWinnerElement = function(){
            if (tracker1.leftPhoto.vote > tracker1.rightPhoto.vote) {
              return $('#photo1');

            } else if (tracker1.leftPhoto.vote < tracker1.rightPhoto.vote){
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
          var leftPercentage = Math.ceil(tracker1.leftPhoto.vote/(tracker1.leftPhoto.vote + tracker1.rightPhoto.vote)*100);
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
          tracker1.setPhoto();
          tracker1.displayPhotos();
          tracker1.listenForVote();
        };

        Tracker.prototype.displayWinner = function(winner) {
          tracker1.drawTheChart();
          tracker1.highlight(winner);
          tracker1.encourageNext();
        };

        //Set the process in motion by instantiating a tracker, all 14 photos, and calling State 1 method

        // var numberPhotos = 14;
        // for (var i = 0; i < numberPhotos; i++){
        //   // tracker1.photoArray.push(new Photo('img/kittens/photo' + (i + 1) +'.jpg'));
        //   tracker1.photoArray.push(new Photo(''));
        // };
        // tracker1.ajaxCall();
        tracker1.waitingForVote();

      tracker1.setPhoto();
    })
    .fail(function(error){
      console.log('error');
    });
  // }; // end ajax call proto
});


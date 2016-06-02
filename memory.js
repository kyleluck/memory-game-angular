var app = angular.module('memory-game', []);
app.controller('MemoryGameController', function($scope, $timeout) {

  var compareTiles = [];
  var state = "first";

  $scope.gameOver = false;

  function Tile(url) {
    this.url = url;
    this.hide = true;
  }

  function createGrid() {
    $scope.grid = [];
    for (var i = 1; i < 5; i++) {
      var tile1 = new Tile('images/monsters-0' + i + '.png');
      var tile2 = new Tile('images/monsters-0' + i + '.png');
      $scope.grid.push(tile1);
      $scope.grid.push(tile2);
    }
  }

  // -> Fisher–Yates shuffle algorithm
  function shuffleArray(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  $scope.match = function () {
    if ($scope.grid[compareTiles[0]].url === $scope.grid[compareTiles[1]].url) {
      checkIfGameOver();
      compareTiles = [];
    }
    else {
      $timeout(function() {
        $scope.grid[compareTiles[0]].hide = true;
        $scope.grid[compareTiles[1]].hide = true;
        compareTiles = [];
      }, 500);
    }
  }

  $scope.showTile = function(tile) {
    tile.hide = false;
    var index = $scope.grid.indexOf(tile);
    compareTiles.push(index);
    if (state === "first") {
      state = "second";
    }
    else {
      state = "first";
      $scope.match();
    }
  };

  function checkIfGameOver() {
    var allShown = true;
    for (var i = 0; i < $scope.grid.length; i++) {
      if ($scope.grid[i].hide === true) {
        allShown = false;
      }
    }
    if (allShown) {
      $scope.gameOver = true;
    } else {
      $scope.gameOver = false;
    }
  }

  $scope.resetGame = function() {
    createGrid();
    shuffleArray($scope.grid);
    $scope.gameOver = false;
  }

  $scope.resetGame();

});

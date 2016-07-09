var app = angular.module('cracker', []);

app.controller('MainCtrl', [
  '$scope',
  '$interval',
  function($scope,$interval){
    $scope.running = false;
    $scope.currentArray = [32];
    $scope.stringArray = [' '];
    $scope.ints = 0;
    $scope.speed = 0;
    $scope.time = 0;
    $scope.hash = '1bc29b36f623ba82aaf6724fd3b16718';
    $scope.start = function(){
      $scope.startTime = (new Date()).getTime();
      $scope.running = true;
    }
    $scope.incrementArray = function(){
      for(i=0;i<$scope.currentArray.length;i++){
        if($scope.currentArray[i]<127){
          $scope.currentArray[i]+=1;
          $scope.stringArray[i]=String.fromCharCode($scope.currentArray[i]);
          i=$scope.currentArray.length;
        } else if(!$scope.currentArray[i+1]){
          for(p=0;p<$scope.currentArray.length;p++){
            $scope.currentArray[p]=32;
            $scope.stringArray[p]=' ';
          }
          $scope.currentArray.push(32);
          $scope.stringArray.push(' ');
        } else {
          $scope.currentArray[i]=32;
          $scope.stringArray[i]=' ';
        }
      }
      var string = '';
      for(l=0;l<$scope.stringArray.length;l++){
        string+=$scope.stringArray[l];
      }
      $scope.currentHash = md5(string);
      if($scope.hash==$scope.currentHash){
        $scope.running=false;
      }
      $scope.timeNow = (new Date()).getTime();
      $scope.ints+=1;
      $scope.speed = Math.round((1000*$scope.ints)/($scope.timeNow-$scope.startTime));
      $scope.time = Math.round(($scope.timeNow-$scope.startTime)/1000);
    }

    $interval(function(){
      if ($scope.running==true){
        $scope.incrementArray();
      }
    },0);
    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
])

angular.module("series").controller("seriesController",function($scope, $http, seriesAPI, listAPI){
    $scope.series = [];
    $scope.showWatchList = [];
    $scope.showWatchedList = [];

    $scope.getNome = function(nome){
      $scope.series = [];
        seriesAPI.getSeries(nome).then(function(promise){
          if(promise.data.Response != 'False') {
            $scope.series = listAPI.chunk(promise.data.Search,5);
            console.log($scope.series);
          }else{
            $scope.series.push(['N/A']);
          }
        }, function(error){
          console.log(error);
        });
    }

    $scope.watchList = [];
    $scope.queroAssistir = function(id){
      var filme = seriesAPI.getSerie(id).then(function(resolve){
        listAPI.adicionaWL(resolve.data, $scope.watchList);
        $scope.showWatchList = listAPI.chunk($scope.watchList, 5);
      },function(){});
    };

    $scope.watchedList = [];
    $scope.assistidos = function(filme){
      var filme = seriesAPI.getSerie(filme).then(function(resolve){
        listAPI.adicionaWL(resolve.data, $scope.watchedList);
        $scope.showWatchedList = listAPI.chunk($scope.watchedList, 5);
      },function(){});
    };

});

angular.module("series", []);
angular.module("series").controller("seriesController",function($scope, $http, seriesAPI, listAPI){
    $scope.series = [];
    $scope.getNome = function(nome){
      $scope.series = [];
        seriesAPI.getSeries(nome).then(function(promise){
          if(promise.data.Response != 'False'){
            $scope.series = listAPI.pesquisa(promise.data.Search,4);
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
      },function(){

      });
    };

    $scope.watchedList = [];
    $scope.assistidos = function(filme){
      listAPI.watchedList.push(filme, $scope.watchedList);
    };

});

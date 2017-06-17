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

    function contains(serie, lista) {
        for (var i = 0; i < lista.length; i++) {
          if(lista[i].imdbID == serie.imdbID){
            return true;
          }
        }return false;
    }

    $scope.serieTemp = function(serie){
        var temporadas = [];
        var tep =  function(n){
          var _episodios = [];
          var _num = n;

          function addEp(ep){
            this._episodios.push(ep);
          }

          return {
             num : _num,
             episodios: _episodios,
             addEp: addEp
          }
        }
        for (var i = 1; i <= serie.totalSeasons; i++) {
          var temp = tep(i);
          temporadas.push(temp);
        }
        serie.temporadas = temporadas;
        return serie;
    };

    $scope.watchList = [];
    $scope.adicionou = true;
    $scope.queroAssistir = function(id){
      $scope.adicionou = true;
      var filme = seriesAPI.getSerie(id).then(function(resolve){
        if(!contains(resolve.data,$scope.watchList)){
          listAPI.adicionaWL(resolve.data, $scope.watchList);
          $scope.showWatchList = listAPI.chunk($scope.watchList, 5);
          $scope.adicionou = true;
        }else{
          $scope.adicionou = false;
        }
      },function(){});
    };

    $scope.alteraValor = function(){
      $scope.adicionou = true;
    }

    $scope.watchedList = [];
    $scope.assistidos = function(filme){
      var filme = seriesAPI.getSerie(filme).then(function(resolve){
        listAPI.adicionaWL($scope.serieTemp(resolve.data), $scope.watchedList);
        console.log(resolve.data);
        $scope.showWatchedList = listAPI.chunk($scope.watchedList, 5);
      },function(){});
    };

});

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

    $scope.funcao1 = function(serie) {
      var x;
      var r=confirm("Deseja realmente apagar a série?");
      if (r==true){
        $scope.removeSerieWatched(serie);
      }
    }
    $scope.funcao2 = function(serie) {
      var x;
      var r=confirm("Deseja realmente apagar a série?");
      if (r==true){
        $scope.removeSerieWatch(serie);
      }
    }

    $scope.subString = function(nota){
      var posi = nota.indexOf(".");
      if(posi != -1){
        return nota.substring(0,posi);
      }return nota;
    }

    function contains(serie, lista) {
        for (var i = 0; i < lista.length; i++) {
          if(lista[i].imdbID == serie.imdbID){
            return true;
          }
        }return false;
    }

    $scope.removeSerieWatched = function(serie){
      var posicao = $scope.watchedList.indexOf(serie);
      $scope.watchedList.splice(posicao,1);
      $scope.showWatchedList = listAPI.chunk($scope.watchedList, 5);
    }
    $scope.removeSerieWatch = function(serie){
      var posicao = $scope.watchList.indexOf(serie);
      $scope.watchList.splice(posicao,1);
      $scope.showWatchList = listAPI.chunk($scope.watchList, 5);
    }

    $scope.stringEps = function(array){
      var saida = "";
      array = array.sort();
      for (var i = 0; i < array.length; i++) {
        saida+=array[i]+", ";
      }
      return saida;
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
        serie.nota = "0.0";
        console.log(serie);
        return serie;
    };

    $scope.adicionarNota = function(serie, nota){
      serie.nota = nota;
    }

    $scope.watchList = [];
    $scope.adicionou = true;
    $scope.queroAssistir = function(id){
      $scope.adicionou = true;
      var filme = seriesAPI.getSerie(id).then(function(resolve){
        if(!contains(resolve.data,$scope.watchList)){
          if(resolve.data.Poster == 'N/A'){
            resolve.data.Poster = 'noimage.jpg';
          }
          listAPI.adicionaWL(resolve.data, $scope.watchList);
          $scope.showWatchList = listAPI.chunk($scope.watchList, 5);
          $scope.adicionou = true;
        }else{
          $scope.adicionou = false;
          $scope.myFunction();
        }
      },function(){});
    };

    $scope.alteraValor = function(){
      $scope.adicionou = true;
    }

    $scope.myFunction = function() {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
    }

    $scope.watchedList = [];
    $scope.assistidos = function(filme){
      $scope.adicionou = true;
      var filme = seriesAPI.getSerie(filme).then(function(resolve){
        if(!contains(resolve.data, $scope.watchedList)){
          if(resolve.data.Poster == 'N/A'){
            resolve.data.Poster = 'noimage.jpg';
          }
          listAPI.adicionaWL($scope.serieTemp(resolve.data), $scope.watchedList);
          $scope.showWatchedList = listAPI.chunk($scope.watchedList, 5);
          $scope.adicionou = true;
        }else{
          $scope.adicionou = false;
          $scope.myFunction();
        }
      },function(){});
    };

});

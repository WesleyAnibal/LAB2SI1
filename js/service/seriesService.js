angular.module("series").service("seriesAPI", function($http){

      var _getSeries = function(nome){
        return  $http.get('https://omdbapi.com/?s=' + nome +'&type=series&apikey=93330d3c');
      };

      var _getSerie = function(id){
        return $http.get('http://www.omdbapi.com/?i='+id+'&apikey=93330d3c');
      }

      return {
        getSeries: _getSeries,
        getSerie: _getSerie
      };
});

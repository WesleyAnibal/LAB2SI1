angular.module("series").service("listAPI",function(){
    var _adicionaWL = function(filme, watchList){
      watchList.push(filme);
    };
    var _chunk = function(arr, size) {
      var array = [];
      for (var i = 0; i < arr.length; i+=size) {
        array.push(arr.slice(i,i+size));
      }
      return array;
    }

    return {
      adicionaWL: _adicionaWL,
      chunk: _chunk,
    };

});

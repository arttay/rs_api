define([
  "text!../data/seeds.json",
  "underscore",
  "Q"
  ], function(
    seeds,
    underscore,
    Q
    ) {
        //return an object to define the "my/shirt" module.
        var seeds = JSON.parse(seeds);
        var self = this;
        var seedsObj =  {};
                var obj = {
          init: function () {           
          },
          ajax: function (data) {
            return $.ajax({
              method: "GET",
              contentType:"application/json",
              url: "http://localhost:8080/seeds",
              data: data
            });
          },
          lastKey: function (obj) {
            console.log(Object.keys(obj));
            var len = Object.keys(obj).length;
            return Object.keys(obj)[len - 1];
          }
        };

        var lastKey = obj.lastKey(seeds.seeds);
        var deferred = Q.defer();
        _.each(seeds.seeds, function (item, key) {
          obj.ajax({itemId: item}).then(function (data) {
            var d = JSON.parse(data);
            var name = d.item.name.split(" seed").join("Seed");
            var obj = {
                name: d.item.name,
                price: d.item.current.price
            }
            _.extend(seedsObj, obj);
            if(key === lastKey) {
              deferred.resolve();
            }
          });
        });

        deferred.then(function (){
          console.log("yar");
        });
        

        return obj;
    }
);
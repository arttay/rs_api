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
        seeds = JSON.parse(seeds);
        var self = this;
        var obj = {

          init: function () {
            console.log("art");
          },

          ajax: function (data) {
            return $.ajax({
              method: "GET",
              contentType:"application/json",
              url: "http://localhost:8080/seeds",
              data: data
            });
          }

        };



        return obj;
    }
);

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
            console.log('asd');
            return $.ajax({
              method: "GET",
              contentType:"application/json",
              url: "http://rsapi-45854.onmodulus.net/seeds?category=seeds.allotments&sort=displgayName.desc",
              data: data
            });
          }

        };



        return obj;
    }
);

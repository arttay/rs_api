require.config({
    paths: {
        base: 'base',
        underscore: "../vendors/underscore/underscore",
        Q: "../vendors/q/q"
    },
      shim: {
    underscore: {
      exports: '_'
    }
  },
});

require(['base'], function(AppView) {
    console.log(AppView);
});
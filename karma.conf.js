module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    browsers: ['PhantomJS'],

    frameworks: ['jasmine', 'browserify', 'viewport'],

    files: [
      './node_modules/rx/dist/rx.all.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-media-queries/match-media.js',
      './node_modules/rx-angular/dist/rx.angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/angular-responsify.js',
      './src/angular-responsify.spec.js',
    ],

    preprocessors: {
      './src/angular-responsify.js': ['browserify'],
      './src/angular-responsify.spec.js': ['browserify'],
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify', { 'presets': ['es2015'] }],
      ]
    },

    reporters: ['spec'],

    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR

  });
};

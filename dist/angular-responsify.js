(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function responsifyFactory($window, rx, screenSize) {
  // observable singleton
  var observable$ = rx.Observable.fromEvent($window, 'resize').map(function () {
    return screenSize.get();
  }).distinctUntilChanged();

  return function () {
    var $scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    // you might need to interact with observable directly in controller
    // simply return observable if service has been called with no arguments
    if ($scope === null) {
      return observable$;
    }

    // expose screenSize to scope
    $scope.screenSize = screenSize;

    // keep update ui on breakpoint changes until the scope is destroyed
    observable$.takeWhile(function () {
      return !$scope.$$destroyed;
    }).subscribe(function () {
      return $scope.$digest();
    });

    return observable$;
  };
}

angular.module('angular-responsify', ['matchMedia', 'rx']).factory('responsify', ['$window', 'rx', 'screenSize', responsifyFactory]);

},{}]},{},[1]);

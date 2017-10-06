function responsifyFactory($window, rx, screenSize) {
  // observable singleton
  const observable$ = rx.Observable.fromEvent($window, 'resize')
    .map(() => screenSize.get())
    .distinctUntilChanged()
  
  return ($scope = null) => {
    // you might need to interact with observable directly in controller
    // simply return observable if service has been called with no arguments
    if ($scope === null) {
      return observable$
    }

    // expose screenSize to scope
    $scope.screenSize = screenSize

    // keep update ui on breakpoint changes until the scope is destroyed
    observable$
      .takeWhile(() => !$scope.$$destroyed)
      .subscribe(() => $scope.$digest())

    return observable$
  }
}

angular.module('angular-responsify', ['matchMedia', 'rx'])
  .factory('responsify', ['$window', 'rx', 'screenSize', responsifyFactory])

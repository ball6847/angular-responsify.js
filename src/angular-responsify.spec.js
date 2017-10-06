describe('angular-responsify', () => {
  let $scope
  let $window
  let responsify

  beforeEach(angular.mock.module('angular-responsify'))

  beforeEach(inject((
    _$rootScope_,
    _$window_,
    _responsify_
  ) => {
    $scope = _$rootScope_
    $window = _$window_
    responsify = _responsify_
  }))

  // always set initial viewport size
  beforeEach(() => {
    viewport.set(320)
  })

  // cleanup if neccessary
  afterEach(() => {
    if (!$scope.$$destroyed) {
      $scope.$destroy()
    }
  })

  // -------------------------------------------------------------------

  it('should successfully initialized', () => {
    expect(responsify).toBeDefined()
  })

  it('should always return observable', () => {
    const observable = responsify()
    const scopedObservable = responsify($scope)

    expect(observable instanceof Rx.Observable).toBe(true)
    expect(scopedObservable instanceof Rx.Observable).toBe(true)
  })

  it('should expose screenSize to scope', () => {
    responsify($scope)

    expect($scope.screenSize).toBeDefined()
  })

  it('should call scope.digest on breakpoint changed', () => {
    spyOn($scope, '$digest')
    responsify($scope)

    // xl > sm
    viewport.set(768)
    $window.dispatchEvent(new Event("resize"))
    expect($scope.$digest).toHaveBeenCalledTimes(1)

    // sm > md
    viewport.set(992)
    $window.dispatchEvent(new Event("resize"))
    expect($scope.$digest).toHaveBeenCalledTimes(2)

    // md > lg
    viewport.set(1200)
    $window.dispatchEvent(new Event("resize"))
    expect($scope.$digest).toHaveBeenCalledTimes(3)

    // lg > xs
    viewport.set(320)
    $window.dispatchEvent(new Event("resize"))
    expect($scope.$digest).toHaveBeenCalledTimes(4)
  })

  it('should distinct until changed', () => {
    spyOn($scope, '$digest')
    responsify($scope)

    // first resize will always have been called
    $window.dispatchEvent(new Event("resize"))
    expect($scope.$digest).toHaveBeenCalledTimes(1)

    // should not have been called
    // 320 -> 400 = xs -> xs
    viewport.set(400)
    $window.dispatchEvent(new Event("resize"))
    expect($scope.$digest).toHaveBeenCalledTimes(1)
  })

  it('should stop on scope destroyed', () => {
    spyOn($scope, '$digest')
    responsify($scope)

    viewport.set(1000)
    $window.dispatchEvent(new Event("resize"))
    expect($scope.$digest).toHaveBeenCalledTimes(1)

    // this will replace our spy and we need to create spy object again
    $scope.$destroy()

    // and now it should not response to event anymore
    spyOn($scope, '$digest')
    viewport.set(400)
    $window.dispatchEvent(new Event("resize"))
    expect($scope.$digest).toHaveBeenCalledTimes(0)
  })
})

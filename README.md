angular-responsify.js
=====================

Responsive utility for angularjs build on top of RxJS and MatchMedia. Add ability to call `$scope.$digest()` on viewport changed.

Installation
------------

Simply install from github for now (will be published to npm registry soon)

```sh
$ yarn add rx-angular angular-media-queries ball6847/angular-responsify.js#master
```

Import to your angularjs application and inject it into your component.

```js
import angular from 'angular'
import 'rx-angular'
import 'angular-media-queries'
import 'angular-responsify'

angular.module('yourApp', ['angular-responsify'])
  .component('yourComponent', {
    template: 'current screen: {{ screenSize.get() }}',
    controller: ['$scope', 'responsify', ($scope, responsify) => {
      responsify($scope)

      // screenSize now available in your $scope and ready to use in template
    }]
  })
```

TODO
----

- Publish NPM package
- Remove dependencies

Author
------

Porawit Poboonma

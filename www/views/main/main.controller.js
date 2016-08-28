angular.module('starter.controllers').controller('mainController', function ($scope) {
    $scope.isiOS = ionic.Platform.isIOS();
})

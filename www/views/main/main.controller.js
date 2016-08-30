angular.module("player.controllers").controller("mainController", mainController)

mainController.$inject = ["$scope", "configService", "colorsService"]

function mainController($scope, configService, colorsService) {

    // to do check connection

    function initialise(config) {
        $scope.config = config
        $scope.shadedBackgroundColour = colorsService.getShadedBackgroundColour(config.backgroundColour)
    }

    configService.getConfig().then(initialise); // to do handle error

    $scope.isiOS = ionic.Platform.isIOS();
}

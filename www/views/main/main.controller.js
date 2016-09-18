angular.module("player.controllers").controller("mainController", mainController)

mainController.$inject = ["$scope", "configService", "colorsService", "$ionicPlatform", "$cordovaSocialSharing"]

function mainController($scope, configService, colorsService, $ionicPlatform, $cordovaSocialSharing) {

    // to do check connection

    function initialise(config) {
        $scope.config = config
        $scope.shadedBackgroundColour = colorsService.getShadedBackgroundColour(config.backgroundColour)
    }

    $scope.share = function () {
        $ionicPlatform.ready(function () {
            try {
                $cordovaSocialSharing
                    .share($scope.config.sharing.message, $scope.config.sharing.subject, null, $scope.config.sharing.link) // Share via native share sheet
                    .then(function (result) {
                        console.log(result)
                        // Success!
                    }, function (err) {
                        console.log(err)
                        // An error occured. Show a message to the user
                    });
            } catch (error) {
                alert("This platform doesn't support sharing")
            }

        })
    }

    $scope.pressedButton = function (button) {
        alert("Please open your browser and go to " + button.url);
        alert("You seriously thought I coded this already???")
    }

    configService.getConfig().then(initialise); // to do handle error

    $scope.isiOS = ionic.Platform.isIOS();
}

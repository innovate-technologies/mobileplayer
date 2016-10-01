angular.module("player.controllers").controller("mainController", mainController)

mainController.$inject = ["$scope", "configService", "colorsService", "$ionicPlatform", "$cordovaSocialSharing", "$cordovaInAppBrowser"]

function mainController($scope, configService, colorsService, $ionicPlatform, $cordovaSocialSharing, $cordovaInAppBrowser) {

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
        $ionicPlatform.ready(function () {
            SafariViewController.isAvailable(function (available) {
                if (available) {
                    SafariViewController.show({
                        url: button.url,
                        hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
                        animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
                        transition: "slide", // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
                        enterReaderModeIfAvailable: false, // default false
                        tintColor: $scope.config.tint, // default is ios blue
                        barColor: $scope.shadedBackgroundColour, // on iOS 10+ you can change the background color as well
                        controlTintColor: $scope.config.tint, // on iOS 10+ you can override the default tintColor
                    })
                } else {
                    $cordovaInAppBrowser.open(button.url, "_blank", {
                        location: "yes",
                        clearcache: "no",
                        toolbar: "yes",
                    })
                }
            })
        })
        // alert("Please open your browser and go to " + button.url);
        // alert("You seriously thought I coded this already???")
    }

    configService.getConfig().then(initialise); // to do handle error

    $scope.isiOS = ionic.Platform.isIOS();
}

angular.module("player.controllers").controller("playerController", playerController)

playerController.$inject = ["$scope", "configService", "socket", "colorsService", "$cordovaMedia", "$ionicPlatform"]

function playerController($scope, configService, socket, colorsService, $cordovaMedia, $ionicPlatform) {
    var iOSPlayOptions = {
        playAudioWhenScreenIsLocked: true,
    }
    var isIOS = ionic.Platform.isIOS()
    $scope.play = function () {
        if (!$scope.config) {
            return console.error("No config found")
        }
        console.log("Play")
        $ionicPlatform.ready(function () {
            console.log("Play ready")
            $scope.media = $cordovaMedia.newMedia($scope.config.streamUrl)
            if (isIOS) {
                $scope.media.play(iOSPlayOptions)
            } else {
                $scope.media.play()
            }
            $scope.isPlaying = true
        });
    }

    $scope.stop = function () {
        $scope.media.stop()
        $scope.media.release()
        $scope.isPlaying = false
    }

    function setupSocket() {
        socket.on("connect", function () {
            socket.emit("subscribe", $scope.config.username);
        })
        socket.emit("subscribe", $scope.config.username);

    }

    function initialise(config) {
        $scope.config = config
        $scope.shadedBackgroundColour = colorsService.getShadedBackgroundColour(config.backgroundColour)
        setupSocket()
        // $scope.play()
    }

    socket.on("metadata", function (songs) {
        $scope.songs = songs
        if (isIOS && songs[0] && $scope.isPlaying) {
            NowPlaying.set({
                artwork: songs[0].cover,
                artist: songs[0].artist,
                title: songs[0].song,
            });
        }
    });

    if (isIOS) {
        RemoteCommand.enabled("nextTrack", false);
        RemoteCommand.enabled("previousTrack", false);
        RemoteCommand.on("play", function () {
            $scope.play();
            $scope.$apply()
        });

        RemoteCommand.on("pause", function () {
            $scope.stop();
            $scope.$apply()
        });
    }

    configService.getConfig().then(initialise); // to do handle error

}

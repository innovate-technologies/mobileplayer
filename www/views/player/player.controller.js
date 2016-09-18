angular.module("player.controllers").controller("playerController", playerController)

playerController.$inject = ["$scope", "configService", "socket", "colorsService", "$cordovaMedia", "$ionicPlatform", "$ionicPopover"]

function playerController($scope, configService, socket, colorsService, $cordovaMedia, $ionicPlatform, $ionicPopover) {
    var iOSPlayOptions = {
        playAudioWhenScreenIsLocked: true,
    }
    var isIOS = ionic.Platform.isIOS()

    $scope.popover = $ionicPopover.fromTemplate("<ion-popover-view style=\"height:70px;padding-left:10px;\" ng-style=\"{'background-color': popupBackgroundColour, 'color': config.tint}\"><h4 ng-style=\"{'color': config.tint}\">{{popover.song.song}}</h4><h5 ng-style=\"{'color': config.tint}\">{{popover.song.artist}}</h5></ion-popover-view>", {
        scope: $scope,
    });

    $scope.openPopover = function ($event, song) {
        console.log(song)
        $scope.popover.song = song
        $scope.popover.show($event);
    };

    $scope.play = function () {
        if (!$scope.config) {
            return console.error("No config found")
        }
        console.log("Play")
        $ionicPlatform.ready(function () {
            console.log("Play ready")
            if (typeof Media !== "undefined") {
                $scope.media = $cordovaMedia.newMedia($scope.config.streamUrl)
            } else {
                $scope.media = new Audio($scope.config.streamUrl)
            }
            console.log($scope.media)

            if (isIOS) {
                $scope.media.play(iOSPlayOptions)
            } else {
                $scope.media.play()
            }
            $scope.isPlaying = true
        });
    }

    $scope.stop = function () {
        if (typeof $scope.media.stop !== "undefined") { //cordova
            $scope.media.stop()
            $scope.media.release()
        } else {
            $scope.media.pause()
        }
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
        $scope.popupBackgroundColour = colorsService.getShadedBackgroundColour(config.backgroundColour, 0.25)
        setupSocket()
        if ($scope.config.autoPlay) {
            $scope.play()
        }
    }

    socket.on("metadata", function (songs) {
        $scope.songs = songs
        if (isIOS && songs[0] && $scope.isPlaying && typeof NowPlaying !== "undefined") {
            NowPlaying.set({
                artwork: songs[0].cover,
                artist: songs[0].artist,
                title: songs[0].song,
            });
        }
        $scope.$apply()
    });

    if (isIOS && typeof RemoteCommand !== "undefined") {
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

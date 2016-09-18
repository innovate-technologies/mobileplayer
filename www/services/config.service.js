angular.module("player.services").service("configService", configService);

configService.$inject = ["$http"];

function configService($http) {
    function getConfig() {
        return $http.get("https://itframe.innovatete.ch/player/opencast") // has to be platform specific soon
            .then(function (response) {
                //return response.data;
                return {
                    "_id": "56104abe0d361b512c7bb6f7",
                    "name": "OPENcast",
                    "logo": "https://cdn.shoutca.st/iOS/opencast/logo.png",
                    "backgroundColour": "#232a31",
                    "tint": "#ffffff",
                    "username": "opencast",
                    "buttons": [
                        {
                            "name": "facebook",
                            "icon": "ion-social-facebook",
                            "url": "https://shoutca.st/",
                        },
                        {
                            "name": "twitter",
                            "icon": "ion-social-twitter",
                            "url": "https://shoutca.st/",
                        },
                        {
                            "name": "Website",
                            "icon": "ion-android-globe",
                            "url": "https://shoutca.st/",
                        },
                    ],
                    "sharing": {
                        enabled: true,
                        subject: "OPENcast",
                        message: "The best demo app out there #cast #dj #control",
                        link: "https://shoutca.st",
                    },
                    "__v": 1,
                    "autoPlay": false,
                    "streamUrl": "https://opencast.radioca.st/streams/128kbps"
                }
            });
    }

    return {
        getConfig: getConfig,
    }
}

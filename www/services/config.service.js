angular.module("player.services").service("configService", configService);

configService.$inject = ["$http"];

function configService($http) {
    function getConfig() {
        return $http.get("https://itframe.innovatete.ch/player/opencast") // has to be platform specific soon
        .then(function (response) {
                return response.data;
        });
    }

    return {
        getConfig: getConfig,
    }
}

/*
    Ionic tooltips 
    By Juan David Nicholls Cardona
    http://codepen.io/jdnichollsc/pen/zvZQrw
 */

angular.module("player.directives").directive("tooltip", tooltipDirective);

function tooltipDirective() {
    return {
        restrict: "C",
        link: function (scope, element, attrs) {
            if (attrs.title) {
                console.log(attrs)
                var $element = $(element);
                $element.attr("title", attrs.title)
                $element.tooltipster({
                    animation: attrs.animation,
                    trigger: "click",
                    position: "top",
                    positionTracker: true,
                    maxWidth: 500,
                    contentAsHTML: true,
                });
            }
        },
    };
}

(function() {
	var app = angular.module('swapiDirective', []);

	app.directive("swapiPeople", function() {
		return {
			restrict: 'E',
			templateUrl: 'template/modal.html'
		}
	})
})();
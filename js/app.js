(function() {
	var app = angular.module('swapi', ['swapiDirective']);

	app.factory('httpq', function($http, $q){
	return{
		get: function(){
			var deffered = $q.defer();
			$http.get.apply(null, arguments)
				.then(deffered.resolve)
				.catch(deffered.resolve);
				return deffered.promise;
		}
		};
	});

	app.controller('SwapiController', function(httpq){
		var swapi = this;

		var numberPage = 1;
		swapi.arr  = [];
		swapi.peoples = [];
		swapi.gender = '';

		function Request(numberPage) {
			httpq.get('http://swapi.co/api/people/?page=' + numberPage)
			.then(function(result) {
				swapi.arr = result.data;
				swapi.peoples = swapi.peoples.concat(swapi.arr.results);
				if (swapi.arr.next != null) {
					numberPage++;
					Request(numberPage);
				}
			})
			.catch(function() {
				console.log("Error httpRequest");
			});
		}

		Request(numberPage);

		swapi.setGender = function(gender) {
			swapi.gender = gender;
		};

		swapi.activeGender = function(check){
			return swapi.gender === check ? "active" : "";
		};

		// swapi.isSelected = function(selected) {
		// 	return ((swapi.tab === 'all' && swapi.tab !== 'male' && swapi.tab !== 'female' && swapi.tab !== 'n/a') || (selected === swapi.tab))?true:false;
		// };

		swapi.clickPeople = function(index) {
			swapi.index = index;
			//console.log(ind);
			$(".modal").modal('show');
		};
	});

	app.filter('filter', function() {
		return function (items, gender) {
			//console.log(gender);
			filter = [];
			if (gender === "") {
				filter = items;
			} else {
				for (var i = 0; i < items.length; i++) {
					if (gender !== "others") {
						if (items[i].gender == gender) {
							filter[filter.length] = items[i];
						}
					} else if (gender === "others") {
						if ((items[i].gender !== "male") && (items[i].gender !== "female")) {
							filter[filter.length] = items[i];
						}
					}
				}
			}
			return filter;
		};
	});

})();
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
		}
	});

	app.controller('SwapiController', function(httpq){
		var swapi = this;

		var numberPage = 1;
		swapi.arr  = [];
		swapi.peoples = [];

		function firstRequest(numberPage) {
			httpq.get('http://swapi.co/api/people/?page=' + numberPage)
			.then(function(result) {
				swapi.arr = result.data;
				swapi.peoples = swapi.peoples.concat(swapi.arr.results);
				if (swapi.arr.next != null) {
					numberPage++;
					firstRequest(numberPage);
				}
			})
			.catch(function() {
				console.log("Error httpRequest");
			});
		}

		firstRequest(numberPage);

		function nextRequest(next) {
			for (var i = 1; i < count; i++) {
				httpq.get(next)
				.then(function(result) {
					var people = result.data.name;
					swapi.peoples.push(result.data);
					//console.log(people);
				})
				.catch(function() {
					console.log("Error httpRequest");
				});
			}
			//console.log(swapi.peoples);
		}

		swapi.tab = 'all';

		// swapi.setGender = function(gender) {
		// 		swapi.gender = getGender;
		// 	}
		// };

		// swapi.isSelected = function(check){
		// 	return store.gender === check?"active":"";
		// };

		swapi.setGender = function(setTab) {
			swapi.tab = setTab;
		};

		swapi.isSelected = function(selected) {
			return ((swapi.tab === 'all' && swapi.tab !== 'male' && swapi.tab !== 'female' && swapi.tab !== 'n/a') || (selected === swapi.tab))?true:false;
		};

		swapi.clickPeople = function(ind) {
			swapi.ind = ind;
			console.log(ind);
			$(".modal").modal('show');
		};
	});

	// app.filter('genderFilter', function() {
	// 	return function (items, gender){
	// 		var filtered = [];
	// 		if (gender === "") {
	// 			filtered = items;
	// 		} else {
	// 			for (var i = 0; i < items.length; i++) {
	// 				if (gender !== "others") {
	// 					if (items[i].gender == gender) {
	// 						filtered[filtered.length] = items[i];
	// 					}
	// 				} else {
	// 					if ((items[i].gender !==" male") && (items[i].gender !== "female")) {
	// 						filtered[filtered.length] = items[i];
	// 					}
	// 				}
	// 			}
	// 		}
	// 		return filtered;
	// 	};
	// });

})();
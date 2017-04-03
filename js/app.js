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

		swapi.img = [];
		swapi.count = 0;
		swapi.arr  = [];
		swapi.peoples = [];
		function firstRequest() {
			httpq.get('http://swapi.co/api/people/')
			.then(function(result) {
				swapi.arr = result.data;
				swapi.count = swapi.arr.count;
				nextRequest(swapi.count);
			})
			.catch(function() {
				console.log("Error httpRequest");
			});
		}

		firstRequest();

		function nextRequest(count) {
			for (var i = 1; i < count; i++) {
				httpq.get('http://swapi.co/api/people/' + i )
				.then(function(result) {
					var people = result.data.name;
					swapi.peoples.push(result.data);
					//console.log(people);
					imgPeople();
				})
				.catch(function() {
					console.log("Error httpRequest");
				});
			}
			//console.log(swapi.peoples);
		}

		function imgPeople() {
			httpq.get('api/img.json')
				.then(function(result) {
					swapi.image = result.data;
					//console.log(swapi.image[0]);
					for (var i = 0; i < swapi.image.length; i++) {
						for (var j = 0; j < swapi.peoples.length; j++) {
							if (swapi.image[i].name === swapi.peoples[j].name) {
								swapi.peoples[j].image = swapi.image[i].image;
							}
							// } else if (swapi.image[i].name !== swapi.peoples[j].name) {
							// 	swapi.peoples[j].image = 'img/char/none.jpg';
							// }
						}

					}
				})
				.catch(function() {
					console.log("Error httpRequest");
				});
		}

		swapi.tab = 'all';

		swapi.setGender = function(setTab) {
			swapi.tab = setTab;
		};

		swapi.isSelected = function(selected) {
			return ((swapi.tab === 'all' && swapi.tab !== 'male' && swapi.tab !== 'female' && swapi.tab !== 'n/a' && swapi.tab !== 'hermaphrodite') || (selected === swapi.tab))?true:false;
		};

		swapi.clickPeople = function(ind) {
			swapi.ind = ind;
			//imgPeople(name);
			console.log(ind);
			$(".modal").modal('show');
		};
	});

})();
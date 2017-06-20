(function () {
	'use strict';

	angular
		.module('app')
		.controller('EditorController', ['$scope', 'Cities', '$uibModal', Controller]);

	function Controller($scope, Cities, $uibModal) {

		var ctrl = this;

		Cities.getAll().then(function (cities) {
			$scope.cities = cities;
		});

		$scope.selectedCity = null;

		$scope.createCity = function () {
			$uibModal.open({
				animation: false,
				templateUrl: 'views/modals/cityForm.tpl.html',
				controller: 'CreateCityController',
				backdrop: 'static'
			});
		}


		$scope.setCity = function (city) {
			$uibModal.open({
				animation: false,
				templateUrl: 'views/modals/cityForm.tpl.html',
				controller: 'SetCityController',
				backdrop: 'static',
				resolve: {
					city: function () {
						var c = angular.copy(city)
						c.name = c.city_name; // из-за особенности именования в API
						return c;
					}
				}
			});
		}



		$scope.deleteCity = function (id, name) {
			$uibModal.open({
				animation: false,
				templateUrl: 'views/modals/confirmDeleteCity.tpl.html',
				controller: 'ConfirmDeleteController',
				resolve: {
					name: function () {
						return name;
					}
				},
				backdrop: 'static'
			}).result.then(function (isConfirmed) {
				if (isConfirmed) {
					if (ctrl.selectedCity && ctrl.selectedCity.city_id == id) {
						ctrl.selectedCity = null;
					}
					Cities.deleteCity(id);
				}
			});
		}


		$scope.createDistrict = function () {
			$uibModal.open({
				animation: false,
				templateUrl: 'views/modals/districtForm.tpl.html',
				controller: 'CreateDistrictController',
				backdrop: 'static',
				resolve: {
					city: function () {
						return ctrl.selectedCity;
					}
				}
			});
		}


		$scope.deleteDistrict = function (id, name) {
			$uibModal.open({
				animation: false,
				templateUrl: 'views/modals/confirmDeleteDistrict.tpl.html',
				controller: 'ConfirmDeleteController',
				resolve: {
					name: function () {
						return name;
					}
				},
				backdrop: 'static'
			}).result.then(function (isConfirmed) {
				if (isConfirmed) {
					Cities.deleteDistrict(id, ctrl.selectedCity.city_id);
				}
			});
		}


		$scope.setDistrict = function (district, city) {
			$uibModal.open({
				animation: false,
				templateUrl: 'views/modals/districtForm.tpl.html',
				controller: 'SetDistrictController',
				backdrop: 'static',
				resolve: {
					city: function () { return city; },
					district: function () { return district; }
				}
			});
		}


	}

})();
(function () {
	'use strict';

	angular
		.module('app')
		.controller('MainController', ['$scope', 'Cities', '$uibModal', Controller]);

	function Controller($scope, Cities, $uibModal) {

		var ctrl = this;

		Cities.getAll().then(function (cities) {
			$scope.cities = cities;
		});


		$scope.getPop = function (city) {
			return city.districts.reduce(function (sum, el) { return sum + el.population; }, 0);
		}

		function popOrder() {
			return $scope.getPop;
		}

		$scope.sortModes = {
			'name': ['city_name'],
			'population': [popOrder('city'), 'city_name'],
		}


		$scope.toggleSortColumn = function (column) {
			$scope.sortReverse = ($scope.sortColumn != column) ? false : !$scope.sortReverse;
			$scope.sortColumn = column;
			// to fix: 
			// [popOrder('city'), 'city_name'] при реверсе даёт реверс для обоих сортировок, а нужно только для первой
			// с другой стороны можно реверсить по элементам, но [-popOrder('city'), 'city_name'] не работает, следовательно надо реверсить [popOrder('city'), '-city_name']?
		}

		$scope.sortColumn = 'name';
		$scope.sortReverse = false;

		$scope.selected = function (index) {
			ctrl.selectedCity = $scope.cities[index];
		}


	}



})();
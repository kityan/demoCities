(function () {
	'use strict';

	angular
		.module('app')
		.controller('CreateCityController', ['$scope', '$controller', '$uibModalInstance', 'Cities', Controller]);

	function Controller($scope, $controller, $uibModalInstance, Cities) {

		// расширяем контроллер
		$controller('_SaveCityController', { $scope: $scope, $uibModalInstance: $uibModalInstance });

		$scope.saveCity = function () {
			if (!$scope.valid || $scope.inProgress) {
				return;
			}
			$scope.saved = false;
			$scope.inProgress = true;
			Cities.createCity(
				$scope.city.name,
				$scope.city.lat.toString().replace(',', '.') * 1,
				$scope.city.lon.toString().replace(',', '.') * 1
			).then(function () {
				$scope.inProgress = false;
				$scope.saved = true;
			});
		}

		$scope.oneMore = function () {
			$scope.saved = false;
			$scope.city = {}
		}


	}

})();


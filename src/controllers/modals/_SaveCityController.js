(function () {
	'use strict';

	angular
		.module('app')
		.controller('_SaveCityController', ['$scope', '$controller', '$uibModalInstance', Controller]);

	function Controller($scope, $controller, $uibModalInstance) {

		// расширяем контроллер
		$controller('_ModalController', { $scope: $scope, $uibModalInstance: $uibModalInstance });

		$scope.valid = false;

		$scope.$watch('city', function (city) {
			$scope.valid = true;
			$scope.valid = (!city) ? false : $scope.valid;
			if (city) {
				$scope.valid = (!city.name) ? false : $scope.valid;
				$scope.valid = (!city.lat || isNaN(city.lat.toString().replace(',', '.') * 1)) ? false : $scope.valid;
				$scope.valid = (!city.lon || isNaN(city.lon.toString().replace(',', '.') * 1)) ? false : $scope.valid;
				// to fix: валидацию адекватности координат?
			}
		}, true);

		$scope.setPoint = function (lat, lon) {
			//$scope.$apply(function () {
				$scope.city.lat = lat;
				$scope.city.lon = lon;
			//})
		}


	}

})();


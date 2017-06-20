(function () {
	'use strict';

	angular
		.module('app')
		.controller('SetCityController', ['$scope', '$controller', '$uibModalInstance', 'Cities', 'city', Controller]);

	function Controller($scope, $controller, $uibModalInstance, Cities, city) {

		// расширяем контроллер
		$controller('_SaveCityController', { $scope: $scope, $uibModalInstance: $uibModalInstance });

		$scope.city = city;
		$scope.editMode = true;

		$scope.saveCity = function () {
			if (!$scope.valid || $scope.inProgress) {
				return;
			}
			$scope.inProgress = true;
			Cities.setCity(
				$scope.city.city_id,
				$scope.city.name,
				$scope.city.lat.toString().replace(',', '.') * 1,
				$scope.city.lon.toString().replace(',', '.') * 1
			).then(function () {
				$scope.inProgress = false;
				$uibModalInstance.dismiss();
			});
		}


	}

})();


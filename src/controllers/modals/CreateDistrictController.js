(function () {
	'use strict';

	angular
		.module('app')
		.controller('CreateDistrictController', ['$scope', '$controller', '$uibModalInstance', 'Cities', 'city', Controller]);

	function Controller($scope, $controller, $uibModalInstance, Cities, city) {

		// расширяем контроллер
		$controller('_SaveDistrictController', { $scope: $scope, $uibModalInstance: $uibModalInstance });

		$scope.cityName = city.city_name;

		$scope.saveDistrict = function () {
			if (!$scope.valid || $scope.inProgress) {
				return;
			}
			$scope.saved = false;
			$scope.inProgress = true;

			Cities.createDistrict(
				$scope.district.name,
				$scope.district.population * 1,
				city.city_id
			).then(function () {
				$scope.inProgress = false;
				$scope.saved = true;
			});
		}

		$scope.oneMore = function () {
			$scope.saved = false;
			$scope.district = {}
		}


	}

})();


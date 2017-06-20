(function () {
	'use strict';

	angular
		.module('app')
		.controller('SetDistrictController', ['$scope', '$controller', '$uibModalInstance', 'Cities', 'district', 'city', Controller]);

	function Controller($scope, $controller, $uibModalInstance, Cities, district, city) {

		// расширяем контроллер
		$controller('_SaveDistrictController', { $scope: $scope, $uibModalInstance: $uibModalInstance });

		$scope.district = district;
		$scope.editMode = true;
		$scope.cityName = city.city_name;

		$scope.saveDistrict = function () {
			if (!$scope.valid || $scope.inProgress) {
				return;
			}
			$scope.inProgress = true;
			Cities.setDistrict(
				$scope.district.district_id,
				$scope.district.name,
				$scope.district.population * 1,
				city.city_id
			).then(function () {
				$scope.inProgress = false;
				$uibModalInstance.dismiss();
			});
		}


	}

})();


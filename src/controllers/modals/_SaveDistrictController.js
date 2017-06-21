(function () {
	'use strict';

	angular
		.module('app')
		.controller('_SaveDistrictController', ['$scope', '$controller', '$uibModalInstance', Controller]);

	function Controller($scope, $controller, $uibModalInstance) {

		// расширяем контроллер
		$controller('_ModalController', { $scope: $scope, $uibModalInstance: $uibModalInstance });

		$scope.valid = false;

		$scope.$watch('district', function (district) {
			$scope.valid = true;
			$scope.valid = (!district) ? false : $scope.valid;
			if (district) {
				$scope.valid = (!district.name) ? false : $scope.valid;
				$scope.valid = (isNaN(district.population * 1)) ? false : $scope.valid;
				// to fix: валидацию  >= 0
			}
		}, true);


	}

})();


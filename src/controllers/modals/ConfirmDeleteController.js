(function () {
	'use strict';

	angular
		.module('app')
		.controller('ConfirmDeleteController', ['$scope', '$controller', '$uibModalInstance', 'name', Controller]);

	function Controller($scope, $controller, $uibModalInstance, name) {

		// расширяем контроллер
		$controller('_ModalController', { $scope: $scope, $uibModalInstance: $uibModalInstance });

		$scope.name = name;

		$scope.ok = function(){
			$uibModalInstance.close(true);
		}

	}

})();


var app = angular.module('gameApp', ['angularModalService']); 

app.controller('gameCtrl', ['$scope', '$log', 'ModalService', function($scope, $log, ModalService) {
	$scope.$log = $log;

	$scope.title = 'Jeopardy';
	$scope.showQuestion = function(QandA) {
		$log.log(QandA);
	}
	$scope.round = {
					'name':'Game 1',
					'categories': {
								'Command Line': {
												'100':
													{'Question 1': 'Answer 1'},
												'200': 
													{'Question 2' : 'Answer 2'}
												},
								'TV': {
												'100':
													{'Question TV 1': 'Answer 1'},
												'200': 
													{'Question TV 2' : 'Answer 2'}
												},
								'Movies' : {
												'100':
													{'Question Movie 1': 'Answer 1'},
												'200': 
													{'Question Movie 2' : 'Answer 2'}
												},

								}
					}
	$scope.show = function(QandA) {
		$log.log(QandA);
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };

	}]);

app.controller('ModalController', function($scope, close) {
  
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});
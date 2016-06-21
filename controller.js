var app = angular.module('gameApp', ['angularModalService']); 

app.controller('gameCtrl', ['$scope', '$log', 'ModalService', function($scope, $log, ModalService) {
	$scope.$log = $log;
    $scope.player1 = {'name': 'Player 1', 'score': 0};
    $scope.player2 = {'name': 'Player 2', 'score': 0};
    // $scope.wrong1 = true;
    // $scope.wrong2 = true;

	$scope.title = 'Jeopardy';
	$scope.showQuestion = function(QandA) {
		$log.log(QandA);
	};
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
													{'Question TV 1': 'Answer TV 1'},
												'200':
													{'Question TV 2' : 'Answer TV 2'}
												},
								'Movies' : {
												'100':
													{'Question Movie 1': 'Answer Movie 1'},
												'200':
													{'Question Movie 2' : 'Answer Movie 2'}
												},
								}
					};
    $scope.loss = function(player, dollars) {
        player.score -= Number(dollars);
        $log.log(player.name + " " + player.score);
    };
	$scope.showQ = function(QandA, dollars) {
        ModalService.showModal({
            templateUrl: 'question.html',
            controller: "ModalController",
            scope: $scope,
        }).then(function(modal) {
            modal.element.modal();
            $scope.currentQ = Object.keys(QandA)[0];
            $scope.currentA = QandA[$scope.currentQ];
            $scope.dollars = dollars;
            $scope.wrong1 = false;
            $scope.wrong2 = false;
            modal.close.then(function(player) {
                player.score += Number(dollars);
                $scope.showA();
                $log.log(player.name + " " + player.score);
            });
            // modal.loss.then(function(player) {
            //     player.score -= Number(dollars);
            //     $log.log(player.name + " " + player.score);
            // });
        });
    };

    $scope.showA = function() {
        ModalService.showModal({
            templateUrl: 'answer.html',
            controller: "ModalController",
            scope: $scope,
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    };

	}]);

app.controller('ModalController', function($scope, close) {
  
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});
var app = angular.module('gameApp', ['angularModalService']); 

app.controller('gameCtrl', ['$scope', '$log', 'ModalService', function($scope, $log, ModalService) {
	$scope.$log = $log;
    $scope.player1 = {'name': 'Player 1', 'score': 0};
    $scope.player2 = {'name': 'Player 2', 'score': 0};

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
								
                                'HB Pets': {
                                                '100':
                                                    {'Question Pets 1': 'Answer Pets1'},
                                                '200':
                                                    {'Question Pets2' : 'Answer Pets2'}
                                                },
                                'Harry Potter': {
                                                '100':
                                                    {'Question HP 1': 'Answer HP 1'},
                                                '200':
                                                    {'Question HP 2' : 'Answer HP 2'}
                                                },
                                'Python' : {
                                                '100':
                                                    {'Question Python 1': 'Answer Python 1'},
                                                '200':
                                                    {'Question Python 2' : 'Answer Python 2'}
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
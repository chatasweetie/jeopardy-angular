var app = angular.module('gameApp', ['angularModalService']); 

app.controller('gameCtrl', ['$scope', '$log', 'ModalService', function($scope, $log, ModalService) {
	$scope.$log = $log;
    $scope.player1 = {'name': 'Player 1', 'score': 0};
    $scope.player2 = {'name': 'Player 2', 'score': 0};
    $scope.showOption = true;

	$scope.title = 'Jeopardy!';
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
													{'Question 2' : 'Answer 2'},
                                                '300':
                                                    {'Question 2' : 'Answer 2'},
                                                '400':
                                                    {'Question 2' : 'Answer 2'},
                                                '500':
                                                    {'Question 2' : 'Answer 2'},
												},
								'TV': {
												'100':
                                                    {'A weekly television series on NBC was the first to air completely in color in 1959': 'What is the show Bonanza?'},
                                                '200':
                                                    {'The family name of the main characters in the Cosby Show which ran from 1984-1992' : 'What is The Huxtable Family?'},
                                                '300':
                                                    {'A popular children show that debuted on PBS in 1969' : 'What is Sesame Street?'},
                                                '400':
                                                    {'The breakout star who played Stella Carlin on the third season of Orange Is the New Black' : 'Who is Ruby Rose?'},
                                                '500':
                                                    {'The last guest on the Late Show with David Letterman.' : 'Who is Bill Murray?'},
												},
								'Movies' : {
												'100':
                                                    {'Sings the theme song for "Spectre", the new James Bond film': 'Who is Sam Smith?'},
                                                '200':
                                                    {'Charlize Theron played this bad-ass character in "Mad Max: Fury Road".' : 'Who is Furiosa?'},
                                                '300':
                                                    {'Won the Best Picture at the 2015 Academy Awards' : 'What is Birdman?'},
                                                '400':
                                                    {'Amy Schumers well-received comedy "Trainwreck" co-starred which famous NBA player' : 'Who is LEBRON JAMES?'},
                                                '500':
                                                    {'Cast as Belle in the upcoming Disney live-action "Beauty and the Beast"' : 'Who is EMMA WATSON?'},
												},
								
                                'Support Staff': {
                                                '100':
                                                    {'Question 1': 'Answer 1'},
                                                '200':
                                                    {'Question 2' : 'Answer 2'},
                                                '300':
                                                    {'Question 2' : 'Answer 2'},
                                                '400':
                                                    {'Question 2' : 'Answer 2'},
                                                '500':
                                                    {'Question 2' : 'Answer 2'},
                                                },
                                'Harry Potter': {
                                                '100':
                                                    {'Question 1': 'Answer 1'},
                                                '200':
                                                    {'Question 2' : 'Answer 2'},
                                                '300':
                                                    {'Question 2' : 'Answer 2'},
                                                '400':
                                                    {'Question 2' : 'Answer 2'},
                                                '500':
                                                    {'Question 2' : 'Answer 2'},
                                                },
                                'Python' : {
                                                '100':
                                                    {'Question 1': 'Answer 1'},
                                                '200':
                                                    {'Question 2' : 'Answer 2'},
                                                '300':
                                                    {'Question 2' : 'Answer 2'},
                                                '400':
                                                    {'Question 2' : 'Answer 2'},
                                                '500':
                                                    {'Question 2' : 'Answer 2'},
                                                },
                                }			
                    };
    $scope.init = function(){
        ModalService.showModal({
            templateUrl: 'splash.html',
            controller: 'ModalController',
            scope: $scope,
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    }
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
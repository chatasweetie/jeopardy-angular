var app = angular.module('gameApp', ['angularModalService']); 

app.controller('gameCtrl', ['$scope', '$log', 'ModalService', function($scope, $log, ModalService) {
	$scope.$log = $log;
    $scope.player1 = {'name': 'Player 1', 'score': 0, 'bet': 0};
    $scope.player2 = {'name': 'Player 2', 'score': 0, 'bet': 0};
    $scope.showOption = true;
    $scope.questionsDone = 0;
    $scope.FinalJeopardy = false;

	$scope.title = 'Jeopardy!';
	$scope.showQuestion = function(QandA) {
		$log.log(QandA);
	};
	$scope.round = {
					'name':'Game 1',
					'categories': {
								'Command Line': {
												'100':
													{'Is another name for Command Line': 'What is Shell, GUI, Terminal or Console?'},
												'200':
													{'It\s acronym is pwd.' : 'What is Print Working Directory?'},
                                                '300':
                                                    {'A command to see the built in manual' : 'What is "man"?'},
                                                '400':
                                                    {'A command to print to STDOUT' : 'What is "echo"?'},
                                                '500':
                                                    {'A command to seach within files' : 'What is "grep"?'},
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
                                                    {'The last guest on the Late Show with David Letterman' : 'Who is Bill Murray?'},
												},
								'Movies' : {
												'100':
                                                    {'Sings the theme song for "Spectre", the new James Bond film': 'Who is Sam Smith?'},
                                                '200':
                                                    {'Charlize Theron played this bad-ass character in "Mad Max: Fury Road"' : 'Who is Furiosa?'},
                                                '300':
                                                    {'Won the Best Picture at the 2015 Academy Awards' : 'What is Birdman?'},
                                                '400':
                                                    {'Amy Schumers well-received comedy "Trainwreck" co-starred which famous NBA player' : 'Who is Lebron James?'},
                                                '500':
                                                    {'Cast as Belle in the upcoming Disney live-action "Beauty and the Beast"' : 'Who is Emma Watson?'},
												},
								
                                'Python': {
                                                '100':
                                                    {'The hardest part of programming': 'What is naming variables?'},
                                                '200':
                                                    {'A one-line summary for fucntions' : 'What is Docstrings?'},
                                                '300':
                                                    {'The data structure that range() returns' : 'What is list?'},
                                                '400':
                                                    {'The list of things defined for a function to receive' : 'What are parameters?'},
                                                '500':
                                                    {'The Zen of Python poem prints out using this command' : 'What is "import this"?'},
                                                },
                                'Ada or Grace': {
                                                '100':
                                                    {'She is the first computer programmer in history': 'Who is Ada?'},
                                                '200':
                                                    {'She retired from the navy at the standard age of 60, but was repeatedly recalled until her eighties' : 'Who is Grace?'},
                                                '300':
                                                    {'Her most famous quotes, which is often attributed to others, is: "It\'s easier to ask forgiveness than it is to get permission."' : 'Who is Grace?'},
                                                '400':
                                                    {'She was described as "The most coarse and vulgar woman in England. . ."' : 'Who is Ada?'},
                                                '500':
                                                    {'When she was younger she believed she could fly, and wrote illustrated a guide called “Flyology"' : 'Who is Ada?'},
                                                },
                                'Staff' : {
                                                '100':
                                                    {'Used to live in a communal, falling-down 28-room mansion in baltimore': 'Who is Joel?'},
                                                '200':
                                                    {'Carried Stephen Hawking\'s wheelchair with him in it' : 'Who is Henry?'},
                                                '300':
                                                    {'Answer 2' : 'Who is Meggie?'},
                                                '400':
                                                    {'This person\s great-great-great uncle was president of Mexico' : 'Who is Leslie?'},
                                                '500':
                                                    {'Bungy jumped off the 3rd largest bungy jump distance in the world' : 'Who is Ally?'},
                                                },
                                }			
                    };

    $scope.finaljeopardy = {
        'question': 'A style guide for python, its acronym is PEP',
        'answer': 'What are Python Enhancement Proposals?'
    }

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
        $scope.questionsDone++;
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
            });
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
                $log.log($scope.questionsDone);
                if ($scope.questionsDone === 30) {
                    $scope.FinalJeopardy = true;
                }
            });
        });
    };

    $scope.showFinal = function(){
        ModalService.showModal({
            templateUrl: 'finaljeopardyQ.html',
            controller: 'ModalController',
            scope: $scope,
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.showFinalA();
            });
        });
    };

    $scope.showFinalA = function() {
        ModalService.showModal({
            templateUrl: 'finalanswer.html',
            controller: 'ModalController',
            scope: $scope,
        }).then(function(modal){
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
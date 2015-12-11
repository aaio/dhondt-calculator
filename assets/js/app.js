var app = angular.module('dhondtCalculatorApp', []);

app.controller('dhondtCtrl', function ($scope) {
    $scope.parties = [];

    $scope.add = function () {

        var newParty = {
            name: $scope.newParty.split(" ").slice(0, -1).join(" ").toUpperCase(),
            votes: parseInt($scope.newParty.split(" ").slice(-1)[0])
        };

        var change = false;
        $scope.parties.forEach(function (party) {
            if (party.name == newParty.name) {
                party.votes = newParty.votes;
                change = true;
            }
        });

        if (!change)
            $scope.parties.push({
                name: newParty.name,
                votes: newParty.votes,
                seats: 0
            });

        $scope.newParty = '';
        $scope.calculate();
    }

    $scope.delete = function (id) {
        $scope.parties.splice(id, 1);
        $scope.calculate();
    }

    $scope.totalVotes = function () {
        var totalVotes = 0;
        $scope.parties.forEach(function (val) {
            totalVotes += parseInt(val.votes);
        });
        return totalVotes;
    }

    $scope.percentage = function (votes) {
        return (votes / $scope.totalVotes() * 100).toFixed(2) + '%';
    }

    $scope.calculate = function () {

        arr = [];

        $scope.parties.forEach (function (party) {
            party.seats = 0;
        })

        for (var i = 1; i <= $scope.seatsToAssign; i++) {
            $scope.parties.forEach(function (val) {
                arr.push({
                    party: val.name,
                    num: val.votes/i
                });
            });
        }

        arr.sort(function (a, b) {
            return  b.num > a.num ? 1 :
                    b.num < a.num ? -1 :
                    0;
        });

        arr.length = $scope.seatsToAssign;

        $scope.parties.forEach (function (party) {
            arr.forEach(function (val) {
                if (val.party == party.name) party.seats++;
            });
        });
    }

    $scope.passedTreshold = function (party) {
        if(party.votes / $scope.totalVotes() > $scope.tresholdValue / 100) return true;
        return false;
    }

    $scope.rowClass = function (party) {
        return 'warning';
    }
});


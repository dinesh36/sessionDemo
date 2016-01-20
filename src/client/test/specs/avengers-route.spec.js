/* jshint -W117, -W030 */
describe('avengers', function () {
    describe('route', function () {
        var controller;

        beforeEach(function() {
            module('app', specHelper.fakeLogger);
            specHelper.injector(function($httpBackend, $location, $rootScope, $route) {});
            $httpBackend.expectGET('app/avengers/avengers.html').respond(200);
        });

        it('should map /avengers route to avengers View template', function () {
            expect($route.routes['/avengers'].templateUrl).
                to.equal('app/avengers/avengers.html');
        });

        it('should route / to the avengers View', function () {
            $location.path('/avengers');
            //??? Why $rootScope.$apply() is used here ?
            $rootScope.$apply();
            expect($route.current.templateUrl).to.equal('app/avengers/avengers.html');
        });
    });
});
describe('Midway: dataservice requests', function() {
    var dataservice;
    var tester;

    beforeEach(function() {
        if (tester) {
            tester.destroy();
        }
        tester = ngMidwayTester('app');
    });

    beforeEach(function() {
        dataservice = tester.inject('dataservice');
        expect(dataservice).not.to.equal(null);
    });

    describe('getAvengers function', function () {
        //??? IS it create the http call or just do the mock ?
        it('should return 7 Avengers', function (done) {
            dataservice.getAvengers().then(function(data) {
                // console.log(data);
                expect(data).not.to.equal(null);
                expect(data.length).to.equal(10);
                done();
            });
            // $rootScope.$apply();
        });

        it('should contain Black Widow', function (done) {
            dataservice.getAvengers().then(function(data) {
                expect(data).not.to.equal(null);
                var hasBlackWidow = data.some(function isPrime(element, index, array) {
                    return element.name.indexOf('Black Widow') >= 0;
                });
                expect(hasBlackWidow).to.be.true;
                done();
            });
            // $rootScope.$apply();
        });
    });

});
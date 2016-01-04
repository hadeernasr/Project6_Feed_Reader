/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are Defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined',function(){
            for(var i in allFeeds){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Names are defined',function(){
            for(var i in allFeeds){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].url.name).not.toBe('');
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('Menu is hidden by default',function(){
            var menuHide = $('body').hasClass('menu-hidden');
            expect(menuHide).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu display and hide when clicked',function(){
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //beforeEach to wait for async calls to finish
        beforeEach(function(done) {
            loadFeed(1, function() {
                done();
            });    
        });

        it('Check for Minimum one entry',function(){
            var entryNumber = $('.entry').length;
            expect(entryNumber).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var compareFeedFirst;
        var compareFeedSecond;
        //beforeEach to wait for async calls to finish
        beforeEach(function(done) {
            loadFeed(1, function() {
                compareFeedFirst = $('.feed').html();
                loadFeed(2,function(){
                    done();
                });//end loadFeed 2
            }); //end loadFeed 1   
        });//end beforEach
    

        //afterEach to reload first entry
        afterEach(function() {
            loadFeed(0);
        });

        it('Changes Feed Content',function(){
            expect(compareFeedFirst).toBeDefined();
            compareFeedSecond = $('.feed').html();
            expect(compareFeedSecond).toBeDefined();
            expect(compareFeedFirst).not.toBe(compareFeedSecond);
        });
    });//end describe

}());

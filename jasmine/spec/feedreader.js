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
         * empty.
         */
        it('are Defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });//end of it


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });//end of forEach
         });//end of it


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Names are defined',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
                expect(feed.name.length).not.toBe(0);
            });//end of forEach
        });//end of it
    });//end of Describe function


   /* A new test suite named "The menu" */
    describe('Menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         //when page loads check to see if body has .menu-hidden
         it('Hidden by default',function(){
            var menuHide = $('body').hasClass('menu-hidden');
            expect(menuHide).toBe(true);
         });//end of it

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          //check body has and does not have .menu-hidden on 
          //every other click of menuIcon
          it('Display and hide when clicked',function(){
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });//end of it
    });//end of Describe function


     /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //beforeEach to wait for async calls to finish
        beforeEach(function(done) {
            loadFeed(1, function() {
                done();
            });    
        });
        //checks to see if at least 1 feed entry has been added
        it('Check for Minimum one entry',function(){
            var entryNumber = $('.entry').length;
            expect(entryNumber).toBeGreaterThan(0);
        });//end of it
    });//end of Describe function


     /* A new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
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
        afterAll(function() {
            loadFeed(0);
        });
        //determine that each entry is defined
        //compares both headers from compareFeedFirst and compareFeedSecond 
        //to detrmine that the entry has changed
        it('Changes Feed Content',function(){
            expect(compareFeedFirst).toBeDefined();
            compareFeedSecond = $('.feed').html();
            expect(compareFeedSecond).toBeDefined();
            expect(compareFeedFirst).not.toEqual(compareFeedSecond);
        });//end of it
    });//end describe

}());

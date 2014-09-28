/*
	The test scenario
*/
casper.start( './demo/coffeemachine.html' );

casper.viewport(1024, 768);

casper.then(function(){
	phantomcss.screenshot('#coffee-machine-wrapper', 'open coffee machine button');
});

casper.then(function(){
	casper.click('#coffee-machine-button');
	
	// wait for modal to fade-in 
	casper.waitForSelector('#myModal:not([style*="display: none"])',
		function success(){
			phantomcss.screenshot('#myModal', 'coffee machine dialog');
		},
		function timeout(){
			casper.test.fail('Should see coffee machine');
		}
	);
});

casper.then(function(){
	casper.click('#cappuccino-button');
	phantomcss.screenshot('#myModal', 'cappuccino success');
});

casper.then(function(){
	casper.click('#close');

	// wait for modal to fade-out
	casper.waitForSelector('#myModal[style*="display: none"]',
		function success(){
			phantomcss.screenshot('#coffee-machine-wrapper', 'coffee machine close success');
		},
		function timeout(){
			casper.test.fail('Should be able to walk away from the coffee machine');
		}
	);
});

casper.then( function now_check_the_screenshots(){
	// compare screenshots
	phantomcss.compareSession();
});

casper.then( function end_it(){
	casper.test.done();
});

/*
Casper runs tests
*/
casper.run(function(){
	console.log('\nTHE END.');
	phantom.exit(phantomcss.getExitStatus());
});


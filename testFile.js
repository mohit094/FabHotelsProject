var XLSX = require('xlsx');
var json2xls = require('json2xls');
var fs = require('fs');
var DelhiPage = require("./delhiPage.js");
var HomePage = require("./homePage.js");
var CityAndHotelPage = require("./cityAndHotelPage.js");
var HotelBookAndPaymentPage = require("./hotelBookAndPaymentPage.js");
describe('angularjs homepage', function() {

	var page = new DelhiPage();

	var homePage = new HomePage();

	var cityAndHotelPage = new CityAndHotelPage();

	var hotelBookAndPaymentPage = new HotelBookAndPaymentPage();

	it('selectDate', function() {

		browser.ignoreSynchronization = true;

		browser.get("http://www.fabhotels.com/hotels-in-new-delhi");
		
		var EC = protractor.ExpectedConditions;

		browser.wait(EC.elementToBeClickable(page.checkInButton), 8000).then(function(){
			page.clickCheckInButton();
			//getting today's date
			var today = new Date();
			var currentMonth = today.getUTCMonth() + 1; //months from 1-12
			var currentDate = today.getUTCDate();
			var currentYear = today.getUTCFullYear();
			//date on which the booking has to be made
			var now = new Date("30-August-2017");
			var bookingMonth = now.getUTCMonth() + 1; //months from 1-12
			var Bookingdate = now.getUTCDate();
			var bookingYear = now.getUTCFullYear();

			//getting the number of times the left or right arrow need to be clicked to reach the booking month
			var countToClick = 0;
			var yearDifference = bookingYear - currentYear;
			
			countToClick = yearDifference*12 +  bookingMonth - currentMonth;

			
			if(countToClick>0){
				browser.wait(EC.elementToBeClickable(page.nextMonthArrow), 5000).then(function(){
					for(var i = 1; i <=countToClick; i++){
						page.clickNextMonthArrow();
					}
				})
			}
			if(countToClick<0){
				browser.wait(EC.elementToBeClickable(page.previousMonthArrow), 5000).then(function(){
					for(var i = -1; i >=countToClick; i--){
						page.clickpreviousMonthArrow();
					}
				})					
			}
			
			browser.sleep(5000).then(function(){
				if(countToClick>0){

					page.listOfDates.then(function(listOfDates){
						console.log(1);
						listOfDates[Bookingdate].click();
					})
				}

				if(Bookingdate == currentDate){
					console.log(2);
					page.clickfinalDate();
				}

				if(countToClick==0 && Bookingdate > currentDate){
					console.log(3);
					page.listOfDates.then(function(listOfDates){
						listOfDates[Bookingdate-currentDate-1].click();
					})
					
				}
				browser.sleep(5000);
			});
		});
	});

	it('getHotelList', function() {
		browser.ignoreSynchronization = true;
		browser.get("https://www.fabhotels.com/");

		var EC = protractor.ExpectedConditions;

		browser.sleep(4000).then(function(){
			//clicking hamburger button
			browser.wait(EC.elementToBeClickable(homePage.hamburger), 5000).then(function(){

				homePage.clickHamburgerButton();

			}).then(function(){

				browser.wait(EC.elementToBeClickable(homePage.locationOption), 5000).then(function(){
					//clicking location button
					homePage.clickLocationOptionButton();				
				});

			}).then(function(){
				browser.sleep(5000).then(function(){
					//creating an object in which all the cities and the count of hotels in it will be entered
					var hash = new Object();

					cityAndHotelPage.listOfCities.count().then(function(count){
						for(var i = 0; i<count;i++){
							var func = (function() {

							    var j = i; 
							    //using closure to synchronously clicking all the cities and getting number of hotels in it
							    return function() {
					      			cityAndHotelPage.listOfCities.then(function(listOfCities){
		      							var cityName;
					      				listOfCities[j].getText().then(function(text){
					      					//getting city name which is selected
					      					cityName = text;
					      					console.log('cityName ' + cityName);
					      				}).then(function(){
		      								listOfCities[j].click();
											browser.sleep(4000).then(function(){
												var Totalcount;
												cityAndHotelPage.listOfHotels.count().then(function(number){
													//count of hotels in the selected city
													Totalcount = number;
												}).then(function(){
													//adding the city name and the count of hotels in it
													hash[cityName] = Totalcount;
													browser.navigate().back();
													browser.sleep(5000);
												})
											})
					      				})
									})
							    }
						    })();

							cityAndHotelPage.listOfCities.then(func);
						}
					}).then(function(){
						//writing the data in hash object to xls
						var xls = json2xls(hash);

						fs.writeFileSync('data.xlsx', xls, 'binary');

						for(var key in hash){
    						console.log('key is :' + key + ' and value is : '+ hash[key]);
						}
					})
				})
			});
			browser.sleep(5000);
		})
	});

	it('makeBooking', function() {
		browser.ignoreSynchronization = true;
		browser.get("http://www.fabhotels.com/hotels-in-new-delhi");
		var EC = protractor.ExpectedConditions;
		//clicking check in button to select the date
		browser.wait(EC.elementToBeClickable(page.checkInButton), 5000).then(function(){
			page.clickCheckInButton();
		}).then(function(){
			browser.wait(EC.elementToBeClickable(page.finalDate), 5000).then(function(){
				//selecting the date
				page.clickfinalDate();
				page.clickFindHotelsButton();
			});
		}).then(function(){
			browser.wait(EC.elementToBeClickable(page.firstHotel), 5000).then(function(){
				//selecting the first hotel in the list
				page.clickfirstHotel();
			});
		}).then(function(){
			browser.wait(EC.elementToBeClickable(hotelBookAndPaymentPage.hotelBookButton), 5000).then(function(){
				//clicking book button
				hotelBookAndPaymentPage.clickhotelBookButton();
			});
		}).then(function(){
			browser.wait(EC.elementToBeClickable(hotelBookAndPaymentPage.paymentReviewButton), 5000).then(function(){
				//clicking continue button
				hotelBookAndPaymentPage.clickpaymentReviewButton();
			});
		}).then(function(){
			browser.sleep(7000).then(function(){
				//adding guest details
				hotelBookAndPaymentPage.detailPageElements.then(function(detailPageElements){
					detailPageElements[0].click();
					detailPageElements[0].sendKeys("Mohit Khanna");
				});

				hotelBookAndPaymentPage.detailPageElements.then(function(detailPageElements){
					detailPageElements[1].click();
					detailPageElements[1].sendKeys("mohit1234@gmail.com");
				});

				hotelBookAndPaymentPage.detailPageElements.then(function(detailPageElements){
					detailPageElements[3].click();
					detailPageElements[3].sendKeys("8860565310");
				});
			})
			
			
		}).then(function(){
			//checking out
			hotelBookAndPaymentPage.clickProceedToPayButton();
		}).then(function(){
			//selecting pay at hotel option
			browser.wait(EC.elementToBeClickable(hotelBookAndPaymentPage.payAtHotelButton), 5000).then(function(){
				hotelBookAndPaymentPage.clickPayAtHotelButton();
			});
		})
	})

})
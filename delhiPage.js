var delhiPage = (function(){
	function delhiPage(){
		this.checkInButton = element(by.xpath('.//div[@class="dr__col dr__col-left t-align-left"]'));
		this.nextMonthArrow = element(by.xpath(".//div[@class='calendar']//th[@class='icon-Arrow calendar__arrow-icon']"));
		this.previousMonthArrow = element(by.xpath(".//div[@class='calendar']//th[@class='icon-Calender-prev calendar__arrow-icon']"));
		this.listOfDates = element.all(by.xpath(".//div[@class='calendar']//td[@class='calendar__entity']/div[@class='calendar__nextday']"));
		this.finalDate = element(by.xpath(".//div[@class='calendar']//td[@class='calendar__entity']/div[@class='calendar__active']"));
		this.findHotelsButton = element(by.xpath("//*[@class='listing__btn ']"));
		this.firstHotel = element(by.xpath("//*[@class='hlc ']"));
		
	}

	delhiPage.prototype.clickCheckInButton = function(){
		this.checkInButton.click();
	};

	delhiPage.prototype.clickNextMonthArrow = function(){
		this.nextMonthArrow.click();
	};

	delhiPage.prototype.clickpreviousMonthArrow = function(){
		this.previousMonthArrow.click();
	};

	delhiPage.prototype.clickfinalDate = function(){
		this.finalDate.click();
	};

	delhiPage.prototype.clickFindHotelsButton = function(){
		this.findHotelsButton.click();
	};

	delhiPage.prototype.clickfirstHotel = function(){
		this.firstHotel.click();
	}

	return delhiPage
})();
module.exports = delhiPage;
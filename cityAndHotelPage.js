var cityAndHotelPage = (function(){
	function cityAndHotelPage(){
		this.listOfCities = element.all(by.xpath("//*[@class='ltb']//*[@class='ltb__title']"));
		this.listOfHotels = element.all(by.xpath("//*[@class='hlc ']"));	
	}

	return cityAndHotelPage
})();
module.exports = cityAndHotelPage;
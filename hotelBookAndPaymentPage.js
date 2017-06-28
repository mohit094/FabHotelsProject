var hotelBookAndPaymentPage = (function(){
	function hotelBookAndPaymentPage(){
		this.hotelBookButton = element(by.xpath("//*[contains(@class,'hotel__book-btn')]"));
		this.paymentReviewButton = element(by.xpath("//*[@class = 'payment__review__overview__continue']"));
		this.detailPageElements = element.all(by.xpath("//div[@class = 'payment__card__form_single']//input"));
		this.proceedToPayButton = element(by.xpath("//div[@class = 'payment__card__total__continue checked']"));
		this.payAtHotelButton = element(by.xpath("//div[@class = 'payment__payAtHotel ']"));
	}

	hotelBookAndPaymentPage.prototype.clickhotelBookButton = function(){
		this.hotelBookButton.click();
	};

	hotelBookAndPaymentPage.prototype.clickpaymentReviewButton = function(){
		this.paymentReviewButton.click();
	};

	hotelBookAndPaymentPage.prototype.clickProceedToPayButton = function(){
		this.proceedToPayButton.click();
	};

	hotelBookAndPaymentPage.prototype.clickPayAtHotelButton = function(){
		this.payAtHotelButton.click();
	};

	return hotelBookAndPaymentPage
})();
module.exports = hotelBookAndPaymentPage;
var homePage = (function(){
	function homePage(){
		this.hamburger = element(by.xpath("//*[@class = 'head__icon-hamburger icon-Menu']"));
		this.locationOption = element(by.xpath("//span[@class='sidebar__text'][contains(text(), 'Our Locations')]"));
	}

	homePage.prototype.clickHamburgerButton = function(){
		this.hamburger.click();
	};

	homePage.prototype.clickLocationOptionButton = function(){
		this.locationOption.click();
	};

	return homePage
})();
module.exports = homePage;
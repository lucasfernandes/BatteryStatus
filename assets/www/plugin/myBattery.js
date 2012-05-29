var MyBattery = function () {};

MyBattery.prototype.get = function(property, successCallback, errorCallback) {
	return PhoneGap.exec(successCallback, errorCallback, 'MyBattery', 'get', [ property ]);	
};

PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin("mybattery", new MyBattery());
});

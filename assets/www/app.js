function BatteryStatus () {
  // Max pixel width of the battery's capacity
  var max = '270';
  
  // Generate a color based on the charge percentage.
  var chargeColor = function(percent) {
    // Color of a fully charged batter (green)
    var hsv = { h: 121, s: 76, v: 69 };
    // Scale the hue based and convert HSV to Hex
    var h = hsv.h * (percent / 100);
    rgb = hsvToRgb(h, hsv.s, hsv.v);
    hex = colorToHex(rgb[0], rgb[1], rgb[2]);
    return hex;
  }
  
  // Set the battery charge level
  this.setCharge = function (value) {
    var el = document.getElementById('capacity');
    el.style.width = (max * (value / 100)) + 'px';
    el.style.backgroundColor = chargeColor(value);
  }

  // Monitor the battery charge level... forever.
  this.watchCharge = function() {
    console.log("watching!");
    var self = this;   
    
    window.plugins.mybattery.get('Power', function(data) {      
      if (!data.level) {
        data = JSON.parse(data);
      }      
      self.setCharge(data.level);      
      setTimeout(function() { self.watchCharge(); }, 100);
    },

    function(e) {
      alert('battery watch error: ' + e);
    });    

    console.log("After call plugin!");
  }

  this.watchCharge();
};

//
// When PhoneGap has initialized, begin watching the 
// battery's charge level.
//
document.addEventListener('deviceready', function() {
    console.log("Device is ready!");
    new BatteryStatus();        
}, false);

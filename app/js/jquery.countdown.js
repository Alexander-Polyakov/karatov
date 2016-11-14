function CountdownTimer (elm, tl) {
 this.initialize.apply(this,arguments);
}

CountdownTimer.prototype = {
  initialize: function (elm, tl) {
    this.elem = document.getElementById(elm);
    this.tl = tl;
  },

  countDown: function () {
    var timer = '';
    
    var today = new Date();
    var timeBetween = this.tl - today;

    var day  = Math.floor(timeBetween / 86400000      );
    var hour = Math.floor(timeBetween /  3600000 % 24 );
    var min  = Math.floor(timeBetween /    60000 % 60 );
    var sec  = Math.floor(timeBetween /     1000 % 60 );

    if(timeBetween > 0){
      timer += '<div class="countDays"><span class="position"><span class="digit">' + this.addZero(day)  + '</span></span></div>';
      timer += '<div class="countHours"><span class="position"><span class="digit">' + this.addZero(hour)  + '</span></span></div>'; 
      timer += '<div class="countMinutes"><span class="position"><span class="digit">' + this.addZero(min) + '</span></span></div>'; 
      timer += '<div class="countSeconds"><span class="position"><span class="digit">' + this.addZero(sec) + '</span></span></div>'; 
      this.elem.innerHTML = timer;
      tid = setTimeout((function (_this) { return function () { _this.countDown(); }})(this), 10);
    }
    else{
      this.elem.innerHTML = '<span class="number-wrapper"><div class="line"></div><span class="number end"></span></span>';
      return;
    }
  },

  addZero: function (num) { 
    return ('0' + num).slice(-2); 
  }

}

function CDT(){
  // Set countdown limit
  var tl = new Date("Thu, 25 Oct 2017 19:00:00 GMT");

  // You can add time's up message here
  var timer = new CountdownTimer('CDT', tl);
  timer.countDown();
}

window.onload=function(){
  CDT();
}

$(document).ready(function() {
    $('form').submit(function(e) {
        var form = $(this);
        var fdata = $(this).serializeArray();
        var furl = $(this).attr('action')

        $.ajax({
            url: furl,
            type: "POST",
            data: fdata,
            success: function(data) {
                console.log(data)
            },
            error: function() {
                alert('php_error');
            },
            async: true
        });

        e.preventDefault();
    })
})
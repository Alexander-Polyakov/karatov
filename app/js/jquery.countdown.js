function CountdownTimer (elm, tl) {
    this.initialize.apply(this,arguments);
}


CountdownTimer.prototype = {
    initialize: function (elm, tl) {
        this.elem = document.getElementById(elm);
        this.tl = new Date(tl);
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
            var ZeroDay = parseInt(this.addZero(day).slice(-1));
            if (ZeroDay >= 2 && ZeroDay <=4) {
                var day_name = 'дня';
            } else if ((ZeroDay == 0) || (ZeroDay >= 5 && ZeroDay <=9)) {
                var day_name = 'дней';
            } else if (ZeroDay == 1) {
                var day_name = 'день';
            }

            var ZeroHour = parseInt(this.addZero(hour).slice(-1));

            if (ZeroHour == 1) {
                if (parseInt(this.addZero(hour).slice(-2) == 11 )) {
                    var hour_name = "часов";
                } else if (parseInt(this.addZero(hour).slice(-2) == 21 )) {
                    var hour_name = 'час';
                } else {
                    var hour_name = 'час';
                }
            } else if ((ZeroHour >= 2 && ZeroHour <= 4) || (ZeroHour >= 22 && ZeroHour <= 24)) {
                var hour_name = 'часа';
            } else if ((ZeroHour == 0) || (ZeroHour >= 5 && ZeroHour <= 20)) {
                var hour_name = 'часов';
            }


            var ZeroMin = parseInt(this.addZero(min).slice(-1));
            if (ZeroMin == 1) {
                if (parseInt(this.addZero(min).slice(-2) == 11 )) {
                    var min_name = 'минут';
                } else {
                    var min_name = 'минута';
                }
            } else if (ZeroMin >= 3 && ZeroMin <= 4) {
                var min_name = 'минуты';
            } else if (ZeroMin == 2) {
                if (parseInt(this.addZero(min).slice(-2) == 12 )) {
                    var min_name = 'минут';
                } else {
                    var min_name = 'минуты';
                }
            } else if ((ZeroMin == 0) ||(ZeroMin >= 5 && ZeroMin <= 9) ) {
                var min_name = 'минут';
            }

            var ZeroSec = parseInt(this.addZero(sec).slice(-1));
            if (ZeroSec == 1) {
                if (parseInt(this.addZero(sec).slice(-2) == 11 )) {
                    var sec_name = 'секунд';
                } else {
                    var sec_name = 'секунда';
                }
            } else if (ZeroSec >= 3 && ZeroSec <= 4) {
                var sec_name = 'секунды';
            } else if (ZeroSec == 2) {
                if (parseInt(this.addZero(sec).slice(-2) == 12 )) {
                    var sec_name = 'секунд';
                } else {
                    var sec_name = 'секунды';
                }
            } else if ((ZeroSec == 0) ||(ZeroSec >= 5 && ZeroSec <= 9) ) {
                var sec_name = 'секунд';
            }


            timer += '<div class="countDays"><span class="position"><span class="digit">' + this.addZero(day)  + '</span><span class="digit_name">' +day_name+ '</span></span></div>';
            timer += '<div class="countHours"><span class="position"><span class="digit">' + this.addZero(hour)  + '</span><span class="digit_name">' +hour_name+ '</span></span></div>';
            timer += '<div class="countMinutes"><span class="position"><span class="digit">' + this.addZero(min) + '</span><span class="digit_name">' +min_name+ '</span></span></div>';
            timer += '<div class="countSeconds"><span class="position"><span class="digit">' + this.addZero(sec) + '</span><span class="digit_name">' +sec_name+ '</span></span></div>';
            this.elem.innerHTML = timer;
            tid = setTimeout((function (_this) { return function () { _this.countDown(); }})(this), 100);
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



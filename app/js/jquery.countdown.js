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
                var day_name = 'Дня';
            } else if ((ZeroDay == 0) || (ZeroDay >= 5 && ZeroDay <=9)) {
                var day_name = 'Дней';
            } else if (ZeroDay == 1) {
                var day_name = 'День';
            }

            var ZeroHour = parseInt(this.addZero(hour).slice(-1));
            if ((ZeroHour == 1) && (ZeroHour == 21)) {
                var hour_name = 'Час';
            } else if ((ZeroHour >= 2 && ZeroHour <= 4) || (ZeroHour >= 22 && ZeroHour <= 24)) {
                var hour_name = 'Часа';
            } else if ((ZeroHour == 0) || (ZeroHour >= 5 && ZeroHour <= 20)) {
                var hour_name = 'Часов';
            }


            var ZeroMin = parseInt(this.addZero(min).slice(-1));
            console.log(ZeroMin);
            if (ZeroMin == 1) {
                var min_name = 'Минута';
            } else if (ZeroMin >= 3 && ZeroMin <= 4) {
                var min_name = 'Минуты';
            } else if (ZeroMin == 2) {
                if (parseInt(this.addZero(min).slice(-2) == 12 )) {
                    var min_name = 'Минут';
                } else {
                    var min_name = 'Минуты';
                }
            } else if ((ZeroMin == 0) ||(ZeroMin >= 5 && ZeroMin <= 9) ) {
                var min_name = 'Минут';
            }





            timer += '<div class="countDays"><span class="position"><span class="digit">' + this.addZero(day)  + '</span><span class="digit_name">' +day_name+ '</span></span></div>';
            timer += '<div class="countHours"><span class="position"><span class="digit">' + this.addZero(hour)  + '</span><span class="digit_name">' +hour_name+ '</span></span></div>';
            timer += '<div class="countMinutes"><span class="position"><span class="digit">' + this.addZero(min) + '</span><span class="min_name">' +min_name+ '</span></span></div>';
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



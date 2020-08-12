$('#city_text').keyup(function(event){
    if (event.keyCode === 13) {

        var city = document.getElementById('city_text').value;

        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a8c68e25b41670c9b07fe00a609dac02&units=metric", function(data){
            console.log(data);
            // element assign
            const secondPointer = document.querySelector(".pointer-second");
            const minutePointer = document.querySelector(".pointer-minute");
            const hourPointer = document.querySelector(".pointer-hour");
            const secondSpan = document.querySelector("#secondSpan");
            const minuteSpan = document.querySelector("#minuteSpan");
            const hourSpan = document.querySelector("#hourSpan");

            // run 
            setInterval(getDate, 1000);
            getDate();

            // function
            function getDate(){
                // get date
                var flag = 0;
                dates = Number(data.timezone);

                if(dates < 0){
                    flag = 1;
                }

                dates_abs = Math.abs(dates); 

                var h = Math.floor(dates_abs / 3600);
                var m = Math.floor(dates_abs % 3600 / 60);
                var s = Math.floor(dates_abs % 3600 % 60);

                var second = s.toString();
                var minute = m.toString();
                var hour = h.toString();
                
                if (second.length < 2){
                    second = "0" + second;
                }
                if (minute.length < 2){
                    minute = "0" + minute;
                }
                if (hour.length < 2){
                    hour = "0" + hour;
                }

                var flag = 0;
                if(dates < 0){
                    flag = 1;
                }

                const date = new Date();
                
                // contant common vars
                const seconds = date.getUTCSeconds();
                const minutes = date.getUTCMinutes();
                const hours = date.getUTCHours();
                
                // format digital time
                var seconds00 = seconds.toString();
                var minutes00 = minutes.toString();
                var hours00 = hours.toString();

                if (seconds00.length < 2){
                    seconds00 = "0" + seconds00;
                }
                if (minutes00.length < 2){
                    minutes00 = "0" + minutes00;
                }
                if (hours00.length < 2){
                    hours00 = "0" + hours00;
                }

                if(flag == 1){
                    seconds00 = (Number(seconds00) - Number(second)).toString()
                    minutes00 = (Number(minutes00) - Number(minute)).toString();
                    hours00 = (Number(hours00) - Number(hour)).toString();
                }
                else{
                    seconds00 = (Number(seconds00) + Number(second)).toString()
                    minutes00 = (Number(minutes00) + Number(minute)).toString();
                    hours00 = (Number(hours00) + Number(hour)).toString();
                }

                if(Number(hours00) < 0){
                    hours00 = (12 - Math.abs(Number(hours00))).toString();
                }

                if(Number(minutes00) < 0){
                    minutes00 = (Math.abs(Number(minutes00))).toString();
                }

                if(Number(seconds00) < 0){
                    seconds00 = (Math.abs(Number(seconds00))).toString();
                }

                if (seconds00.length < 2){
                    seconds00 = "0" + seconds00;
                }
                if (minutes00.length < 2){
                    minutes00 = "0" + minutes00;
                }
                if (hours00.length < 2){
                    hours00 = "0" + hours00;
                }

                if (Number(hours00) > 23){
                    hours00 = (Number(hours00) - 24).toString();
                }

                if (hours00.length < 2){
                    hours00 = "0" + hours00;
                }

                secondSpan.innerHTML = seconds00;
                minuteSpan.innerHTML = minutes00;
                hourSpan.innerHTML = hours00;
                
                // manipulate analog clock
                // handle seconds

                const secondsDeg = ((seconds00 / 60) * 360) + 90;
                secondPointer.style.transform = `rotate(${secondsDeg}deg)`;
                // avoid FX bug on transition > seconds pointer
                if (secondsDeg >= 444 || secondsDeg < 91){
                    secondPointer.style.transition = "none";
                }
                else{
                    secondPointer.style.transition = "all 0.05s";
                }

                // handle minutes
                const minutesDeg = ((minutes00 / 60) * 360) + ((seconds00 / 60) * 6) + 90;
                minutePointer.style.transform = `rotate(${minutesDeg}deg)`;
                // avoid FX bug on transition > minutes pointer
                if (minutesDeg >= 444 || secondsDeg < 91){
                    minutePointer.style.transition = "none";
                }
                else{
                    minutePointer.style.transition = "all 0.05s";
                }

                // handle hours
                const hoursDeg = ((hours00 / 12) * 360) + ((minutes00 / 60) * 30) + 90;
                hourPointer.style.transform = `rotate(${hoursDeg}deg)`;
                // avoid FX bug on transition > minutes pointer
                if (hoursDeg >= 444 || secondsDeg < 91){
                    hourPointer.style.transition = "none";
                }
                else{
                    hourPointer.style.transition = "all 0.05s";
                }
            }


            var sunset = new Date(data.sys.sunset);
            var sunrise = new Date(data.sys.sunrise);

            const sunset_minutePointer = document.querySelector(".pointer-minute_sunset");
            const sunset_hourPointer = document.querySelector(".pointer-hour_sunset");
            
            const sunrise_minutePointer = document.querySelector(".pointer-minute_sunrise");
            const sunrise_hourPointer = document.querySelector(".pointer-hour_sunrise");


            var sunrise_hours = document.getElementById('sunrise_hour');
            sunrise_hours.innerHTML = "0" + (sunrise.getHours()+2);
            var sunrise_minutes = document.getElementById('sunrise_minute');
            sunrise_minutes.innerHTML = sunrise.getMinutes();

            var sunset_hours = document.getElementById('sunset_hour');
            sunset_hours.innerHTML = "0" + (sunset.getHours()+4);
            var sunset_minutes = document.getElementById('sunset_minute');
            sunset_minutes.innerHTML = sunset.getMinutes();

            // handle minutes
            const sunset_minutesDeg = ((sunset.getMinutes() / 60) * 360) + ((sunset.getSeconds() / 60) * 6) + 90;
            sunset_minutePointer.style.transform = `rotate(${sunset_minutesDeg}deg)`;

            const sunrise_minutesDeg = ((sunrise.getMinutes() / 60) * 360) + ((sunrise.getSeconds() / 60) * 6) + 90;
            sunrise_minutePointer.style.transform = `rotate(${sunrise_minutesDeg}deg)`;
            
            // handle hours
            const sunset_hoursDeg = (((sunset.getHours()+4) / 12) * 360) + ((sunset.getMinutes() / 60) * 30) + 90;
            sunset_hourPointer.style.transform = `rotate(${sunset_hoursDeg}deg)`;
            
            const sunrise_hoursDeg = (((sunrise.getHours()+2) / 12) * 360) + ((sunrise.getMinutes() / 60) * 30) + 90;
            sunrise_hourPointer.style.transform = `rotate(${sunrise_hoursDeg}deg)`;
        });
    };
});
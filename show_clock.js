// 桁数が1桁だったら先頭に0を加えて2桁に調整する
function set2fig(num) {
    var ret;
    if( num < 10　){
        ret = "0" + num;
    }else{
        ret = num;
    }
    return ret;
}

// 「分」の「時」への繰り上がり処理
function minUptoHour(minute){
    var ret = [];
    if(minute>=0 && minute<60){
        ret = [minute, 0];
    }else if(minute<0){
        ret = [minute+60, -1];
    }else{
        ret = [minute-60, 1];
    }
    return ret;
}

// 「時」の「日」への繰り上がり処理
function hourUptoDay(hour){
    var ret = [];
    if(hour>=0 && hour<24){
        ret = [hour, 0];
    }else if(hour<0){
        ret = [hour+24, -1];
    }else{
        ret = [hour-24, 1];
    }
    return ret;
}

// 受け取ったタイムゾーンの時刻表示をリターン
function showClock(timezone){
    // 時間取得
    var nowTime = new Date();
    var UTC_Hour;
    if(nowTime.getHours()-9 < 0){
        UTC_Hour = nowTime.getHours() -9 + 24;
    }else{
        UTC_Hour = nowTime.getHours() -9;
    }
    var UTC_Min = nowTime.getMinutes();
    var UTC_Sec = nowTime.getSeconds();

    var dif_hour = (timezone - timezone%100) / 100;
    var dif_min = timezone % 100;
    var min_and_uphour = minUptoHour(UTC_Min + dif_min);
    var hour_and_upday = hourUptoDay(UTC_Hour + dif_hour + min_and_uphour[1]);

    var Sec = set2fig(UTC_Sec);
    var Min = set2fig(min_and_uphour[0]);
    var Hour = set2fig(hour_and_upday[0]);

    return Hour + "時" + Min + "分" + Sec + "秒";
}

// 各パネルの時計部分に時刻を埋め込む
function worldClock(){
    var ary_idnum = [];
    var num=0;
    $.each($('.clock'), function(){
        var idstr = $(this).attr("id");
        var idnum = idstr.match(/-?[0-9]+\.?[0-9]*/g);
        ary_idnum[num] = Number(idnum);
        num++;
    });

    for(var i=0; i<num; i++){ // num == ary_idnum
        $('#clock' + ary_idnum[i]).text(showClock(ary_idnum[i]));
    }
}

// 1秒ごとに時計を更新
setInterval('worldClock()', 1000);
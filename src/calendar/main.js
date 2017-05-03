function calendar(year, month) {
	var week=getWeek(year,month);
    var isRun=(YearDay(year)===366);
    var day=MonthDay(month,isRun);

    //获取当前日期
    var date=new Date();
    var toyear=date.getFullYear();
    var tomonth=date.getMonth()+1;
    var today=date.getDate();

   	//当前日期是否在当前年和月份中
    var isInner=(year===toyear && month===tomonth);
    
    var tds=document.querySelectorAll('td');
    for(var i=0;i<week-1;i++){
        tds[i].innerText='';
        tds[i].className='';
    }
    
    for(var i=week-1,j=1;i<week+day-1;i++,j++){
        tds[i].innerText=j;
        tds[i].className='';
        if(isInner && j===today){
            tds[i].className='current';
        }
    }
    
    for(var i=week+day-1,len=tds.length;i<len;i++){
        tds[i].innerText='';
        tds[i].className='';
    }
}

calendar(2017,3);

//以2017年1月1日是星期天为基准，计算当前月份第一天是星期几
function getWeek(year,month){
    var day=0;
    var min=Math.min(year,2017);
    var max=Math.max(year,2017);
    for(var i=min+1;i<max;i++){
        day+=YearDay(i);
    }
    
    var res;
    if(year<2017){
        day+=YearDay(year)-currentDay(year,month,1);
        day++;
        res=7-day%7;
    }
    else{
        day+=currentDay(year,month,1);
        day--;
        res=day%7;
        
        if(res===0){
            res=7;
		}
    }
    return res;
}
    
//计算日期是当前年的第几天
function currentDay(year,month,day){
    var res=0;
    var isRun=(YearDay(year)===366);
    for(var i=1;i<month;i++){
        res+=MonthDay(i,isRun);
    }
    res+=day;
    return res;
}

//计算当前年有多少天
function YearDay(year){
    if(year%4===0 && year%400!==0){
        return 366;
	}
    else{
        return 365;
    }
}

//计算当前月有多少天
function MonthDay(month,isRun){
	if(isRun && month===2){
        return 29;
    }
    
    var months=[31,28,31,30,31,30,31,31,30,31,30,31];
    return months[--month];
}

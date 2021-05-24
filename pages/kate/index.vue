<template>
  <div>
    <div>오늘 날짜(일): {{month}}월, {{date}}일, {{yo}}요일</div>
    <div>{{startDate}} - {{endDate}} {{bak}}박</div>


    <div class="box">
      <div class="inbox">
        <button class="title" @click="calendarMove(-1)">&lt;</button>
        <h2 class="title">{{year}}년 {{month}}월</h2> <!-- 현재 달력의 년, 월 표시 -->
        <button class="title" @click="calendarMove(1)">&gt;</button>
        <br/><br/>
        <table>
          <thead>
          <!-- 요일은 고정이니 반복문 사용하여 테이블 헤더에 삽입 -->
          <th v-for="day in days" :key="day">{{day}}</th>
          </thead>
          <tbody>
          <tr v-for="(row, index) in dates" :key="index">
            <td v-for="(d, index2) in row" :key="index2" :class="isToday(year,month,d) ? 'rounded' : ''">
           <span
             @click="clickDate(year,month,d)"
             :class=" startt ? ((d === startt.getDate() && month === startt.getMonth()+1) || (d === enddDate && month === enddMonth) ? 'crounded' :
              ((d>startt.getDate()) || ((month > startt.getMonth()+1)) && month<=enddMonth ) && ((d<enddDate) || ((month < enddMonth)) && month>=startt.getMonth()+1) ? 'range' : '') : ''">
                {{d}}
              </span>
<!--              <span-->
<!--                @click="clickDate(year,month,d)"-->
<!--                :class=" startt ? ((d === startt.getDate() && month === startt.getMonth()+1) || (d === enddDate && month === enddMonth) ? 'crounded' :-->
<!--              ((d>startt.getDate()) || ((month === startt.getMonth()+1)) && month<enddMonth) && ((d<enddDate) || ((month === enddMonth)) && month>starttMonth) ? 'range' :-->
<!--              ((d>startt.getDate()) || ((month > startt.getMonth()+1)) && month<=enddMonth ) && ((d<enddDate) || ((month < enddMonth)) && month>=startt.getMonth()+1) ? 'range2' : '') : ''">-->
<!--                {{d}}-->
<!--              </span>-->
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>



  </div>
</template>

<script>
// 달력의 날짜들(dates)을 이차원 배열에 1차 배열은 주(week)로 잡고 2차 배열은
// 날짜들을 담음. 테이블에 그릴 때 1일이 어느 요일에서 시작 하는지 알아야 하며
// 그 전에 남은 셀이 있다면 저번 달의 날짜들을
// 채웠어야 했고 마지막 주에 남은 셀이 있으면 다음 달의 날짜를 채움s

export default {
  data(){

    return{
      days: [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
      ],
      year:0,
      month:0,
      date:0,
      yo:0,


      lastMonthStart:0,
      nextMonthStart:0,

      dates: [],

      startDate:0,
      endDate:0,

      counter:0,
      bak:0,

      startt:0,
      endd:0,
      enddDate:0,
      enddMonth:0,
      starttMonth:0,

    }

  },
  created(){
    console.log('created')
    const today = new Date();
    this.date=today.getDate(); //오늘 일(ex 13)
    this.year=today.getFullYear(); //오늘 년도
    this.month=today.getMonth()+1; //오늘 월(js 월은 0부터 시작하므로..+1)
    this.yo=today.getDay();  //오늘 요일 (0일 1월 2화 3수 4목 5금 6토)

    this.calendarMove();


  },
  mounted(){

  },
  methods:{
    calendarMove(args){
      if(args<0){
        this.month -=1;
      }else if(args===1){
        this.month +=1;
      }
      if (this.month === 0){ //작년 12월
        this.year -= 1;
        this.month = 12;
      } else if (this.month > 12) { //내년 1월
        this.year += 1;
        this.month =1;
      }

      const [monthFirstDay, monthLastDate, lastMonthLastDate,] = this.getFirstDayLastDate(this.year, this.month);


      this.dates=this.getMonthOfDays(
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate,
      );

      console.log('this,month',this.month)
      console.log('this.dates',this.dates)

    },

    getFirstDayLastDate(year, month){
      console.log(month)
      const firstDay = new Date(year, month-1, 1).getDay();
      const lastDate = new Date(year, month, 0).getDate();
      console.log(lastDate)
      let lastYear = year;
      let lastMonth = month -1;
      if (month === 1){
        lastMonth = 12;
        lastYear -= 1;
      }
      const prevLastDate = new Date(lastYear, lastMonth, 0).getDate();
      return [firstDay, lastDate, prevLastDate];
    },




    getMonthOfDays(tyo,ldate,ldatel){
      console.log('tyo',tyo)
      let day =1;
      //(지난달 마지막날 - 이번달 첫날 요일)+1
      //ex) 30 - 토(6) +1 = 25 (앞에 채워지는 지난달 날짜 시작)
      console.log('tyo, ldate, ldate1',tyo,ldate,ldatel)
      // let prevDay = (ldatel - tyo)+1;

      this.prevDay = (ldatel - tyo)+1;
      console.log("prevDay",this.prevDay);
      const dates=[];
      let weekOfDays=[];  //한 주의 날짜
      while(day<=ldate){  //이번달 마지막일 전까지
        if(day===1){
          for(let j=0; j<tyo; j+=1){  //이번달 첫날 요일보다 작을때까지(커지면 if탈출해 day+=1)
            //weekOfDays.push(this.prevDay);
            weekOfDays.push('');
            //console.log("weekOfDays",weekOfDays);
            //console.log("day",day);
            this.prevDay +=1;
          }
        }
        weekOfDays.push(day);
        //console.log("day>>>",day);
        //console.log("weekOfDays>>>",weekOfDays);
        if(weekOfDays.length===7){
          //일주일 채우면
          dates.push(weekOfDays);
          weekOfDays=[]; //초기화
        }
        day+=1;
      }
      //이번달 마지막날 초과(day=>32)
      //7 못채워서 dates에 저장되지 않고 탈출한 나머지 weekOfDays
      console.log("weekOfDays>>>",weekOfDays);
      const len=weekOfDays.length;  //마지막 주의 이번달 날짜 길이
      console.log("len",len)
      if(len > 0 && len<7){
        for(let k=1; k<=7-len; k+=1){ //1부터 7의 (이번달 날짜 길이 제외한)나머지 칸에 집어넣음
          //weekOfDays.push(k);
          weekOfDays.push('');
        }
      }
      if(weekOfDays.length>0) dates.push(weekOfDays); //남은 날짜 추가(weekOfDays배열)
      this.nextMonthStart=weekOfDays[0]; // 이번 달 마지막 주에서 제일 작은 날짜
      console.log(weekOfDays[0]);
      //console.log(dates);
      return dates;

    },
    isToday(cyear, cmonth, cday){
      let da = new Date();
      return cyear == da.getFullYear() && cmonth ==da.getMonth()+1 && cday == da.getDate();

    },
    isHoliDay(month, day){
      if (month===5 && day===5){
        return true;
      }
    },
    clickDate(year,month,d){
      console.log(d);
      //let end = 0;
      this.counter++;
      if (this.counter%2 ===1){
        this.startDate=month+'월'+d+'일';

        let startt =  new Date(year,month-1,d);
        this.startt = startt;
        this.starttMonth = startt.getMonth()+1;
        console.log('startt',startt);
        console.log('-starttMonth',startt.getMonth()+1)
        console.log('-month',month)

        if(this.counter>=3){
          this.endDate = 0 + '월' + 0 + '일';
          this.enddDate=null;
          this.bak = 0;

        }
      }else if(this.counter%2 ===0) {
        this.endDate = month + '월' + d + '일';

        this.endd =  new Date(year,month-1,d);
        console.log('endd',this.endd)
        this.enddDate = this.endd.getDate();
        this.enddMonth = this.endd.getMonth()+1;
        console.log('-enddMonth',this.enddMonth)
        console.log('-month',month)
        if(this.startt>this.endd){
          this.startDate = 0 + '월' + 0 + '일';
          this.endDate = 0 + '월' + 0 + '일';
          this.endd=null;
          this.startt=0;
          d=0;
          alert('퇴실일이 입실일보다 전일 수 없습니다.');
        }


        this.bak = (this.endd-this.startt)/(3600*24*1000);
        console.log('startt',this.startt);
        console.log('bak',(this.endd-this.startt)/(3600*24*1000))


      }

      console.log('counter',this.counter);



    },

  }



}
</script>

<style lang="scss">

.title{
  display: inline-block;
}
.box{
  background-color: #9dc487;
  align-content: center;
  display: flex;
  width:500px;
  height:500px;
}
.inbox{
  margin:auto;
  text-align: center;
}
.rounded{
  background-color: #599072;
  border-radius: 20px;
  color: white;
}
.crounded{
  background-color: #596990;
  border-radius: 20px;
  padding: 10px;
  margin: -10px;
  color: white;
}
.range{
  color: white;
}
.range2{
  color: #ddd;
}
.red{
  color: red;
}
td{
  padding: 20px;
}

</style>

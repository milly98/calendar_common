<template>
  <div>
    <div>오늘 날짜(일): {{month}}월, {{date}}일, {{yo}}요일</div>
    <div>이번 달 첫 날짜(일): {{tmonth}}월, {{tdate}}일, {{tyo}}요일</div>
    <div>이번 달 마지막 날짜(일): {{lmonth}}월, {{ldate}}일, {{lyo}}요일</div>
    <div>지난 달 마지막 날짜(일): {{lmonthl}}월, {{ldatel}}일, {{lyol}}요일</div><br/>


    <button class="title" @click="calendarMove(-1)">&lt;</button>
    <h2 class="title">{{year}}년 {{month}}월</h2> <!-- 현재 달력의 년, 월 표시 -->
    <button class="title" @click="calendarMove(1)">&gt;</button>


    <table>
      <thead>
      <!-- 요일은 고정이니 반복문 사용하여 테이블 헤더에 삽입 -->
      <th v-for="day in days" :key="day">{{day}}</th>
      </thead>
      <tbody>
      <tr v-for="(row, index) in dates" :key="index">
        <td v-for="(d,index2) in row" :key="index2">
          <div @click="clickedChange" :class="clicked ? 'blue' : 'white'">
            {{d}}
          </div>
        </td>
      </tr>
      </tbody>
    </table>



    <!-- :class="{'white': !clicked, 'blue': clicked}" -->


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
      clicked: false,

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

      tyear:0,
      tmonth:0,
      tdate:0,
      tyo:0,


      lyear:0,
      lmonth:0,
      ldate:0,
      lyo:0,

      lyearl:0,
      lmonthl:0,
      ldatel:0,
      lyol:0,

      lastMonthStart:0,
      nextMonthStart:0,

      dates: [],


    }

  },
  created(){
    const today = new Date();
    this.date=today.getDate(); //오늘 일(ex 13)
    this.year=today.getFullYear(); //오늘 년도
    this.month=today.getMonth()+1; //오늘 월(js 월은 0부터 시작하므로..+1)
    this.yo=today.getDay();  //오늘 요일 (0일 1월 2화 3수 4목 5금 6토)

    //이번달 첫날
    const thisMonth = new Date();
    thisMonth.setDate(1);
    this.tyear=thisMonth.getYear();
    this.tmonth=thisMonth.getMonth()+1;
    this.tdate=thisMonth.getDate();
    this.tyo=thisMonth.getDay();

    //이번달 마지막날
    const lastMonth = new Date();
    lastMonth.setMonth(thisMonth.getMonth()+1);
    lastMonth.setDate(thisMonth.getDate()-1);
    this.lyear=lastMonth.getYear();
    this.lmonth=lastMonth.getMonth()+1;
    this.ldate=lastMonth.getDate();
    this.lyo=lastMonth.getDay();

    //지난달의 마지막날
    const lastMonthLast = new Date();
    lastMonthLast.setDate(0);
    this.lyearl=lastMonthLast.getYear();
    this.lmonthl=lastMonthLast.getMonth()+1;
    this.ldatel=lastMonthLast.getDate();
    this.lyol=lastMonthLast.getDay();

    // this.dates=this.getMonthOfDays(
    //     this.tyo,
    //     this.ldate,
    //     this.ldatel
    // );
    this.calendarMove();


  },
  mounted(){

  },
  methods:{
    clickedChange() {
      this.clicked=!this.clicked;
      //console.log(this.clicked)
    },
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

      this.dates=this.getMonthOfDays(
        this.tyo,
        this.ldate,
        this.ldatel
      );

      console.log('this,month',this.month)
      console.log('this.dates',this.dates)

    },
    getMonthOfDays(tyo,ldate,ldatel){
      console.log('tyo',tyo)
      let day =1;
      //(지난달 마지막날 - 이번달 첫날 요일)+1
      //ex) 30 - 토(6) +1 = 25 (앞에 채워지는 지난달 날짜 시작)
      let prevDay = (ldatel - tyo)+1;
      console.log("prevDay",prevDay);
      const dates=[];
      let weekOfDays=[];  //한 주의 날짜
      while(day<=ldate){  //이번달 마지막일 전까지
        if(day===1){
          for(let j=0; j<tyo; j+=1){  //이번달 첫날 요일보다 작을때까지(커지면 if탈출해 day+=1)
            if(j===0) this.lastMonthStart=prevDay;
            weekOfDays.push(prevDay);
            console.log("weekOfDays",weekOfDays);
            console.log("day",day);
            prevDay +=1;
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
          weekOfDays.push(k);
        }
      }
      if(weekOfDays.length>0) dates.push(weekOfDays); //남은 날짜 추가(weekOfDays배열)
      this.nextMonthStart=weekOfDays[0]; // 이번 달 마지막 주에서 제일 작은 날짜
      console.log(weekOfDays[0]);
      //console.log(dates);
      return dates;

    }

  }



}
</script>

<style lang="scss">
.white{
  background-color: #ddd;
  text-align: center;
}
.blue{
  background-color: royalblue;
  text-align: center;
}
.title{
  display: inline-block;
}

</style>

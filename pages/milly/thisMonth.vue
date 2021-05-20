<template>
  <div class="container">
    <div class="title"> Milly's calendar</div>
    <input v-model="year"/>
    <div class="month margin50">
      <div @click="month > 0 ? month-- : (month = 11, year--)"> < </div>
      <div> {{ month + 1 }} 월 </div>
      <div @click="month < 11 ? month++ : (month = 0, year++)"> > </div>
    </div>
    <div class="calendar">
      <div class="weekday">
        <span class="day" v-for="day in day">{{ day }}</span>
      </div>
      <div class="week" v-for="week in setCalendar">
        <span @click="selectedDate = date.date; dateRange()" class="date" v-for="(date,idx) in week">{{date.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Index from "../index";
export default {
  components: {Index},
  data() {
    return {
      day : ['일','월','화','수','목','금','토'],
      today : new Date(),
      year : new Date().getFullYear(),
      month : new Date().getMonth(),
      selectedDate : new Date().getDate(),
      startDay : null,
      endDay : null,
    };
  },
  mounted() {
    this.setCalendar;
  },
  computed:{
    setCalendar(){
      let calendarData = [];
      const standardDate = new Date(this.year, this.month, this.selectedDate);
      standardDate.setDate(1);
      const firstDayOfMonth = standardDate.getDay();
      standardDate.setMonth(+1);
      standardDate.setDate(-1);
      const lastDate = standardDate.getDate();
      let dateDay = [];
      let date = 0;
      for (let i = 0; i < 6; i++){
        for (let k = 0; k < 7; k++){
          if(k < firstDayOfMonth && date === 0){
            dateDay.push({date : '', day : k})
          } else if(date > lastDate){
            if(k === 0) break;
            dateDay.push({date : '', day : k})
          } else{
            date ++;
            dateDay.push({date : date, day : k})
          }
        }
        calendarData.push(dateDay);
        dateDay = [];
      }
      // console.log(calendarData);
      return calendarData
    },

  },
  methods: {
    // isHoliday(){
    //   // 주말, 공휴일은 클래스를 추가해서 빨간색으로 날을 표시하도록 해야 함.
    //   // 주말은 day === 0 || day === 6 일요일 || 토요일
    //   // 공휴일은 연월일 을 'YYYYMMDD' 형식으로 저장 해놓기 => 그럼 calendar 에 'YYYYMMDD' 형식으로 저장을 해야 하는가 비교 할 때마다 만드는게 나은가? 무엇이 효율적...?
    //
    //   const holidayList = ['20210501', '20210502',
    //     '20210508', '20210509',
    //     '20210515', '20210516',
    //     '20210522', '20210523',
    //     '20210529', '20210530']
    //   console.log(`${this.year}${this.month+1}${this.date}`)
    //   if(holidayList.includes(`${this.year}${this.month+1}${this.date}`)) return true;
    //   return false;
    // },
    dateRange(){
      // 초반에 start, end 다 비어있음.
      // 두개 다 비어있는 경우 ? start에 선택 된 날 넣음.
      // start보다 선택된게 크면 ? start/end 에 넣음
      // start보다 선택된게 작으면 ? start/end 에 넣음

      if(this.startDay && Number(this.startDay) < Number(new Date(this.year, this.month, this.selectedDate)) && Number(this.startDay) === Number(this.endDay)){
        console.log("endDay 가 바뀌어야 함")
        this.endDay = new Date(this.year, this.month, this.selectedDate)
      }else {
        console.log("둘 다 바뀌어야 함")
        this.startDay = new Date(this.year, this.month, this.selectedDate)
        this.endDay = new Date(this.year, this.month, this.selectedDate)
      }

      console.log('startDay > ', this.startDay);
      console.log('endDay > ', this.endDay);
    }
  }
}
</script>

<style lang="scss">

//color: #657a16; main-color
//color: #f3f5ed; sub-color

.container {
  > .calendar{
    > .weekday{
      display: flex;
      justify-content: center;
      > .day{
        flex-basis: 100px;
        margin-bottom: 20px;
        text-align: center;
      }
    }
    > .week{
      display: flex;
      justify-content: center;
      >span{
        flex-basis: 100px;
        &.date{
          height: 60px;
          border: solid #f3f5ed 1px;
          padding: 10px;
        }
      }
    }
  }
  > .month{
    display: flex;
    justify-content: space-evenly;
    >div{
      font-weight: bold;
      font-size: 30px;
    }
  }
}
.margin50{
  margin: 50px;
}
</style>

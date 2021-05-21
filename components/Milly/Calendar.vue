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
        <span
          @click="selectedDate = date.date; dateRange"
          class="date"
          :class="startDay ? (date.formedDate === startDay ? 'selected' : date.formedDate === endDay ? 'selected' :
          (date.formedDate > startDay && date.formedDate < endDay) ? 'range' : '') : ''"
          v-for="(date,idx) in week">
          <div :class="date.isholiday === true ? 'holiday' : ''"> {{date.date}} </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Index from "../../pages";
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
      holidayList : ['20210101', '20210211', '20210212', '20210213', '20210301', '20210505', '20210519', '20210606',
        '20210815', '20210920', '20210921', '20210922', '20211003', '20211009', '20211225'],
    };
  },
  mounted() {
    this.setCalendar;
    // this.callHoliday();
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
            dateDay.push({date : '', day : k, formedDate :'', isholiday :  false})
          } else if(date > lastDate){
            if(k === 0) break;
            dateDay.push({date : '', day : k, formedDate :'', isholiday : false})
          } else{
            date ++;
            let calenderDate = new Date(this.year, this.month, date)
            dateDay.push({date : date, day : k, formedDate : this.format(calenderDate), isholiday : this.holidayList.includes(this.format(calenderDate)) ? true : k === 0 || k === 6 ? true : false})
          }
        }
        calendarData.push(dateDay);
        dateDay = [];
      }
      console.log(calendarData);
      return calendarData
    },
    dateRange(){
      if(this.startDay && this.startDay < this.format(new Date(this.year, this.month, this.selectedDate)) && this.startDay === this.endDay){
        console.log("endDay 가 바뀌어야 함")
        this.endDay = this.format(new Date(this.year, this.month, this.selectedDate));
      }else {
        console.log("둘 다 바뀌어야 함")
        this.startDay = this.format(new Date(this.year, this.month, this.selectedDate));
        this.endDay = this.format(new Date(this.year, this.month, this.selectedDate));
      }
      console.log('startDay > ', this.startDay);
      console.log('endDay > ', this.endDay);
      return 'selected'; // return 이 필요가 없음
    },
  },
  methods: {
    format(date){
      let yyyy = date.getFullYear();
      let mm = date.getMonth()+1;
      let dd = date.getDate();
      if( mm < 10 ){
        mm = '0' + mm
      }
      if( dd < 10){
        dd = '0' + dd
      }
      return `${yyyy}${mm}${dd}`;
    }
  },
  callHoliday(){
    // var xhr = new XMLHttpRequest();
    // var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo'; /*URL*/
    // var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'b%2Bs0OmI7q0%2B5rtcOg9cPQ8NlFZ0eWbdVKEJdA1riLNYJ3M7y%2Brmyxe5jHfCWC8NR4CzemZvBZ%2B2EALje81R85A%3D%3D'; /*Service Key*/
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    // queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent('2019'); /**/
    // queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent('02'); /**/
    // xhr.open('GET', url + queryParams);
    // xhr.onreadystatechange = function () {
    //   if (this.readyState == 4) {
    //     alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    //   }
    // };
    //
    // xhr.send('');

    // Access-Control-Allow-Origin 에러 발생
    // axios 하려고 했으나 실패 -> 다시 시도 해보기
  },
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
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0;
        &.date{
          height: 40px;
          border: solid #f3f5ed 1px;
          padding: 10px 0;
        }
        >div{
          display: flex;
          justify-content: center;
          align-items: center;
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
.selected{
  width: 50%;
  height: 100%;
  background-color: #f3f5ed;
  > div {
    color: #FFF;
    font-weight: bold;
    height: 40px;
    width: 40px;
    border-radius: 50px;
    background-color: #657a16;
  }
}
.range{
  color: lightcoral;
  width: 100%;
  height: 100%;
  background-color: #f3f5ed;
}
.holiday{
  color: red;
}
</style>

<template>
  <div class="container">
    <div class="title"> Milly's calendar</div>
    <h2> {{ today.getMonth() + 1 }} 월 </h2>
    <table>
      <thead>
      <tr>
        <td>일</td>
        <td>월</td>
        <td>화</td>
        <td>수</td>
        <td>목</td>
        <td>금</td>
        <td>토</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="week in setCalendar">
        <td v-for="(date,idx) in week">{{date.date}}</td>
      </tr>
      </tbody>
    </table>


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
        <span class="date" v-for="(date,idx) in week">{{date.date}}</span>
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
      date : new Date().getDate()
    };
  },
  mounted() {
    this.setCalendar;
  },
  computed:{
    setCalendar(){
      let calendarData = [];
      const standardDate = new Date(this.year, this.month, this.date);
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
      return calendarData
    }
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

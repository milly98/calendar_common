<template>
  <div class="container">
    <div class="summary">
      <div v-if="startDay && format(startDay) !== format(endDay)">
        <span>{{ startDay.getMonth() + 1 }}월 {{ startDay.getDate() }}일</span>
        <span> ~ {{ endDay.getMonth() + 1 }}월 {{ endDay.getDate() }}일</span>
        <span>  {{ (endDay-startDay)/(60*60*24*1000) }}박</span>
      </div>
      <div v-else-if="startDay">
        <span>체크아웃 날짜를 선택하세요.</span>
      </div>
      <div v-else>
        <span>체크인 날짜를 선택하세요.</span>
      </div>
    </div>
    <div class="month margin50">
      <div @click="month > 0 ? month-- : (month = 11, year--, getRestDate)"> < </div>
      <div> {{ year }} 년  {{ month + 1 }} 월 </div>
      <div @click="month < 11 ? month++ : (month = 0, year++, getRestDate)"> > </div>
    </div>
    <div class="calendar">
      <div class="weekday">
        <span class="day" v-for="day in day">{{ day }}</span>
      </div>
      <div class="week" v-for="week in setCalendar">
        <span
          @click="selectedDate = date.date; dateRange;"
          class="date"
          :class="startDay ? (date.formedDate === format(startDay) ? 'selected' : date.formedDate === format(endDay) ? 'selected' :
          (date.formedDate > format(startDay) && date.formedDate < format(endDay)) ? 'range' : '') : ''"
          v-for="(date,idx) in week">
          <div :class="date.isHoliday === true ? 'holiday' : ''"> {{date.date}} </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    restDate:{
      default: [],
    }
  },
  data() {
    return {
      day : ['일','월','화','수','목','금','토'],
      today : new Date(),
      year : new Date().getFullYear(),
      month : new Date().getMonth(),
      selectedDate : new Date().getDate(),
      startDay : null,
      endDay : null,
      restCalledYear : [],
    };
  },
  mounted() {
    this.setCalendar;
    this.getRestDate;
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
            dateDay.push({date : '', day : k, formedDate :'', isHoliday :  false})
          } else if(date > lastDate){
            if(k === 0) break;
            dateDay.push({date : '', day : k, formedDate :'', isHoliday : false})
          } else{
            date ++;
            let calenderDate = new Date(this.year, this.month, date)
            dateDay.push({date : date, day : k, formedDate : this.format(calenderDate), isHoliday : this.restDate.includes(this.format(calenderDate)) ? true : k === 0 || k === 6 ? true : false})
          }
        }
        calendarData.push(dateDay);
        dateDay = [];
      }
      return calendarData
    },
    dateRange(){
      if(this.startDay && this.format(this.startDay) < this.format(new Date(this.year, this.month, this.selectedDate)) && this.format(this.startDay) === this.format(this.endDay)){
        this.endDay = new Date(this.year, this.month, this.selectedDate);
      }else {
        this.startDay = new Date(this.year, this.month, this.selectedDate);
        this.endDay = new Date(this.year, this.month, this.selectedDate);
      }
      console.log('startDay > ', this.startDay);
      console.log('endDay > ', this.endDay);
      return 'selected'; // return 필요 없음
    },
    getRestDate(){
      if(!this.restCalledYear.includes(this.year)){
        this.restCalledYear.push(this.year)
        this.$emit('getRestDate',this.year);
      }
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
  .summary{
    display: flex;
    justify-content: center;
    margin: 50px 0 0 0;
    font-weight: bold;
    color: #657a16;
    font-size: 20px;
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

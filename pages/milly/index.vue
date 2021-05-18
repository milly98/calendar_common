<template>
  <div class="container">
    <div class="title"> Milly's calendar</div>
    <div>환영합니다!!</div>
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
        <tr v-for="week in thisMonth">
          <td v-for="(date,idx) in week">{{date}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today : new Date(),
      firstDayOfMonth : new Date(),
      endDayOfMonth : new Date(),
      thisMonth :[
      ],
    };
  },
  // range date picker 사용하기
  // 참고 - MVP > common > calendar
  // New Date 오늘날짜 가져오고
  // setdate(1) 이번달의 첫날을 가져옴
  // setmonth(+1) setdate(-1) 이번달의 마지막날을 가져옴
  // getday() 일요일이 0으로 되어있으며 이번달의 첫날의 요일을 가져오면 그 앞은 공백으로 하여 차례대로 채워나가면 됨.
  mounted() {

    // 첫 날의 요일을 받아와서 그 전은 공백으로 첫주의 일을 채우기
    // 마지막 날까지 반복문으로 주를 일로 채우기
    // 필요한거 첫 날의 요일, 마지막 날의 일 (28/30/31)
    // 반복문을....
    // 일의 배열을 만드는데, 무조건 일요일 부터 시작하도록 만들기
    // ex) 0,0,0,1,2,3,4,5,6,7,8,...
    // 그리고 이 배열을 7씩 나눠서 주에 채우기 앞에서부터 7개씩 빼서 넣기

    const todayDate = new Date();
    todayDate.setDate(1);
    const firstDayOfMonth = todayDate.getDay();
    todayDate.setMonth(+1);
    todayDate.setDate(-1);
    const lastDate = todayDate.getDate();
    let dateDay = [];
    let date = 0;
    for (let i = 0; i < 6; i++){
      for (let k = 0; k < 7; k++){
        if(k < firstDayOfMonth && date === 0){
          // dateDay.push({date : '', day : k})
          dateDay.push('')
        } else if(date > lastDate){
          break;
        } else{
          date ++;
          // dateDay.push({date : date, day : k})
          dateDay.push(date)
        }
      }
      this.thisMonth.push(dateDay);
      dateDay = [];
    }
    console.log("this.thisMonth >>>> ", this.thisMonth);


    //
    // const todayDay = new Date().getDay(); // 오늘 요일
    //
    // this.today.setMonth(+1);
    // this.today.setDate(-1);
    // const lastDate = this.today.getDate();
    // let arrDate = [];
    // for(let k = 1; k < 5; k++){
    //   for(let i = 0; i < lastDate; i ++){
    //
    //   }
    // }

    // const week = [];
    // const date = [,,,1,2,3,4];
    // week.push( date);
    //
    // this.thisMonth.push(week);
    // this.thisMonth.push(week);
    // console.log('this.thisMonth', this.thisMonth);
    //
    //
    // this.firstDayOfMonth = this.today.setDate(1);
    // this.endDayOfMonth = this.today.setMonth(this.today.getMonth() + 1);
    // this.endDayOfMonth = this.today.setDate(-1);
    // console.log('today >> ',this.today, '  /  ', this.today.getMonth(), '월 ', this.today.getDate(), '일');
    // console.log('today.setDate(1) >> ', this.today.setDate(1), '  /  ', this.today.getMonth(), '월 ', this.today.getDate(), '일');
    // // console.log('today.setMonth(1) >> ',this.today.setMonth(1), '  /  ', this.today.getMonth(), '월 ', this.today.getDate(), '일');
    // console.log('today.setMonth(1,-1) >> ',this.today.setMonth(this.today.getMonth() + 1), '  /  ', this.today.getMonth(), '월 ', this.today.getDate(), '일');
    // console.log('today.setMonth(1,-1) >> ',this.endDayOfMonth = this.today.setDate(-1), '  /  ', this.today.getMonth(), '월 ', this.today.getDate(), '일');
    // console.log();
    // console.log('this.firstDayOfMonth', this.today.getMonth());
    // console.log('this.endDayOfMonth', this.endDayOfMonth);
  },
}
</script>

<style lang="scss">
.container {
}
</style>

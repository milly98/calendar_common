<template>
  <div class="container">
    <div class="title"> Milly's calendar</div>
    <div>환영합니다!!</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  // range date picker 사용하기
  // 참고 - MVP > common > calendar
  // New Date 오늘날짜 가져오고
  // setdate(1) 이번달의 첫날을 가져옴
  // setmonth(+1) setdate(-1) 이번달의 마지막날을 가져옴
  // getday() 일요일이 0으로 되어있으며 이번달의 첫날의 요일을 가져오면 그 앞은 공백으로 하여 차례대로 채워나가면 됨.
  mounted() {
    let today = new Date(2021, 5, 6);
    console.log('today >> ',today);
    console.log('today.setDate(1) >> ',today.setDate(1));
    console.log('today.setMonth(1) >> ',today.setMonth(1));
    console.log('today.setMonth(1,-1) >> ',today.setMonth(1,-1));
  },
}
</script>

<style lang="scss">
.container {
}
</style>

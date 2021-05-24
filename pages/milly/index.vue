<template>
  <div class="container">
    <calendar/>
  </div>
</template>

<script>
import Calendar from "../../components/Milly/Calendar";
import axios from 'axios';

export default {
  components: {Calendar},
  data() {
    return {
    };
  },
  mounted() {
    console.log('mounted')
    this.getRestDate('2021','05');

  },
  methods:{
    getRestDate(year, date){
      // this.$axios.get(`/api/getRestDeInfo?serviceKey=b%2Bs0OmI7q0%2B5rtcOg9cPQ8NlFZ0eWbdVKEJdA1riLNYJ3M7y%2Brmyxe5jHfCWC8NR4CzemZvBZ%2B2EALje81R85A%3D%3D&solYear=${year}&solMonth=${date}`).then((resp) => {
      //   console.log('resp >> ', resp);
      // });

      this.$apis.getRestDeInfo({
        year: year,
        date: date,
      }).then((resp) => {
        console.log('resp resp resp  >>  ', resp)
      });
    }
  },
}
</script>

<style lang="scss">
.container {
}
</style>

<template>
  <div class="container">
    <calendar
      :restDate="restDateList"
      @getRestDate="getRestDate"
    ></calendar>
  </div>
</template>

<script>
import Calendar from "../../components/Milly/Calendar";
import axios from 'axios';

export default {
  components: {Calendar},
  data() {
    return {
      restDateList:[],
    };
  },
  methods:{
    getRestDate(year){
      console.log('getRestDate 진입  year :', year)
      this.$apis.getRestDeInfo({
        year: year,
        date: '',
      }).then((resp) => {
        console.log('getRestDate resp  >>  ', resp)
        resp.data.items.item.forEach((v)=>{
          this.restDateList.push(`${v.locdate}`);
        })
      });
      return this.restDateList;
    }
  },
  computed:{
  }
}
</script>

<style lang="scss">
.container {
}
</style>

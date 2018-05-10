<template>
  <v-layout row wrap justify-center>
      <v-flex xs6>
          <date-picker text="开始日期" @cancel="start.date = null" @confirm="(dateStr) => selectStart(dateStr)" :allowedDates="start.allowedDates"></date-picker>
      </v-flex>
      <v-flex xs6>
          <date-picker text="结束日期" @cancel="end.date = null" @confirm="(dateStr) => selectEnd(dateStr)" :allowedDates="end.allowedDates"></date-picker>
      </v-flex>
  </v-layout>
</template>

<script lang='js'>
import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator'
import {dateRange, getDate} from '@/utils/time'
import DatePicker from './DatePicker'
@Component({
  components: {
    DatePicker
  }
})
export default class DateRange extends Vue {
    @Prop()
    initStart
    @Prop()
    initEnd
    startDate=null
    endDate=null
    start= {
      date: this.initStart || null,
      allowedDates: dateRange()
    }
    end= {
      date: this.initEnd || null,
      allowedDates: dateRange()
    }
    @Watch('start.date')
    watchStartDate (val) {
      this.end.allowedDates = dateRange(getDate(val))
    }
    @Watch('end.date')
    watchEndDate (val) {
      this.start.allowedDates = dateRange(null, getDate(val))
    }
    @Emit('change:startdate')
    selectStart (dateStr) {
      this.start.date = new Date(new Date(dateStr).getTime() + 1)
    }
    @Emit('change:enddate')
    selectEnd (dateStr) {
      this.end.date = new Date(new Date(dateStr).getTime() + 24 * 3600 * 1000 - 1)
    }
}
</script>

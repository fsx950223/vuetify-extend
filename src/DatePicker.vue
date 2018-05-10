<template>
    <v-menu
      ref="menu"
      lazy
      :close-on-content-click="false"
      v-model="show"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-right="40"
      min-width="290"
      :return-value.sync="picker"
    >
      <v-text-field slot="activator" :required="required" :label="text" v-model="picker" prepend-icon="event" readonly :rules="required?rules:[]"></v-text-field>
      <v-date-picker
        :first-day-of-week="0"
        :allowed-dates="allowedDates"
        locale="zh-cn"
        v-model="picker" 
        scrollable>
        <v-spacer></v-spacer>
        <v-btn flat primary color="warning" @click="cancel">取消</v-btn>
        <v-btn flat primary color="primary" :disabled="!picker" @click="confirm(picker)">确认</v-btn>
      </v-date-picker>
    </v-menu>
</template>

<script lang='js'>
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'
@Component()
export default class DatePicker extends Vue {
  @Prop({type: String, default: '标题'})
  text
  @Prop([Function])
  allowedDates
  @Prop({type: Boolean, default: false})
  required
  rules=[ v => !!v || '请选则日期' ]
  show=false
  picker= null
  @Emit('confirm')
  confirm (picker) {
    this.$refs.menu.save(picker)
    this.show = false
  }
  @Emit('cancel')
  cancel () {
    this.picker = null
    this.show = false
  }
}
</script>

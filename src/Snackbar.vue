<template>
  <v-snackbar
    v-model="value"
    :color="color"
    bottom
    right
    :timeout="timeout">
    {{ text }}
  </v-snackbar>
</template>

<script lang="js">
import {Vue, Component, Prop} from 'vue-property-decorator'
@Component()
export default class Snackbar extends Vue {
  @Prop({type: Boolean, default: false})
  value
  @Prop({type: String, default: ''})
  color
  @Prop({type: Number, default: 2000})
  timeout
  @Prop({type: String, default: '这是一条通知'})
  text
}
</script>

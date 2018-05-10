<template>
  <v-jumbotron dark height="200px" gradient="to top right, rgba(63,81,181, .5), rgba(25,32,72, .5)" @click.native="$refs.file.click()" :src="bgimg">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <slot><h3 class="display-5" v-show="!bgimg"><v-icon>file_upload</v-icon>选择上传图片</h3></slot>
          <slot name="reset"><h3 class="display-5" v-show="bgimg" @click="removeImg"><v-icon>settings_backup_restore</v-icon></h3></slot>
          <input ref="file" @change="fileSelected" type="file" style="display:none"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script lang="js">
import {Vue, Component} from 'vue-property-decorator'
@Component()
export default class VUpload extends Vue {
    bgimg=''
    fileSelected () {
      this.bgimg = window.URL.createObjectURL(event.target.files[0])
      this.$emit('change')
    }
    removeImg () {
      event.stopPropagation()
      this.$refs.file.value = ''
      this.bgimg = ''
      this.$emit('change')
    }
}
</script>
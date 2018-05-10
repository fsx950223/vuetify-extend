<template>
  <v-list dense>
    <template v-for="(items,key) in this.data" >
      <v-subheader :key="key" class="mt-3 grey--text text--darken-1">{{ items.name }}</v-subheader>
      <v-list-tile v-for="item of items.list" :key="item.text" :router="true" :to="{name: item.href, query: item.query}">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script lang='js'>
import {Vue, Component, Prop} from 'vue-property-decorator'
@Component()
export default class Sidebar extends Vue {
  @Prop({
    default: {},
    type: Object
  })
  data
}
</script>

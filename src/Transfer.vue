<template>
    <v-layout row justify-space-around align-center>
      <v-flex xs5 >
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                    append-icon="search"
                    label="搜索"
                    single-line
                    hide-details
                    v-model="list1.__search"
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="list1.headers"
                :items="list1.data"
                :search="list1.__search"
                v-model="list1.__selected"
                item-key="key"
                select-all
            >
                <template slot="items" slot-scope="props">
                    <td>
                        <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                        ></v-checkbox>
                    </td>
                    <slot name="left" :item="props.item"></slot>
                </template>
            </v-data-table>
        </v-card>
    </v-flex>
    <v-layout column justify-space-around align-center xs1>
        <v-btn fab dark small color="indigo" @click="transfer(list1,list2)">
        <v-icon dark>keyboard_arrow_right</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo" @click="transfer(list2,list1)">
        <v-icon dark>keyboard_arrow_left</v-icon>
        </v-btn>
    </v-layout>
    <v-flex xs5>
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                    append-icon="search"
                    label="搜索"
                    single-line
                    hide-details
                    v-model="list2.__search"
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="list2.headers"
                :items="list2.data"
                :search="list2.__search"
                v-model="list2.__selected"
                item-key="key"
                select-all
            >
                <template slot="items" slot-scope="props">
                    <td>
                        <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                        ></v-checkbox>
                    </td>
                    <slot name="right" :item="props.item"></slot>
                </template>
            </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
</template>
<script lang="js">
import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator'
@Component()
export default class Transfer extends Vue {
    @Prop({ default: () => ({name: '', data: [], headers: []}) })
    list1
    @Prop({ default: () => ({name: '', data: [], headers: []}) })
    list2
    created () {
      this.$set(this.list1, '__selected', [])
      this.$set(this.list2, '__selected', [])
      this.$set(this.list1, '__search', '')
      this.$set(this.list2, '__search', '')
    }
    @Watch('list1.data')
    @Watch('list2.data')
    setCheckValue (val) {
      if (!('value' in val[0]) && val.length > 0) {
        val.map(item => this.$set(item, 'value', false))
      }
    }

    @Emit('change')
    transfer (list1, list2) {
      if (list1.data.length === 0) {
        this.$snackbar.show('error', '列表为空')
        return
      }
      if (list1.__selected.length === 0) {
        this.$snackbar.show('warning', '请至少选择一个插件')
        return
      }
      if (list1 === this.list1) {
        list2.data.push(...list1.__selected)
        list2.data = [...new Set(list2.data)]
      } else if (list1 === this.list2) {
        list1.data = list1.data.filter(item => !list1.__selected.includes(item))
      }
      list1.__selected = []
    }
}
</script>

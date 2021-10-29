<template>
  <div>{{result}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import juice from 'juice'

export default defineComponent({
  name: 'App',
  setup() {
    const result = juice('<style>div{color:red;}</style><div>Hello World</div>')
    return { result }
  },
})
</script>
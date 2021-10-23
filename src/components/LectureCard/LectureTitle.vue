<template>
  <h1 class="px-5 font-bold text-2xl text-left">{{ title }}</h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Meno prednášky'
    }
  }
}
</script>

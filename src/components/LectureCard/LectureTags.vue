<template>
  <div class="flex flex-row mt-2 px-5 flex-wrap justify-start ">
    <p
      v-for="tag in tagNames"
      :key="tag"
      class="py-1 px-3 rounded-full text-white font-bold mr-2 bg-gray-800 mt-1"
    >
      {{ tag }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    tagNames: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped></style>

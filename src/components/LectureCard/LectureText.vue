<template>
  <p class="text-justify mt-7 px-5">
    {{ lectureText }}
  </p>
</template>

<script>
export default {
  props: {
    lectureText: {
      type: String
    }
  }
}
</script>

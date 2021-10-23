<template>
  <div class="w-full grid auto-rows-auto gap-x-0 grid-cols-1 lg:grid-cols-3">
    <LectureCard
      :title="'Meno prednášky 1'"
      :alreadyTakenSeats="randomSeats()"
      :tagNames="['21.10', '14:00', 'Bratislava']"
      :text="lectureTexts[0].text"
    />

    <LectureCard
      :title="'Meno prednášky 2'"
      :alreadyTakenSeats="randomSeats()"
      :tagNames="['22.10', '12:00', 'Žilina']"
      :text="lectureTexts[0].text"
    />

    <LectureCard
      :title="'Meno prednášky 3'"
      :alreadyTakenSeats="randomSeats()"
      :tagNames="['23.10', '10:00', 'Bratislava']"
      :text="lectureTexts[0].text"
    />

    <LectureCard
      :title="'Meno prednášky 4'"
      :alreadyTakenSeats="randomSeats()"
      :tagNames="['29.10', '09:00', 'Bratislava', 'Zdravie']"
      :text="lectureTexts[0].text"
    />

    <LectureCard
      :title="'Meno prednášky 5'"
      :alreadyTakenSeats="randomSeats()"
      :tagNames="['29.10', '09:00', 'Bratislava']"
      :text="lectureTexts[0].text"
    />

    <LectureCard
      :title="'Meno prednášky 6'"
      :alreadyTakenSeats="randomSeats()"
      :tagNames="['29.10', '09:00', 'Bratislava']"
      :text="lectureTexts[0].text"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import LectureCard from '@/components/LectureCard.vue'

export default {
  name: 'Home',
  components: { LectureCard },
  methods: {
    randomSeats() {
      var arr = []
      while (arr.length < 6) {
        var r = Math.floor(Math.random() * 50) + 1
        if (arr.indexOf(r) === -1) arr.push(r)
      }
      return arr
    }
  },
  data() {
    return {
      lectureTexts: [
        {
          id: 0,
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque tempor posuere. Duis iaculis sagittis pellentesque. Praesent ornare sem quis nulla vestibulum pharetra. Proin interdum faucibus volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum porta tempor dictum.'
        },

        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
        }
      ]
    }
  }
}
</script>

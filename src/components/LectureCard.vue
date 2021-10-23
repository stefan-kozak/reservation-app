<template>
  <div
    class="w-10/12 place-self-center flex flex-col m-5 bg-white rounded-2xl drop-shadow-2xl filter pb-5"
  >
    <LectureImage />

    <div class="w-full flex flex-col mt-5 justify-between ">
      <LectureTitle :title="title" />
      <LectureTags :tagNames="tagNames" />
    </div>

    <LectureText :lectureText="text" />

    <LectureLecturer />

    <LectureOrganizers />

    <ReservationButton @click="reservationButtonHandle" />
  </div>

  <ReservationForm
    v-if="reservationActive"
    @clear-seats="this.selectedSeats = []"
    @confirm-new-seats="confirmSeats()"
    @update-seats="chooseSeats($event)"
    @selecting-same-seat="deselectSeat($event)"
    @cancelReservationForm="reservationActive = false"
    :seatRowsCount="this.seatRowsCount"
    :seatColumnsCount="this.seatColumnsCount"
    :selectedSeats="this.selectedSeats"
    :takenSeats="this.takenSeats"
  />
  <div
    @click="reservationActive = false"
    v-if="reservationActive"
    class="background-blur"
  ></div>
</template>

<script>
import ReservationButton from '@/components/ReservationButton.vue'
import ReservationForm from '@/components/ReservationForm.vue'
import LectureImage from '@/components/LectureCard/LectureImage.vue'
import LectureTitle from '@/components/LectureCard/LectureTitle.vue'
import LectureTags from '@/components/LectureCard/LectureTags.vue'
import LectureText from '@/components/LectureCard/LectureText.vue'
import LectureOrganizers from '@/components/LectureCard/LectureOrganizers.vue'
import LectureLecturer from '@/components/LectureCard/LectureLecturer.vue'

export default {
  components: {
    ReservationButton,
    ReservationForm,
    LectureImage,
    LectureTitle,
    LectureTags,
    LectureText,
    LectureOrganizers,
    LectureLecturer
  },
  props: {
    title: {
      type: String
    },
    alreadyTakenSeats: {
      type: Array
    },
    tagNames: {
      type: Array
    },
    text: {
      type: String
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.takenSeats = this.takenSeats.concat(this.alreadyTakenSeats)
    })
  },
  data() {
    return {
      reservationActive: false,

      seatRowsCount: 5,
      seatColumnsCount: 5,

      selectedSeats: [],
      takenSeats: []
    }
  },
  methods: {
    chooseSeats(seat) {
      if (this.selectedSeats.length >= 2) {
        this.selectedSeats.shift()
      }

      this.selectedSeats.push(seat)
    },

    reservationButtonHandle() {
      this.reservationActive = true
      this.selectedSeats = []
    },

    confirmSeats() {
      this.takenSeats = this.takenSeats.concat(this.selectedSeats)
      this.selectedSeats = []
    },

    deselectSeat(seat) {
      this.selectedSeats = seat
    }
  }
}
</script>

<style lang="scss" scoped>
.background-blur {
  display: flex;
  position: fixed;
  height: 100vh;
  width: 100%;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  top: 0;
  left: 0;
  z-index: 2;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>

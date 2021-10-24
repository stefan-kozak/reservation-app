<template>
  <div
    class="lg:fixed absolute pb-5 flex z-20 flex-col lg:flex-row items-between justify-center lg:justify-evenly left-5 lg:left-80 lg:top-20 my-0 top-1 mx-auto w-11/12 lg:w-8/12 form-black h-max custom-form "
  >
    <div
      tag="form"
      class="flex flex-col lg:w-2/6 w-full justify-center lg:justify-start lg:mt-0"
    >
      <p class="text-white  font-bold lg:py-5 pt-1 pb-2 text-left mt-0 lg:mt-7">
        Meno a priezvisko:
      </p>
      <input
        type="text"
        class=" text-xl lg:p-2 p-1 px-3 outline-none rounded-lg"
        placeholder="Meno a priezvisko"
        v-model="reservationName"
        @keydown.enter="submitReservationForm()"
        ref="formName"
      />
      <p class="text-white font-bold py-5 pb-2 text-left mt-0 lg:mt-5">
        Email:
      </p>
      <input
        type="text"
        class=" text-xl lg:p-2 p-1 px-3 outline-none rounded-lg"
        placeholder="Email"
        v-model="reservationEmail"
        @keydown.enter="submitReservationForm()"
      />
      <p class="text-white font-bold py-5 pb-2 text-left mt-0 lg:mt-5">
        Telefón:
      </p>
      <input
        type="text"
        class=" text-xl lg:p-2 p-1 px-3 outline-none rounded-lg"
        placeholder="Telefón"
        v-model="reservationPhone"
        @keydown.enter="submitReservationForm()"
      />

      <p class="text-gray-300 self-start lg:mt-auto mt-4 mb-4">
        <i>*Maximálny výber miest na sedenie: 2</i>
      </p>
    </div>

    <div class="flex flex-col w-full lg:w-2/6 ">
      <div
        class="h-11 w-full font-bold uppercase border-4 border-white text-white bg-transparent mt-3 lg:mt-20 flex items-center justify-center"
      >
        <p>Plátno</p>
      </div>

      <div
        class="grid items-center gap-x-1 lg:gap-x-5 gap-y-1 lg:gap-5 justify-items-center  lg:pt-10 pt-3 auto-rows-max"
        :class="'grid-cols-' + this.seatColumnsCount"
      >
        <p
          v-for="seat in seatColumnsCount * seatRowsCount"
          :key="seat"
          :class="{
            'bg-green-600': this.selectedSeats.includes(seat),
            'bg-red-500': this.takenSeats.includes(seat)
          }"
          class="rounded-xl text-white font-bold flex justify-center items-center lg:w-12 lg:h-12 w-8 h-8 border-2 lg:border-4 hover:text-black border-white  hover:bg-gray-300 cursor-pointer"
          @click="chooseSeat(seat)"
        >
          {{ seat }}
        </p>
      </div>
      <div class="flex justify-between flex-row lg:flex-col lg:justify-center">
        <a
          class="text-white lg:mt-10 mt-5 cursor-pointer self-center lg:self-end"
          @click="$emit('clear-seats')"
          >Resetovať</a
        >

        <button
          @click="submitReservationForm()"
          class="bg-white font-bold text-black p-3 px-5 self-center lg:self-end mt-5 lg:mt-20 mb-5"
        >
          Potvrdiť miesta
        </button>
      </div>

      <CancelButton
        class="text-red-500 cursor-pointer absolute top-3 right-5  lg:-top-10  lg:-right-12 font-bold text-3xl"
        @click="$emit('cancelReservationForm')"
      />
    </div>
  </div>

  <div
    class="flex flex-col fixed z-30 bottom-3  lg:bottom-0 right-0 lg:w-3/12 w-full   text-xs lg:text-lg"
  >
    <ul
      class="success relative lg:m-5 m-0 lg:p-5 lg:px-10 rounded-2xl p-3 w-11/12 self-center"
      v-if="success.length"
    >
      <CancelButton
        class="text-white cursor-pointer absolute top-2 right-5 lg:top-13 lg:right-3 z-20 font-bold text-3xl"
        @click="this.success = []"
      />

      <b>Rezervácia sa úspešne vykonala:</b>

      <li
        class="py-0.5 lg:p-0"
        v-for="successItem in success"
        :key="successItem"
      >
        {{ successItem }}
      </li>
    </ul>

    <ul
      class="relative errors lg:m-5 m-0 lg:p-5 lg:px-10 lg:mt-0 rounded-2xl p-3 w-11/12 self-center"
      v-if="errors.length"
    >
      <CancelButton
        class="text-white cursor-pointer absolute right-5 top-2 lg:top-13 lg:right-3 z-20 font-bold lg:text-3xl"
        @click="this.errors = []"
      />

      <b>Rezerváciu sa nepodarilo vykonať:</b>

      <li class="py-0.5 lg:p-0" v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import CancelButton from '@/components/ReservationForm/CancelButton.vue'

export default {
  emits: [
    'cancelReservationForm',
    'update-seats',
    'confirm-new-seats',
    'clear-seats',
    'selecting-same-seat'
  ],
  props: {
    seatColumnsCount: {
      type: Number,
      default: 5
    },
    seatRowsCount: {
      type: Number,
      default: 5
    },
    selectedSeats: {
      type: Array
    },
    takenSeats: {
      type: Array
    }
  },

  components: {
    CancelButton
  },

  mounted() {
    this.$nextTick(function() {
      this.$refs.formName.focus()
    })
  },

  data() {
    return {
      reservationName: '',
      reservationEmail: '',
      reservationPhone: '',

      errors: [],
      success: []
    }
  },

  methods: {
    // CHOOSE SEATS: MAX (2)
    chooseSeat(seat) {
      if (this.selectedSeats.includes(seat)) {
        this.$emit(
          'selecting-same-seat',
          this.selectedSeats.filter(item => item != seat)
        )
        return
      }

      if (this.takenSeats.includes(seat)) {
        return
      }

      // EMIT SEATS
      this.$emit('update-seats', seat)
    },

    submitReservationForm() {
      // RESET ERRORS
      this.errors = []

      // FORM VALIDATION
      if (!this.reservationName) {
        this.errors.push('Meno a priezvisko je povinná položka')
      }

      if (!this.reservationEmail) {
        this.errors.push('Email je povinná položka')
      }

      if (!this.reservationPhone) {
        this.errors.push('Telefón je povinná položka')
      }

      if (this.selectedSeats.length === 0) {
        this.errors.push('Miesto na sedenie je povinná položka')
      }

      // IF VALIDATION OK
      if (
        this.reservationName &&
        this.reservationEmail &&
        this.reservationPhone &&
        this.selectedSeats.length >= 1
      ) {
        // EMIT NEW SEATS
        this.$emit('confirm-new-seats')

        // RESET INPUTS
        this.reservationName = ''
        this.reservationEmail = ''
        this.reservationPhone = ''
        // RESET REPORTS
        this.errors = []
        this.success.push('Vaše miesta sa úspešne zaregistrovali.')
        this.success.push('Dalšie informácie dostanete na Váš email.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-black {
  background-color: #131313;
}

.custom-form {
  background-color: #121212;
  border-radius: 1rem;
  padding: 1rem;
}

.success {
  background: rgba(26, 189, 26, 0.8);
  color: #fff;
  z-index: 5;
  text-align: left;
}

.errors {
  background: rgba(200, 35, 51, 0.8);
  color: #fff;
  z-index: 5;
  text-align: left;
}
</style>

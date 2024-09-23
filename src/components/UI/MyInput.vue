<template>
  <div class="myInput">
    <input :class="isValid ? 'myInput__input' : 'myInput__input myInput__input--wrong'" :type="myType"
      :placeholder="myPlaceholder" v-model="inputValue" @input="change" />
    <p class="myInput__text" v-if="!isValid && inputValue !== ''">{{ message }}</p>
    <p class="myInput__text" v-if="!isValid && inputValue == ''">This field is mandatory</p>
  </div>
</template>

<script setup>
const emit = defineEmits(['input']);
const inputValue = defineModel('value');

const props = defineProps({
  isValid: {
    default: true
  },
  message: String,
  myPlaceholder: String,
  myType: String
})

const change = (event) => {
  emit('input', event.target.value);
}
</script>

<style lang="scss" scoped>
.myInput {
  width: 100%;
  max-width: 260px;
  display: flex;
  flex-flow: column;
  position: relative;

  &__input {
    width: 100%;
    background: $sub-gb-color;
    color: $main-text-color;
    border: 2px solid $accent-color;
    outline: none;
    border-radius: 5px;
    height: 40px;
    padding: 0 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    transition-property: background, color, scale;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &:hover,
    &:focus {
      scale: 1.1;
    }

    &--wrong {
      border: none;
      outline: 1px solid rgb(163, 18, 18);
    }

  }

  &__text {
    color: rgb(163, 18, 18);
    font-size: 13px;
    position: relative;
    top: 10px;
    left: 0;
  }
}
</style>
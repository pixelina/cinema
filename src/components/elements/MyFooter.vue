<template>
    <footer class="myFooter">
        <MyContainer class="myFooter__container">
            <span class="myFooter__info">Polina Mysiura</span>
        </MyContainer>
    </footer>
  </template>
  
  <script setup>
  import MyContainer from '@/components/UI/MyContainer'
  </script>
  
  <style lang="scss" scoped>
  .myFooter {
    background: $main-bg-color;

    &__container {
      border-top: 2px solid $accent-color;
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      
    }
  
    &__info {
      font-weight: bold;
      transition-property: color;
      transition-duration: 250ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      text-align: center;
  
      &:hover {
        color: $accent-color;
      }
    }
  }
  </style>
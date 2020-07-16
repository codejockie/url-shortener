<template>
  <div class="text">
    404
  </div>
</template>

<style lang="scss" scoped>
@mixin centered {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.text {
  @include centered;
  color: #002553;
  font-family: "Concert One", cursive;
  font-size: 16rem;
  height: 100vh;
  margin-top: 70px;
  text-align: center;
  width: 100%;
}

@media screen and (min-width: 1000px) {
  .text {
    font-size: 30rem;
  }
}
</style>

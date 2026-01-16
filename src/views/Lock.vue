<template>
  <div class="lock-back">
    <template v-if="notMobile">
      <div class="lock"></div>
      <div class="slot">
        <img
          src="../assets/lock_2.webp"
          alt="text"
          class="noSelect"
          @dragstart.prevent
        />
        <img
          src="../assets/lock_3.webp"
          alt="text"
          class="noSelect"
          @dragstart.prevent
        />
      </div>
    </template>
    <template v-else>
      <div class="mobile-lock">
        <img
          src="../assets/mobile/lock.webp"
          alt="text"
          class="noSelect"
          @dragstart.prevent
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["notMobile"],
};
</script>

<style scoped>
.lock-back {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99997;
  background-color: white;
}
.lock {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99998;
  background-image: url("../assets/background_2.webp");
  background-size: 100% 100%;
  opacity: 0.3;
  background-color: white;
}
.slot {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 226px;
  background-color: #cf1b26;
  display: flex;
  flex-wrap: wrap;
  z-index: 99999;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
}
.slot img {
  display: block;
  width: 1187px;
}
.mobile-lock {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99998;
  background-color: #d36a64;
  overflow: hidden;
}
.mobile-lock img {
  width: 100%;
  z-index: 99999;
}
</style>
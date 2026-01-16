<template>
  <div id="app">
    <MainHeader :notMobile="notMobile" />
    <router-view :notMobile="notMobile"></router-view>
    <div
      class="back_top"
      v-if="!notMobile"
      v-show="showBtn"
      @click="backTop"
      :style="
        $route.params.category_id && !$route.params.id
          ? 'background-color:' +
            colorType[$route.params.category_id].color +
            ';box-shadow:' +
            colorType[$route.params.category_id].shadow
          : ''
      "
    >
      <img src="./assets/mobile/arrow_up.svg" />
    </div>
    <MainFooter :notMobile="notMobile" />
  </div>
</template>
<script>
import MainHeader from "./components/MainHeader.vue";
import MainFooter from "./components/MainFooter.vue";
if (window) {
  const { aplus_queue } = window;
  aplus_queue.push({
    action: "aplus.sendPV",
    arguments: [
      {
        is_auto: false,
      },
    ],
  });
}
export default {
  components: {
    MainHeader,
    MainFooter,
  },
  data() {
    return {
      showBtn: false,
      notMobile: document.body.clientWidth > 620,
      colorType: {
        50: {
          color: "#F1C38A",
          shadow: "0px 2px 8px rgba(80, 52, 17, 0.12)",
        },
        53: {
          color: "#3A6E9A",
          shadow: "0px 2px 8px rgba(11, 49, 82, 0.2)",
        },
        52: {
          color: "#68AFD4",
          shadow: "0px 2px 8px rgba(24, 64, 86, 0.2)",
        },
        48: {
          color: "#669E81",
          shadow: "0px 2px 8px rgba(7, 53, 29, 0.2)",
        },
        49: {
          color: "#DE9A6A",
          shadow: "0px 2px 8px rgba(107, 71, 45, 0.2)",
        },
        51: {
          color: "#DC4F1F",
          shadow: "0px 2px 8px rgba(92, 32, 12, 0.2)",
        },
      },
    };
  },
  methods: {
    backTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  created() {
    console.log(
      "%cIf you find bugs in the website, you can submit an issue at %chttps://github.com/pamaforce/TJU_idesign_marseum/issues %cand let's make it better together! :)",
      "color: #43bb88;font-size:19px;font-weight: bold;",
      "color: #4267fc;font-size:19px;font-weight: bold;font-style: italic;",
      "color: #43bb88;font-size:19px;font-weight: bold;"
    );
    window.addEventListener(
      "scroll",
      () => {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop > 700) {
          this.showBtn = true;
        } else {
          this.showBtn = false;
        }
      },
      true
    );
    window.addEventListener("resize", () => {
      this.notMobile = document.body.clientWidth > 620;
    });
  },
};
</script>

<style scope>
.back_top {
  position: fixed;
  right: 20px;
  bottom: 170px;
  width: 48px;
  height: 48px;
  border: 4px solid white;
  border-radius: 50% 50%;
  background-color: #d3625c;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 8px rgba(121, 14, 20, 0.2);
  z-index: 150;
}
.back_top img {
  width: 28px;
  height: 28px;
}
</style>

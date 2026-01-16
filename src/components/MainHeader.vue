<template>
  <div class="header-outer">
    <div class="header noSelect">
      <template v-if="notMobile">
        <img
          src="../assets/logo.webp"
          class="logo"
          alt="logo"
          @dragstart.prevent
          @click="toHome"
        />
        <p class="title_CN" @click="toHome">
          2022·天津大学第八届设计年展·火星博物馆
        </p>
        <div class="headerBottom">
          <p class="title_EN" @click="toHome">
            THE 8TH ANNUAL DESIGN EXHIBITION OF TIANJIN UNIVERSITY · MARSEUM
          </p>
          <div class="tabs">
            <span
              class="tab"
              @mouseover="
                tabHover_1 = true;
                statue = 1;
              "
              :style="$i18n.locale === 'en' ? 'font-weight:600' : ''"
              @mouseleave="tabHoverOver_1"
              >{{ $t("title_1") }}</span
            >

            <span
              class="tab"
              @click="toSponsor"
              :style="$i18n.locale === 'en' ? 'font-weight:600' : ''"
              >{{ $t("title_2") }}</span
            >
            <span
              class="tab"
              @click="toGraduate"
              :style="$i18n.locale === 'en' ? 'font-weight:600' : ''"
              >{{ $t("title_3") }}</span
            >
          </div>
          <span class="lang" @click="changeLang"
            >{{ $i18n.locale === "cn" ? "EN" : "中" }}
            <img
              class="icon-search"
              :src="
                hover
                  ? require('../assets/search-hover.webp')
                  : require('../assets/search.webp')
              "
              @dragstart.prevent
              @mouseover="hover = true"
              @mouseleave="hoverOver"
              alt="icon"
          /></span>
          <transition name="subHeighten" appear>
            <img
              src="../assets/polygon.svg"
              :class="'capsule capsule-' + statue"
              @mouseover="tabHover_4 = true"
              @mouseleave="tabHoverOver_4"
              v-if="
                tabHover || tabHover_1 || tabHover_2 || tabHover_3 || tabHover_4
              "
            />
          </transition>
        </div>
        <transition name="heighten" appear>
          <div
            class="tab-items"
            :style="hideTemp ? 'display:none' : ''"
            v-if="
              tabHover || tabHover_1 || tabHover_2 || tabHover_3 || tabHover_4
            "
            @mouseover="hideTemp ? (tabHover = false) : (tabHover = true)"
            @mouseleave="tabHoverOver"
          >
            <div></div>
            <div class="item_content">
              <p class="item_type_1">{{ $t("ID") }}</p>
              <p class="item_type_2" @click="toExhibition(50)">
                {{ $t("item_1") }}
              </p>
              <p class="item_type_2" @click="toExhibition(53)">
                {{ $t("item_2") }}
              </p>
              <p class="item_type_2" @click="toExhibition(48)">
                {{ $t("item_3") }}
              </p>
              <p class="item_type_2" @click="toExhibition(52)">
                {{ $t("item_4") }}
              </p>
              <p class="item_type_2" @click="toExhibition(49)">
                {{ $t("item_5") }}
              </p>
              <p class="item_type_2" @click="toExhibition(51)">
                {{ $t("item_6") }}
              </p>
              <p class="item_type_1 cursor" @click="toAni">{{ $t("AC") }}</p>
              <p class="item_type_1 cursor">{{ $t("EAD") }}</p>
            </div>
          </div>
        </transition>
        <transition name="widen" appear>
          <div
            class="search-input"
            v-if="hover || subHover || focus"
            @mouseover="subHover = true"
            @mouseleave="subHoverOver"
          >
            <input
              @focus="focus = true"
              @blur="focusOver"
              v-model="searchInput"
              :placeholder="$t('keywords')"
              @keydown.enter="toSearch"
            />
            <img
              src="../assets/search-hover.webp"
              @dragstart.prevent
              @click="toSearch"
              alt="icon"
            />
          </div>
        </transition>
      </template>
      <template v-else>
        <div>
          <img
            src="../assets/mobile/logo.webp"
            class="logo"
            alt="logo"
            v-if="!searchStatue"
            @dragstart.prevent
            @click="toHome"
          />
        </div>
        <div class="icons">
          <transition name="mobile-widen" appear>
            <input
              v-if="searchStatue"
              type="search"
              class="mobile-input"
              v-model="searchInput"
              placeholder="搜索展品关键词……"
              @keydown.enter="toSearch"
              @confirm="toSearch"
            />
          </transition>
          <img
            class="icon-search"
            src="../assets/mobile/lang.webp"
            @dragstart.prevent
            alt="icon"
            @click="changeLang"
            v-if="
              !$route.params.category_id &&
              $route.name !== 'Sponsor' &&
              $route.name !== 'Graduate' &&
              !searchStatue
            "
          />
          <img
            class="icon-search"
            src="../assets/search.webp"
            @dragstart.prevent
            alt="icon"
            @click="changeSearch"
            v-if="
              !$route.params.category_id &&
              $route.name !== 'Sponsor' &&
              $route.name !== 'Graduate'
            "
          />
          <div
            class="back-btn"
            v-if="
              $route.params.category_id ||
              $route.name === 'Sponsor' ||
              $route.name === 'Graduate'
            "
            :style="
              $route.params.category_id && !$route.params.id
                ? 'background-color:' +
                  colorType[$route.params.category_id].color
                : ''
            "
          >
            <img src="../assets/mobile/arrow.svg" alt="arrow" />
            <p @click="goBack">{{ $t("back") }}</p>
          </div>
        </div>
      </template>
    </div>
    <div id="wrapper" v-show="searchStatue" @click="changeSearch"></div>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  props: ["notMobile"],
  data() {
    return {
      tabHover: false,
      tabHover_1: false,
      tabHover_2: false,
      tabHover_3: false,
      tabHover_4: false,
      searchStatue: false,
      hover: false,
      subHover: false,
      focus: false,
      searchInput: "",
      hideTemp: false,
      statue: 1,
      colorType: {
        50: {
          color: "#D7B98C",
        },
        53: {
          color: "#4175A5",
        },
        52: {
          color: "#68AFD4",
        },
        48: {
          color: "#2E895C",
        },
        49: {
          color: "#A7774A",
        },
        51: {
          color: "#971E23",
        },
      },
    };
  },
  methods: {
    changeSearch() {
      if (this.searchStatue) {
        if (this.searchInput) {
          this.toSearch();
        } else {
          document.body.style.height = "";
          document.body.style.overflow = "";
          document.body.style.position = "relative";
          this.searchStatue = false;
        }
      } else {
        if (!this.notMobile) {
          document.body.style.height = "100%";
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          this.searchStatue = true;
        }
      }
    },
    toAni() {
      window.open(
        "https://space.bilibili.com/584556583/channel/collectiondetail?sid=453897",
        "_blank"
      );
    },
    toGraduate() {
      this.$router.push("/graduate");
    },
    toSponsor() {
      this.$router.push("/sponsor");
    },
    toExhibition(category_id) {
      if (
        this.$route.params.category_id !== "" + category_id ||
        this.$route.params.id
      ) {
        this.$router.push("/exhibition/" + category_id);
        this.tabHover = false;
        this.tabHover_1 = false;
        this.tabHover_4 = false;
        this.hideTemp = true;
        setTimeout(() => {
          this.hideTemp = false;
        }, 1000);
      }
    },
    toHome() {
      if (this.$route.path !== "/") this.$router.push("/");
    },
    goBack() {
      if (
        this.$route.params.id &&
        this.$route.params.category_id !== "undefined"
      ) {
        this.$router.push("/exhibition/" + this.$route.params.category_id);
      } else if (
        this.$route.params.category_id &&
        this.$route.params.category_id !== "undefined"
      ) {
        this.$router.push("/");
      } else if (
        this.$route.name === "Sponsor" ||
        this.$route.name === "Graduate"
      ) {
        this.$router.push("/");
      } else {
        this.$router.go(-1);
      }
    },
    hoverOver() {
      setTimeout(() => {
        this.hover = false;
      }, 300);
    },
    subHoverOver() {
      setTimeout(() => {
        this.subHover = false;
      }, 300);
    },
    focusOver() {
      setTimeout(() => {
        this.focus = false;
      }, 300);
    },
    tabHoverOver() {
      setTimeout(() => {
        this.tabHover = false;
      }, 100);
    },
    tabHoverOver_1() {
      setTimeout(() => {
        this.tabHover_1 = false;
      }, 100);
    },
    tabHoverOver_2() {
      setTimeout(() => {
        this.tabHover_2 = false;
      }, 300);
    },
    tabHoverOver_3() {
      setTimeout(() => {
        this.tabHover_3 = false;
      }, 300);
    },
    tabHoverOver_4() {
      setTimeout(() => {
        this.tabHover_4 = false;
      }, 300);
    },
    changeLang() {
      this.$i18n.locale = this.$i18n.locale === "cn" ? "en" : "cn";
      document.title =
        this.$i18n.locale === "cn"
          ? "2022·天津大学第八届设计年展·火星博物馆"
          : "THE 8TH ANNUAL DESIGN EXHIBITION OF TIANJIN UNIVERSITY · MARSEUM";
    },
    toSearch() {
      if (this.searchInput) {
        this.$router.push("/result?keywords=" + this.searchInput);
        this.searchInput = "";
        this.changeSearch();
      }
    },
  },
};
</script>
<style scoped>
.header-outer {
  height: 100px;
  overflow: unset;
}
.header {
  position: relative;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  z-index: 101;
  display: grid;
  grid-template-columns: 110px 1810px;
  grid-template-rows: 1fr 1fr;
  border-bottom: 1px solid #707070;
  background: #fff;
  overflow: unset;
}
.header p,
.header span {
  display: inline-block;
}
.logo {
  grid-row: 1 / 3;
  width: 75px;
  height: 75px;
  justify-self: end;
  align-self: center;
  cursor: pointer;
}
.title_CN {
  align-self: end;
  justify-self: start;
  padding-left: 10px;
  font-size: 24px;
  color: #353535;
  cursor: pointer;
  font-family: "OCRAEXT", "方正兰亭中黑_GBK";
}
.item_content {
  display: flex;
  align-items: center;
}
.headerBottom {
  display: grid;
  justify-items: start;
  align-items: start;
  grid-template-columns: 730px 580px 420px auto;
}
.title_EN {
  font-family: "Microsoft YaHei", 微软雅黑;
  padding-left: 10px;
  font-size: 16px;
  padding-top: 5px;
  cursor: pointer;
  color: #000000;
}
.tabs {
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}
.tab {
  font-size: 20px;
  color: #000000;
  cursor: pointer;
}
.lang {
  font-size: 20px;
  color: #000000;
  justify-self: end;
  align-self: top;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.icon-search {
  width: 18px;
  height: 18px;
  margin-left: 12px;
  cursor: pointer;
  justify-self: left;
  align-self: top;
  z-index: 102;
  vertical-align: middle;
}
.search-input {
  position: absolute;
  right: 25px;
  top: 60px;
  padding-top: 44px;
  padding-right: 20px;
  height: 100px;
  width: 300px;
  overflow-x: hidden;
  overflow-y: visible;
}
.search-input input {
  height: 45px;
  width: 100%;
  border: 1px solid #707070;
  outline: none;
  font-size: 20px;
  padding: 0 15px;
}
.mobile-input {
  width: 300px;
  height: 40px;
  outline: none;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 6px;
  margin-right: 20px;
  padding: 0 15px;
}
.search-input img {
  position: absolute;
  right: 35px;
  height: 18px;
  width: 18px;
  bottom: 25px;
  opacity: 0.5;
  cursor: pointer;
}
.widen-enter {
  width: 0;
}
.widen-enter-active {
  transition: all 0.5s ease-in-out;
}
.widen-enter-active input {
  padding: 0;
}
.widen-enter-to,
.widen-leave-from {
  width: 300px;
}
.widen-leave-active {
  transition: all 1s ease-in-out;
}
.widen-leave-active input {
  padding: 0;
}
.widen-leave-to {
  width: 0;
}
.mobile-widen-enter {
  width: 0;
}
.mobile-widen-enter-active {
  transition: all 0.5s ease-in-out;
}
.mobile-widen-enter-to,
.mobile-widen-leave-from {
  width: 300px;
}
.mobile-widen-leave-to {
  width: 0;
}
.tab-items {
  position: absolute;
  left: 0;
  top: 100px;
  height: 60px;
  width: 1920px;
  background: white;
  border-bottom: 1px solid #707070;
  display: grid;
  overflow-y: hidden;
  grid-template-columns: 860px auto;
}
.heighten-enter {
  height: 0;
}
.heighten-enter-active {
  transition: all 0.5s ease-in-out;
}
.heighten-enter-to,
.heighten-leave-from {
  height: 60px;
}
.heighten-leave-active {
  transition: all 0.7s ease-in-out;
}
.heighten-leave-to {
  height: 0;
}
.capsule {
  position: absolute;
  bottom: -2px;
  width: 20px;
  height: 10px;
  transition: all 0.5s ease;
}

.capsule-1 {
  left: 910px;
}
.capsule-2 {
  left: 1100px;
}
.capsule-3 {
  left: 1300px;
}
.subHeighten-enter {
  height: 0;
}
.subHeighten-enter-active {
  transition: all 0.5s ease-in-out;
}
.subHeighten-enter-to,
.subHeighten-leave-from {
  height: 10px;
}
.subHeighten-leave-active {
  transition: all 1s ease-in-out;
}
.subHeighten-leave-to {
  height: 0;
}
.item_type_1 {
  font-size: 22px;
  font-weight: 700;
  align-self: center;
  justify-self: center;
  min-width: 120px;
  text-align: center;
}
.cursor {
  cursor: pointer;
}
.item_type_2 {
  font-size: 20px;
  font-weight: 400;
  color: #000000;
  align-self: center;
  justify-self: center;
  cursor: pointer;
  white-space: pre-line;
  word-break: break-word;
  text-align: center;
  min-width: 40px;
  margin: 0 10px;
}
.item_type_3 {
  font-size: 22px;
  align-self: center;
  justify-self: center;
  color: #9d9c9c;
}
#wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}
@media screen and (max-width: 620px) {
  .header-outer {
    height: 86px;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    width: 100%;
    height: 86px;
    box-sizing: border-box;
    z-index: 101;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    border-bottom: none;
    overflow: unset;
    box-shadow: 0px 1px 5px rgba(210, 210, 210, 0.2);
  }
  .logo {
    display: block;
    width: 192px;
    height: 86px;
    cursor: pointer;
  }
  .icon-search {
    width: 26px;
    margin: 0;
    height: 26px;
    cursor: pointer;
    z-index: 102;
    margin-left: 14px;
  }
  .icons {
    margin-right: 24px;
  }
  .back-btn {
    height: 30px;
    background-color: #d36a65;
    display: flex;
    align-items: center;
    width: auto;
    padding: 0 12px;
    border-radius: 16px;
  }
  .back-btn img {
    width: 15px;
    height: 15px;
  }
  .back-btn p {
    font-weight: 500;
    font-size: 14px;
    color: white;
  }
}
</style>

<template>
  <div
    :style="
      'overflow: hidden; position: relative;' +
      (notMobile ? 'background-color: #fffeff;' : 'background-color: #f8f8f8;')
    "
  >
    <template v-if="notMobile">
      <div
        class="color-block-1"
        :style="
          'background-color:' + categoryContent[$route.params.category_id].color
        "
      ></div>
      <div
        class="color-block-2"
        :style="
          'background-color:' + categoryContent[$route.params.category_id].color
        "
      ></div>
      <div class="desc">
        <img
          :src="require('../assets/' + $route.params.category_id + '_0.png')"
          alt="icon"
          :key="$route.params.category_id + '_0'"
          class="icon_0 noSelect"
          @dragstart.prevent
        />
        <img
          :src="require('../assets/' + $route.params.category_id + '_1.png')"
          alt="icon"
          :key="$route.params.category_id + '_1'"
          class="icon_00 noSelect"
          @dragstart.prevent
        />
        <div
          class="paragraph"
          :style="
            'color:' + categoryContent[$route.params.category_id].secondColor
          "
        >
          <p>{{ categoryContent[$route.params.category_id].content[0] }}</p>
          <p>{{ categoryContent[$route.params.category_id].content[1] }}</p>
          <p>{{ categoryContent[$route.params.category_id].content[2] }}</p>
          <p>{{ categoryContent[$route.params.category_id].content[3] }}</p>
          <p>{{ categoryContent[$route.params.category_id].content[4] }}</p>
          <p>{{ categoryContent[$route.params.category_id].content[5] }}</p>
        </div>
        <p
          class="title-light noSelect"
          :style="
            'color:' + categoryContent[$route.params.category_id].fourthColor
          "
        >
          {{
            lang === "en"
              ? categoryContent[$route.params.category_id].title_en
              : categoryContent[$route.params.category_id].title
          }}
        </p>
        <p
          class="title-bold"
          :style="
            'color:' + categoryContent[$route.params.category_id].secondColor
          "
        >
          {{
            lang === "en"
              ? categoryContent[$route.params.category_id].title_en
              : categoryContent[$route.params.category_id].title
          }}
        </p>
      </div>
      <div class="content">
        <img
          :src="require('../assets/' + $route.params.category_id + '_4.png')"
          alt="icon"
          class="icon_4 noSelect"
          @dragstart.prevent
        />
        <template v-if="refresh">
          <div
            v-for="(item, i) in cardList"
            :key="i"
            class="works"
            @click="toDetail(item, i)"
            v-scroll-reveal.reset="{ delay: (i % 3) * 100 }"
          >
            <div class="wrapper">
              <img
                :src="item.src"
                alt="cover"
                class="cover noSelect"
                :title="lang === 'en' ? item.post_title_en : item.title"
              />
            </div>
            <p
              class="title"
              :title="lang === 'en' ? item.post_title_en : item.title"
            >
              {{ lang === "en" ? item.post_title_en : item.title }}
            </p>
            <p
              class="info"
              :title="
                lang === 'en'
                  ? 'Authors: ' +
                    item.authors_en.join(' ') +
                    ' | Tutors: ' +
                    item.tutors_en
                  : '作者：' +
                    item.authors.join(' ') +
                    ' | 指导教师：' +
                    item.tutors_zh
              "
            >
              {{
                lang === "en"
                  ? "Authors: " +
                    item.authors_en.join(" ") +
                    " | Tutors: " +
                    item.tutors_en
                  : "作者：" +
                    item.authors.join(" ") +
                    " | 指导教师：" +
                    item.tutors_zh
              }}
            </p>
          </div></template
        >
      </div>
      <div class="paging noSelect">
        <img
          :src="require('../assets/' + $route.params.category_id + '_5.png')"
          class="pre"
          alt="pre"
          @dragstart.prevent
          :style="canPre ? '' : 'cursor:not-allowed;opacity:0.5'"
          @click="changeHall(true)"
        />
        <span
          class="pre-text"
          :style="
            (canPre ? '' : 'cursor:not-allowed;opacity:0.5;') +
            'color:' +
            categoryContent[$route.params.category_id].thirdColor
          "
          @click="changeHall(true)"
        >
          {{ $t("pre") }}
        </span>
        <span
          class="next-text"
          :style="
            (canNext ? '' : 'cursor:not-allowed;opacity:0.5;') +
            'color:' +
            categoryContent[$route.params.category_id].thirdColor
          "
          @click="changeHall(false)"
        >
          {{ $t("next") }}
        </span>
        <img
          :src="require('../assets/' + $route.params.category_id + '_5.png')"
          class="next"
          alt="next"
          :style="canNext ? '' : 'cursor:not-allowed;opacity:0.5'"
          @click="changeHall(false)"
          @dragstart.prevent
        />
      </div>
    </template>
    <template v-else>
      <img
        :src="
          $i18n.locale === 'cn'
            ? require('../assets/mobile/' +
                ($route.params.category_id || 50) +
                '.png')
            : require('../assets/mobile/' +
                ($route.params.category_id || 50) +
                '_en.png')
        "
        alt="back-img"
        class="mobile-back"
      />
      <div class="mobile-desc">
        <div class="btn_1" @click="changeLang"></div>
        <div class="btn_2" @click="changeHall(false, true)"></div>
        <div class="btn_3" @click="changeHall(true, true)"></div>
      </div>
      <div class="mobile-items">
        <div id="leftFall" ref="leftFall" v-if="subRefresh">
          <div
            v-for="(item, i) in leftList"
            :key="i"
            class="mobile-works"
            @click="toDetail(item, i)"
            v-scroll-reveal.reset="{ delay: 0 }"
          >
            <img
              :src="item.src"
              alt="cover"
              class="mobile-cover noSelect"
              :title="lang === 'en' ? item.post_title_en : item.title"
            />
            <p
              class="mobile-title"
              :title="lang === 'en' ? item.post_title_en : item.title"
            >
              {{ lang === "en" ? item.post_title_en : item.title }}
            </p>
            <p
              class="mobile-info"
              :title="
                lang === 'en'
                  ? 'Authors: ' +
                    item.authors_en.join(' ') +
                    ' | Tutors: ' +
                    item.tutors_en
                  : '作者：' +
                    item.authors.join(' ') +
                    ' | 指导教师：' +
                    item.tutors_zh
              "
            >
              {{
                lang === "en"
                  ? "Authors: " +
                    item.authors_en.join(" ") +
                    " | Tutors: " +
                    item.tutors_en
                  : "作者：" +
                    item.authors.join(" ") +
                    " | 指导教师：" +
                    item.tutors_zh
              }}
            </p>
          </div>
        </div>
        <div id="rightFall" ref="rightFall" v-if="subRefresh">
          <div
            v-for="(item, i) in rightList"
            :key="i"
            class="mobile-works"
            @click="toDetail(item, i)"
            v-scroll-reveal.reset="{ delay: 100 }"
          >
            <img
              :src="item.src"
              alt="cover"
              class="mobile-cover noSelect"
              :title="lang === 'en' ? item.post_title_en : item.title"
            />
            <p
              class="mobile-title"
              :title="lang === 'en' ? item.post_title_en : item.title"
            >
              {{ lang === "en" ? item.post_title_en : item.title }}
            </p>
            <p
              class="mobile-info"
              :title="
                lang === 'en'
                  ? 'Authors: ' +
                    item.authors_en.join(' ') +
                    ' | Tutors: ' +
                    item.tutors_en
                  : '作者：' +
                    item.authors.join(' ') +
                    ' | 指导教师：' +
                    item.tutors_zh
              "
            >
              {{
                lang === "en"
                  ? "Authors: " +
                    item.authors_en.join(" ") +
                    " | Tutors: " +
                    item.tutors_en
                  : "作者：" +
                    item.authors.join(" ") +
                    " | 指导教师：" +
                    item.tutors_zh
              }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import service from "../utils/request";
export default {
  props: ["notMobile"],
  data() {
    return {
      idList: ["50", "53", "48", "52", "49", "51"],
      cardList: [],
      tempList: [],
      canPre: true,
      canNext: true,
      itemList: "",
      leftList: [],
      rightList: [],
      refresh: true,
      subRefresh: true,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
    categoryContent() {
      return {
        50: {
          color: "#AD6F2F",
          secondColor: "#CD8E4D",
          thirdColor: "#AD6F2F",
          fourthColor: "#DBBC8E",
          title: "和峰",
          title_en: "Shamo",
          content: [
            this.$t("50_1"),
            this.$t("50_2"),
            this.$t("50_3"),
            this.$t("50_4"),
            this.$t("50_5"),
            this.$t("50_6"),
          ],
        },
        53: {
          color: "#1B3C79",
          secondColor: "#1B3C79",
          thirdColor: "#427AAE",
          fourthColor: "#69B7E0",
          title: "螺声",
          title_en: "Haiyang",
          content: [
            this.$t("50_1"),
            this.$t("53_1"),
            this.$t("53_2"),
            this.$t("53_3"),
            this.$t("53_4"),
            this.$t("53_5"),
            this.$t("53_6"),
          ],
        },
        52: {
          color: "#228CBE",
          secondColor: "#228CBE",
          thirdColor: "#69B7E0",
          fourthColor: "#B5DAE3",
          title: "圣昭",
          title_en: "Bingchuan",
          content: [
            this.$t("52_1"),
            this.$t("52_2"),
            this.$t("52_3"),
            this.$t("52_4"),
            this.$t("52_5"),
            this.$t("52_6"),
          ],
        },
        48: {
          color: "#005453",
          secondColor: "#68A384",
          thirdColor: "#68A384",
          fourthColor: "#c9ded3",
          title: "野舞",
          title_en: "Yulin",
          content: [
            this.$t("48_1"),
            this.$t("48_2"),
            this.$t("48_3"),
            this.$t("48_4"),
            this.$t("48_5"),
            this.$t("48_6"),
          ],
        },
        49: {
          color: "#6D3F1F",
          secondColor: "#886138",
          thirdColor: "#AA794B",
          fourthColor: "#B77445",
          title: "岁予",
          title_en: "Fengshi",
          content: [
            this.$t("49_1"),
            this.$t("49_2"),
            this.$t("49_3"),
            this.$t("49_4"),
            this.$t("49_5"),
            this.$t("49_6"),
          ],
        },
        51: {
          color: "#51090E",
          secondColor: "#971E23",
          thirdColor: "#51090E",
          fourthColor: "#E1BAB0",
          title: "熔典",
          title_en: "Huoshan",
          content: [
            this.$t("51_1"),
            this.$t("51_2"),
            this.$t("51_3"),
            this.$t("51_4"),
            this.$t("51_5"),
            this.$t("51_6"),
          ],
        },
      };
    },
  },
  methods: {
    toDetail(item, i) {
      this.$router.push(
        "/exhibition/" +
          this.$route.params.category_id +
          "/" +
          item.id +
          "?list=" +
          this.itemList +
          "&current=" +
          i
      );
    },
    changeHall(val, type = false) {
      if (val) {
        if (type) {
          this.$router.push(
            "/exhibition/" +
              this.idList[
                this.idList.indexOf(this.$route.params.category_id) - 1 < 0
                  ? this.idList.length - 1
                  : this.idList.indexOf(this.$route.params.category_id) - 1
              ]
          );
        } else if (this.canPre) {
          this.$router.push(
            "/exhibition/" +
              this.idList[
                this.idList.indexOf(this.$route.params.category_id) - 1
              ]
          );
        }
      } else {
        if (type) {
          this.$router.push(
            "/exhibition/" +
              this.idList[
                this.idList.indexOf(this.$route.params.category_id) + 1 >
                this.idList.length - 1
                  ? 0
                  : this.idList.indexOf(this.$route.params.category_id) + 1
              ]
          );
        } else if (this.canNext) {
          this.$router.push(
            "/exhibition/" +
              this.idList[
                this.idList.indexOf(this.$route.params.category_id) + 1
              ]
          );
        }
      }
    },
    getList() {
      this.refresh = false;
      this.canPre = this.$route.params.category_id !== this.idList[0];
      this.canNext =
        this.$route.params.category_id !== this.idList[this.idList.length - 1];
      service(
        "/portal/api_v1/get_cates_lists?per_page=9999&current_page=1&category_id=" +
          this.$route.params.category_id
      ).then((data) => {
        this.cardList = [];
        this.itemList = "";
        for (let i = 0; i < data.data.data.length; i++) {
          let y = [],
            x = [];
          for (let j = 0; j < data.data.data[i].more.authors.length; j++) {
            x.push(data.data.data[i].more.authors[j].en_names);
            y.push(data.data.data[i].more.authors[j].zh_names);
          }
          this.itemList += data.data.data[i].id + "_";
          this.cardList.push({
            ...data.data.data[i],
            title: data.data.data[i].post_title,
            src:
              "http://idesign.tju.edu.cn/upload/" +
              data.data.data[i].more.thumbnail,
            authors: y,
            authors_en: x,
            term: data.data.data[i].post_term,
            id: data.data.data[i].id,
            category_id: this.$route.params.category_id,
          });
        }
        if (!this.notMobile) {
          this.tempList = [...this.cardList];
          this.leftList = [];
          this.rightList = [];
          this.distributeList();
        } else {
          this.refresh = true;
        }
      });
    },
    distributeList() {
      if (this.tempList.length) {
        setTimeout(() => {
          let heightLeft = document.getElementById("leftFall").clientHeight;
          let heightRight = document.getElementById("rightFall").clientHeight;
          if (heightLeft <= heightRight) {
            this.leftList.push(this.tempList.shift());
          } else {
            this.rightList.push(this.tempList.shift());
          }
          this.$nextTick(() => {
            this.distributeList();
          });
        }, 0);
      } else {
        this.subRefresh = false;
        setTimeout(() => {
          this.subRefresh = true;
        }, 0);
      }
    },
    changeLang() {
      this.$i18n.locale = this.$i18n.locale === "cn" ? "en" : "cn";
      this.subRefresh = false;
      setTimeout(() => {
        this.subRefresh = true;
      }, 0);
      document.title =
        this.$i18n.locale === "cn"
          ? "2022·天津大学第八届设计年展·火星博物馆"
          : "THE 8TH ANNUAL DESIGN EXHIBITION OF TIANJIN UNIVERSITY · MARSEUM";
    },
  },
  watch: {
    $route() {
      this.getList();
    },
    notMobile() {
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
.desc {
  margin-top: 90px;
  display: grid;
  grid-template-columns: 950px 300px auto;
  grid-template-rows: 200px 275px;
  overflow: visible;
}
.img-text {
  display: flex;
  justify-content: center;
}
.icon_0 {
  position: absolute;
  left: 0;
  top: 0;
  width: 1920px;
  z-index: 0;
}
.icon_00 {
  position: absolute;
  right: 705px;
  top: 95px;
  width: 6px;
  height: 268px;
}
.icon_1 {
  width: 120px;
  height: 136px;
  margin-right: 50px;
}
.icon_2 {
  width: 568px;
  height: 540px;
  margin-top: -50px;
  justify-self: center;
}
.icon_3 {
  width: 10px;
  height: 300px;
}
.icon_4 {
  position: absolute;
  left: 70px;
  top: 1200px;
  width: 280px;
  height: 320px;
}
.text_1 {
  font-size: 90px;
  font-weight: 400;
}
.space {
  grid-row: 1 / 3;
  grid-column: 2 / 3;
}
.img-text-2 {
  display: flex;
  justify-content: flex-start;
  grid-row: 1 / 3;
  grid-column: 3 / 4;
  margin-top: -20px;
}
.paragraph {
  position: absolute;
  right: 735px;
  height: 280px;
  padding-top: 10px;
  padding-left: 28px;
  padding-bottom: 10px;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.paragraph p {
  font-size: 23px;
  font-family: "REEJI-FlashSansGB-Flash-Black";
  font-weight: 900;
}
.title-bold {
  position: absolute;
  left: 1245px;
  font-size: 80px;
  font-family: "REEJI-FlashSansGB-Flash-Black";
  font-weight: 900;
}
.title-light {
  position: absolute;
  margin-top: 7px;
  left: 1257px;
  font-size: 80px;
  font-family: "REEJI-FlashSansGB-Flash-Light";
  font-weight: 200;
}
.content {
  display: grid;
  margin: 0 150px;
  grid-template-columns: repeat(3, 512px);
  justify-content: space-between;
  margin-top: -130px;
}
.works {
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 50px;
}
.wrapper {
  overflow: hidden;
  width: 512px;
  height: 290px;
}
.cover {
  width: 512px;
  height: 290px;
  transition: all 0.6s ease;
}
.works:hover .cover {
  transform: scale(1.2);
}
.title {
  font-size: 28px;
  font-weight: 400;
  margin-top: 10px;
  white-space: unset;
}
.info {
  font-size: 18px;
  font-weight: 300;
  white-space: unset;
}
.paging {
  width: 100%;
  margin: 100px 0;
  padding: 0 150px;
  height: 22px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: visible;
}
.pre {
  height: 18px;
  cursor: pointer;
  display: block;
}
.next {
  height: 18px;
  cursor: pointer;
  transform: rotate(180deg);
  display: block;
}
.pre-text {
  font-size: 24px;
  padding: 0 5px;
  line-height: 22px;
  cursor: pointer;
  overflow: visible;
  margin: 5px 0;
  margin-right: 20px;
}
.next-text {
  font-size: 24px;
  padding: 0 5px;
  line-height: 22px;
  cursor: pointer;
  overflow: visible;
  margin: 5px 0;
}
.color-block-1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 145px;
  height: 15px;
}
.color-block-2 {
  position: absolute;
  right: 0;
  top: 0;
  width: 145px;
  height: 15px;
}
.mobile-desc {
  position: relative;
  width: 100%;
  height: 170px;
  margin-top: 30px;
}
.btn_1 {
  position: absolute;
  top: 4px;
  left: 280px;
  width: 42px;
  height: 38px;
}
.btn_2 {
  position: absolute;
  top: 65px;
  right: 10px;
  width: 30px;
  height: 50px;
}
.btn_3 {
  position: absolute;
  top: 65px;
  left: 10px;
  width: 30px;
  height: 50px;
}
.mobile-back {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
.mobile-title {
  display: flex;
  align-items: center;
}
.mobile-title p {
  font-weight: 700;
  font-size: 32px;
  color: #000000;
  display: inline-block;
}
.icon-lang {
  width: 26px;
  height: 26px;
  margin-left: 10px;
  display: inline-block;
}
.mobile-paragraph {
  margin-top: 5px;
  font-size: 14px;
  color: #000000;
}
.mobile-paragraph p {
  white-space: unset !important;
  margin-top: 5px;
  margin-right: 10px;
}
.mobile-items {
  white-space: nowrap;
  width: 398px;
  margin: 40px 8px;
  box-sizing: border-box;
}
#leftFall {
  vertical-align: top;
  display: inline-block;
  width: 195px;
  height: auto;
  margin-right: 8px;
}
#rightFall {
  vertical-align: top;
  display: inline-block;
  width: 195px;
  height: auto;
}
.mobile-works {
  background-color: white;
  margin: 8px 0;
  border-radius: 5px;
}
.mobile-cover {
  width: 100%;
}
.mobile-title {
  font-size: 14px;
  color: #2c3d50;
  margin: 8px 0;
  padding: 0 12px;
  white-space: pre-line;
}
.mobile-info {
  font-size: 12px;
  color: #8a8a8a;
  padding: 0 12px;
  margin: 8px 0;
  white-space: pre-line;
}
</style>
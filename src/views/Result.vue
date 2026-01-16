<template>
  <div
    :style="
      'overflow: hidden; position: relative;' +
      (notMobile ? 'background-color: #fffeff;' : 'background-color: #f8f8f8;')
    "
    class="result"
  >
    <p v-if="!cardList.length" class="no-data">{{ $t("no_data") }}</p>
    <img
      src="../assets/graduate/background_1.webp"
      class="back_1 noSelect"
      @dragstart.prevent
      alt="background"
    />
    <img
      src="../assets/graduate/background_2.webp"
      class="back_2 noSelect"
      @dragstart.prevent
      alt="background"
    />
    <template v-if="notMobile">
      <div class="content">
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
    </template>
    <template v-else>
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
import { UPLOAD_URL, BASE_URL } from "../utils/constants.js";
export default {
  props: ["notMobile", "keywords"],
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
    getList() {
      this.refresh = false;
      this.canPre = this.$route.params.category_id !== this.idList[0];
      this.canNext =
        this.$route.params.category_id !== this.idList[this.idList.length - 1];
      service(
        BASE_URL + "/portal/api_v1/get_search_2022?per_page=9999&current_page=1&cate_ids=50,53,48,52,49,51&keyword=" +
          this.keywords
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
              UPLOAD_URL +
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
  height: 300px;
  padding-top: 10px;
  padding-left: 28px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.paragraph p {
  font-size: 23px;
  color: #000000;
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
  margin-left: 220px;
  margin-top: 30px;
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
.result {
  position: relative;
  padding-top: 300px;
}
.back_1 {
  position: absolute;
  left: 0;
  top: 20px;
  width: 550px;
  height: 540px;
}
.back_2 {
  position: absolute;
  right: 0;
  top: 20px;
  width: 550px;
  height: 540px;
}
.no-data {
  text-align: center;
  font-size: 24px;
  color: #2c3d50;
  margin-top: -150px;
  margin-bottom: 700px;
}
@media screen and (max-width: 620px) {
  .no-data {
    text-align: center;
    font-size: 18px;
    color: #2c3d50;
    margin-top: 100px;
    margin-bottom: 300px;
  }
  .result {
    position: relative;
    padding-top: 0;
    margin-top: -20px;
  }
  .back_1 {
    position: absolute;
    left: 0;
    top: 20px;
    width: 110px;
    height: 105px;
  }
  .back_2 {
    position: absolute;
    right: 0;
    top: 20px;
    width: 110px;
    height: 105px;
  }
}
</style>
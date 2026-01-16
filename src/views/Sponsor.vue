<template>
  <div class="graduate" :style="notMobile ? '' : 'background-color:#e5e5e5'">
    <template v-if="notMobile">
      <img
        src="../assets/graduate/background_4.webp"
        class="back_1 noSelect"
        @dragstart.prevent
        alt="background"
      /><img
        src="../assets/graduate/background_6.webp"
        class="back_3 noSelect"
        @dragstart.prevent
        alt="background"
      />
      <div class="title">
        <img
          src="../assets/graduate/background_5.webp"
          class="back_2 noSelect"
          @dragstart.prevent
          alt="background"
        />教师寄语
      </div>
      <div class="content-text">
        {{ $t("content_1_1") }}
        <br />
        {{ $t("content_1_2") }}
        <br />
        {{ $t("content_1_3") }}
        <br />
        {{ $t("content_1_4") }}
      </div>
      <div class="content-text">
        {{ $t("content_2_1") }}
        <br />
        {{ $t("content_2_2") }}
        <br />
        {{ $t("content_2_3") }}
        <br />
        {{ $t("content_2_4") }}
      </div>
      <div class="content-text">
        {{ $t("content_3_1") }}
        <br />
        {{ $t("content_3_2") }}
        <br />
        {{ $t("content_3_3") }}
      </div>
      <div class="title">
        <img
          src="../assets/graduate/background_5.webp"
          class="back_2 noSelect"
          @dragstart.prevent
          alt="background"
        />年展工作组
      </div>
      <div class="group">
        <div
          v-for="(title, i) in titles"
          :key="i"
          style="overflow: visible; white-space: pre-line"
        >
          <div class="name-title">
            <img
              :src="require('../assets/graduate/title_' + i + '.webp')"
              :class="'back_4 back_4_' + i + ' noSelect'"
              @dragstart.prevent
              alt="background"
            />
            {{ title.title }}
          </div>
          <div
            v-for="(item, j) in title.content"
            :key="i + ' ' + j"
            class="web-student-item"
          >
            <img
              class="avatar"
              v-lazy="
                require('../assets/graduate/sponsor/' +
                  i +
                  '/' +
                  (j + 1) +
                  '.webp')
              "
              @dragstart.prevent
              alt="avatar"
            /><img
              src="../assets/graduate/background_7.webp"
              class="back_7 noSelect"
              @dragstart.prevent
              alt="background"
            />
            <div class="web-text-item-name">
              {{ $i18n.locale === "cn" ? item.name : item.name_en }}
            </div>
            <div class="web-text-item-job">
              {{ $i18n.locale === "cn" ? item.job : item.job_en }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="nav">
        <div class="nav-2" @click="toGraduate">{{ $t("graduate") }}</div>
        <div class="nav-1">{{ $t("sponsor") }}</div>
      </div>
      <div class="students">
        <template v-for="(title, i) in titles">
          <div :key="i + 'a'" class="letter" :id="'title' + i">
            {{ title.title }}<span>[{{ title.num }}]</span>
            <div class="point" :id="'titles' + i"></div>
          </div>
          <p :key="i + 'b'" class="desc">{{ title.desc }}</p>
          <div
            v-for="(item, j) in title.content"
            :key="i + ' ' + j"
            class="student-item"
          >
            <img
              v-lazy="
                require('../assets/graduate/sponsor/' +
                  i +
                  '/' +
                  (j + 1) +
                  '.webp')
              "
              @dragstart.prevent
              alt="avatar"
            />
            <div :key="i + ' a' + j" class="text-item-name">
              {{ $i18n.locale === "cn" ? item.name : item.name_en }}
            </div>
            <div :key="i + ' b' + j" class="text-item-job">
              {{ $i18n.locale === "cn" ? item.job : item.job_en }}
            </div>
          </div>
        </template>
      </div>
      <div class="letters-nav">
        <div
          v-for="item in 8"
          :key="item"
          :class="'letter-nav' + (item === nowChar ? ' nav-active' : '')"
          @click="getLetter(item)"
        >
          {{ titles[item].title }}
          <div class="capsule" v-if="item === nowChar"></div>
        </div>
      </div>
    </template>
    <div class="msg-dialog" v-if="msgDialog" key="a">
      <div class="msg-img"><div class="msg-btn" @click="hideMsg"></div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notMobile"],
  created() {
    if (!this.notMobile) this.showMsg();
    window.addEventListener("scroll", () => {
      if (document.getElementById("title1")) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop < document.getElementById("title2").offsetTop - 100) {
          this.nowChar = 1;
        } else if (
          scrollTop <
          document.getElementById("title3").offsetTop - 100
        ) {
          this.nowChar = 2;
        } else if (
          scrollTop <
          document.getElementById("title4").offsetTop - 100
        ) {
          this.nowChar = 3;
        } else if (
          scrollTop <
          document.getElementById("title5").offsetTop - 100
        ) {
          this.nowChar = 4;
        } else if (
          scrollTop <
          document.getElementById("title6").offsetTop - 100
        ) {
          this.nowChar = 5;
        } else if (
          scrollTop <
          document.getElementById("title7").offsetTop - 100
        ) {
          this.nowChar = 6;
        } else if (
          scrollTop <
          document.getElementById("title8").offsetTop - 100
        ) {
          this.nowChar = 7;
        } else {
          this.nowChar = 8;
        }
      }
    });
  },
  methods: {
    toGraduate() {
      this.$router.push("/graduate");
    },
    getLetter(letter) {
      this.$nextTick(() => {
        this.nowChar = letter;
        if (document.getElementById("titles" + letter)) {
          document.getElementById("titles" + letter).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    },
    showMsg() {
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      this.msgDialog = true;
    },
    hideMsg() {
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.position = "relative";
      this.msgDialog = false;
    },
  },
  data() {
    return {
      nowChar: 1,
      top: [0, 100, 400],
      msgDialog: false,
      titles: {
        1: {
          title: "指导教师",
          desc: "负责展览的整体指导和统筹协调",
          num: 4,
          content: [
            {
              name: "边放",
              name_en: "Fang BIAN",
              job: "展览理论知识讲授、设计指导",
              job_en: "Exhibition theory knowledge teaching, design guidance",
            },
            {
              name: "杨君宇",
              name_en: "Junyu YANG",
              job: "年展视觉设计指导",
              job_en: "Annual exhibition visual design guidance",
            },
            {
              name: "张赫晨",
              name_en: "Hechen ZHANG",
              job: "年展策划协调、设计指导",
              job_en:
                "Annual exhibition planning coordination, design guidance",
            },
            {
              name: "李擎炜",
              name_en: "Qingwei LI",
              job: "年展实验指导、文宣指导",
              job_en:
                "Annual exhibition experiments guidance, publicity guidance",
            },
          ],
        },
        2: {
          title: "总负责",
          desc: "负责展览的整体规划和时间把控",
          num: 1,
          content: [
            {
              name: "王柏捷",
              name_en: "Baijie WANG",
              job: "总体策划，总体工作协调与统筹",
              job_en:
                "Overall planning, work coordination and overall planning",
            },
          ],
        },
        3: {
          title: "策展A组",
          desc: "负责展览展区规划、建模和交互活动设计",
          num: 3,
          content: [
            {
              name: "章毓翀",
              name_en: "Yuchong ZHANG",
              job: "线下展览设计，线下策展统筹与对接",
              job_en:
                "Offline exhibition designer, coordinator of curator-group A",
            },
            {
              name: "冉渝茹",
              name_en: "Yuru RAN",
              job: "线下展览设计，展览活动设计",
              job_en: "Offline exhibition designer, exhibition event designer",
            },
            {
              name: "王子悅",
              name_en: "Ziyue WANG",
              job: "线下展览设计，展览互动设计",
              job_en:
                "Offline exhibition designer, exhibition interaction designer",
            },
          ],
        },
        4: {
          title: "策展B组",
          desc: "负责手机端电脑端展览网页的设计",
          num: 3,
          content: [
            {
              name: "任冰",
              name_en: "Bing REN",
              job: "线上展览电脑端设计，线上策展统筹与对接",
              job_en:
                "Online exhibition PC Designer，coordinator of curator-group B",
            },
            {
              name: "闫冬涵",
              name_en: "Donghan YAN",
              job: "线上展览手机端设计",
              job_en: "Online exhibition Mobile Designer",
            },
            {
              name: "邱子悦",
              name_en: "Ziyue QIU",
              job: "线上展览手机端设计",
              job_en: "Online exhibition Mobile Designer",
            },
          ],
        },
        5: {
          title: "策展C组",
          desc: "负责展品信息搜集和部分策展工作",
          num: 3,
          content: [
            {
              name: "顾佳奇",
              name_en: "Jiaqi GU",
              job: "展品信息搜集，协助策展",
              job_en: "Exhibit information collection, assist in curation",
            },
            {
              name: "辛美璇",
              name_en: "Meixuan XIN",
              job: "协助展品搜集，协助展品上传",
              job_en: "Assist in exhibit collection, assist in exhibit upload",
            },
            {
              name: "刘一凡",
              name_en: "Yifan LIU",
              job: "协助展品搜集，制作数据图表",
              job_en: "Assist in theexhibit collection, make data charts",
            },
          ],
        },
        6: {
          title: "设计组",
          desc: "负责展览整体视觉的设计",
          num: 8,
          content: [
            {
              name: "贾士贤",
              name_en: "Shixian JIA",
              job: "设计组整体统筹，线下视觉",
              job_en:
                "Overall planning and offline visual work of the design team",
            },
            {
              name: "廖孟哲",
              name_en: "Mengzhe LIAO",
              job: "线上视觉统筹工作",
              job_en:
                "Overall planning online visual work and offline visual work",
            },
            {
              name: "唐雨琛",
              name_en: "Yuchen TANG",
              job: "线上和线下视觉工作",
              job_en: "Online visual and offline visual design work",
            },
            {
              name: "邓皓勇",
              name_en: "Haoyong DENG",
              job: "线下视觉工作",
              job_en: "offline visual design work",
            },
            {
              name: "顾天琳",
              name_en: "Tianlin GU",
              job: "线下视觉工作",
              job_en: "offline visual design work",
            },
            {
              name: "公晨阳",
              name_en: "Chenyang GONG",
              job: "对接策展C工作",
              job_en: "Liaise with the curator group C",
            },
            {
              name: "白子轩",
              name_en: "Zixuan BAI",
              job: "制作展品手册",
              job_en: "Making an exhibit manual",
            },
            {
              name: "吴昕瑶",
              name_en: "Xinyao WU",
              job: "对接加工商，设计组财务",
              job_en: "Design group accountant, docking processor",
            },
          ],
        },
        7: {
          title: "文宣组",
          desc: "负责展览文案撰写和宣传视频制作",
          num: 6,
          content: [
            {
              name: "王梓棋",
              name_en: "Ziqi WANG",
              job: "文宣组整体统筹，文案撰写，视频制作",
              job_en: "Overall planning, writing, video making",
            },
            {
              name: "周诗沁",
              name_en: "Shiqin ZHOU",
              job: "视频统筹，文案撰写，视频制作",
              job_en: "Video planing, writing, video making",
            },
            {
              name: "陈嘉明",
              name_en: "Jiaming CHEN",
              job: "文案撰写，视频制作",
              job_en: "Writing, video making",
            },
            {
              name: "王利丹",
              name_en: "Lidan WANG",
              job: "文案撰写，视频制作",
              job_en: "Writing, video making",
            },
            {
              name: "程璐明",
              name_en: "Luming CHENG",
              job: "文案撰写，视频制作",
              job_en: "Writing, video making",
            },
            {
              name: "张贸惟",
              name_en: "Maowei ZHANG",
              job: "文案撰写，视频制作",
              job_en: "Writing, video making",
            },
          ],
        },
        8: {
          title: "对接人",
          desc: "负责与相关班级对接和协调",
          num: 7,
          content: [
            {
              name: "王煦晖",
              name_en: "Xuhui WANG",
              job: "18级工设一班对接人",
              job_en: "Coordinator of Senior(ME)",
            },
            {
              name: "赵芮青",
              name_en: "Ruiqing ZHAO",
              job: "18级工设二班对接人",
              job_en: "Coordinator of Senior(ME)",
            },
            {
              name: "王柳茜",
              name_en: "Liuqian WANG",
              job: "18级宣怀学院对接人",
              job_en: "Coordinator of Senior(XH)",
            },
            {
              name: "张以琳",
              name_en: "Yilin ZHANG",
              job: "19级工设一班对接人",
              job_en: "Coordinator of Junior(ME)",
            },
            {
              name: "王晓桐",
              name_en: "Xiaotong WANG",
              job: "19级工设二班对接人",
              job_en: "Coordinator of Junior(ME)",
            },
            {
              name: "王柏捷",
              name_en: "Baijie WANG",
              job: "19级宣怀学院对接人",
              job_en: "Coordinator of Junior(XH)",
            },
            {
              name: "董良",
              name_en: "Liang DONG",
              job: "硕士生对接人",
              job_en: "Coordinator of Postgraduate(ME)",
            },
          ],
        },
      },
      letters: [
        "B",
        "C",
        "D",
        "H",
        "L",
        "M",
        "Q",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      num: {
        B: 2,
        C: 6,
        D: 1,
        H: 2,
        L: 9,
        M: 1,
        Q: 1,
        S: 1,
        T: 3,
        W: 15,
        X: 2,
        Y: 7,
        Z: 12,
      },
    };
  },
};
</script>

<style scoped>
.graduate {
  position: relative;
  overflow: visible;
}
.nav {
  display: grid;
  width: 100%;
  height: 44px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  margin-top: 6px;
}
.content-text {
  margin-left: 450px;
  margin-right: 180px;
  font-size: 25px;
  font-weight: 500;
  margin-top: 32px;
  line-height: 40px;
  text-align: justify;
}
.group {
  margin-top: 50px;
  margin-left: 450px;
  margin-right: 160px;
  margin-bottom: 100px;
  overflow: visible;
}
.nav-1 {
  background-color: #d36a64;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.nav-2 {
  font-weight: 300;
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d36a64;
  background-color: white;
}
.teacher {
  margin-top: 25px;
  width: 100%;
}
.teacher-title {
  margin-top: 90px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
.teacher-images {
  display: flex;
  justify-content: space-between;
  margin: 80px 85px;
  margin-bottom: 0px;
}
.teacher-images img {
  width: 863px;
  height: 282px;
}
.student {
  position: relative;
  margin-top: 25px;
  width: 100%;
}
.student-title {
  margin-top: 90px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
.student-images {
  display: grid;
  grid-template-columns: 580px 580px 580px;
  grid-template-rows: repeat(auto-fill, 190px);
  row-gap: 30px;
  margin: 80px 85px;
}
.student-images img {
  width: 580px;
  height: 190px;
}
.name-title {
  padding-left: 20px;
  position: relative;
  font-size: 25px;
  overflow: visible;
  margin-top: 40px;
  margin-bottom: 20px;
}
.back_7 {
  position: absolute;
  right: -2px;
  top: 210px;
  width: 55px;
  height: 55px;
}
.back_4 {
  position: absolute;
}
.back_4_1,
.back_4_2,
.back_4_8 {
  width: 35px;
  height: 40px;
  left: 0px;
  top: -10px;
}
.back_4_3,
.back_4_4,
.back_4_5,
.back_4_6,
.back_4_7 {
  width: 53px;
  height: 47px;
  left: -6px;
  top: -15px;
}
.back_3_1 {
  position: absolute;
  left: 50%;
  top: 190px;
  transform: translateX(-50%);
  width: 695px;
  height: 24px;
}
.back_3_2 {
  position: absolute;
  left: 50%;
  top: 165px;
  transform: translateX(-50%);
  width: 695px;
  height: 24px;
}
.msg-dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 103;
}
.msg-img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 374px;
  height: 537px;
  background-image: url("../assets/mobile/sponsor.webp");
  background-size: 374px 537px;
}
.msg-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 457px;
  width: 65px;
  height: 65px;
}
.students {
  margin-left: 110px;
  padding-bottom: 40px;
}
.letter {
  position: relative;
  margin-top: 16px;
  font-size: 14px;
  color: #000000;
}
.letter span {
  font-size: 14px;
  color: #828282;
}
.point {
  position: absolute;
  top: -100px;
}
.desc {
  font-size: 10px;
  color: #8a8a8a;
  margin-bottom: 7px;
}
.student-item {
  width: 284px;
  height: 102px;
  margin: 3px 0;
  padding: 10px;
  background-color: white;
  display: grid;
  grid-template-columns: 82px auto;
  grid-template-rows: 36px 46px;
  column-gap: 16px;
  overflow: hidden;
}
.student-item img {
  width: 82px;
  height: 82px;
  grid-row: 1 / 3;
}
.web-student-item {
  display: inline-block;
  position: relative;
  width: 250px;
  margin-right: 20px;
  overflow: visible;
  vertical-align: top;
  margin-bottom: 20px;
}
.avatar {
  width: 250px;
  height: 250px;
  display: block;
  margin-bottom: 5px;
}
.text-item-name {
  font-weight: 500;
  font-size: 16px;
  color: #000000;
}
.text-item-job {
  font-weight: 400;
  font-size: 10px;
  color: #8a8a8a;
  align-self: end;
}
.web-text-item-name {
  font-weight: 500;
  font-size: 23px;
  color: #000000;
  line-height: 38px;
  height: 38px;
}
.web-text-item-job {
  font-weight: 400;
  font-size: 18px;
  color: #8a8a8a;
  align-self: end;
}
.letters-nav {
  position: fixed;
  left: 16px;
  top: 150px;
  width: 78px;
  display: grid;
  grid-template-rows: repeat(8, 47px);
  row-gap: 1px;
  align-items: center;
}
.letter-nav {
  font-size: 12px;
  color: #979696;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding: 10px 10px 10px 10px;
  background-color: white;
  width: 100%;
  height: 100%;
  position: relative;
}
.nav-active {
  padding: 3px 10px 10px 10px;
  background: rgba(211, 106, 101, 0.2);
  color: #d36a65;
}
.capsule {
  position: absolute;
  left: 10px;
  bottom: 12px;
  width: 14px;
  height: 2px;
  background-color: #d36a65;
}
.back_1 {
  position: absolute;
  width: 310px;
  height: 360px;
  right: 0;
  top: -75px;
}
.back_3 {
  position: absolute;
  width: 818px;
  height: 850px;
  right: 0;
  bottom: 50px;
}
.title {
  overflow: visible;
  margin-top: 75px;
  margin-left: 120px;
  font-weight: 700;
  font-size: 40px;
  position: relative;
}
.back_2 {
  position: absolute;
  top: -50px;
  left: -90px;
  width: 180px;
  height: 180px;
}
</style>
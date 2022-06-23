<template>
  <div class="graduate" :style="notMobile ? '' : 'background-color:#e5e5e5'">
    <template v-if="notMobile">
      <img
        src="../assets/graduate/background_1.png"
        class="back_1 noSelect"
        @dragstart.prevent
        alt="background"
      />
      <img
        src="../assets/graduate/background_2.png"
        class="back_2 noSelect"
        @dragstart.prevent
        alt="background"
      />
      <div class="teacher">
        <img
          src="../assets/graduate/background_3.png"
          class="back_3_1 noSelect"
          @dragstart.prevent
          alt="background"
        />
        <p class="teacher-title">班导师寄语</p>
        <div class="teacher-images">
          <img
            class="noSelect"
            src="../assets/graduate/teacher_1.png"
            @dragstart.prevent
            alt="teacher"
            preview="0"
          />
          <img
            class="noSelect"
            src="../assets/graduate/teacher_2.png"
            @dragstart.prevent
            alt="teacher"
            preview="1"
          />
        </div>
      </div>
      <div class="student">
        <img src="../assets/graduate/background_3.png" class="back_3_2" />
        <p class="student-title">毕业生信息</p>
        <div class="student-images">
          <template v-for="(letter, i) in letters">
            <img
              class="noSelect"
              v-for="(item, j) in num[letter]"
              :key="i + ' ' + j"
              v-lazy="
                require('../assets/graduate/student/' +
                  letter +
                  '/' +
                  (j + 1) +
                  '.jpg')
              "
              :preview="i + ' ' + j"
              @dragstart.prevent
              alt="student"
          /></template>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="nav">
        <div class="nav-1">{{ $t("graduate") }}</div>
        <div class="nav-2" @click="toSponsor">{{ $t("sponsor") }}</div>
      </div>
      <div class="students">
        <template v-for="(letter, i) in letters">
          <div :key="i + 'a'" class="letter" :id="'letter' + letter">
            {{ letter }}<span>[{{ num[letter] }}]</span>
            <div class="point" :id="'letters' + letter"></div>
          </div>
          <img
            v-for="(item, j) in num[letter]"
            :key="i + ' ' + j"
            class="student-item"
            v-lazy="
              require('../assets/graduate/student/' +
                letter +
                '/' +
                (j + 1) +
                '.jpg')
            "
            :preview="i + ' ' + j"
            @dragstart.prevent
            alt="student"
          />
        </template>
      </div>
      <div class="letters-nav">
        <div
          v-for="item in 26"
          :key="item"
          class="letter-nav"
          :style="
            String.fromCharCode(64 + item) === nowChar
              ? 'background-color:#D36A65'
              : ''
          "
          @click="getLetter(String.fromCharCode(64 + item))"
        >
          {{ String.fromCharCode(64 + item) }}
        </div>
      </div>
    </template>
    <div class="msg-dialog" v-if="msgDialog">
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
      if (document.getElementById("letterB")) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop < document.getElementById("letterB").offsetTop - 100) {
          this.nowChar = "A";
        } else if (
          scrollTop <
          document.getElementById("letterC").offsetTop - 100
        ) {
          this.nowChar = "B";
        } else if (
          scrollTop <
          document.getElementById("letterD").offsetTop - 100
        ) {
          this.nowChar = "C";
        } else if (
          scrollTop <
          document.getElementById("letterH").offsetTop - 100
        ) {
          this.nowChar = "D";
        } else if (
          scrollTop <
          document.getElementById("letterL").offsetTop - 100
        ) {
          this.nowChar = "H";
        } else if (
          scrollTop <
          document.getElementById("letterM").offsetTop - 100
        ) {
          this.nowChar = "L";
        } else if (
          scrollTop <
          document.getElementById("letterQ").offsetTop - 100
        ) {
          this.nowChar = "M";
        } else if (
          scrollTop <
          document.getElementById("letterS").offsetTop - 100
        ) {
          this.nowChar = "Q";
        } else if (
          scrollTop <
          document.getElementById("letterT").offsetTop - 100
        ) {
          this.nowChar = "S";
        } else if (
          scrollTop <
          document.getElementById("letterW").offsetTop - 100
        ) {
          this.nowChar = "T";
        } else if (
          scrollTop <
          document.getElementById("letterX").offsetTop - 100
        ) {
          this.nowChar = "W";
        } else if (
          scrollTop <
          document.getElementById("letterY").offsetTop - 100
        ) {
          this.nowChar = "X";
        } else if (
          scrollTop <
          document.getElementById("letterZ").offsetTop - 100
        ) {
          this.nowChar = "Y";
        } else {
          this.nowChar = "Z";
        }
      }
    });
  },
  methods: {
    toSponsor() {
      this.$router.push("/sponsor");
    },
    getLetter(letter) {
      this.$nextTick(() => {
        this.nowChar = letter;
        if (document.getElementById("letters" + letter)) {
          window.scrollTo({
            top: document.getElementById("letters" + letter).offsetTop,
            behavior: "smooth",
          });
          document.getElementById("letters" + letter).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          let temp = letter;
          while (!document.getElementById("letters" + temp)) {
            temp = String.fromCharCode(temp.charCodeAt() + 1);
          }
          document.getElementById("letters" + temp).scrollIntoView({
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
      nowChar: "A",
      top: [0, 100, 400],
      msgDialog: false,
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
.back_1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 550px;
  height: 540px;
  z-index: -1;
}
.back_2 {
  position: absolute;
  right: 0;
  top: 0;
  width: 550px;
  height: 540px;
  z-index: -1;
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
  background-image: url("../assets/mobile/graduate.png");
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
  margin-left: 16px;
  margin-bottom: 40px;
}
.letter {
  position: relative;
  margin-top: 16px;
  margin-bottom: 7px;
  font-size: 10px;
  color: #8a8a8a;
}
.point {
  position: absolute;
  top: -100px;
}
.letter span {
  font-size: 10px;
  color: #d2d1d2;
}
.student-item {
  width: 350px;
  height: 115px;
  margin: 5px 0;
}
.letters-nav {
  position: fixed;
  right: 10px;
  top: 150px;
  width: 24px;
  background: #ffffff;
  border-radius: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
}
.letter-nav {
  width: 16px;
  height: 16px;
  font-size: 10px;
  border-radius: 8px;
  display: flex;
  margin: 2px auto;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  color: #e2e2e2;
}
</style>
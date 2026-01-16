<template>
  <div class="home">
    <div
      id="matter"
      :style="
        'background-image:url(' +
        (notMobile
          ? require('../assets/background_' + (backGround ? 2 : 1) + '.webp')
          : require('../assets/mobile/background_1.webp')) +
        ')'
      "
      @mousedown="videoStatue = false"
      @mouseup="videoStatue = true"
    >
      <canvas id="world" resize="true" v-show="notMobile"></canvas>
      <div
        v-show="videoStatue && notMobile"
        @mousedown.stop
        @mouseup.stop
        @click="toVideo"
      ></div>
    </div>
    <img
      :src="
        require($i18n.locale === 'cn'
          ? '../assets/mobile/enter.webp'
          : '../assets/mobile/enter_en.webp')
      "
      v-if="!notMobile"
      class="enter-class"
      @click="toOnline"
    />
    <canvas
      v-show="notMobile"
      id="myCanvas"
      resize="true"
      hidpi="on"
      :width="width"
      :height="height"
      ref="myCanvas"
    ></canvas>
    <div class="preface" v-if="notMobile">
      <img
        src="../assets/pre-left.webp"
        class="pre-left noSelect"
        alt="background"
        @dragstart.prevent
      />
      <img
        src="../assets/pre-right.webp"
        class="pre-right noSelect"
        alt="background"
        @dragstart.prevent
      />
      <div>
        <div class="preface-title">{{ $t("preface") }}</div>
      </div>
      <div class="preface-paragraph">
        <p>{{ $t("pp_1") }}</p>
        <p>{{ $t("pp_2") }}</p>
        <p>{{ $t("pp_2_sub") }}</p>
        <p>{{ $t("pp_3") }}</p>
        <p>{{ $t("pp_4") }}</p>
      </div>
      <div class="preface-paragraph">
        <p>{{ $t("pp_5") }}</p>
        <p>{{ $t("pp_6") }}</p>
        <p>{{ $t("pp_7") }}</p>
        <p>{{ $t("pp_8") }}</p>
        <p>{{ $t("pp_8_sub") }}</p>
      </div>
      <div class="preface-paragraph">
        <p>{{ $t("pp_9") }}</p>
        <p class="p1">{{ $t("pp_10") }}</p>
        <p class="p2">{{ $t("pp_11") }}</p>
        <p>{{ $t("space") }}</p>
        <p class="p3">{{ $t("pp_12") }}</p>
      </div>
    </div>
    <div
      class="mobile-preface"
      v-else
      :style="
        $i18n.locale === 'cn'
          ? ''
          : 'background-image:url(' +
            require('../assets/mobile/preface_en.webp') +
            ')'
      "
    ></div>
    <img
      src="../assets/mobile/background.webp"
      class="back-img"
      v-if="!notMobile"
      alt="back-img"
    />
    <div class="mars" v-if="notMobile">
      <p class="mars-paragraph">
        {{ $t("intro") }}
      </p>
      <img src="../assets/enter.webp" class="mars-enter" />
      <div class="mars-content noSelect">
        <div
          :class="'mars-item item-1' + (hoverOthers ? '' : ' item-01')"
          @click="toExhibition(50)"
        >
          <p>{{ $t("item_1") }}</p>
        </div>
        <div
          class="mars-item item-2"
          @mouseover="hoverOthers = true"
          @mouseleave="hoverOthers = false"
          @click="toExhibition(53)"
        >
          <p>{{ $t("item_2") }}</p>
        </div>
        <div
          class="mars-item item-3"
          @mouseover="hoverOthers = true"
          @mouseleave="hoverOthers = false"
          @click="toExhibition(48)"
        >
          <p>{{ $t("item_3") }}</p>
        </div>
        <div
          class="mars-item item-4"
          @mouseover="hoverOthers = true"
          @mouseleave="hoverOthers = false"
          @click="toExhibition(52)"
        >
          <p>{{ $t("item_4") }}</p>
        </div>
        <div
          class="mars-item item-5"
          @mouseover="hoverOthers = true"
          @mouseleave="hoverOthers = false"
          @click="toExhibition(49)"
        >
          <p>{{ $t("item_5") }}</p>
        </div>
        <div
          class="mars-item item-6"
          @mouseover="hoverOthers = true"
          @mouseleave="hoverOthers = false"
          @click="toExhibition(51)"
        >
          <p>{{ $t("item_6") }}</p>
        </div>
      </div>
    </div>
    <div class="mobile-mars" v-else>
      <div class="mobile-mars-titles">
        <div class="mobile-mars-title">{{ $t("mars_title") }}</div>
        <div class="mobile-mars-sub-title" @click="toAni">
          {{ $t("mars_title_2") }}
        </div>
        <div class="mobile-mars-sub-title">{{ $t("mars_title_3") }}</div>
      </div>
      <div class="mobile-mars-items">
        <div class="mobile-mars-item mobile-item-1" @click="toExhibition(50)">
          <p>{{ $t("item_1") }}</p>
        </div>
        <div class="mobile-mars-item mobile-item-2" @click="toExhibition(53)">
          <p>{{ $t("item_2") }}</p>
        </div>
        <div class="mobile-mars-item mobile-item-3" @click="toExhibition(48)">
          <p>{{ $t("item_3") }}</p>
        </div>
        <div class="mobile-mars-item mobile-item-4" @click="toExhibition(52)">
          <p>{{ $t("item_4") }}</p>
        </div>
        <div class="mobile-mars-item mobile-item-5" @click="toExhibition(49)">
          <p>{{ $t("item_5") }}</p>
        </div>
        <div class="mobile-mars-item mobile-item-6" @click="toExhibition(51)">
          <p>{{ $t("item_6") }}</p>
        </div>
      </div>
    </div>
    <div class="epilogue" v-if="notMobile">
      <div>
        <div class="epilogue-title">{{ $t("epilogue") }}</div>
      </div>
      <img
        src="../assets/epilogue_img.webp"
        class="epilogue-img noSelect"
        alt="epilogue-img"
        @dragstart.prevent
      />
      <div class="epilogue-paragraph">
        <p>{{ $t("ep_1") }}</p>
        <p>{{ $t("ep_2") }}</p>
        <p>{{ $t("ep_3") }}</p>
        <p>{{ $t("ep_4") }}</p>
        <p>{{ $t("ep_5") }}</p>
        <p>{{ $t("ep_6") }}</p>
        <p>{{ $t("ep_7") }}</p>
        <p>{{ $t("ep_8") }}</p>
      </div>
    </div>
    <div
      class="mobile-epilogue"
      v-else
      :style="
        $i18n.locale === 'cn'
          ? ''
          : 'background-image:url(' +
            require('../assets/mobile/epilogue_en.webp') +
            ')'
      "
    >
      <div class="sponsor" @click="toSponsor"></div>
      <div class="graduate" @click="toGraduate"></div>
    </div>

    <div v-if="show" class="video-class" @click="show = false">
      <div @click.stop class="main-video-class">
        <video-player
          class="video-player vjs-custom-skin vjs-big-play-centered"
          ref="videoPlayer"
          @click.stop
          :playsinline="true"
          :options="playerOptions"
        >
        </video-player>
      </div>
    </div>
    <div
      :class="'mobile-welcome' + (ani ? ' ani' : '')"
      v-if="!notMobile && !hideWelcome"
      @click="hideIt"
    >
      <img
        src="../assets/mobile/welcome.webp"
        alt="welcome"
        class="noSelect"
        @dragstart.prevent
      />
    </div>
  </div>
</template>

<script>
import Paper from "paper";
import * as Matter from "matter-js";
let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Bodies = Matter.Bodies,
  Svg = Matter.Svg,
  Vertices = Matter.Vertices;
Common.setDecomp(require("pathseg"));
Common.setDecomp(require("poly-decomp"));
import { VIDEO_BASE_URL } from "../utils/constants.js";
export default {
  name: "Home",
  props: ["notMobile"],
  data() {
    return {
      show: false,
      hoverOthers: false,
      videoStatue: true,
      ani: false,
      path: [],
      width: 0,
      height: 0,
      time: 0,
      myPaper: [],
      myVertices: [],
      project: null,
      backGround: 1,
      group: [],
      circles: [],
      hideWelcome: true,
      svgArr: [
        require("../assets/tests_2.svg"),
        require("../assets/tests_3.svg"),
        require("../assets/tests_4.svg"),
        require("../assets/tests_2.svg"),
        require("../assets/tests_5.svg"),
        require("../assets/tests_5.svg"),
        require("../assets/tests_4.svg"),
        require("../assets/tests_6.svg"),
      ],
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: VIDEO_BASE_URL + "simple.mp4", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
    };
  },
  methods: {
    hideIt() {
      window.sessionStorage.setItem("idesign_2022_mobile_welcome", "true");
      this.ani = true;
      setTimeout(() => {
        this.hideWelcome = true;
        this.ani = false;
      }, 1000);
    },
    toExhibition(category_id) {
      if (
        this.$route.params.category_id !== "" + category_id ||
        this.$route.params.id
      ) {
        this.$router.push("/exhibition/" + category_id);
      }
    },
    toGraduate() {
      this.$router.push("/graduate");
    },
    toSponsor() {
      this.$router.push("/sponsor");
    },
    toVideo() {
      this.show = true;
    },
    toAni() {
      window.open("https://b23.tv/5kbSDZr", "_blank");
    },
    toOnline() {
      window.open("https://njzv43.epub360.cn/v2/manage/book/easamt/", "_blank");
    },
    loopAni() {
      for (let i = 0; i < this.myVertices.length; i++) {
        for (let j = 0; j < this.myVertices[i].vertices.length; j++) {
          this.myPaper[i].segments[j].point.x =
            this.myVertices[i].vertices[j].x;
          this.myPaper[i].segments[j].point.y =
            this.myVertices[i].vertices[j].y;
        }
      }
      window.requestAnimationFrame(this.loopAni.bind(this));
    },
  },
  mounted() {
    if (!this.notMobile) {
      this.hideWelcome = window.sessionStorage.getItem(
        "idesign_2022_mobile_welcome"
      );
    }
    let direction = [1, 2, 3, 4][Math.floor(Math.random() * 4)];
    this.backGround = [true, false][Math.floor(Math.random() * 2)];
    this.loopAni();
    this.project = new Paper.Project(document.getElementById("myCanvas"));
    let dom = document.getElementById("matter");
    let subDom = document.getElementById("world");
    this.width = dom.offsetWidth;
    this.height = this.notMobile ? this.width * 0.495 : this.width * 0.949;
    let engine = Engine.create(),
      world = engine.world;
    engine.timeScale = 1.2;
    document.querySelectorAll("canvas").forEach((node) => {
      node.addEventListener(
        "mousewheel",
        (event) => event.stopImmediatePropagation(),
        true
      );
      node.addEventListener(
        "DOMMouseScroll",
        (event) => event.stopImmediatePropagation(),
        true
      );
    });
    //1↑ 3↓ 2← 4→
    engine.gravity.x = direction % 2 ? 0 : direction === 2 ? -1 : 1;
    engine.gravity.y = direction % 2 === 0 ? 0 : direction === 1 ? -1 : 1;
    let render = Render.create({
      canvas: subDom,
      engine: engine,
      options: {
        width: this.width,
        height: this.height,
        wireframes: false,
      },
    });
    window.addEventListener(
      "resize",
      () => {
        if (document.getElementById("matter")) {
          this.width = document.getElementById("matter").offsetWidth;
          this.height = this.notMobile
            ? this.width * 0.495
            : this.width * 0.949;
        }
      },
      false
    );
    Render.run(render);
    let runner = Runner.create();
    Runner.run(runner, engine);

    let wall1 = Bodies.rectangle(this.width / 2, this.height + 60, 1, 1, {
      isStatic: true,
    });
    Body.scale(wall1, 20 * this.width, 120);
    let wall2 = Bodies.rectangle(this.width / 2, -60, 1, 1, { isStatic: true });
    Body.scale(wall2, 20 * this.width, 120);
    let wall3 = Bodies.rectangle(this.width + 60, this.height / 2, 1, 1, {
      isStatic: true,
    });
    Body.scale(wall3, 120, 20 * this.height);
    let wall4 = Bodies.rectangle(-60, this.height / 2, 1, 1, {
      isStatic: true,
    });
    Body.scale(wall4, 120, 20 * this.height);
    let walls = [];
    if (direction !== 1) walls.push(wall1);
    if (direction !== 3) walls.push(wall2);
    if (direction !== 2) walls.push(wall3);
    if (direction !== 4) walls.push(wall4);
    Composite.add(world, walls);
    let select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };
    let loadSvg = function (url) {
      return fetch(url)
        .then(function (response) {
          return response.text();
        })
        .then(function (raw) {
          return new window.DOMParser().parseFromString(raw, "image/svg+xml");
        });
    };
    this.svgArr.forEach((path, i) => {
      loadSvg(path).then((root) => {
        select(root, "path").map((path) => {
          let temp = new Paper.Path();
          let grouper = new Paper.Group([temp]);
          grouper.clipped = true;
          let rasterImg = new Paper.Raster({
            source: this.notMobile
              ? require("../assets/background_" +
                  (this.backGround ? 1 : 2) +
                  ".webp")
              : require("../assets/mobile/background_1.webp"),
            smoothing: "high",
          });
          rasterImg.scale(10);
          rasterImg.fitBounds(Paper.view.bounds, true);
          grouper.addChild(rasterImg);
          let vertexSets = Vertices.scale(
            Svg.pathToVertices(path, 30),
            this.width / 1920,
            this.width / 1920
          );
          window.addEventListener(
            "resize",
            () => {
              rasterImg.fitBounds(Paper.view.bounds, true);
            },
            false
          );
          let vertices = Bodies.fromVertices(
            direction % 2
              ? (i * this.width) / this.svgArr.length
              : direction === 2
              ? this.width
              : 0,
            direction % 2 === 0
              ? (i * this.height) / this.svgArr.length
              : direction === 1
              ? this.height
              : 0,
            vertexSets,
            {
              render: {
                lineWidth: 2,
              },
              density: Math.random(0.005, 0.01),
              restitution: 0.5,
            },
            true,
            0,
            0,
            0
          );
          vertexSets.map((item) => {
            temp.add(new Paper.Point(item.x, item.y));
          });
          Composite.add(world, vertices);
          this.myVertices.push(vertices);
          this.group.push(grouper);
          this.myPaper.push(temp);
        });
      });
    });
    let mouse = Mouse.create(render.canvas);
    let mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.8,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;
  },
};
</script>
<style scoped>
.home {
  position: relative;
  width: 1920px;
  padding-top: 950px;
  background-image: url("../assets/background.webp");
  background-size: 1920px 2858px;
  background-position-x: -85px;
  background-position-y: 80px;
  background-repeat: no-repeat;
  overflow: hidden;
  background-color: #ffffff;
}
#matter {
  position: absolute;
  left: 0;
  top: 0;
  width: 1920px;
  height: 950px;
  background-size: 100% 100%;
  overflow: hidden;
}
#matter div {
  position: absolute;
  width: 400px;
  height: 120px;
  right: 70px;
  top: 295px;
  cursor: pointer;
}
#matter >>> canvas {
  width: 100%;
  height: 100%;
  background: transparent !important;
  opacity: 0;
}
#myCanvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 1920px;
  height: 950px;
  pointer-events: none;
}
.preface {
  position: relative;
  width: 1920px;
  height: 375px;
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
  padding: 30px 140px;
  display: grid;
  grid-template-columns: auto 530px 430px auto;
  overflow: visible;
}
.preface-title {
  display: inline-block;
  font-size: 50px;
  font-weight: 500;
  height: 65px;
  text-align: left;
  padding-right: 20px;
  overflow: hidden;
  border-right: 3px solid #dd6260;
  margin-top: 20px;
}
.preface-paragraph {
  padding-left: 30px;
  font-size: 24px;
  color: #000;
  padding-top: 105px;
  line-height: 42px;
  overflow: visible;
}
.preface-paragraph p {
  overflow: visible;
}
.p1 {
  font-weight: 600;
  width: 320px;
  padding-left: 40px;
}
.p2 {
  text-align: center;
  font-weight: 600;
  width: 320px;
}
.p3 {
  text-align: right;
  font-weight: 600;
  width: 280px;
}
.preface-paragraph-2 {
  align-self: end;
}
.pre-left {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 370px;
  height: 375px;
}
.pre-right {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 370px;
  height: 375px;
}
.mars {
  position: relative;
  width: 1920px;
  background-color: rgba(207, 27, 38, 0.2);
  border-bottom: 1px solid #707070;
  padding: 60px 140px;
}
.mars-paragraph {
  margin-right: 180px;
  font-size: 24px;
  text-overflow: unset;
  white-space: unset;
  margin-bottom: 20px;
  color: #dd6260;
  font-weight: 600;
}
.mars-enter {
  position: absolute;
  right: 140px;
  top: 60px;
  width: 137.5px;
  height: 110px;
}
.mars-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.mars-item {
  width: 225px;
  height: 550px;
  background-size: 435px 550px;
  background-repeat: no-repeat;
  transition: all 0.5s ease-in-out;
  padding: 18px;
  cursor: pointer;
}
.mars-item p {
  font-family: "REEJI-FlashSansGB-Flash-Light";
  writing-mode: vertical-lr;
  font-weight: 600;
  font-size: 48px;
  color: #fff;
}
.item-1 {
  background-image: url("../assets/item_1.webp");
}
.item-2 {
  background-image: url("../assets/item_2.webp");
}
.item-3 {
  background-image: url("../assets/item_3.webp");
}
.item-4 {
  background-image: url("../assets/item_4.webp");
}
.item-5 {
  background-image: url("../assets/item_5.webp");
}
.item-6 {
  background-image: url("../assets/item_6.webp");
}
.item-01 {
  width: 435px !important;
}
.item-2:hover,
.item-3:hover,
.item-4:hover,
.item-5:hover,
.item-6:hover {
  width: 435px;
}
.epilogue {
  position: relative;
  width: 1920px;
  height: 700px;
  padding: 30px 140px;
  display: grid;
  grid-template-columns: auto 888px;
  grid-template-rows: 100px auto;
}
.epilogue-img {
  width: 888px;
  height: 593px;
  grid-auto-rows: 1/3;
}
.epilogue-title {
  display: inline-block;
  overflow: visible;
  font-size: 50px;
  font-weight: 500;
  padding-right: 20px;
  border-right: 3px solid #dd6200;
  height: 65px;
  margin-top: 30px;
}
.epilogue-paragraph {
  margin-top: 40px;
  font-size: 24px;
  color: #000;
}
.epilogue-paragraph p {
  line-height: 42px;
  margin-bottom: 10px;
}
.video-class {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.main-video-class {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 680px;
}
.ani {
  transform: translateY(-100vh);
  opacity: 0;
}
.enter-class {
  position: absolute;
  height: 60px;
  left: 4px;
  top: 320px;
}
@media screen and (max-width: 620px) {
  .home {
    position: relative;
    width: 414px;
    padding-top: 393px;
    background: none;
  }
  .back-img {
    position: absolute;
    width: 151px;
    height: 1041px;
    left: 215px;
    top: 381px;
  }
  #matter {
    width: 414px;
    height: 393px;
    background-size: 100% 100%;
    overflow: hidden;
    z-index: -1;
  }
  #myCanvas {
    width: 414px;
    height: 393px;
    pointer-events: none;
  }
  .mobile-preface {
    margin-top: -12px;
    width: 414px;
    height: 317px;
    background: #d36a64;
    border-radius: 12px 12px 0px 0px;
    background-image: url("../assets/mobile/preface.webp");
    background-size: 414px 317px;
    background-repeat: no-repeat;
  }
  .mobile-mars {
    position: relative;
    width: 414px;
    height: 326px;
    background: #ffffff;
    padding: 16px 0;
  }
  .mobile-mars-titles {
    position: relative;
    white-space: nowrap;
    width: 414px;
    overflow-x: auto !important;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }
  .mobile-mars-title {
    display: inline-block;
    height: 30px;
    background-color: #d36a64;
    box-shadow: 0px 1px 6px rgba(113, 58, 58, 0.2);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    color: white;
    margin-left: 16px;
    padding: 0 20px;
    line-height: 30px;
  }
  .mobile-mars-sub-title {
    display: inline-block;
    height: 30px;
    font-size: 12px;
    font-weight: 500;
    color: #4f514e;
    margin-left: 16px;
    padding: 0 10px;
    line-height: 30px;
  }
  .mobile-mars-items {
    white-space: nowrap;
    position: relative;
    margin-top: 12px;
    width: 414px;
    overflow-x: auto !important;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    padding: 0 16px;
  }
  .mobile-mars-titles::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  .mobile-mars-items::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  .mobile-mars-item {
    display: inline-block;
    position: relative;
    width: 180px;
    height: 236px;
    background-size: 180px 236px;
    background-repeat: no-repeat;
    margin-right: 6px;
  }
  .mobile-mars-item p {
    position: absolute;
    font-size: 20px;
    color: #fff;
    font-weight: 600;
    bottom: 12px;
    left: 12px;
  }
  .mobile-epilogue {
    position: relative;
    width: 414px;
    height: 381px;
    margin-bottom: 36px;
    background-image: url("../assets/mobile/epilogue.webp");
    background-size: 414px 381px;
    background-repeat: no-repeat;
  }
  .sponsor {
    position: absolute;
    bottom: 20px;
    left: 37px;
    width: 130px;
    height: 40px;
  }
  .graduate {
    position: absolute;
    bottom: 20px;
    right: 37px;
    width: 130px;
    height: 40px;
  }
  .mobile-item-1 {
    background-image: url("../assets/mobile/item_1.webp");
  }
  .mobile-item-2 {
    background-image: url("../assets/mobile/item_2.webp");
  }
  .mobile-item-3 {
    background-image: url("../assets/mobile/item_3.webp");
  }
  .mobile-item-4 {
    background-image: url("../assets/mobile/item_4.webp");
  }
  .mobile-item-5 {
    background-image: url("../assets/mobile/item_5.webp");
  }
  .mobile-item-6 {
    background-image: url("../assets/mobile/item_6.webp");
  }
  .mobile-welcome {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99998;
    background-color: #d36a64;
    overflow: hidden;
    transition: all 0.75s ease-in;
  }
  .mobile-welcome img {
    width: 100%;
    z-index: 99999;
  }
}
</style>
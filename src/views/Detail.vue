<template>
  <div class="detail-class">
    <div class="back-class noSelect" @click="toBack" v-if="notMobile">
      <div></div>
      <span>返回</span>
    </div>
    <p class="title-class">{{ data.post_title }}</p>
    <p class="title-en-class">{{ data.post_title_en }}</p>
    <div class="row-1">
      <div>
        <div class="row-2">
          <div>
            <div class="t1-class">
              <div class="t1-label-class">
                <p>指导教师</p>
                <p>Supervisor</p>
              </div>
              <div class="t1-content-class">
                <p>{{ data.tutors_zh }}</p>
                <p>{{ data.tutors_en }}</p>
              </div>
            </div>
          </div>
          <div class="center-class">
            <div style="display: inline-block">
              <div class="t1-class">
                <div class="t1-label-class">
                  <p>课程名称</p>
                  <p>Course Name</p>
                </div>
                <div class="t1-content-class">
                  <p>{{ data.course_zh }}</p>
                  <p>{{ data.course_en }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-row>
          <v-col sm="12">
            <div class="t1-class">
              <div class="t1-label-class">
                <p>设计师</p>
                <p>Designer</p>
              </div>
              <div class="t1-content-class authors-class">
                <div
                  v-for="(item, i) in data.authors"
                  :key="i"
                  class="author-class"
                >
                  <img
                    :src="staticBaseUrl + item.url"
                    :preview="i * 10"
                    :preview-text="
                      item.zh_names + ' ' + item.en_names + ' ' + item.grade
                    "
                  />
                  <p>{{ item.zh_names }}</p>
                  <p>{{ item.en_names }}</p>
                  <p>{{ item.grade }}</p>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="right-class">
        <div style="display: inline-block">
          <div class="t1-class">
            <div class="t1-label-class">
              <p>关键词</p>
              <p>Keywords</p>
            </div>
            <div class="t1-content-class">
              <p v-for="item in data.keywords_zh" :key="item">{{ item }}</p>
              <p v-for="item in data.keywords_en" :key="item">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-row no-gutters>
      <v-col md="6" sm="12" cols="12"
        ><img :src="data.thumbnail" style="width: 100%" preview="2"
      /></v-col>
      <v-col md="6" sm="12" cols="12" class="intro-class"
        ><p>{{ data.intro_zh }}</p>
        <p>{{ data.intro_en }}</p></v-col
      >
    </v-row>
    <v-row class="photos-class">
      <div class="flex-class">
        <div style="position: relative">
          <div
            style="position: absolute; width: 100%; height: 100%"
            v-show="data.isVideo"
            @click="showVideo"
          >
            <img class="useVideo-class" src="../assets/play.svg" />
          </div>
          <img
            :src="staticBaseUrl + data.photos[0].url"
            style="width: 100%"
            preview="3"
          />
        </div>
        <img
          :src="staticBaseUrl + data.photos[1].url"
          style="width: 100%"
          preview="4"
        />
      </div>
      <div class="great-class">
        <img
          :src="staticBaseUrl + data.photos[2].url"
          style="width: 100%; height: 100%"
          preview="5"
        />
      </div>
      <div class="flex-class">
        <img
          :src="staticBaseUrl + data.photos[3].url"
          style="width: 100%"
          preview="6"
        /><img
          :src="staticBaseUrl + data.photos[4].url"
          style="width: 100%"
          preview="7"
        />
      </div>
    </v-row>
    <v-row class="copyright-class"
      ><p>
        本页面的所有内容均为原创。对未经许可擅自使用者，我们保留追究其法律责任的权利。
      </p>
      <p>
        We own the intelligent rights for all original substance in this page
        and hold the right to investigate legal responsibilities to who use it
        without permission.
      </p></v-row
    >
    <div class="fork-class noSelect">
      <div
        :class="{ 'fork-icon-class-1': true, 'disable-class': !canPre }"
        @click="toPre"
      ></div>
      <div class="fork-text-class" @click="toBack">返回作品列表</div>
      <div
        :class="{ 'fork-icon-class-2': true, 'disable-class': !canNext }"
        @click="toNext"
      ></div>
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
  </div>
</template>
<script>
import service from "../utils/request.js";
import { UPLOAD_URL } from "../utils/constants.js";

export default {
  name: "detail",
  props: {
    list: String,
    current: String,
    notMobile: Boolean,
  },
  data: () => ({
    show: false,
    canPre: false,
    canNext: false,
    staticBaseUrl: UPLOAD_URL,
    data: {
      post_title: "",
      post_title_en: "",
      course_zh: "",
      course_en: "",
      keywords_zh: "",
      keywords_en: "",
      intro_zh: "",
      intro_en: "",
      tutors_zh: "",
      tutors_en: "",
      thumbnail: "",
      photos: [{ url: "" }, { url: "" }, { url: "" }, { url: "" }, { url: "" }],
      authors: [],
      isVideo: false,
    },
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
          src: "", // url地址
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
  }),
  methods: {
    toBack() {
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
      } else {
        this.$router.go(-1);
      }
    },
    toPre() {
      if (this.canPre) {
        let arr = this.list.split("_");
        this.$router.push({
          path:
            "/exhibition/" +
            this.$route.params.category_id +
            "/" +
            arr[parseInt(this.current) - 1],
          query: {
            list: this.list,
            current: parseInt(this.current) - 1,
          },
        });
      }
    },
    toNext() {
      if (this.canNext) {
        let arr = this.list.split("_");
        this.$router.push({
          path:
            "/exhibition/" +
            this.$route.params.category_id +
            "/" +
            arr[parseInt(this.current) + 1],
          query: {
            list: this.list,
            current: parseInt(this.current) + 1,
          },
        });
      }
    },
    findDetail() {
      if (this.$route.params.category_id && this.$route.params.id)
        service(
          "/portal/api_v1/get_design_detail?category_id=" +
            this.$route.params.category_id +
            "&id=" +
            this.$route.params.id
        ).then((data) => {
          this.data.post_title = data.data.post_title;
          this.data.post_title_en = data.data.post_title_en;
          this.data.course_zh = data.data.course_zh;
          this.data.course_en = data.data.course_en;
          this.data.keywords_zh = data.data.keywords_zh.split("|");
          this.data.keywords_en = data.data.keywords_en.split("|");
          this.data.intro_zh = data.data.intro_zh;
          this.data.intro_en = data.data.intro_en;
          this.data.tutors_zh = data.data.tutors_zh;
          this.data.tutors_en = data.data.tutors_en;
          this.data.thumbnail = this.staticBaseUrl + data.data.more.thumbnail;
          this.data.photos = data.data.more.photos || [];
          this.data.authors = data.data.more.authors || [];
          this.data.isVideo = data.data.more.files?.length > 0;
          this.playerOptions.sources[0].src = this.data.isVideo
            ? this.staticBaseUrl + data.data.more.files[0].url
            : "";
          this.$previewRefresh();
        });
    },
    showVideo() {
      this.show = true;
    },
    initData() {
      this.findDetail();
      this.canPre =
        this.list != undefined &&
        this.current != undefined &&
        parseInt(this.current) > 0;
      this.canNext =
        this.list != undefined &&
        this.current != undefined &&
        parseInt(this.current) < this.list.split("_").length - 2;
    },
  },
  watch: {
    $route() {
      this.initData();
    },
  },
  created() {
    this.initData();
  },
};
</script>
<style scoped>
p {
  text-emphasis: none !important;
  white-space: unset !important;
  overflow: unset !important;
}
* {
  overflow-y: hidden !important;
}
.detail-class {
  padding: 50px 150px;
  overflow-y: visible;
}
.disable-class {
  opacity: 0.6;
  cursor: not-allowed !important;
}
.fork-class {
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fork-class div {
  border: 1px solid #4e4e4e;
  border-radius: 5px;
  cursor: pointer;
}
.fork-icon-class-1 {
  width: 32px;
  height: 32px;
  background-image: url("../assets/left.webp");
  background-size: 24px 24px;
  background-position: center center;
  background-repeat: no-repeat;
}
.fork-icon-class-2 {
  width: 32px;
  height: 32px;
  background-image: url("../assets/right.webp");
  background-size: 24px 24px;
  background-position: center center;
  background-repeat: no-repeat;
}
.fork-text-class {
  padding: 5px 25px;
  margin: 0 25px;
  color: #4e4e4e;
  font-size: 16px;
}
.title-class {
  font-size: 36px;
  color: #4e4e4e;
  letter-spacing: 3px;
  margin-bottom: 5px;
}
.title-en-class {
  font-family: "Montserrat";
  margin-bottom: 40px;
  letter-spacing: 1px;
  font-size: 24px;
  color: #4e4e4e;
}
.t1-class {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-bottom: 15px;
}
.t1-label-class {
  vertical-align: top;
  min-width: 100px;
}
.t1-label-class p {
  white-space: nowrap;
  margin-bottom: 0;
  font-size: 18px;
  text-align: right;
  font-family: "Montserrat";
}
.t1-content-class {
  margin: 0 15px;
  padding-left: 15px;
  border-left: 2px solid #4e4e4e;
  text-align: left;
}
.t1-content-class p {
  white-space: nowrap;
  margin-bottom: 0;
  font-size: 15px;
  line-height: 24px;
  font-family: "Montserrat";
}
.authors-class {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.author-class {
  margin: 0 10px;
  margin-bottom: 10px;
  text-align: center;
  width: 85px;
}
.author-class img {
  width: 85px;
  height: 85px;
}
.author-class p {
  white-space: normal;
  word-wrap: break-word;
  margin-bottom: 0;
  width: 85px;
}
.right-class {
  text-align: right;
}
.center-class {
  text-align: center;
}
.offset-2-class {
  padding: 12px;
  margin-left: 12px;
}
.intro-class p {
  padding-left: 20px;
  text-align: justify;
  font-family: "Montserrat";
  font-size: 18px;
  color: #4e4e4e;
  margin-bottom: 5px;
}
.flex-class {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 36%;
}
.great-class {
  width: 27%;
}
.photos-class {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.copyright-class {
  margin-top: 15px;
  display: block;
}
.copyright-class p {
  margin-bottom: 5px;
  text-align: center;
  font-family: "Montserrat";
  font-size: 18px;
  color: #4e4e4e;
}
.useVideo-class {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-25px, -25px);
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.video-class {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
}
.main-video-class {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 680px;
}
.back-class {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  width: 125px;
  cursor: pointer;
}
.back-class div {
  width: 25px;
  height: 25px;
  border-radius: 50% 50%;
  background-image: url("../assets/back.webp");
  background-size: 18px 18px;
  background-position: 3px center;
  background-repeat: no-repeat;
  background-color: #4e4e4e;
  margin-right: 7px;
}
.back-class span {
  font-size: 22px;
  color: #4e4e4e;
  line-height: 24px;
}
.row-1 {
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-bottom: 20px;
}
.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 620px) {
  .row-1 {
    grid-template-columns: 1fr;
  }
  .row-2 {
    grid-template-columns: 1fr;
  }
  .copyright-class p {
    font-size: 14px;
  }
  .detail-class {
    padding: 20px;
    overflow-y: visible;
    background-color: #f8f8f8;
  }
  .title-class {
    font-size: 22px;
  }
  .title-en-class {
    font-size: 16px;
  }
  .intro-class p {
    padding-left: 0;
    font-size: 14px;
  }
  .author-class {
    width: 55px;
  }
  .author-class p {
    width: 55px;
    font-size: 10px;
  }
  .author-class img {
    width: 55px;
    height: 55px;
  }
  .right-class,
  .center-class {
    text-align: left;
  }
  .offset-1-class {
    margin-left: 21px;
  }
  .offset-2-class {
    margin-left: 32px;
  }
  .offset-3-class {
    padding: 12px;
    margin-left: 16px;
  }
  .t1-label-class {
    min-width: 90px;
  }
  .t1-label-class p {
    font-size: 14px;
  }
  .t1-content-class p {
    font-size: 11px;
    line-height: 21px;
  }
  .photos-class {
    flex-wrap: wrap;
  }
  .flex-class {
    display: block;
    width: calc(100vw - 30px);
    margin: 0;
  }
  .great-class {
    width: calc(100vw - 30px);
    height: calc(177.78vw - 53.33px);
    margin: 5px 0;
  }
  .main-video-class {
    width: 100vw;
    height: 56.25vw;
  }
}
</style>

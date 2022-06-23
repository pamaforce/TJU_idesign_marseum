<template>
  <div
    class="footer"
    :style="
      notMobile
        ? ''
        : $route.name === 'Home'
        ? ''
        : $route.name === 'Graduate' || $route.name === 'Sponsor'
        ? 'background-color:#e5e5e5'
        : 'background-color:#f8f8f8'
    "
  >
    <img
      alt="icon"
      :src="
        $route.params.category_id && !$route.params.id
          ? require('../assets/' + $route.params.category_id + '_6.png')
          : require('../assets/undefined_6.png')
      "
      :class="
        'noSelect ' +
        ($route.params.category_id && !$route.params.id
          ? 'sub-footer-icon'
          : 'footer-icon')
      "
      :style="
        notMobile
          ? ''
          : $route.name === 'Home'
          ? ''
          : $route.name === 'Graduate' || $route.name === 'Sponsor'
          ? 'background-color:#e5e5e5'
          : 'background-color:#f8f8f8'
      "
      @dragstart.prevent
    />
    <div class="links">
      <div class="specialGird-1 noSelect">相关网站</div>
      <div class="specialGird-2 noSelect">
        <a href="http://www.tju.edu.cn/" target="_blank">天津大学</a>
        <div>
          <a
            href="http://me.tju.edu.cn/"
            target="_blank"
            style="margin-right: 0"
            >机械工程学院</a
          >·<a href="http://idesign.tju.edu.cn/" target="_blank">工业设计</a>
        </div>
        <a href="http://arch.tju.edu.cn/" target="_blank">建筑学院</a>
        <a href="http://cic.tju.edu.cn/" target="_blank">智能与计算学部</a>
        <a
          href="javascript:void(0)"
          @mouseover="qrHover = true"
          @mouseout="qrHover = false"
          >宣怀学院</a
        >
      </div>
      <div class="specialGird-3 noSelect">历届年展</div>
      <div class="specialGird-2 noSelect">
        <a
          href="http://idesign.tju.edu.cn/exhibitions2021/index/index.html"
          target="_blank"
          >2021·第七届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/index.html"
          target="_blank"
          >2020·第六届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/5.html"
          target="_blank"
          >2019·第五届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/4.html"
          target="_blank"
          >2018·第四届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/3.html"
          target="_blank"
          >2017·第三届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/2.html"
          target="_blank"
          >2016·第二届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/1.html"
          target="_blank"
          >2015·第一届</a
        >
      </div>
      <div class="specialGird-3 noSelect">关于我们</div>
      <div class="specialGird-4">
        地址 / 中国·天津市津南区雅观路135号北洋园校区35教学楼
      </div>
      <div class="specialGird-5"></div>
      <div class="specialGird-4">电话 / 022-27402172</div>
      <div class="specialGird-4">邮箱 / idesign@tju.edu.cn</div>
      <div class="specialGird-4">邮编 / 300354</div>
    </div>
    <img
      src="../assets/qrcode.jpg"
      class="QR-code noSelect"
      alt="QRCode"
      v-show="qrHover"
      @dragstart.prevent
    />
    <p class="copyright noSelect">
      © 2022 天津大学机械工程学院机械工程系工业设计专业 版权所有
    </p>
  </div>
</template>
<script>
export default {
  props: ["notMobile"],
  data() {
    return {
      qrHover: false,
    };
  },
};
</script>

<style scoped>
.footer {
  height: 500px;
  width: 1920px;
  position: relative;
  border-top: 1px solid #707070;
  overflow: visible;
  background-color: #ffffff;
}
.footer-icon {
  position: absolute;
  width: 285px;
  height: 40px;
  top: -20px;
  right: 150px;
  background-color: white;
}
.sub-footer-icon {
  position: absolute;
  width: 285px;
  height: 50px;
  top: -25px;
  right: 150px;
  background-color: white;
}
.links {
  display: grid;
  grid-template-columns: 280px auto;
  grid-template-rows: 120px 60px 60px 60px 60px 60px;
  font-size: 24px;
  color: #000000;
}
.links a {
  text-decoration: none;
  font-size: 24px;
  color: #000000;
  margin-right: 40px;
}
.links a:hover {
  text-decoration: underline;
}
.specialGird-1 {
  align-self: end;
  justify-self: center;
}
.specialGird-2 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.specialGird-3 {
  align-self: end;
  justify-self: center;
}
.specialGird-4 {
  justify-self: start;
  align-self: end;
}
.specialGird-5 {
  grid-row: 4 / 7;
}
.QR-code {
  position: absolute;
  top: 130px;
  left: 1010px;
  width: 200px;
  height: 200px;
}
.copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: #000000;
}
@media screen and (max-width: 620px) {
  .footer {
    height: 180px;
    width: 100%;
    padding-top: 25px;
    background-color: #ffffff;
  }
  .links {
    display: grid;
    grid-template-columns: 80px auto;
    grid-template-rows: 20px 30px 15px 15px 15px 15px;
    font-size: 8px;
    align-items: start;
    color: #51514f;
  }
  .specialGird-1 {
    align-self: start;
    justify-self: center;
  }
  .specialGird-3 {
    align-self: start;
    justify-self: center;
  }
  .specialGird-4 {
    justify-self: start;
    align-self: start;
  }
  .links a {
    font-size: 8px;
    color: #51514f;
    margin-right: 14px;
  }
  .copyright {
    font-size: 8px;
    color: #51514f;
  }
  .specialGird-2 {
    flex-wrap: wrap;
  }
  .footer-icon {
    position: absolute;
    width: 96px;
    height: 14px;
    top: -7px;
    right: 40px;
    background-color: white;
  }
  .sub-footer-icon {
    position: absolute;
    width: 96px;
    height: 18px;
    top: -9px;
    right: 40px;
    background-color: white;
  }
  .QR-code {
    position: absolute;
    top: 40px;
    left: 320px;
    width: 75px;
    height: 75px;
  }
}
</style>
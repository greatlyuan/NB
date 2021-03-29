<template>
  <div id="app" class="mainBg">
    <app-header :show="show" @show="show = !show"></app-header>
    <div style="text-align: right" class="ztBj">
      <div class="btnT Wcolor font-Five">
        0x23n...90fdn
      </div>
    </div>
    <van-popup
      v-model="show"
      position="top"
      :style="{ width: '100%' }">
      <ul class="nav">
        <li
          v-for="(item, key) in navArr"
          :key="key"
          class="center font-Seven"
          :class="key == index ? 'blueColor' : 'titleColor'"
          @click="toJup(key, item.link)">
          {{ $t(item.title) }}
        </li>
      </ul></van-popup
    >
    <router-view />
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true,
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right',
        },
        rail: {
          background: 'transparent',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: 'transparent',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        },
      },
      navArr: [
        {
          title: 'App.one',
          link: '/',
        },
        {
          title: 'App.tow',
          link: '/exchange',
        },
        {
          title: 'App.three',
          link: '/profit',
        },
        {
          title: 'App.four',
          link: '/team',
        },
        {
          title: 'App.five',
          link: '/invite',
        },
      ],
      show: false,
      index: 0,
    };
  },
  watch:{
    path(val){
      switch(val){
        case '/home':
          this.index = 0;
          break;
        case '/exchange':
          this.index = 1;
          break;
        case '/profit':
          this.index = 2;
          break
        case '/team':
          this.index = 3;
          break;
        case '/invite':
          this.index = 4;
          break
      }
    }
  },
  computed: {
    path() {
      return this.$route.path;
    },
    ...mapState(['isLoading']),
  },
  methods: {
    toJup(index, link) {
      if (this.path == link) {
        this.show = !this.show;
        return;
      }
      this.index = index;
      this.show = !this.show;
      this.$router.push(link);
    },
  },
  created() {
    /* 初始化 */
    if (window.ethereum) {
      ethereum.enable();
    }

    console.log(this.api.Nb().methods)
  },
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
.nav li {
  height: 55px;
  line-height: 55px;
  transition: ease-in-out 0.1s;
}
.mainBg{
  .btnT {
    height: 30px;
    margin: 10px;
    padding: 0 20px;
    border: 1px solid #5d5f82;
    display: inline-block;
    border-radius: 20px;
    line-height: 30px;
  }
  /*.van-overlay{
    top: 55px;
  }*/
  .van-popup--top{
    top: 55px;
  }
}
</style>

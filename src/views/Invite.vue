<template>
  <div class="invite padding">
    <div class="font-Tt Wcolor invite-title">{{$t('App.five')}}</div>

    <!-- 二维码 -->
    <ul class="radius ztBj invite-main allFlex column">
      <li class="Wcolor font-Eight">{{$t('Invite.code')}}</li>
      <li id="code">
        <vue-qr :text="shareAddress" :size="size"></vue-qr>
      </li>
      <li
        class="invite-btn center Wcolor titleBg font-Five"
        v-clipboard:copy="shareAddress"
        v-clipboard:success="onCopy">
        {{$t('Invite.btn')}}
      </li>
    </ul>
  </div>
</template>
<script>
import VueQr from 'vue-qr';

export default {
  components: { VueQr },
  data() {
    return {
      address: '',
      size: 138,
      host: '',
    };
  },
  computed: {
    shareAddress() {
      return this.host + '?tgm=' + this.address;
    },
  },
  methods: {
    onCopy() {
      this.$toast(this.$t('Invite.copySuccess'));
    },
  },
  created() {
    let _this = this;
    let index = window.location.href.indexOf('#');
    _this.host = window.location.href.slice(0, index + 2);
  },
  mounted() {
    let _this = this;
    // 获取地址
    _this.api.Coinbase().then(res=>{
      this.address = res;
    }).catch(err=>{
      console.log(err)
    })
  },
};
</script>
<style scoped lang="scss">
.invite-title {
  margin: 10px 0;
}

.invite-main {
  //height: 330px;
  padding: 25px 10px;
  align-items: center;
}

#code {
  width: 138px;
  margin: 40px 0;
  height: 138px;
}

.invite-btn {
  width: 130px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
}
</style>

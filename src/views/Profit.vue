<template>
  <div class="profit padding">
    <div class="font-Tt Wcolor profit-title">{{$t('Profit.title')}}</div>

    <!-- 余额 -->
    <ul>
      <!-- cce -->
      <li class="allFlex profit-assets ztBj  radius">
        <img src="@img/icon_nbnb.png" alt="" />
        <div class="allFlex column profit-assets_value">
          <span class="Wcolor font-Five">NBNB</span>
          <span class="textColor font-Four">New Binance</span>
        </div>
        <div class="allFlex column">
          <span class="Wcolor font-Four">{{ profit._nbbalance }}</span>
          <span class="textColor font-Four">{{$t('Profit.walletBalance')}}</span>
        </div>
      </li>

      <!-- usdt -->
      <li class="allFlex profit-assets ztBj  radius">
        <img src="@img/icon_usdt.png" alt="" />
        <div class="allFlex column profit-assets_value">
          <span class="Wcolor font-Five">USDT</span>
          <span class="textColor font-Four">TetherUS</span>
        </div>
        <div class="allFlex column">
          <span class="Wcolor font-Four">{{ profit._usdtbalance }}</span>
          <span class="textColor font-Four">{{$t('Profit.walletBalance')}}</span>
        </div>
      </li>
    </ul>

    <!-- 累计收益 -->
    <ul class="ztBj profit-balance allFlex column radius">
      <li class="f1 allFlex column center">
        <span class="textColor font-Four">{{$t('Profit.profit1')}}</span>
<!--        <span class="Wcolor font-Four">{{ profit.all }}</span>-->
      </li>
      <li class="allFlex f1">
        <div class="allFlex column center">
          <span class="textColor font-Four">{{$t('Profit.profit2')}}</span>
          <span class="Wcolor font-Four margin-10">{{ profit._dprofit }}</span>
        </div>

        <div class="allFlex column center">
          <span class="textColor font-Four">{{$t('Profit.profit3')}}</span>
          <span class="Wcolor font-Four margin-10">{{ profit._sprofit }}</span>
        </div>
      </li>
    </ul>

    <div class="padding titleNav record-title blueBg  allFlex">
      <span
        v-for="(item, key) in navArr"
        :key="key"
        class="font-Eight nav-pos"
        @click="changeRecordArr(key)"
        :class="index == key ? 'Wcolor' : 'navColor'"
        >{{ $t(item) }}</span>
    </div>

    <!-- 记录 -->
    <ul class="record-ul">
      <li
        v-for="(item, key) in recordArr"
        :key="'record' + key"
        class="allFlex ztBj"
        :class="key !== 0 && 'li'">
        <div class="allFlex column">
          <span class="Wcolor font-Six">{{ $t(navArr[index]) }}</span>
          <span class="textColor font-Four margin-top-5">{{ item.time | formatDates }}</span>
        </div>
        <span class="font-Eight blueColor">+{{ item.number }} NBNB</span>
      </li>
    </ul>
  </div>
</template>
<script>

import {numberUtil} from "@/utils/common";

export default {
  data() {
    return {
      profitData: {},
      profit: {
        _nbbalance: 0.0000,
        _usdtbalance: 0.0000,
        _sprofit: 0,
        _dprofit: 0,
        _o: []
      },
      navArr: ['Profit.nav1', 'Profit.nav2'],
      index: 0,
      recordArr: [],
      recordArr1: [],
      recordArr2: [],
    };
  },
  mounted() {

  },
  async created() {
    let _this = this;
    // 获取地址
    await _this.api.Coinbase().then(res=>{
      this.coinbase = res;
    }).catch(err=>{
      console.log(err)
    })
    // 初始化
    this.init();
  },
  methods: {
    init(){
      this.getProfitInfo();
    },

    getProfitInfo(){
      let _this = this;
      const param = {
        from: _this.coinbase,
        value: "0x0",
        data: "0x"
      };

      _this.api.Nb().methods.profitinfo(_this.coinbase).call(param,(err,res) => {
        console.log(res)
        if(res){
          let obj = [];
          _this.profitData = res;
          _this.profit._nbbalance = Number(numberUtil(_this.profitData._nbbalance,6)).toFixed(4);
          _this.profit._usdtbalance = Number(numberUtil(_this.profitData._usdtbalance,6)).toFixed(4);
          _this.profit._sprofit = Number(numberUtil(_this.profitData._sprofit,6)).toFixed(4);
          _this.profit._dprofit = Number(numberUtil(_this.profitData._dprofit,6)).toFixed(4);
          _this.profitData._o.forEach((itme) => {
            obj.push({
              type: itme._type,
              number: Number(numberUtil(itme.number,6)).toFixed(4),
              time: itme.time
            });
          });
          _this.recordArr1 = obj.filter((item) => item.type == 1);
          _this.recordArr2 = obj.filter((item) => item.type == 0);
          this.changeRecordArr(_this.index);
        }
      })

    },

    changeRecordArr(key) {
      let _this = this;
      _this.index = key;
      if (key == 0) {
        _this.recordArr = _this.recordArr1.sort((a, b) => b.time - a.time);
      } else if (key == 1) {
        _this.recordArr = _this.recordArr2.sort((a, b) => b.time - a.time);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.profit {
  padding-bottom: 10px;
}
.profit-title {
  margin: 10px 0;
}

.profit-assets {
  height: 70px;
  padding: 15px 10px;
  justify-content: flex-start;
  margin-bottom: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  &_value {
    width: 100px;
    margin: 0 20px 0 20px;
  }
}

.profit-balance {
  //height: 130px;
  padding: 10px;
  margin-bottom: 10px;
  li {
    margin: 10px 0;
  }
  li,
  div {
    padding: 4px 0;
  }
}
.profit-balance2 {
  height: 200px;
  padding: 10px;
  margin-bottom: 10px;
  li,
  div {
    padding: 4px 0;
  }
}
.get-btn {
  height: 40px;
  line-height: 40px;
  border-radius: 25px;

  background: linear-gradient(90deg, #13a2dd 0%, #70ddca 99%);
  width: 40%;
  margin: 10px auto 0;
}

.record-title span {
  transition: ease-in-out 0.1s;
}

.record-ul li {
  height: 70px;
  padding: 15px 10px;

  align-items: center;
  &.li {
    margin-top: 20px;
    border-radius: 10px;
  }
  &:first-child {
    border-radius: 0 0 10px 10px !important;
  }
}

.nav-pos{
  width: 50% !important;
  text-align: center;
}
</style>

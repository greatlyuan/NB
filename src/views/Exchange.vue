<template>
  <div class="exchange allFlex column">
    <h2 class="allTitle">{{$t('App.tow')}}</h2>
    <p class="ts Wcolor">{{$t('Exchange.text')}}</p>
    <div class="topone">
      <div class="bottom allFlex home-assets ztBj">
        <ul>
          <!-- usdt -->
          <li class="allFlex exchange-assets ztBj radius">
            <img src="@img/icon_usdt.png" alt="" />
            <div class="allFlex column exchange-assets_value">
              <span class="Wcolor font-Five">{{$t('Exchange.usdt')}}</span>
              <span class="textColor font-Four">{{$t('Exchange.walletBalance')}}</span>
            </div>
            <div class="allFlex column">
              <span class="Wcolor font-Four">{{ flashcash._usdtbalance }}</span>
              <span class="textColor font-Four">{{$t('Exchange.balance')}}</span>
            </div>
          </li>
        </ul>
        <div
            class="btn blueColor font-Five center"
            @click="empowerDialogShow">
          {{$t('Exchange.charge')}}
        </div>
      </div>
    </div>

    <!--  授权  -->
    <van-popup v-model="empowerShow" round :style="{  width: '90%' }">
      <div class="dailog allFlex column">
        <p class="titleColor Bold">{{$t('Exchange.charge')}}</p>
        <div class="input">
          <input type="number" v-model="usdtNumber" />
          <div class="right allFlex centerAll">
            <span class="blueColor" @click="usdtNumber = Number(flashcash._usdtbalance).toFixed(0)">
              {{$t('Exchange.all')}}
            </span>
            <div></div>
            <span class="titleColor Bold">{{$t('Exchange.usdt')}}</span>
          </div>
        </div>
        <div class="btn center Wcolor" @click="toEmpower">{{$t('Exchange.confirm')}}</div>
      </div>
    </van-popup>

    <div class="pool">
      <div class="bottom allFlex ztBj Wcolor">
        <img src="../assets/img/icon_usdt.png" v-if="!type" />
        <img src="../assets/img/icon_nbnb.png" v-if="type" />
        <p>{{ type ? 'NBNB' : 'USDT' }}</p>
        <img
            src="../assets/img/exchange.png"
            class="jh"
            @click="
            type = !type;
            buyNumber = 0;
          "
        />
        <!-- 关闭usdt兑换nbnb -->
        <!--        <img
                  src="../assets/img/exchange.png"
                  class="jh"
                />-->
        <img src="../assets/img/icon_usdt.png" v-if="type" />
        <img src="../assets/img/icon_nbnb.png" v-if="!type" />
        <p>{{ type ? 'USDT' : 'NBNB' }}</p>
      </div>
    </div>

    <!--    参与    -->
    <div class="join allFlex column ztBj">
      <div class="allFlex ts">
        <span class="Wcolor">{{$t('Exchange.number')}}</span>
        <span class="blueColor" v-if="!type">
          {{$t('Exchange.rate')}}1 USDT={{ nbToUUsdt }} NBNB
        </span>
        <span class="blueColor" v-if="type">
          {{$t('Exchange.rate')}}1 NBNB={{ usdtToNb }} USDT
        </span>
      </div>
      <div class="input">
        <input type="number" v-model="buyNumber" class="Wcolor" />
        <div class="right allFlex centerAll">
          <span class="blueColor" @click="all">{{$t('Exchange.all')}}</span>
          <div></div>
          <p class="Wcolor Bold">{{ type ? 'USDT' : 'NBNB' }}</p>
        </div>
      </div>
      <p class="balance" v-if="type">
        {{$t('Exchange.procedures')}}
        <span class="blueColor">
          {{flashcash._usdtbalance }}
        </span>
        {{$t('Exchange.usdt')}}
      </p>
      <div class="btn Wcolor font-Five center" @click="redeemNow">
        {{$t('Exchange.confirm')}}
      </div>
      <div v-if="!type" class="YFcolor">
        {{$t('Exchange.notes')}}
      </div>
    </div>

    <!-- 兑换记录 -->
    <div class="padding titleNav record-title  allFlex">
      <span class="font-Eight Wcolor">{{$t('Exchange.record')}}</span>
    </div>
    <!-- 记录 -->
    <ul class="record-ul">
      <li
        v-for="(item, key) in recordArr"
        :key="'record' + key"
        class="allFlex   ztBj"
        :class="key !== 0 && 'li'">
        <div class="allFlex column">
          <span class="Wcolor font-Six">
            {{$t('Exchange.exchange')}}
            {{ item.type === 1 ? 'NBNB' : 'USDT' }}
          </span>
          <span class="textColor font-Four">{{ item.time | formatDates }}</span>
        </div>
        <div class="allFlex column">
          <span class="font-Eight blueColor right">
            +
            {{ item.type === 1 ? item.nbnumber : item.usdtnumber }}
            {{ item.type === 1 ? 'NBNB' : 'USDT' }}
          </span>
          <span class="Wcolor font-Four right">
            {{ item.type === 0 ? $t('Exchange.consume') : $t('Exchange.consume') }}
            {{ item.type === 1 ? item.usdtnumber : item.nbnumber }}
            {{ item.type === 0 ? 'NBNB' : 'USDT' }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import {numberUtil} from "@/utils/common";

export default {
  name: 'exchange',
  data() {
    return {
      type: false,
      empowerShow: false,
      recordArr: [],
      nbToUUsdt: 0,
      usdtToNb: 0,
      usdtNumber: 0,
      flashcashData: {},
      flashcash: {
        _nbbalance: 0.0000,
        _usdtbalance: 0.0000,
        _ausdtbalance: 0.0000,
        _o: []
      },
      buyNumber: '',
    };
  },
  watch: {

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
      this.getTeamInfo();
    },

    getTeamInfo(){
      let _this = this;
      const param = {
        from: _this.coinbase,
        value: "0x0",
        data: "0x"
      };

      _this.api.Nb().methods.flashcashinfo(_this.coinbase).call(param,(err,res) => {
        console.log(res)
        if(res){
          _this.flashcashData = res;
          _this.flashcash._nbbalance = Number(numberUtil(_this.flashcashData._nbbalance,6)).toFixed(4);
          _this.flashcash._usdtbalance = Number(numberUtil(_this.flashcashData._usdtbalance,6)).toFixed(4);
        }
      })
    },

    empowerDialogShow(){
      let _this = this;
      _this.empowerShow = true;
      _this.usdtNumber = 0;
    },

    // 授权
    toEmpower(){

    },

    // 全部
    all(){
      let _this = this;
      if(_this.type){
        _this.buyNumber = Number(_this.flashcash._nbbalance).toFixed(0);
      }else{
        _this.buyNumber = Number(_this.flashcash._usdtbalance).toFixed(0);
      }
    },

    // 兑换
    redeemNow(){

    }
  }
};
</script>

<style scoped="scoped" lang="scss">
@import '../assets/css/exchange.scss';
</style>

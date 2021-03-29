<template>
  <div class="home allFlex column">
    <h2 class="allTitle">{{$t('App.one')}}</h2>
    <div class="pool">
      <div class="top allFlex">
        <span class="Wcolor font-Eight">{{$t('Home.nbnb')}}{{ poolNum }}</span>
        <!--    细则说明    -->
        <span class="Wcolor five-Eight" @click="ruleShow = true">{{$t('Home.rule')}}</span>
        <img src="../assets/img/icon_wfsm.png" />
      </div>
      <!--   NBNB   -->
      <div class="bottom allFlex ztBj">
        <ul>
          <!-- usdt -->
          <li class="allFlex home-assets ztBj radius">
            <img src="@img/icon_nbnb.png" alt="" />
            <div class="allFlex column home-assets_value">
              <span class="Wcolor font-Five">{{$t('Home.nb')}}</span>
              <span class="textColor font-Four">{{$t('Home.walletBalance')}}</span>
            </div>
            <div class="allFlex column">
              <span class="Wcolor font-Four">{{ nbBalance }}</span>
              <span class="textColor font-Four">{{$t('Home.balance')}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--  已到期 已投资  -->
    <div class="invest allFlex column ztBj" v-if="invest.status">
      <ul class="allFlex">
        <li class="allFlex column Wcolor">
          <p class="font-Eight">{{$t('Home.nbInVest')}}</p>
        </li>
        <li class="allFlex column">
          <p>{{currentDate}}</p>
        </li>
      </ul>
      <ul class="allFlex">
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle1')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.number}}</p>
        </li>
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle2')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.rate}}%</p>
        </li>
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle3')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.cycle}}</p>
        </li>
      </ul>
      <ul class="allFlex">
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle4')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.surplus}}</p>
        </li>
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle5')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.profit}}</p>
        </li>
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle6')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.totalprofit}}</p>
        </li>
      </ul>
      <div class="border btn blueColor font-Five center" @click="extractIncome(investStatus)">{{investStatus? $t('Home.btn2') : $t('Home.btn3')}}</div>
    </div>

    <!--    投资    -->
    <div class="join allFlex column ztBj" v-if="!invest.status">
      <p>{{$t('Home.enjoy')}}</p>
      <div class="Wcolor font-Eight">{{ invest.enUsdt }}</div>
      <ul class="allFlex">
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle3')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.cycle}}</p>
        </li>
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle2')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.rate}}%</p>
        </li>
        <li class="allFlex column">
          <p>{{$t('Home.investmentTitle7')}}</p>
          <p class="Wcolor center margin-top-5">{{invest.totalprofit}}</p>
        </li>
      </ul>
      <input type="number" v-model="investAmount" />
      <div class="btn Wcolor font-Five center" @click="investNow">{{$t('Home.btn1')}}</div>
    </div>

    <!--  细则说明  -->
    <van-popup v-model="ruleShow" round :style="{ width: '90%' }">
      <div class="dailog4 allFlex column" >
        <p class="titleColor"><span class="Bold font-Eight">{{$t('Home.ruleAlert.title')}}</span></p>
        <p class="titleColor font-Four proTitle Bold">{{$t('Home.ruleAlert.text')}}</p>
        <div class="btn center Wcolor titleBg font-Five" @click="ruleShow = false">{{$t('Home.ruleAlert.btn')}}</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {numberUtil} from "@/utils/common";
import {dateFormat} from "@/utils/date";

export default {
  name: 'home',
  data() {
    return {
      coinbase: "",
      currentDate: "",
      investAmount: 0,
      status: false,
      investStatus: true,
      investData: {},
      invest: {
        status:false,
        enUsdt: 0,
        number: 0,
        cycle: 7,
        rate: 0,
        surplus: 0,
        totalprofit: 0,
        profit: 0,
        parent: "",
      },
      nbBalance: "",
      poolNum: '',
      ruleShow:false,

    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  async created() {
    let _this = this;
    // 格式化日期
    _this.currentDate = dateFormat(new Date(),"yyyy-MM-dd hh:mm");

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
    init() {
      this.getInvestmentInfo();
    },

    //获取投资详细
    getInvestmentInfo(){
      let _this = this;
      const param = {
        from: _this.coinbase,
        value: "0x0",
        data: "0x"
      };

      _this.api.Nb().methods.investmentinfo(_this.coinbase).call(param,(err,res) => {
        console.log(res)
        if(res){
          _this.investData = res._o;
          _this.nbBalance = Number(numberUtil(res._nbbalance, 6)).toFixed(4);
          _this.invest.number = Number(numberUtil(_this.investData.number,6)).toFixed(4);
          _this.invest.status = _this.investData.status;
          _this.invest.rate = Number(numberUtil(_this.investData.rate,6))*100;
          const surplus = Number(_this.investData.endtime) - new Date().getTime() / 1000;
          if(surplus < 2 * 60){
            _this.invest.surplus = 0;
          }else{
            _this.invest.surplus = Number(surplus/24 * 60 * 60).toFixed(1);
          }
          _this.invest.totalProfit = Number(numberUtil(_this.investData.totalprofit,6)).toFixed(4);
          _this.invest.profit = _this.invest.rate * _this.invest.number/100;
        }
      })
    },

    // 立即投资
    investNow(){
      let _this = this;
      if(_this.investAmount=="" || _this.investAmount == 0){
        this.$toast(this.$t('Alert._alert_1'));
        return
      }
    },

    // 提取收益、本金
    extractIncome(status){
      if(status){
        this.$toast("提取收益");
      }else{
        this.$toast("提取收益及本金");
      }
    }

  }
};
</script>

<style scoped="scoped" lang="scss">
@import '../assets/css/home.scss';
</style>

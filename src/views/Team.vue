<template>
  <div class="pool padding">
    <div class="font-Tt Wcolor pool-title">{{$t('Team.title')}}</div>

    <!-- 团对管理 -->
    <div class="join allFlex column titleBg">
      <p class="GLcolor">{{$t('Team.enjoy')}}</p>
      <div class="Wcolor font-Eight margin-10">{{team._teamhold}}</div>
      <ul class="allFlex">
        <li class="allFlex column GLcolor">
          <p>{{$t('Team.currencyHoldings')}}</p>
          <p class="Wcolor center">{{team._sonsnumber}}</p>
        </li>
        <li class="allFlex column GLcolor">
          <p>{{$t('Team.dailyChemicalRate')}}</p>
          <p class="Wcolor center">{{team._userhold}}</p>
        </li>
        <li class="allFlex column GLcolor">
          <p>{{$t('Team.teamSize')}}</p>
          <p class="Wcolor center">{{team._teamnumber}}</p>
        </li>
      </ul>
    </div>

    <!-- 邀请列表 -->
    <div class="font-Tt Wcolor pool-title">{{$t('Team.list')}}</div>

    <ul class="pool-list">
      <li
        class="ztBj radius Wcolor allFlex center padding"
        v-for="(item, key) in team._sons"
        :key="'list' + key">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>

import {numberUtil} from "@/utils/common";

export default {
  data() {
    return {
      coinbase: "",
      teamData: {},
      team: {
        _sons: [],
        _sonsnumber: 0,
        _teamhold: 0.0000,
        _teamnumber: 0,
        _userhold: 0.0000,
      },
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
      this.getTeamInfo();
    },

    getTeamInfo(){
      let _this = this;
      const param = {
        from: _this.coinbase,
        value: "0x0",
        data: "0x"
      };

      _this.api.Nb().methods.poolinfo(_this.coinbase).call(param,(err,res) => {
        console.log(res)
        if(res){
          _this.teamData = res;
          _this.team._teamhold = Number(numberUtil(_this.teamData._teamhold,6)).toFixed(4);
          _this.team._userhold = Number(numberUtil(_this.teamData._userhold,6)).toFixed(4);
        }
      })
    }
  },
};
</script>
<style scoped lang="scss">
.pool {
  .join {
    border-radius: 10px;
    box-sizing: border-box;
    margin-top: 5px;
    padding: 26px 16px;
    align-items: center;
    ul {
      width: 100%;
      margin: 20px 0 10px 0;
      height: 40px;
    }
    .btn {
      width: 130px;
      height: 45px;
      background: linear-gradient(90deg, #13a2dd 0%, #70ddca 99%);
      border-radius: 23px;
      line-height: 45px;
    }
  }
}

.pool-title {
  margin: 10px 0;
}

.pool-main {
  li:last-child {
    height: 105px;
    border-radius: 0 0 10px 10px;
    align-items: center;
  }
  .main-value {
    margin-top: 10px;
  }
}

.pool-list li {
  align-items: center;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  margin-top: 10px;
}
</style>

<template>
  <div class="flex1 flex">
    <!-- 不知道做什么的 -->
    <div style="width: 200px">{{ year }}-{{ month }}</div>
    <!-- 展示数据 -->
    <div class="flex1 flex column mg80">
      <!-- 一卡片一月，每次只显示一个月 -->
      <div class="card">
        <div></div>
        <!-- 每日 -->
        <div class="flex column">
          <div v-for="item in manyTime" :key="item[2]" class="flex">
            <div>{{ item[2] }}</div>
            <div>{{ item[3] }}</div>
            <button v-on:click="updateDayFrees(item)">修改</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 获取数据 -->
    <div style="width: 250px">
      <button v-on:click="nextMonth(0)">上一月</button>
      <button v-on:click="nextMonth(1)">下一月</button>

      <hr />
      {{ everyFrees }}
      <input
        type="text"
        v-model.number="everyFree"
        placeholder="每次输入一个值"
      />
      <button v-on:click="addFree()">增加</button>
      <button v-on:click="temporaryManyTime()">缓存</button>
      <div>已缓存数据条：{{ temporaryManyTimeList }}</div>
      <div></div>

      <hr />
      <button v-on:click="publish()">上传</button>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      timeFreeList: [], //设置一个数据条:year,month,day,[free]
      manyTime: [], //展示的当前年月所有数据条
      everyFrees: [],
      everyFree: null,
      temporaryManyTimeList: [], //缓存前端已修改的数据条
    };
  },
  mounted() {
    //初始化当前日
    this.createDayList();
  },
  methods: {
    //数据条
    createDayList() {
      //创建数据条
      this.timeFreeList = [this.year, this.month, 1, []];

      //获取特定月的日数组
      let maxDay = new Date(this.year, this.month, 0).getDate();
      for (let iDays = 1; iDays <= maxDay; iDays++) {
        this.timeFreeList[2] = iDays;
        this.timeFreeList[3] = []; //这么做，才能深拷贝。  //动态问题，其实是深拷贝问题啊，毕竟深拷贝后，数组就是新数组，
        this.manyTime.push(this.timeFreeList.slice()); //.slice是为了实现数组的深拷贝，其实这种直接对象也是浅拷贝
      }
      this.timeFreeList = [];
    },

    //动态改变年月
    nextMonth(step) {
      if (step) {
        //下一月
        if (this.month == 12) {
          this.year += 1;
          this.month = 0;
        }
        this.month += 1;
      }
      if (!step) {
        //上一月
        if (this.month == 1) {
          this.year -= 1;
          this.month = 13;
        }
        this.month -= 1;
      }
      //确保为该月
      this.manyTime = [];
      //重新获得日数组
      this.createDayList();
    },

    updateDayFrees(everyFrees) {
      this.everyFrees = everyFrees.slice(); //设定特定的数据条，
    },

    addFree() {
      this.everyFrees[3].push(this.everyFree); //增加free

      this.everyFree = null;
    },

    // //好像不用，可以直接上传
    // temporaryManyTime() {
    //   let newManyTime = [];
    //   this.manyTime.map((item) => {
    //     //因为只能修改当前年月，所以年月肯定相等，日相等，说明修改是此日
    //     if (item[2] == this.everyFrees[2]) {
    //       newManyTime.push(this.everyFrees);
    //     } else {
    //       newManyTime.push(item);
    //     }
    //   });

    //   this.manyTime = newManyTime;
    //   this.everyFrees = [];
    // },

    publish() {
      //全部上传，然后到后端给整理好
      //只上传有的
      let publishManyTime = [];
      this.manyTime.map((item) => {
        if (item[3][0]) {
          publishManyTime.push(item);
        }
      });

      console.log(publishManyTime);
      //现在只能先保存在localStorage

      //把temporaryManyTimeList给上传到后端

      // //然后从保存来的一定是一大块
      // window.localStorage.setItem("neirong", nieRong.value);
      // window.localStorage.getItem("neirong");
      // window.localStorage.removeItem("neirong");
    },
  },
};

//1. JSON序列化法 适用于无函数、undefined、Symbol、循环引用的简单对象。 const
// clone1 = JSON.parse(JSON.stringify(obj));
// obj.info.age = 30;
// console.log(clone1.info.age); // 20

//要不要弄成对象

//换个思路，我只把month和日做成数组，而且只显示当前月
</script>

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
          <div v-for="item in dayFreeList" :key="item" class="flex">
            <div>{{ item }}</div>
            <div>nieRong</div>
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
      date: {{ aDay[0] }} |everyFree {{ aDay[1] }} | sum:{{ aDay[2] }}
      <input type="text" v-model="everyFree" placeholder="每次输入一个值" />
      <button v-on:click="addFree()">增加</button>
      <button v-on:click="updateMaryDay()">缓存</button>
      <div>已缓存数据条：</div>
      <div>{{ maryDay }}</div>

      <hr />
      <button v-on:click="publish()">上传</button>
    </div>
  </div>
</template>

<style></style>

<script setup>
//前端
import { ref } from "vue";
//初始化当前年月
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);

//动态渲染日数组
const dayFreeList = ref([]);
function createDayList() {
  dayFreeList.value = [];
  //获取特定月的日数组
  let maxDay = new Date(year.value, month.value, 0).getDate();
  for (let iDays = 1; iDays <= maxDay; iDays++) {
    dayFreeList.value.push(("0" + iDays).slice(-2));
  }
}

//初始化当前日
createDayList();
//动态改变年月
function nextMonth(step) {
  if (step) {
    //下一月
    if (month.value == 12) {
      year.value += 1;
      month.value = 0;
    }
    month.value += 1;
  }
  if (!step) {
    //上一月
    if (month.value == 1) {
      year.value -= 1;
      month.value = 13;
    }
    month.value -= 1;
  }
  createDayList();
}

//缓存在前端已修改的所有数据条
const maryDay = ref([]);
//设置一个数据条
const aDay = ref(["", [], 0]); //aDay= [dayDate,[],sum]

function updateDayFrees(day) {
  //自动缓存，不过若是没有确认是之前没有添加，则不触发
  if (aDay.value[0]) {
    updateMaryDay();
  }
  //获得索引，年月日
  aDay.value[0] = year.value + "-" + ("0" + month.value).slice(-2) + "-" + day;

  //后面发现浏览器这里有个古怪的bug，当我点击相同的之后，会把之前缓存的那些拉回来
  //但是若是我console然后第一次查看全部就是之前那个数，
  //若我是等到第二个缓存好后再查看全部，结果发现第一个那条的结果改变了，与第二个一致。
  //我初步判断是跟浅拷贝的原因。
  // 不过后面我仍然会把第一条删掉，然后添加第二条，所以就没去验证是不是浅拷贝
  //处理day相同的数据条
  maryDay.value.map((item) => {
    if (item[0] == aDay.value[0]) {
      //把之前那条的数据给新一条
      aDay.value = item;
      //并删除之前那条
      let newMaryDay = [];
      maryDay.value.map((item1) => {
        if (item1[0] !== aDay.value[0]) {
          newMaryDay.push(item1);
        }
      });
      maryDay.value = newMaryDay;
    }
  });
}

const everyFree = ref();
function addFree() {
  //若是用户没有选择day怎么办
  if (!aDay.value[0]) {
    alert("请选择哪一天");
    return;
  }
  //从aDay第二项的元素增加每笔费用
  aDay.value[1].push(everyFree.value);
  //计算每日总和
  aDay.value[2] = Number(aDay.value[2]) + Number(everyFree.value);
  everyFree.value = null;
}

function updateMaryDay() {
  //把改变的数据条收集起来
  maryDay.value.push(aDay.value);
  //并清空aDay，使得不影响下一次增加dayFree
  aDay.value = ["", [], 0];
}

function publish() {
  //防止最后一个没有缓存
  updateMaryDay();
  //将没有free的剔除
  let newMaryDay = [];
  maryDay.value.map((item) => {
    if (item[2]) {
      newMaryDay.push(item);
    }
  });
  maryDay.value = newMaryDay;
  // maryDay.value;//网络通信上传数据条
  // 不过没有后端，那就只能保存到本地了

  //清空maryDay
  maryDay.value = [];
}

//后端
</script>

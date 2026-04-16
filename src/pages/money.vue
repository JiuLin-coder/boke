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
            <button v-on:click="changeDayFree(item)">修改</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 获取数据 -->
    <div style="width: 250px">
      <!-- <button v-on:click="nextMonth()">上一月</button> -->
      {{ aDay[0] }}
      sum:{{ aDay[2] }}
      <input type="text" v-model="everyFree" placeholder="每次输入一个值" />
      <button v-on:click="addFree()">增加</button>
      <button v-on:click="inLocal()">缓存</button>
      <button v-on:click="public()">上传</button>
    </div>
  </div>
</template>

<style></style>

<script setup>
//前端
import { ref } from "vue";

//但是一换天，原本的就有的就没了
const someDay = ref([]);

//获取年月和日数组
//动态渲染日数组
let year = ref(new Date().getFullYear());
let month = ref(("0" + (new Date().getMonth() + 1)).slice(-2));
let dayFreeList = [];
let maxDay = new Date(year.value, month.value, 0).getDate();
for (let iDays = 1; iDays <= maxDay; iDays++) {
  dayFreeList.push(("0" + iDays).slice(-2));
}

//接下来，就是把每天的数据名，发送且作为一个数据条
const aDay = ref(["", [], 0]); //aDay= [dayDate,[],sum]
function changeDayFree(day) {
  inLocal(); //自动缓存，不然老是忘记

  aDay.value[0] = year.value + "-" + month.value + "-" + day;
  someDay.value.map((item) => {
    if (item[0] == aDay.value[0]) {
      aDay.value = item;
    }
  });
  console.log("aDayName", aDay.value);
}

let everyFree = ref();
function addFree() {
  aDay.value[1].push(everyFree.value); //从aDay第二项的元素增加
  aDay.value[2] = Number(aDay.value[2]) + Number(everyFree.value);
  everyFree.value = null;
  console.log("aDay", aDay.value);
}

//把改变的数据条收集起来
function inLocal() {
  someDay.value.push(aDay.value);
  console.log("someDay", someDay.value);
  aDay.value = ["", [], 0];
}

//后端
</script>

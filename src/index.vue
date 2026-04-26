<template>
  <!-- 导航栏 -->
  <div class="header flex jcsb aic shadow">
    <div>首页</div>
    <div style="width: 40vh" class="flex jcsb">
      <div>文章</div>
      <div>文本编写</div>
      <div>待办事项</div>
      <div>账本</div>
    </div>
    <div>登录/注册</div>
  </div>
  <!-- 内容栏 -->
  <div class="main flex1 flex">
    <!-- <introduction /> -->
    <!-- <money /> -->
    <toDoList />
  </div>
</template>

<script setup>
import introduction from "./pages/introduction.vue";
import toDoList from "./pages/toDoList.vue";
import money from "./pages/money.vue";
</script>

<style>
* {
  border: 1px solid black;
}
.header {
  height: 40px;
  padding: 20px;
}
.flex {
  display: flex;
}
.column {
  flex-direction: column;
}
.flex1 {
  flex: 1;
}
.aic {
  align-items: center;
}
.jcc {
  justify-content: center;
}
.jcsb {
  justify-content: space-between;
}
.jcse {
  justify-content: space-evenly;
}

.tac {
  text-align: center;
}
.shadow {
  box-shadow:
    rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px,
    rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.mg20 {
  margin: 20px;
}
.mgt20 {
  margin-top: 20px;
}
.mgl20 {
  margin-left: 20px;
}
.mg100 {
  margin: 100px;
}
.mg80 {
  margin: 80px;
}
.pd20 {
  padding: 20px;
}
</style>

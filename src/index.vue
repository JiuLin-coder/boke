<template>
  <!-- 导航栏 -->
  <div class="flex jcsb aic shadow pd20 fs16">
    <RouterLink to="/">首页</RouterLink>
    <div style="width: 40rem" class="flex jcsb">
      <RouterLink to="/">文章</RouterLink>
      <RouterLink to="/">文本编写</RouterLink>
      <RouterLink to="/toDoList">待办事项</RouterLink>
      <RouterLink to="/money">账本</RouterLink>
    </div>

    <div>登录/注册</div>
  </div>
  <!-- 内容栏 -->
  <div class="flex1 flex">
    <RouterView />
  </div>
</template>

<script setup>

</script>

<style>
/* 统一设置页面背景 */
/* * {
  border: 1px solid black;
} */
html {
  font-size: 10px;
}

/* flex常用css */
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
.jcsa {
  justify-content: space-around;
}
.fww {
  flex-wrap: wrap;
}
.tac {
  text-align: center;
}

/* 颜色常用css */
.shadow {
  box-shadow:
    rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px,
    rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.cr {
  color: rgb(253, 91, 91);
}
.cg {
  color: #07c160;
}
/* 间距常用CSS */
.mg20 {
  margin: 2rem;
}
.mg40 {
  margin: 4rem;
}
.mg20 {
  margin: 2rem;
}
.mgt20 {
  margin-top: 2rem;
}
.mgl20 {
  margin-left: 2rem;
}
.mg100 {
  margin: 10rem;
}
.mg80 {
  margin: 8rem;
}
.pd20 {
  padding: 2rem;
}
.h100 {
  height: 100vh;
}
/* 字体常用CSS */
.fs16 {
  font-size: 1.6rem;
}
.fs14 {
  font-size: 1.4rem;
}
.fs12 {
  font-size: 1.2rem;
}
/* 组件常用css */
.area {
  border-bottom: 1px solid rgb(195, 195, 195);
}
</style>

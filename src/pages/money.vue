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
          <div v-for="(item, index) in disMonth" :key="index" class="flex">
            <div>{{ index + 1 }}</div>
            <div>{{ item[1] }}</div>
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
      <button v-on:click="localPublish()">缓存</button>
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
      everyFrees: [], //设置一个数据条:day,[free]
      disMonth: [], //展示的当前年月所有数据条
      everyFrees: [],
      everyFree: null,
      date: {},
      isYear: false,
      isMonth: false,
    };
  },
  mounted() {
    //先初始化disMonth，后面把date存入disMonth
    this.createDayList();
    //获取所有的账本数据
    this.date = window.localStorage.getItem("date")
      ? JSON.parse(window.localStorage.getItem("date"))
      : {};
    // console.log(Object.keys(this.date)); //元素名数组
    this.createYear();
    this.createMonth();

    console.log(this.date);
  },
  methods: {
    //数据条
    createDayList() {
      //创建数据条
      this.everyFrees = [1, []];

      //获取特定月的日数组
      let maxDay = new Date(this.year, this.month, 0).getDate();
      for (let iDays = 1; iDays <= maxDay; iDays++) {
        this.everyFrees[0] = iDays;
        this.everyFrees[1] = [];
        //如果说要在数组里嵌套数组，则必须先let a= []; a[0] = [] 这么做，才能深拷贝。
        //动态问题，其实是深拷贝问题啊，毕竟深拷贝后，数组就是新数组，
        //.slice是为了实现数组的深拷贝，因为直接引入(push)只是还是浅拷贝引入数组地址而言，最终多个嵌套共用一个数组，
        //对象也是同理。
        this.disMonth.push(this.everyFrees.slice());
      }
      this.everyFrees = [];
    },

    //动态改变年月
    nextMonth(step) {
      if (step) {
        //下一月
        if (this.month == 12) {
          this.year += 1;
          this.createYear();
          this.month = 0;
        }
        this.month += 1;
        this.createMonth();
      }
      if (!step) {
        //上一月
        if (this.month == 1) {
          this.year -= 1;
          this.createYear();
          this.month = 13;
        }
        this.month -= 1;
        this.createMonth();
      }
    },

    updateDayFrees(everyFrees) {
      this.everyFrees = everyFrees; //设定特定的数据条，虽然数组指向没有变化
    },

    addFree() {
      this.everyFrees[1].push(this.everyFree); //增加free
      this.everyFree = null;
      //因为数组地址指向没有变化，所以我不用把修改后的Frees重新删除复制回去。
      //修改后的直接全保存在disMonth中
    },

    createYear() {
      if (this.date) {
        Object.keys(this.date).map((item) => {
          if (Number(item) == this.year) {
            this.isYear = true;
            return;
          }
        });
      }
      if (!this.isYear) {
        //初始化缓存的数据列表、  defineProperty是深拷贝，可以用
        Object.defineProperty(this.date, this.year, {
          value: {}, //date:{year:{}}
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    },

    createMonth() {
      Object.keys(this.date[this.year]).map((item) => {
        if (Number(item) == this.month) {
          this.isMonth = true;
          return; //记得若是判断true，立即退出，不然就继续判断，然后又变成false
        }
      });

      //判断该月是否存在， 不存在则设置新的
      if (!this.isMonth) {
        Object.defineProperty(this.date[this.year], this.month, {
          value: {}, //date:{year:{month:{}}}
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        //若存在呢，则把date的该月保存到disMonth
        Object.keys(this.date[this.year][this.month]).map((item) => {
          this.disMonth.map((disItem) => {
            if (disItem[0] == item) {
              disItem[1] = this.date[this.year][this.month][item].slice();
            }
          });
        });
      }
    },

    //保存在localStorage
    localPublish() {
      //重新保存回date
      this.disMonth.map((item) => {
        //只上传有的
        if (item[1][0]) {
          //dismonth每一条的[1,[]]改成date.year.month的每一条{1：[]}
          //并且这个若元素重名，则会替代掉原来的元素
          Object.defineProperty(this.date[this.year][this.month], item[0], {
            value: item[1].slice(),
            writable: true,
            enumerable: true,
            configurable: true,
          });
        }
      });
      console.log(this.date);
      //并且直接替代原date
      window.localStorage.setItem("date", JSON.stringify(this.date)); //localStorage只保存字符串
    },

    publish() {
      //全部上传，然后到后端给整理好
    },
  },
};
</script>

<template>
  <div class="flex1 flex">
    <!-- 不知道做什么的 -->
    <div style="width: 200px"></div>
    <!-- 展示月的每日数据 -->
    <div class="flex1 flex column mg80">
      <div>{{ year }}-{{ month }}</div>
      <!-- 一卡片一月，每次只显示一个月 -->
      <div class="">
        <!-- 每日 -->
        <div v-for="(item, index) in disMonth" :key="index" class="flex">
          <div>{{ index + 1 }}</div>
          <div>{{ item[1] }}</div>
          <button v-on:click="getDayFrees(item)">+</button>
          <button v-on:click="deleteDayFrees(item)">-</button>
        </div>
      </div>
    </div>
    <!-- 获取数据 -->
    <div>
      <button v-on:click="nextMonth(0)">上一月</button>
      <button v-on:click="nextMonth(1)">下一月</button>

      <hr />
      {{ everyFrees }}
      <input
        type="text"
        v-model.number="everyFree"
        placeholder="每次输入一个值"
      />
      <button v-on:click="addFree()">增加free</button>
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
      disMonth: [], //展示的当前月所有数据条
      everyFree: null,
      date: {}, //存储所有的来自localStorage的年月日数据
      isYear: false,
      isMonth: false,
    };
  },
  mounted() {
    //获取所有的账本数据
    this.date = window.localStorage.getItem("date")
      ? JSON.parse(window.localStorage.getItem("date"))
      : {};

    this.createYear();
    this.createMonth();

    console.log(this.date);
  },
  methods: {
    //数据条
    createDayList() {
      //清空disMonth
      this.disMonth = [];

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

    //动态改变年月，而年月也只会在缓存的时候使用
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

    getDayFrees(everyFrees) {
      this.everyFrees = everyFrees; //设定特定的数据条，虽然数组指向没有变化
    },

    addFree() {
      this.everyFrees[1].push(this.everyFree); //增加free
      this.everyFree = null;
      //因为数组地址指向没有变化，所以我不用把修改后的Frees重新删除复制回去。
      //修改后的直接全保存在disMonth中，disMonth的作用就从展示数据，到获取和保存数据了
    },

    deleteDayFrees(everyFrees) {
      this.everyFrees = everyFrees;
      this.everyFrees[1] = [];
      console.log(this.everyFrees);
      delete this.date[this.year][this.month][everyFrees[0]]; //date也要删掉，但是这里的date是前端的，还是要点击缓存才能针对localStorage
    },

    //保存在localStorage
    localPublish() {
      //重新保存回date
      this.disMonth.map((item) => {
        //只上传有的
        if (item[1][0]) {
          //dismonth每一条的[1,[]]改成date.year.month的每一条{1：[]}。date:{year:{month:{day:[]}}}
          //并且这个若元素重名，则会替代掉原来的元素，
          Object.defineProperty(this.date[this.year][this.month], item[0], {
            value: item[1].slice(),
            writable: true,
            enumerable: true,
            configurable: true,
          });
        }
      });
      console.log(this.date);

      window.localStorage.setItem("date", JSON.stringify(this.date)); //localStorage只保存字符串，//并且直接替代原date
    },

    createYear() {
      if (this.date) {
        Object.keys(this.date).map((item) => {
          if (Number(item) == this.year) {
            this.isYear = true; //不if就会覆盖原有的date的数据
            return;
          }
        });
      }

      //这里是没有isYear，才执行的
      if (!this.isYear) {
        //初始化缓存的数据列表、  defineProperty是深拷贝，可以用
        Object.defineProperty(this.date, this.year, {
          value: {}, //date:{year:{}}
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }

      this.isYear = false;
    },

    createMonth() {
      this.createDayList(); //初始和切换要清空disMonth，不然会把上个月的带进去。

      Object.keys(this.date[this.year]).map((item) => {
        if (Number(item) == this.month) {
          this.isMonth = true;
          return; //节省一下判断次数，
        }
      });

      //判断该月是否存在，
      if (!this.isMonth) {
        //不存在则设置新的
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

      this.isMonth = false;
    },

    publish() {
      //把存储在localStorage里的上传到后端
      //若有后端，每次打开账本，把后端的发送到locaoStorage
    },
  },
};
</script>

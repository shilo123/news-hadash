<!-- home.vue -->
<template>
  <div class="home" v-loading="Loading">
    <el-button class="el-icon-delete" @click="del()"></el-button>
    <el-button type="primary" @click="rest" class="el-icon-refresh-left"
      >rest</el-button
    >
    <el-badge :value="category.length" class="show-category">
      <el-button type="primary" @click="showCategory = !showCategory"
        >show-category</el-button
      >
    </el-badge>
    <el-badge :value="DataFavorite.length" class="show-favorite">
      <el-button type="primary" @click="showFavorite1">show-favorite</el-button>
    </el-badge>
    <el-button
      type=""
      v-show="showFavorite"
      class="categoryFavoriteF"
      v-for="f in DataFavorite"
      :key="f._id"
      @click="pushfav(f)"
    >
      <el-button type="danger" class="danger" @click="remove(f._id)"
        >remove</el-button
      >
      {{ DataFa(f.title) }}</el-button
    >
    <div v-if="shogen">
      <el-button
        v-show="showCategory"
        v-for="(c, i) in category"
        :key="i"
        class="categoryFavorite"
        :id="`id${i}`"
        @click="routpush(c)"
        >{{ c }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { URLSERVERA } from "@/URL/url";
import { URL } from "@/URL/url";
export default {
  data() {
    return {
      Loading: false,
      data: [],
      category: [],
      showCategory: false,
      showFavorite: false,
      DataFavorite: [],
      shogen: false,
      ifo: true,
    };
  },
  watch: {
    showCategory(val) {
      if (val) {
        this.showFavorite = false;
      }
    },
    showFavorite(val) {
      if (val) {
        this.showCategory = false;
      }
    },
  },
  methods: {
    sorted() {
      this.data.forEach((element) => {
        // console.log("element.category", element.category);
        this.category.push(element.category);
      });
      this.category = this.category.filter((el, i, arr) => {
        return arr.indexOf(el) === i;
      });
      this.Loading = false;
      this.shogen = true;

      console.log(" this.category", this.category);
    },
    routpush(c) {
      // console.log(c);
      if (c) {
        this.$router.push({ path: `/category/${c}` });
      }
    },
    remove(id) {
      this.ifo = false;
      let catava = this.data.find((e) => {
        // console.log("e._id", e._id);
        // console.log("id", id);
        return e._id === id;
      });
      let ind = this.data.findIndex((e) => {
        return e._id === catava._id;
      });
      this.data[ind].favorite = false;
      // console.log(ind);
      // console.log("catava", catava);
      this.$store.commit("remove", catava);
      // this.ifo = true;
    },

    DataFa(text) {
      return text;
    },
    pushfav(f) {
      if (this.ifo) {
        setTimeout(() => {
          this.$store.commit("ctov", f);
          this.$router.push({ path: `/favorite/${f._id}` });
        }, 500);
      }
      this.ifo = true;
    },
    del() {
      this.$ax.delete(URL + "del").then(() => this.$message.success("נמחק"));
    },

    showFavorite1() {
      if (this.DataFavorite.length === 0) {
        this.$message.error("מה אתה משוגע לא בחרת כלום!");
        return;
      }
      this.showFavorite = !this.showFavorite;
    },
    rest() {
      this.data = [];
      this.$ax.delete(URL + "del").then(() => {
        this.$ax
          .get(URLSERVERA)
          .then((res) => {
            res.data.news.forEach((element) => {
              this.data.push(element);
            });
            this.data.forEach((element) => {
              Object.defineProperty(element, "favorite", {
                value: false,
                writable: true,
                enumerable: true,
                configurable: true,
              });
            });

            this.$ax
              .post(URL + "appMONGO", this.data)
              .then((res) => {
                // this.data = res.data;

                this.data = res.data;
                // console.log(this.data);
                if (!Array.isArray(this.data)) {
                  window.location.reload();

                  this.$message.error("דטא לא מערך");
                }
                this.data.map((e) => {
                  if (!e.category[1]) {
                    return (e.category = e.category[0]);
                  } else {
                    return (e.category = e.category[1]);
                  }
                });

                this.sorted();
              })
              .catch((E) => {
                console.log("e", E);
              });
          })
          .catch((E) => {
            console.log("e", E);
          });
      });
    },
    UpdateData() {},
  },
  mounted() {
    // this.$store.commit("rest");
    this.shogen = false;
    this.data = [];
    this.Loading = true;
    this.$ax
      .get(URLSERVERA)
      .then((res) => {
        res.data.news.forEach((element) => {
          this.data.push(element);
        });
        // console.log("befor", this.data);
        this.data.forEach((element) => {
          Object.defineProperty(element, "favorite", {
            value: false,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        });
        // console.log(this.data);

        this.$ax
          .post(URL + "appMONGO", this.data)
          .then((res) => {
            // this.data = res.data;

            this.data = res.data;
            // console.log("aharey", this.data);

            // console.log(this.data);
            if (!Array.isArray(this.data)) {
              window.location.reload();
              this.$message.error("דטא לא מערך");
            }

            this.data.map((e) => {
              return (e.category = e.category[0]);
            });

            this.sorted();
            this.$ax.get(URL + "getfavorite").then((res) => {
              console.log("res", res.data);
              console.log(this.$store.state.datafavorite);
              if (this.$store.state.datafavorite !== undefined) {
                this.DataFavorite = this.$store.state.datafavorite;
                this.DataFavorite.forEach((element) => {
                  element.favorite = true;
                });
              } else {
                this.$message.error("שגיאה");
              }
            });
          })
          .catch((E) => {
            console.log("e", E);
          });
      })
      .catch((E) => {
        console.log("e", E);
      });
  },
};
</script>
<style scoped>
.danger {
  position: relative;
  right: 20px;
  bottom: 11px;
}
.home {
  position: absolute;
  height: 100%;
  width: 100%;
}
.show-category {
  position: absolute;
  left: 50%;
}
.show-favorite {
  position: absolute;
  left: 40%;
}
.categoryFavorite {
  display: flex;
  flex-direction: column;
  position: relative;
  left: 45%;
  top: 40px;
}
.categoryFavoriteF {
  display: flex;
  flex-direction: column;
  position: relative;
  left: 35%;
  top: 40px;
}
</style>
<style>
body {
  background: rgb(196, 202, 189);
}
</style>

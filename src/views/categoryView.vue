<!-- category.vue -->
<template>
  <div>
    <router-link to="/"><el-button>back</el-button></router-link>
    <catava
      :data="data"
      :Ncategory="Ncategory"
      :shogen="shogen"
      @showdialog="showdi"
      class="catava"
    ></catava>
    <el-dialog title="behar" :visible.sync="showd" width="50%">
      <div style="font-size: x-large">what would you like to do</div>
      <el-button type="success" @click="ADDfavorite">ADD to favorite</el-button>
      <el-button type="danger" @click="REMOVEfavorite"
        >REMOVE to favorite</el-button
      >
      <el-button type="danger">DELETE</el-button>
      <el-button>cancal</el-button>
    </el-dialog>
  </div>
</template>
<script>
// import { URLSERVERA } from "@/URL/url";
import { URL } from "@/URL/url";
import catava from "@/components/catavaComp.vue";
export default {
  components: { catava },
  data() {
    return {
      data: [],
      Ncategory: "",
      shogen: false,
      catava: "",
      showd: false,
      DataFavorite: [],
      dataAll: "",
    };
  },

  mounted() {
    this.$ax
      .get(URL)
      .then((res) => {
        this.data = res.data;
        this.Ncategory = this.$route.params.name;
        this.sorted();
      })
      .catch((E) => {
        console.log("E", E);
      });
  },

  methods: {
    sorted() {
      this.data.map((e) => {
        if (!e.category[1]) {
          return (e.category = e.category[0]);
        } else {
          return (e.category = e.category[1]);
        }
      });
      this.data = this.data.filter((e) => {
        return e.category === this.Ncategory;
      });
      console.log(this.data);
      this.shogen = true;
    },
    showdi(id) {
      this.showd = true;
      this.catava = this.data.filter((e) => {
        return e._id === id;
      })[0];
      // console.log(this.catava);
    },
    ADDfavorite() {
      this.$ax.put(URL + this.catava._id);
      this.DataFavorite.push(this.catava);
      this.$store.commit("push", this.catava);

      this.$ax
        .post(URL + "rem", this.DataFavorite)
        .then((res) => console.log(res.data));
      console.log(" this.DataFavorite", this.DataFavorite);
      this.$message.success("The article has been added to favorites");
      this.showd = false;
    },
    REMOVEfavorite() {
      this.$store.commit("remove", this.catava);
      this.$message.success("The article has been deleted from favorites");
      this.showd = false;
    },
  },
};
</script>
<style scoped>
.catava {
  margin-bottom: 40px;
}
</style>

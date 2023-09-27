<template>
  <div>
    <router-link to="/"><el-button>back</el-button></router-link>

    <table>
      <tr>
        <td colspan="100%" class="title">{{ catava.title }}</td>
        <span
          >By: <mark> {{ catava.author }}</mark></span
        >
      </tr>
      <tr>
        <td class="des">
          {{ catava ? fuancdiscription(catava.description)[0] : "loading..." }}
          <img :src="img(catava.image)" alt="" width="190px" height="180px" />
          <br />
          {{ catava ? fuancdiscription(catava.description)[1] : "loading..." }}
        </td>
      </tr>
      <tr>
        <td><a :href="catava.url">click to catava</a></td>
      </tr>
    </table>
  </div>
</template>
<script>
import { URL } from "@/URL/url";
import ix from "@/assets/ix.png";

export default {
  data() {
    return {
      id: "",
      catava: "",
    };
  },

  mounted() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    // this.$ax.get(URL + "find/" + this.id);
    this.catava = this.$store.state.catava;
    console.log("this.catava the favorite", this.catava);
  },

  methods: {
    img(image) {
      if (image === "None") {
        return ix;
      } else {
        return image;
      }
    },
    fuancdiscription(text) {
      text = text.split(" ");
      let index = Math.round(text.length / 2);
      let arrOne = text.slice(0, index).join(" ");
      let arrTwo = text.slice(index).join(" ");
      let arr = [arrOne, arrTwo];
      return arr;
    },
  },
};
</script>
<style scoped>
table {
  inline-size: 1000px;
  position: absolute;
  left: 14%;
}
.title {
  font-size: 50px;
  border-bottom: 2px solid black;
}
.des {
  font-size: 20px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>

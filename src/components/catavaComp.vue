<template>
  <div v-if="shogen">
    <table v-for="(d, i) in data" :key="i">
      <tr>
        <td colspan="100%" class="title">
          <el-button
            size="mini"
            type="info"
            class="el-icon-more"
            @click="$emit('showdialog', d._id)"
          ></el-button>
          {{ d.title }}
        </td>
      </tr>
      <tr>
        <td colspan="50%" class="author">
          <mark>By:{{ author(d.author) }}</mark>
        </td>
      </tr>
      <tr class="descriptionTR">
        <td class="descriptionTD">
          {{
            d.description
              ? fuancdiscription(d.description)[0]
              : "no description"
          }}
          <img :src="imgserc(d.image)" alt="" class="imgC" />
          {{ d.description ? fuancdiscription(d.description)[1] : "" }}
        </td>
      </tr>
      <tr>
        <td class="a">
          <a :href="d.url">For the source of the article click here</a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import ix from "@/assets/ix.png";
export default {
  props: ["data", "Ncategory", "shogen"],
  data() {
    return {};
  },

  mounted() {},

  methods: {
    fuancdiscription(text) {
      text = text.split(" ");
      let index = Math.round(text.length / 2);
      let arrOne = text.slice(0, index).join(" ");
      let arrTwo = text.slice(index).join(" ");
      let arr = [arrOne, arrTwo];

      return arr;
    },
    showdialog(id) {
      this.$emit("showdialog", id);
    },
    author(text) {
      let div = document.createElement("div");
      div.innerHTML = text;
      return div.innerText;
    },
    imgserc(img) {
      if (img !== "None") {
        return img;
      } else {
        // this.$message.error(img);
        return ix;
      }
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 30px;
  position: relative;
  left: 13%;
  border-bottom: 3px solid black;
}
.author {
  position: relative;
  left: 150px;
}
.descriptionTD {
  position: relative;
  inline-size: 1000px;
  top: auto;
  left: 160px;
}
table {
  display: contents;
}
.imgC {
  display: flex;
  height: 200px;
}
.a {
  position: relative;
  left: 200px;
  font-size: 20px;
}
</style>

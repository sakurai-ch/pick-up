<template>
  <div class="home">
    <div class="content">
      <GmapMap
        :center="{ lat: this.centerLat, lng: this.centerLng }"
        :zoom="11"
        map-type-id="terrain"
        style="width: 100%; height: 500px"
      >
        <!-- <GmapInfoWindow
          :key="index"
          v-for="(m, index) in this.markers"
          :position="m.position"
        >
          {{m.target_name}}
        </GmapInfoWindow> -->
        <GmapMarker
          :key="index"
          v-for="(m, index) in this.markers"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          :label="m.target_name"
        />
      </GmapMap>
    </div>

    <div class="content">
      <table class="tbl">
        <thead>
          <tr>
            <td class="name_td">名前</td>
            <td>位置情報</td>
            <td class="btn_td"></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" v-model="inputName" placeholder="名前を入力"></td>
            <td><input type="text" v-model="inputPositionText" placeholder="座標orURLをコピー＆ペースト"></td>
            <td><button @click="addPosition()" class="add_btn">追加</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content">
      <table class="tbl">
        <thead>
          <tr>
            <td class="name_td">名前</td>
            <td>N</td>
            <td>E</td>
            <td class="btn_td"></td>
          </tr>
        </thead>
        <tbody>
          <tr 
            :key="index"
            v-for="(m, index) in this.markers"
          >
            <td>{{m.target_name}}</td>
            <td>{{m.north_latitude}}</td>
            <td>{{m.east_longitude}}</td>
            <td><button @click="deletePosition(m.id)" class="delete_btn">削除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Home',
  data() {
    return {
      centerLat: 36.27666768603156,
      centerLng: 140.14587508365884,
      inputName: "",
      inputPositionText: "",
      markers: [],
    };
  },

  methods: {
    async getMarkers(){
      const markers_data = await axios.get("https://sheltered-river-05848.herokuapp.com/api/v1/home");
      this.markers = markers_data.data;
    },

    async addPosition() {
      const marker_data = await axios.post(
        "https://sheltered-river-05848.herokuapp.com/api/v1/home",
        {
          target_name: this.inputName,
          text: this.inputPositionText,
        }
      );
      console.log(marker_data); //
      this.getMarkers();
    },

    async deletePosition(id){
      const $deleteCheck = window.confirm("削除しますか？");
      if($deleteCheck){
        const marker_data = await axios.delete(
          "https://sheltered-river-05848.herokuapp.com/api/v1/home",
          {
            data: {id: id}
          }
        );
        console.log(marker_data); //
        this.getMarkers();
      }
    },
  },

  created(){
    this.getMarkers();
  }
}
</script>

<style scoped>
.content{
  margin: 0 0 20px 0;
  width: 100%;
}
.tbl{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
.tbl td{
  border-style: solid;
  border-color: gray;
  border-top-color: white;
  border-width: 1px 0;
  height: 20px;
  font-size: 14px;
}
.tbl thead td{
  height: 15px;
  font-size: 12px;
}
.name_td{
  width: 60px;
}
.btn_td{
  width: 60px;
}
.tbl td input{
  border: solid 1px gray;
  border-radius: 8px;
  height: 80%;
  width: 90%;
  text-align: center;
}
button{
  border:solid 1px;
  border-radius: 8px;
  margin: 2px 0;
}
.add_btn{
  background-color: tomato;
  border-color: tomato;
}
.delete_btn{
  background-color: aqua;
  border-color: aqua;
}
</style>

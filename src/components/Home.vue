<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
const func1 = (event: MouseEvent) => {
    console.log("moveMentX", event.movementX);
};

const proxy = getCurrentInstance();
console.log("proxy", proxy);
onMounted(() => {
    console.log("home页面挂载了");
    let LocationX = 116.452;
    let LocationY = 39.121;
    // window.addEventListener("mousemove", func1);
    var map = new BMap.Map(proxy.refs["mapContainerRef"], {
        coordsType: 5, // coordsType指定输入输出的坐标类型， 3为gcj02坐标，5为bd011坐标，默认为5
    });
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    var traffic = new BMap.Traffic();
    map.addTileLayer(traffic);
    var styleJson = [
        {
            "featureType": "land",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#091220ff",
            }
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#113549ff",
            }
        }
    ]
    map.setMapStyleV2({
        styleJson: styleJson
    })


    // 开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true);
    // map.addControl(new BMap.NavigationControl());
    // map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

    map.setCurrentCity("广州");

    
    // 自定义控件
    function NextLocationControl() {
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(0, 10);
    }
    // 挂载原型成为BMap.Control的子类
    NextLocationControl.prototype = new BMap.Control();
    // 初始化
    NextLocationControl.prototype.initialize = function (map) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode("下一个位置"));
        div.style.cursor = "pointer";
        div.style.border = "1px solid gray";
        div.style.borderRadius = "4px";
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.width = "100px";
        div.style.justifyContent = "center";
        div.style.height = "20px";
        div.style.fontSize = "1rem";
        div.style.backgroundColor = "white";
        div.className = "woxihuanni";
        div.onclick = function (e) {
            LocationX = LocationX + 0.5;
            LocationY = LocationY + 0.5;
            map.panTo(new BMap.Point(LocationX, LocationY));
        };
        console.log("控件加载了");
        map.getContainer().appendChild(div);
        return div;
    };
    var myNextLocationControl = new NextLocationControl();
    map.addControl(myNextLocationControl);
});
// onUnmounted(() => {
//     window.removeEventListener("mousemove", func1);
// });
</script>

<template>
    <div>我是home</div>
    <div style="width: 100vw;min-height:600px;margin: 0;padding: 0;"
         ref='mapContainerRef'>

    </div>

</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>

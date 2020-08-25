
var Robot = require("Robot.js");
auto();
const WIDTH = Math.min(device.width, device.height);
const HEIGHT = Math.max(device.width, device.height);

auto.waitFor();
var appName = "支付宝";
launchApp(appName);
toast(WIDTH)
sleep(1000);
//toast('ok')
var mysl = text("蚂蚁森林").findOnce();
if(mysl){
    mysl.parent().parent().click()
    toast('打开了蚂蚁森林')
}else{
    toast('未找到蚂蚁森林入口')
}
sleep(1000);
text("查看更多好友").click()
import {createElement, Text, Wrapper} from "./createElement";
// import {Carousel} from "./carousel.view";
import {Carousel} from "./Carousel"
import {enableGesture} from "./gesture"
import {Panel} from "./Panel"
import {TabPanel} from "./TabPanel"
import {ListView} from "./ListView"
let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}/>
//component.title = "I'm a property title";
component.mountTo(document.body)
console.log(component)
//component.id = "b"`
//component.setAttribute("id", "b");

/*
let panel = <TabPanel title="this is my panel">
    <span title="T1">my content1</span>
    <span title="T2">my content2</span>
    <span title="T3">my content3</span>
    <span title="T4">my content4</span>
    <span title="T5">my content5</span>
</TabPanel>

panel.mountTo(document.body)
window.panel = panel
*/

let data = [
    {title: "cat-1", url:"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
    {title: "cat-2", url:"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
    {title: "cat-3", url:"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
    {title: "cat-4", url:"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"}
]

let list = <ListView data={data}>
    {record => <figure>
        <img src={record.url} />
        <figcaption>{record.title}</figcaption>
    </figure>}
</ListView>
list.mountTo(document.body)
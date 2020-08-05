var parser = require("./parser");
let dom = parser.parseHTML(`
<script>a</script>
`)
console.log(JSON.stringify(dom, null, "  "))

<script>
  import { onMount } from "svelte";

  export let width = 200;
  export let height = 200;
  export let address; 
  let id = Math.floor(Math.random() * 10000);

  onMount(() => {    
		let script = document.createElement('script');
    script.src = "/qrcode.min.js"
    document.head.append(script);

    script.onload = function() {
      new QRCode("qrcode-" + id, {
        text: address,
        width: width,
        height: height,
        colorDark : "#000000", 
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  });
</script>

<div id={"qrcode-" + id} class="mx-auto" style={`width: ${width}px; height: ${height}px`}></div>
<script>
  import { onMount } from "svelte";

  export let address; 

  onMount(() => {

    
		let script = document.createElement('script');
    script.src = "/qrcode.min.js"
    document.head.append(script);

    script.onload = function() {
      new QRCode("qrcode", {
        text: address,
        width: 200,
        height: 200,
        colorDark : "#000000", 
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  });
</script>

<div id="qrcode" class="h-[200px] w-[200px] mx-auto"></div>

<style>

</style>
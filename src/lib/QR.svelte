<script>
  import { onMount } from "svelte";

  export let address; 

  onMount(() => {
    qrcode = new QRCode("qrcode", {
      text: address,
      width: 200,
      height: 200,
      colorDark : "#000000", 
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
  });
</script>

<div id="qrcode" class="h-[200px] w-[200px] mx-auto"></div>

<style>

</style>
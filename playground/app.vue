<template>
  <div>
    <button @click.prevent="openLamba()">Open Lamba</button>
  </div>
</template>

<script setup>
  import { useNuxtApp } from '#app';
  const nuxtApp = useNuxtApp();

  const openLamba = ()=>{
    const config = {
      title: "Lamba",
      theme: "light",
      appId: "65aabeba6182d6903a2ea355",
      customerId: "cus_x1847",
    };

    const lamba = nuxtApp.$lamba(config);

    // listening for events
    lamba.on("name_of_the_event",(data)=>{
      console.log(data);
    })
  }
</script>

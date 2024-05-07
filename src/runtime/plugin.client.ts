import { defineNuxtPlugin } from '#app'
import type { LambaPublicRuntimeConfig, LambaSettings } from './interfaces';
let _useUpdatedVersions:boolean;

const loadStyles = (callback: Function) => {
  const head = document.getElementsByTagName('head')[0];
  const link = `https://sdk.lambahq.com/v1.min.css${_useUpdatedVersions?`?${+new Date()}`:''}`;

  // prevent duplicate injections
  if(head.querySelector(`link[href="${link}"]`)) return callback();

  const style = document.createElement("link");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("href", link);
  
  // Add style to document head
  head.appendChild(style);
  style.onload = () => {
    callback()
  }

  // if it fails, remove it from DOM
  style.onerror = ()=>{
    head.removeChild(style);
  }
}

const loadScript = () => {
  const head = document.getElementsByTagName('head')[0];
  const link = `https://sdk.lambahq.com/v1.js${_useUpdatedVersions?`?${+new Date()}`:''}`;

  // prevent duplicate injections
  if(head.querySelector(`script[src="${link}"]`)) return;

  const script = document.createElement('script')
  script.defer = true
  script.src = link

  // Add script to document head
  head.appendChild(script)

  // if it fails, remove it from DOM
  script.onerror = ()=>{
    head.removeChild(script);
  }
}

const loadAssets = async()=>{
  loadStyles(()=> loadScript())
}

const lamba = (config: LambaSettings)=>{
  const w: any = window;
  if(!w?.Lamba) throw new Error("Lamba installation failed. Please switch to an active internet connection");
  if(!config) throw new Error("Please provide Lamba's config to continue");

  const lamba = new w.Lamba(config);
  lamba.open();
  return lamba;
}

export default defineNuxtPlugin((nuxtApp) => {
  const lambaConfig = nuxtApp.$config.public?.lamba as LambaPublicRuntimeConfig;
  const useUpdatedVersions = lambaConfig?.alwaysUseUpToDateVersions;
  _useUpdatedVersions = useUpdatedVersions;

  // load assets
  loadAssets();

  // load failed assets when the network is back online
  window.addEventListener("online", loadAssets);

  nuxtApp.provide('lamba',lamba);
})

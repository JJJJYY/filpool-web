import { pcOrigin, commonHash } from '@/config';
import { isAndroid, isiOS, isWeixin } from '@/utils/utilTools';
window.addEventListener("resize", relink);

function relink() {
  let isMobile = isAndroid() || isiOS() || isWeixin();
  // if (!isMobile) {
  //   let hashs = commonHash;
  //   let useHash = false;
  //   let routeHash = window.location.hash;
  //   hashs.forEach((item) => {
  //     if (routeHash.indexOf(item) === 0) {
  //       useHash = true;
  //     }
  //   });
  //   if (useHash) {
  //     window.location.href = pcOrigin + routeHash;
  //   } else {
  //     window.location.href = pcOrigin;
  //   }
  // }
}

relink();
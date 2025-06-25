import { isWechatBrowser, isIOS } from '@iivu/utils';
import type { ObjectDirective } from 'vue';

export const vAdjustText: ObjectDirective = {
  mounted(el, binding) {
    const winWidth = Math.min(window.innerWidth, 750);
    const size = (winWidth * 100) / 750;
    let realFontSize = 0;
    if (!isWechatBrowser() && !isIOS()) {
      const realSize = parseFloat(window.getComputedStyle(window.document.documentElement).fontSize);
      const ratio = size / realSize;
      realFontSize = binding.value * ratio;
    } else {
      realFontSize = binding.value;
    }
    el.style.fontSize = `${realFontSize}${binding.arg || 'rem'}`;
  }
};

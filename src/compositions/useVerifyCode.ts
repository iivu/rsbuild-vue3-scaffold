import { ref, onBeforeUnmount } from 'vue';

import { validateTelephone, showModal } from '@iivu/utils';
import * as api from '@/services/api';

export function useVerifyCode() {
  let timer: number | null = null;
  const lock = ref(false);
  const remainTime = ref(0);

  async function send(tel: string) {
    if (lock.value) return;
    if (!validateTelephone(tel)) {
      showModal('请输入正确的手机号码');
      return;
    }
    try {
      const res = await api.sendVerifyCode({ mobile: tel });
      remainTime.value = res.remainderSecond;
      lock.value = true;
      countDown();
    } catch (e) {
      console.log(e);
    }
  }

  function countDown() {
    lock.value = true;
    timer = window.setInterval(() => {
      remainTime.value--;
      if (remainTime.value === 0) {
        clearInterval(timer as number);
        lock.value = false;
      }
    }, 1000);
  }

  onBeforeUnmount(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  return { lock, remainTime, send };
}

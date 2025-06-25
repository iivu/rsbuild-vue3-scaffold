import { onMounted } from 'vue';
import { getQueryByName, showModal, isWechatBrowser } from '@iivu/utils';

import { getToken, saveToken, removeToken } from '@/shared/token';
import * as api from '@/services/api';

type Callback = (needLogin: boolean) => void;

export function useAuth(cb: Callback) {

  async function inWechat() {
    const htoken = getToken() || getQueryByName('htoken') || '';
    if (!htoken) {
      window.location.replace(api.wechatAuthURL());
      return;
    }
    saveToken(htoken);
    const res = await api.validateToken().catch(() => null);
    if (!res) return;
    if (res.isValid === 1) {
      cb(false);
    } else {
      removeToken();
      window.location.replace(api.wechatAuthURL());
    }
  }

  async function inApp() {
    const bankToken = getQueryByName('Token') || '';
    if (!bankToken) {
      showModal('Token参数错误');
      return;
    }
    const res = await api.decodeBankToken({ Token: bankToken }).catch(() => null);
    if (!res) return;
    saveToken(res.htoken);
    cb(res.isLogin === 0);
  }

  onMounted(() => {
    const htoken = getToken() || getQueryByName('htoken') || '';
    const bankToken = getQueryByName('Token') || '';
    if (!bankToken && !htoken && !isWechatBrowser()) {
      showModal('未知环境');
      return;
    }
    if (isWechatBrowser()) {
      inWechat();
    } else {
      inApp();
    }
  })
}

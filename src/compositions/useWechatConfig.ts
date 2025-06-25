import axios from 'axios';

import { getRandomStr } from '@iivu/utils';
import * as types from '@/types';

let wechatSDKConfig: types.WechatSDKConfig | null = null;
let signURL = '';

export async function useWechatConfig(cb?: (params?: any) => void) {
  try {
    const _signURL = window.location.href.split('#')[0];
    if (wechatSDKConfig === null || signURL !== _signURL) {
      // const timestamp = new Date().getTime().toString(10).slice(0, -3);
      // const noncestr = getRandomStr(16);
      const res = await axios.post(import.meta.env.APP_WECHAT_CONFIG_URL, { url: _signURL });
      if (res.data.code === 0) {
        const _config = res.data.data as types.WechatSDKConfig;
        wechatSDKConfig = _config;
        signURL = _signURL;
        window.wx.ready(() => {
          console.log('Wechat jssdk ready');
          cb && cb();
        });
        window.wx.error(() => {
          console.log('Wechat jssdk error');
          wechatSDKConfig = null;
          signURL = '';
        });
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
          appId: _config.appId, // 必填，公众号的唯一标识
          timestamp: _config.timestamp, // 必填，生成签名的时间戳
          nonceStr: _config.nonceStr, // 必填，生成签名的随机串
          signature: _config.signature, // 必填，签名
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填，需要使用的 JS 接口列表
        });
      }
    } else {
      cb && cb();
    }
  } catch (e) {
    console.log(e);
  }
}

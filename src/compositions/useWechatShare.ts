import { getPageURL } from '@iivu/utils';

import ShareIcon from '@/assets/share_icon.jpg';

import { useWechatConfig } from './useWechatConfig';


type ShareConfig = { title?: string; link?: string; desc?: string; imgUrl?: string };

function updateWechatShare(shareConfig: ShareConfig) {
  const defaultShareConfig = {
    title: import.meta.env.APP_SHARE_TITLE,
    desc: import.meta.env.APP_SHARE_DESC,
    link: `${getPageURL()}`,
    imgUrl: ShareIcon,
  };
  window.wx.onMenuShareTimeline({ ...defaultShareConfig, ...shareConfig });
  window.wx.onMenuShareAppMessage({ ...defaultShareConfig, ...shareConfig });
}

export async function useWechatShare(shareConfig: ShareConfig = {}) {
  useWechatConfig(() => updateWechatShare(shareConfig));
}

export {};

declare global {
  interface Window {
    wx: {
      config: (config: any) => void;
      ready: (config: any) => void;
      error: (config: any) => void;
      chooseWXPay: (config: any) => void;
      onMenuShareTimeline: (config: any) => void;
      onMenuShareAppMessage: (config: any) => void;
    };
    __APP__INTERNAL_POPUP_COUNT__: number;
    WebViewJavascriptBridge?: {
      callHandler?: (handlerName: string, data: any, responseCallback?: (responseData: any) => void) => void;
    }
  }
}

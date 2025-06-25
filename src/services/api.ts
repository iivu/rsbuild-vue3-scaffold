import { post, get } from '@/shared/http';

export function sendVerifyCode(data: { mobile: string }) {
  return post<{ remainderSecond: number }>('/Mini/getCode', data);
}
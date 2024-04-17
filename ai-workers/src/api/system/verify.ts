/*
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-17 20:46:05
 */
import { http } from '@/utils/http/axios';
import { BasicResponseModel } from "./user";

export function getPhoneVerifyCode(params) {
    return http.request<BasicResponseModel>(
        {
          url: '/verification_code',
          method: 'POST',
          params,
        },
        {
          // 是否需要转换输出数据
          isTransformResponse: false,
        }
    );

} 
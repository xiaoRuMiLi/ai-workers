/*
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-21 21:41:41
 */
import { http } from '@/utils/http/axios';
import type { Interactive, InteractiveType } from "/#/interactive";

export type Data = {
    answer: string,
    interactive?: Interactive
}


export interface BasicResponseModel<T = any> {
    code: number;
    message: string;
    data: T;
}

export interface BasicPageParams {
    pageNumber: number;
    pageSize: number;
    total: number;
}

/**
 * @description: 汽车维修测试消息
 */
export function callServiceGroup(params: {question: string}, serviceGroupName: string) {
    return http.request<BasicResponseModel<Data>>({
        url: `/api/${serviceGroupName}`,
        method: 'get',
        params,
        timeout: 500 * 1000, // 默认超时时间为500秒
    },
    {
        isTransformResponse: false, //对response进行Transform处理
    }
    );
}
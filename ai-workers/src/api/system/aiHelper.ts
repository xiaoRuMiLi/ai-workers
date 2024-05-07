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

// 服务模型
export interface serviceModel {
    service_name: string,
    group_id: number,
    description: string,
    key_point: string,
    name: string,
    id: number,
    icon: string
}

/**
 * @description: 模型聊天
 */
export function callServiceGroup(params: {question: string}, serviceGroupName: string, groupId: string|number) {
    return http.request<BasicResponseModel<Data>>({
        url: `/api/${serviceGroupName}/${groupId}`,
        method: 'get',
        params,
        
    },
    {
        isTransformResponse: false, //对response进行Transform处理
    }
    );
}

export function recommendService()
{
    return http.request<BasicResponseModel<serviceModel[]>>({
        url: `/recommend_service`,
        method: "get",
        timeout: 500 * 1000, // 默认超时时间为500秒
    },
    {
        isTransformResponse: false, //对response进行Transform处理
    }
    );
}
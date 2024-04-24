/*
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-23 21:08:41
 */
export interface Interactive {
    question: string,
    content: string,
    params: {
        [key: string]: {
            type: string,
            required: boolean
        }
    },
    type: InteractiveType
}

export type InteractiveType = "confirm"|"radio"|"checkbox";


/*
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-15 23:10:17
 */
type AiMessage = {
    content: string,
    role: 0|1|2,
    tokens?: number
}
export default AiMessage;
/*
 * @Description: 本地缓存工具类，用于对数据进行存储、获取和删除操作
 * @Author: jinjie
 * @Date: 2024-04-02 17:46:17
 * @LastEditTime: 2024-04-02 18:12:51
 * @LastEditors: lyq
 */

// 默认缓存时间为一周
const DEFAULT_CACHE_TIME: number = 60 * 60 * 24 * 7;

// 定义本地缓存类
export default class LocalCache {
    // 存储引擎
    private storage: Storage;
    // 缓存数据的前缀
    private prefix?: string;

    /**
     * 构造函数，可传入前缀和存储引擎，默认为localStorage
     * @param prefix - 缓存数据的前缀
     * @param storage - 存储引擎，默认为localStorage
     */
    constructor(prefix: string = '', storage: Storage = localStorage) {
        this.storage = storage;
        this.prefix = prefix;
    }

    /**
     * 生成带前缀的缓存键名
     * @param key - 缓存键名
     * @returns string - 带前缀的缓存键名
     */
    private getKey(key: string): string {
        return `${this.prefix}${key}`.toUpperCase();
    }

    /**
     * 设置缓存，可设置过期时间
     * @param key - 缓存键名
     * @param value - 缓存值
     * @param expire - 过期时间，默认值为DEFAULT_CACHE_TIME
     */
    public set(key: string, value: any, expire: number = DEFAULT_CACHE_TIME): void {
        const data: string = JSON.stringify({
            value,
            expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
        });
        this.storage.setItem(this.getKey(key), data);
    }

    /**
     * 获取缓存，如缓存过期则删除并返回默认值
     * @param key - 缓存键名
     * @param defaultValue - 默认值，默认为null
     * @returns any - 缓存值或默认值
     */
    public get(key: string, defaultValue: any = null): any {
        const item: string | null = this.storage.getItem(this.getKey(key));
        if (item) {
            try {
                const { value, expire } = JSON.parse(item);
                if (expire === null || expire >= Date.now()) {
                    return value;
                }
                this.remove(key);
            } catch (error) {
                return defaultValue;
            }
        }
        return defaultValue;
    }

    /**
     * 移除指定缓存
     * @param key - 缓存键名
     */
    public remove(key: string): void {
        this.storage.removeItem(this.getKey(key));
    }

    /**
     * 清空所有缓存
     */
    public clear(): void {
        this.storage.clear();
    }

    /**
     * 设置cookie，可设置过期时间
     * @param name - cookie名称
     * @param value - cookie值
     * @param expire - 过期时间，默认值为DEFAULT_CACHE_TIME
     */
    public setCookie(name: string, value: string, expire: number = DEFAULT_CACHE_TIME): void {
        document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`;
    }

    /**
     * 获取cookie
     * @param name - cookie名称
     * @returns string - cookie值
     */
    public getCookie(name: string): string {
        const cookies: string[] = document.cookie.split('; ');
        for (let i: number = 0; i < cookies.length; i++) {
            const [cookieName, cookieValue]: string[] = cookies[i].split('=');
            if (cookieName === this.getKey(name)) {
                return cookieValue;
            }
        }
        return '';
    }

    /**
     * 删除cookie
     * @param name - cookie名称
     */
    public removeCookie(name: string): void {
        this.setCookie(name, '1', -1);
    }

    /**
     * 清空所有cookie
     */
    public clearCookies(): void {
        const cookieNames: RegExpMatchArray | null = document.cookie.match(/[^ =;]+(?==)/g);
        if (cookieNames) {
            cookieNames.forEach((name: string) => {
                document.cookie = `${name}=0;expires=${new Date(0).toUTCString()}`;
            });
        }
    }
}

// 导出单例实例
export const localCache: LocalCache = new LocalCache('');

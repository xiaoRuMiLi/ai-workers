/*
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-02 18:20:40
 */
import { defineStore } from 'pinia';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, IS_SCREENLOCKED } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';

import { getUserInfo as getUserInfoApi, login } from '@/api/system/user';
import { localCache } from '@/utils/Storage';

export type UserInfoType = {
  // TODO: add your own data
  name: string;
  email: string;
};

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[]; //字符组成的数组
  info: UserInfoType;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: localCache.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: localCache.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): UserInfoType {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info: UserInfoType) {
      this.info = info;
    },
    // 登录
    async login(params: any) {
      try {
        const response = await login(params);
        const { data, code } = response;
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60;
          localCache.set(ACCESS_TOKEN, data.token, ex);
          localCache.set(CURRENT_USER, data, ex);
          localCache.set(IS_SCREENLOCKED, false);
          this.setToken(data.token);
          this.setUserInfo(data);
        }
        return Promise.resolve(response);
      } catch (e)
      {
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    async getInfo (): Promise<any> {
      try {
        const response = await getUserInfoApi();
        const { data, code } = response;
        if (code === ResultEnum.SUCCESS) {
          if (data.permissions && data.permissions.length) {
            const permissionsList = data.permissions;
            this.setPermissions(permissionsList);
            this.setUserInfo(data);
          } else {
            throw new Error('getInfo: permissionsList must be a non-null array !');
          }
          this.setAvatar((data?.avatar) ?? "");
        }
        return Promise.resolve(data);
      } catch (e)
      {
        return Promise.reject(e);
      }
      
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo({ name: '', email: '' });
      localCache.remove(ACCESS_TOKEN);
      localCache.remove(CURRENT_USER);
    },
  },
});

// Need to be used outside the setup
export function useUserStoreInstance() {
  return useUserStore(store);
}

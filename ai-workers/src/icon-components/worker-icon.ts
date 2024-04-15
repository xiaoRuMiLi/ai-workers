import { SettingOutlined, MehTwotone, AliwangwangOutlined, UserOutlined } from '@vicons/antd';

import { Component } from "vue";

const IconComponent = new Map<string, Component>();
IconComponent.set("SettingOutlined", SettingOutlined);
IconComponent.set('default', MehTwotone);

IconComponent.set('default', MehTwotone);

IconComponent.set("assistantAvatar", AliwangwangOutlined);

IconComponent.set("userAvatar", UserOutlined);

export default IconComponent;
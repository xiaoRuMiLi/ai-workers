import { SettingOutlined, MehTwotone } from '@vicons/antd';
import { Component } from "vue";
const IconComponent = new Map<string, Component>();
IconComponent.set("SettingOutlined", SettingOutlined);
IconComponent.set('default', MehTwotone);
export default IconComponent;
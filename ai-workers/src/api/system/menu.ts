
import { asyncRoutes } from "@/router/index";
// 模拟一个API,后期换真实的, 这里直接读取router/modules中的route
export async function adminMenus () 
{
    // 后端应返回这么一个东西
    const view = [
        {
            component: "LAYOUT",
            meta: {
               icon: "DashboardOutlined",
               title: "Dashboard",
            },
            name: "Dashboard",
            path: "/dashboard",
            redirect: "/dashboard/console",
            children:[
                {
                    component: "/dashboard/console/console",
                    meta: {
                        title:  "主控台"
                    },
                    name: "dashboard_console",
                    path: "console"
                },
                {
                    component: "/dashboard/workplace/workplace",
                    meta: {
                        title:  "主控台",
                        hidden: true,
                    },
                    name: "dashboard_console",
                    path: "console"
                }
            ]
        }
    ];
    return new Promise((resolve) => {
        resolve(view);
    });
}
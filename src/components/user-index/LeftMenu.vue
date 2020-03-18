<script>
const menuList = [
  {
    name: '首页',
    id: 1,
    icon: 'el-icon-setting',
    route: '/index'
  },
  {
    name: '借阅管理',
    id: 2,
    icon: 'el-icon-s-check',
    children: [
      { path: 'current-borrowing-renewing', name: '当前借阅/续借' },
      { path: 'borrowed-history', name: '借阅历史' }
    ]
  },
  {
    name: '预约管理',
    id: 3,
    icon: 'el-icon-s-data',
    path: '/user/appoint-manage'
  },
  {
    name: '赔偿/逾期查询',
    id: 4,
    icon: 'el-icon-data-line',
    children: [
      { path: 'compensation-inquiry', name: '赔偿查询' },
      { path: 'overdue-inquiry', name: '逾期查询' }
    ]
  }
];

export default {
  render() {
    const createMenu = () => {
      const menus = [];
      menuList.forEach(item => {
        if (item.children) {
          const subMenus = [];
          item.children.forEach(child => {
            subMenus.push(
              <el-menu-item index={child.route}>{child.name}</el-menu-item>
            );
          });
          if (subMenus.length > 0) {
            menus.push(
              <el-submenu index={`${item.id}`}>
                <template slot="title">
                  <i class={item.icon} />
                  <span>{item.name}</span>
                </template>
                {subMenus}
              </el-submenu>
            );
          }
        } else {
          menus.push(
            <el-menu-item index={item.route}>
              <i class={item.icon} />
              <span>{item.name}</span>
            </el-menu-item>
          );
        }
      });
      return menus;
    };
    return (
      <el-menu
        class="nav-menu"
        text-color="#fff"
        background-color="#40435b"
        active-text-color="#2699FB"
        default-active="/DataOverview"
        router
        unique-opened
      >
        {createMenu()}
      </el-menu>
    );
  }
};
</script>
<style lang="scss" scoped>
.nav-menu {
  border-right: none !important;
}
</style>

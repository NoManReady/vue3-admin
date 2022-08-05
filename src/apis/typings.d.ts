declare namespace API {
  type AccessItem = {
    /** 权限名称 */
    title: string;
    /** 权限ID */
    id: string;
    /** 父权限ID */
    pid: string;
    children?: AccessItem[];
  };

  type AccessList = AccessItem[];

  type AccessTree = AccessItem;

  type AliOssParams = {
    accessKeySecret: string;
    expiration: string;
    accessKeyId: string;
    securityToken: string;
  };

  type DeleteAccessBody = {
    /** Access Id */
    id: string;
  };

  type DeleteRoleBody = {
    /** 角色Id */
    id: string;
  };

  type DeleteUserBody = {
    /** 用户Id */
    id?: string;
  };

  type doPackageParams = {
    /** 打包路径 */
    path?: string;
    /** 打包限制数量 */
    limit?: string;
  };

  type DumpDeleteParams = {
    /** 路径 */
    path?: string;
    /** 文件ID */
    id?: string;
  };

  type DumpItem = {
    /** 文件路径 */
    path: string;
    /** 打包文件ID */
    id?: string;
    /** 文件路径 */
    url?: string;
    state: DumpStateEnum;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
  };

  type DumpList = {
    data?: DumpItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type DumpStateEnum = -1 | 0 | 1 | 2;

  type getAccessByRoleParams = {
    /** 角色Id */
    roleId?: string;
  };

  type getDumpsParams = {
    /** OSS文件路径 */
    path?: string;
  };

  type getRolesByUserIdParams = {
    /** 用户ID */
    userId: string;
  };

  type getRolesParams = {
    /** 分页大小 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
  };

  type getUsersParams = {
    /** 分页大小 */
    pageSize?: number;
    /** 当前分页 */
    current?: number;
    /** 文件名称 */
    name?: string;
  };

  type getVersionsParams = {
    /** 当前分页 */
    current?: number;
    /** 分页大小 */
    pageSize?: number;
    /** 文件名称 */
    filename?: string;
  };

  type LoginParams = {
    /** 登录账号 */
    account: string;
    /** 登录密码 */
    password: string;
  };

  type LoginResult = {
    /** 登录唯一标识 */
    token?: string;
    /** 登录状态(0:failure,1:success) */
    status: 0 | 1;
    /** 登录描述信息 */
    msg?: string;
  };

  type MenuItem = {
    /** 名称 */
    title?: string;
    /** 组件名称 */
    name?: string;
    /** 路由路径 */
    path?: string;
    /** 是否启用 */
    status?: string;
    /** 权限code */
    permission?: string;
    /** 图标 */
    icon?: string;
    /** 菜单类型 */
    menuType?: string;
    /** 父菜单ID */
    parentId?: string;
    /** 父菜单名称 */
    parentTitle?: string;
    /** 排序序号 */
    sort?: number;
    /** 菜单ID */
    id?: string;
    /** 动画名称 */
    transitionName?: string;
    /** 重定向地址 */
    redirect?: string;
    /** iframe地址 */
    frameSrc?: string;
    /** 组件地址 */
    component?: string;
    /** 是否隐藏子菜单 */
    hideChildrenInMenu?: boolean;
    /** 是否隐藏菜单 */
    hideMenu?: boolean;
    /** 是否隐藏tab */
    hideTab?: boolean;
  };

  type MenuList = MenuItem[];

  type ModifyPasswordBody = {
    /** 新密码 */
    newPassword: string;
    /** 旧密码 */
    oldPassword: string;
  };

  type PaginationParams = {
    /** 每页大小 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
  };

  type RoleItem = {
    /** 角色Id */
    id?: string;
    /** 角色名称 */
    name?: string;
    /** 角色描述 */
    remark?: string;
    menus?: string[];
  };

  type RoleList = {
    data?: RoleItem[];
    total?: number;
    success?: boolean;
  };

  type simpleRoleList = RoleItem[];

  type UserInfo = {
    /** 账号 */
    account?: string;
    /** 用户名 */
    name?: string;
    /** 用户头像 */
    avatar?: string;
    /** 用户邮箱 */
    email?: string;
    /** 所属国家 */
    country?: string;
    /** 电话号码 */
    phone?: string;
    /** 用户ID */
    id?: string;
    /** 最后更新时间 */
    updateTime?: string;
    /** 用户角色ID列表 */
    menus?: Record<string, any>;
  };

  type UserList = {
    data?: UserInfo[];
    total?: number;
    success?: boolean;
  };

  type VersionDeleteParams = {
    id: string;
  };

  type VersionItem = {
    /** 文件下载地址 */
    url: string;
    /** 文件下载地址CDN */
    cdnUrl?: string;
    /** 文件类别 */
    type: 'Setup' | 'Upgrade';
    /** 上传文件全路径 */
    filename: string;
    /** 文件备注 */
    remarks: string;
    /** 文件MD5值 */
    md5: string;
    /** ID */
    id?: string;
    /** 创建时间 */
    createTime?: string;
    /** 版本号 */
    version?: string;
  };

  type VersionList = {
    data?: VersionItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}

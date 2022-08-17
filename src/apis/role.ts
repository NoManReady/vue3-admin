// @ts-ignore
/* eslint-disable */
import request from '/@/request';

/** 添加角色 POST /api/role/add */
export async function addRole(body: API.RoleItem, options?: { [key: string]: any }) {
  return request<any>('/api/role/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户的角色 GET /api/role/byUser */
export async function getRolesByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRolesByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.RoleList>('/api/role/byUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除角色 POST /api/role/delete */
export async function delRole(body: API.DeleteRoleBody, options?: { [key: string]: any }) {
  return request<any>('/api/role/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色列表 GET /api/role/list */
export async function getRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRolesParams,
  options?: { [key: string]: any },
) {
  return request<API.RoleList>('/api/role/list', {
    method: 'GET',
    params: {
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改角色 POST /api/role/update */
export async function updateRole(body: API.RoleItem, options?: { [key: string]: any }) {
  return request<any>('/api/role/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

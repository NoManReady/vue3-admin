// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** 根据roleId获取权限列表 GET /api/access/byRole */
export async function getAccessByRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccessByRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.AccessList>('/api/access/byRole', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加access POST /api/menu/add */
export async function addAccess(body: API.MenuItem, options?: { [key: string]: any }) {
  return request<any>('/api/menu/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除Access POST /api/menu/delete */
export async function delAccess(body: API.DeleteAccessBody, options?: { [key: string]: any }) {
  return request<any>('/api/menu/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取权限列表 GET /api/menu/list */
export async function getAccesss(options?: { [key: string]: any }) {
  return request<API.MenuList>('/api/menu/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改access POST /api/menu/update */
export async function updateAccess(body: API.MenuItem, options?: { [key: string]: any }) {
  return request<any>('/api/menu/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

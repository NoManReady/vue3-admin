// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** 添加用户 POST /api/user/add */
export async function addUser(body: API.UserInfo, options?: { [key: string]: any }) {
  return request<any>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 POST /api/user/changePassword */
export async function modifyPassword(
  body: API.ModifyPasswordBody,
  options?: { [key: string]: any },
) {
  return request<any>('/api/user/changePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/delete */
export async function delUser(body: API.DeleteUserBody, options?: { [key: string]: any }) {
  return request<any>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户列表 GET /api/user/list */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.UserList>('/api/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改用户 POST /api/user/update */
export async function updateUser(body: API.UserInfo, options?: { [key: string]: any }) {
  return request<any>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/user/userInfo */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.UserInfo>('/api/user/userInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

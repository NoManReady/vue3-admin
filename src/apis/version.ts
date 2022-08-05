// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** 上传包 POST /api/version/add */
export async function addVersion(body: API.VersionItem, options?: { [key: string]: any }) {
  return request<any>('/api/version/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除包 POST /api/version/delete */
export async function delVersion(body: API.VersionDeleteParams, options?: { [key: string]: any }) {
  return request<any>('/api/version/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取包列表 GET /api/version/list */
export async function getVersions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVersionsParams,
  options?: { [key: string]: any },
) {
  return request<API.VersionList>('/api/version/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

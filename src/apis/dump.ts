// @ts-ignore
/* eslint-disable */
import request from '/@/request';

/** 删除文件 POST /api/dump/delete */
export async function delDump(body: API.DumpDeleteParams, options?: { [key: string]: any }) {
  return request<any>('/api/dump/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取Dump列表 GET /api/dump/list */
export async function getDumps(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDumpsParams,
  options?: { [key: string]: any },
) {
  return request<API.DumpList>('/api/dump/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 打包文件 GET /api/dump/package */
export async function doPackage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doPackageParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/dump/package', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

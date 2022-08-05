// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** 获取上传密钥（alioss使用） GET /api/version/sts */
export async function getAliOssParams(options?: { [key: string]: any }) {
  return request<API.AliOssParams>('/api/version/sts', {
    method: 'GET',
    ...(options || {}),
  });
}

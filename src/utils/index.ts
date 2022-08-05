export const getTimeWelcome = (date: Date | undefined) => {
	const timeNow = date || new Date()
	const hours = timeNow.getHours()
	if (hours >= 6 && hours < 9) {
		return '早上好'
	}
	if (hours >= 9 && hours < 12) {
		return '上午好'
	}
	if (hours >= 12 && hours < 14) {
		return '中午好'
	}
	if (hours >= 14 && hours < 18) {
		return '下午好'
	}
	return '晚上好'
}

export const getBlob = (url: string): Promise<Blob> => {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', url, true)
		xhr.responseType = 'blob'
		xhr.onload = function () {
			if (xhr.status === 200) {
				resolve(xhr.response)
			}
		}
		xhr.send()
	})
}

type TDownloadFile = {
	url: string
	filename: string
	fileType?: string
}
// 下载文件
export const downloadFile = async ({
	url,
	filename,
	fileType = url.slice(url.lastIndexOf('.')),
}: TDownloadFile) => {
	const link = document.createElement('a')
	link.download = `${filename || new Date().toString()}.${fileType || 'txt'}`
	const fileBlob = await getBlob(url)
	link.href = window.URL.createObjectURL(fileBlob)
	link.target = '_balnk'
	link.click()
	URL.revokeObjectURL(link.href)
}

// 数组转树形结构
export const toTree = <T = any>(
	data: T[],
	idKey: string = 'id',
	pidKey: string | null = 'pid'
): (T & { children: T })[] => {
	const result: any[] = []
	if (!Array.isArray(data)) {
		return result
	}
	const _data = JSON.parse(JSON.stringify(data))
	// data.forEach((item) => {
	//   delete item.children;
	// });
	const map = {}
	_data.forEach((item: T) => {
		map[item[idKey]] = item
	})
	_data.forEach((item: T) => {
		const parent = map[item[pidKey || '']]
		if (parent) {
			;(parent.children || (parent.children = [])).push(item)
		} else {
			result.push(item)
		}
	})
	return result
}

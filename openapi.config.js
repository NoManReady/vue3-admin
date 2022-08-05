const { generateService } = require('@umijs/openapi')
const { resolve } = require('path')
generateService({
	schemaPath: resolve(__dirname, './config/openapi.json'),
	serversPath: './src',
	requestLibPath: "import request from '@/request'",
    projectName:'apis'
})

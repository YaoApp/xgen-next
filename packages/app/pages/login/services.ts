import axios from 'axios'
import { injectable } from 'tsyringe'

import { catchError } from '@yaoapp/utils'

import type { Response } from '@/types'

@injectable()
export default class Index {
	@catchError()
	getCaptcha<Res>(url?: string) {
		return axios.get<{}, Response<Res>>(
			url ? url : `/api/${localStorage.getItem('__api_prefix')}/user/captcha?type=digit`
		)
	}

	@catchError()
	login<Req, Res>(data: Req, url?: string) {
		return axios.post<Req, Response<Res>>(
			url ? url : `/api/${localStorage.getItem('__api_prefix')}/user/login`,
			data
		)
	}

	@catchError()
	authByLark<Res>(url: string) {
		return axios.get<{}, Response<Res>>(url)
	}

	@catchError()
	loginByLark<Req, Res>(url: string, params: Req) {
		return axios.get<Req, Response<Res>>(url, { params })
	}

	/** autoLogin is just for demo app. */
	@catchError()
	autoLogin<Res>() {
		return axios.get<{}, Response<Res>>(`/api/demo/admin`)
	}
}

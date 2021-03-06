import { message } from 'antd'
import { makeAutoObservable, toJS } from 'mobx'
import { injectable } from 'tsyringe'

import { GlobalModel } from '@/context/app'
import { Namespace } from '@/models'
import { ColumnUtils, Common, Table } from '@/services'

import Service from './services'

import type { FormType, TableType, Component, Global } from '@/types'

@injectable()
export default class Model {
	parent = 'Page' as Component.StackComponent['parent']
	model = '' as Component.StackComponent['model']
	id = 0 as Component.IdType
	type = '' as Component.FormType
	setting = {} as FormType.Setting
	data = {} as Global.AnyObject
	sections = [] as Array<FormType.SectionResult>
	rendered = false

	constructor(
		private service: Service,
		private common: Common,
		private table: Table,
		private column_utils: ColumnUtils,
		public global: GlobalModel,
		public namespace: Namespace
	) {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	async getSetting() {
		const { res, err } = await this.common.getSetting<FormType.Setting>('form', this.model)

		if (err) return

		this.rendered = true
		this.setting = res
		this.sections = this.column_utils.reduceSections(res.form.sections, res.fileds.form)
	}

	async find() {
		if (this.parent === 'Page' && this.rendered === false) this.global.loading = true

		const { res, err } = await this.service.find<any>(this.model, this.id)

		this.global.loading = false

		if (err) return

		this.data = res
	}

	async save(data: TableType.SaveRequest) {
		const hideLoading = message.loading(
			this.global.locale_messages.messages.table.save.loading
		)

		const { err } = await this.table.save<TableType.SaveRequest, TableType.SaveResponse>(
			this.model,
			data
		)

		hideLoading()

		if (err) return

		message.success(this.global.locale_messages.messages.table.save.success)

		if (this.parent === 'Modal') {
			window.$app.Event.emit(`${this.namespace.parent}/search`)
		}

		if (!this.setting.operation.preset?.save?.back) return

		window.$app.Event.emit(`${this.namespace.value}/back`)
	}

	async delete(primary_value: number) {
		const hideLoading = message.loading(
			this.global.locale_messages.messages.table.delete.loading
		)

		const { err } = await this.table.delete<TableType.DeleteResponse>(
			this.model,
			primary_value
		)

		hideLoading()

		if (err) return

		message.success(this.global.locale_messages.messages.table.delete.success)

		if (this.parent === 'Modal') {
			window.$app.Event.emit(`${this.namespace.parent}/search`)
		}

		window.$app.Event.emit(`${this.namespace.value}/back`)
	}

	init(
		parent: Component.StackComponent['parent'],
		model: Component.StackComponent['model'],
		id: Component.StackComponent['id'],
		form: Component.StackComponent['form'],
		onBack: Component.FormComponent['onBack']
	) {
		this.global.stack.push(`Form-${parent}-${model}`)

		this.namespace.paths = toJS(this.global.stack.paths)
		this.parent = parent
		this.model = model
		this.id = Number(id)
		this.type = form!.type

		this.getSetting()

		if (Number(id) === 0) {
			this.global.loading = false
		} else {
			this.find()
		}

		this.on(onBack)
	}

	on(onBack: Component.FormComponent['onBack']) {
		window.$app.Event.on(`${this.namespace.value}/find`, this.find)
		window.$app.Event.on(`${this.namespace.value}/save`, this.save)
		window.$app.Event.on(`${this.namespace.value}/delete`, this.delete)
		window.$app.Event.on(`${this.namespace.value}/back`, onBack!)
	}

	off(onBack: Component.FormComponent['onBack']) {
		window.$app.Event.off(`${this.namespace.value}/find`, this.find)
		window.$app.Event.off(`${this.namespace.value}/save`, this.save)
		window.$app.Event.off(`${this.namespace.value}/delete`, this.delete)
		window.$app.Event.off(`${this.namespace.value}/back`, onBack!)

		this.global.stack.remove(this.namespace.paths.slice(-1)[0])
	}
}

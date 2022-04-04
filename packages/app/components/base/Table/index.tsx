import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect, useState } from 'react'
import { container } from 'tsyringe'

import { Filter, Page, PureTable } from '@/components'

import styles from './index.less'
import Model from './model'

import type { IPropsTable } from './types'

import type { IPropsFilter } from '@/components/base/Filter/types'
import type { IPropsPureTable } from '@/components/base/PureTable/types'

const Index = (props: IPropsTable) => {
	const { parent, model } = props
	const [x] = useState(() => container.resolve(Model))

	useLayoutEffect(() => {
		x.stack.reset()
		x.stack.push(`${parent}-${model}`)

		x.parent = parent
		x.model = model

		x.getSetting()
		x.search()
	}, [])

	const props_table: IPropsPureTable = {
		parent,
		list: x.list,
		columns: x.table_columns,
		pagination: x.pagination
	}

	if (parent === 'Page') {
		if (!x.setting.table) return null

		const props_filter: IPropsFilter = {
			model: x.model,
			columns: x.filter_columns,
			btnAddText: x.setting.filter?.btnAddText
		}

		return (
			<Page className={clsx([styles._local, 'w_100'])}>
				<Filter {...props_filter}></Filter>
				<PureTable {...props_table}></PureTable>
			</Page>
		)
	}

	return (
		<div className={clsx([styles._local, 'w_100'])}>
			<PureTable {...props_table}></PureTable>
		</div>
	)
}

export default new window.$app.Handle(Index).by(observer).by(window.$app.memo).get()

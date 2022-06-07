import { Cascader } from 'antd'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect, useState } from 'react'
import { container } from 'tsyringe'

import { Item } from '@/components'
import { getLocale } from '@umijs/max'

import styles from './index.less'
import Model from './model'

import type { CascaderProps } from 'antd'
import type { Remote } from '@/types'

type IProps = Remote.IProps & CascaderProps<any> & {}

const Index = (props: IProps) => {
	const { __bind, __name, __data_item, itemProps, xProps, ...rest_props } = props
	const [x] = useState(() => container.resolve(Model))
	const is_cn = getLocale() === 'zh-CN'

	useLayoutEffect(() => {
		x.remote.raw_props = props

		x.remote.init()
	}, [])

	return (
		<Item {...itemProps} {...{ __bind, __name }}>
			<Cascader
				className={styles._local}
				dropdownClassName={styles._dropdown}
				placeholder={`${is_cn ? '请输入' : 'Please input '}${__name}`}
				options={x.options}
				{...rest_props}
				// CascaderProps has it`s own problem, so here have to any
				{...(x.target_props as any)}
			></Cascader>
		</Item>
	)
}

export default new window.$app.Handle(Index).by(observer).by(window.$app.memo).get()

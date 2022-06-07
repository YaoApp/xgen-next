import { Mentions } from 'antd'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect, useState } from 'react'
import { container } from 'tsyringe'

import { Item } from '@/components'
import { getLocale } from '@umijs/max'

import styles from './index.less'
import Model from './model'

import type { Remote } from '@/types'
import type { MentionProps } from 'antd'

const { Option } = Mentions

interface IProps extends Remote.IProps, MentionProps {}

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
			<Mentions
				className={styles._local}
				dropdownClassName={styles._dropdown}
				placeholder={`${
					is_cn ? '请输入@选择' : 'Please input @ to mention someone'
				}${__name}`}
				{...rest_props}
				{...x.target_props}
			>
				{x.options.map((item, index) => (
					<Option value={item.value} key={String(index)}>
						{item.label}
					</Option>
				))}
			</Mentions>
		</Item>
	)
}

export default new window.$app.Handle(Index).by(observer).by(window.$app.memo).get()

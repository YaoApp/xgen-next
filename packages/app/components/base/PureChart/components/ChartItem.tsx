import { Col } from 'antd'
import { toJS } from 'mobx'

import { X } from '@/components'
import { Card } from '@/widgets'
import { useIntl } from '@umijs/max'

import locales from '../locales'
import ChartLink from './ChartLink'

import type { IPropsChartItem } from '../types'

const Index = (props: IPropsChartItem) => {
	const { item, data } = props
	const { locale } = useIntl()
	const locale_messages = locales[locale]

	return (
		<Col span={item.width}>
			<Card
				title={item.name}
				options={
					item.link && (
						<ChartLink
							link_tooltip={locale_messages.link_tooltip}
							link={item.link}
						></ChartLink>
					)
				}
				style={item.cardStyle}
			>
				<X
					type='chart'
					name={item.view.type}
					props={{
						...toJS(item.view.props),
						data: toJS(data[item.bind]),
						__bind: item.bind,
						__name: item.name
					}}
				></X>
				{item.refer && (
					<div className='refer_wrap w_100'>
						<X
							type='chart'
							name={item.refer.type}
							props={{
								...toJS(item.refer.props),
								data: toJS(data[item.bind]),
								__bind: item.bind,
								__name: item.name
							}}
						></X>
					</div>
				)}
			</Card>
		</Col>
	)
}

export default window.$app.memo(Index)

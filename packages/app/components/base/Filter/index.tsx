import { Button, Col, Form, Row, Tooltip } from 'antd'
import clsx from 'clsx'
import { toJS } from 'mobx'

import { X } from '@/components'
import { Icon } from '@/widgets'
import { PlusOutlined } from '@ant-design/icons'
import { getLocale } from '@umijs/max'

import { useCalcLayout, useVisibleMore } from './hooks'
import styles from './index.less'
import locales from './locales'

import type { IPropsFilter } from './types'

const { useForm } = Form

const Index = (props: IPropsFilter) => {
	const { model, columns, btnAddText, isChart, onAdd, onFinish, resetSearchParams } = props
	const locale = getLocale()
	const is_cn = locale === 'zh-CN'
	const [form] = useForm()
	const { getFieldsValue, resetFields } = form
	const { display_more, opacity_more, visible_more, setVisibleMore } = useVisibleMore()
	const { base, more, visible_btn_more } = useCalcLayout(columns, btnAddText)

	const onReset = () => {
		resetFields()
		resetSearchParams()
		onFinish(getFieldsValue())
	}

	return (
		<Form
			className={clsx(styles._local, isChart ? styles.chart : '')}
			form={form}
			name={`form_filter_${model}`}
			onFinish={onFinish}
			onReset={onReset}
		>
			<Row gutter={16} justify='space-between' style={{ marginBottom: 20 }}>
				{base.map((item: any, index: number) => (
					<Col span={item.width} key={index}>
						<X
							type='edit'
							name={item.edit.type}
							props={{
								...toJS(item.edit.props),
								__bind: item.bind,
								__name: item.name
							}}
						></X>
					</Col>
				))}
				<Col span={2}>
					<Button
						className='w_100 flex justify_center align_center'
						type='primary'
						htmlType='submit'
					>
						{locales[locale].search}
					</Button>
				</Col>
				<Col span={2}>
					<Button
						className='w_100 flex justify_center align_center'
						htmlType='reset'
					>
						{locales[locale].reset}
					</Button>
				</Col>
				<Col flex='auto'>
					<div className='flex justify_end'>
						{visible_btn_more && (
							<Tooltip title={is_cn ? '更多筛选项' : 'More Filters'}>
								<Button
									className='btn_more no_text w_100 flex justify_center align_center'
									icon={
										<Icon
											name='icon-filter'
											size={15}
										></Icon>
									}
									onClick={() => setVisibleMore(true)}
								></Button>
							</Tooltip>
						)}
						{btnAddText && (
							<Button
								className='btn_add flex justify_center align_center ml_16'
								type='primary'
								onClick={onAdd}
								icon={<PlusOutlined></PlusOutlined>}
							>
								{btnAddText}
							</Button>
						)}
					</div>
				</Col>
			</Row>
			{visible_more && (
				<div
					className={clsx([
						'more_wrap w_100 border_box flex_column transition_normal relative',
						opacity_more ? 'opacity' : '',
						display_more ? 'display' : ''
					])}
				>
					<a
						className='icon_wrap flex justify_center align_center transition_normal cursor_point clickable absolute'
						onClick={() => setVisibleMore(false)}
					>
						<Icon className='icon' name='icon-x' size={16}></Icon>
					</a>
					<Row gutter={16} style={{ marginBottom: 16 }}>
						{more.map((item: any, index: number) => (
							<Col span={item.span} key={index}>
								<X
									type='edit'
									name={item.edit.type}
									props={{
										...toJS(item.edit.props),
										__bind: item.bind,
										__name: item.name
									}}
								></X>
							</Col>
						))}
					</Row>
				</div>
			)}
		</Form>
	)
}

export default window.$app.memo(Index)

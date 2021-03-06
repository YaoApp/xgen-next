import { Tooltip } from 'antd'
import clsx from 'clsx'

import { Icon } from '@/widgets'
import { Link } from '@umijs/max'

import styles from './index.less'

import type { IPropsItems } from '@/layouts/types'

const Index = ({ menu, current_nav }: IPropsItems) => {
	return (
		<div className={clsx([styles._local])}>
			<div className='top_mask w_100 mask absolute'></div>
			<div className='bottom_mask w_100 mask absolute'></div>
			<div className='w_100 border_box flex flex_column'>
				{menu.map((item, index) => (
					<Tooltip title={item.name} placement='right' key={index}>
						<Link
							className={clsx([
								'nav_item w_100 flex justify_center align_center clickable',
								current_nav === index ? 'active' : ''
							])}
							to={item.path}
						>
							<Icon name={item.icon} size={20}></Icon>
						</Link>
					</Tooltip>
				))}
			</div>
		</div>
	)
}

export default window.$app.memo(Index)

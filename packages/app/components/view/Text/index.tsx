import moment from 'moment'

import type { Component } from '@/types'

interface IProps extends Component.PropsViewComponent {
	format?: string
}

const Index = (props: IProps) => {
      const { __value } = props
      
	if (props?.format) {
		if (Array.isArray(__value)) {
			return (
				<span>
					<span>{moment(__value[0]).format(props.format)}</span>
					<span className='ml_6 mr_6'>-</span>
					<span>{moment(__value[1]).format(props.format)}</span>
				</span>
			)
		}

		return <span>{moment(__value).format(props.format)}</span>
	}

	return <span>{__value}</span>
}

export default window.$app.memo(Index)

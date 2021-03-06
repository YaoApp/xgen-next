import { render } from 'react-dom'

import Modal from '@/components/base/Modal'

import { createModalContainer } from '../../utils'

import type { IProps as IPropsModal } from '@/components/base/Modal'
import type { OnAction } from '../../index'

export default ({ namespace, primary, data_item, it }: OnAction) => {
	const props_modal: IPropsModal = {
		namespace,
		id: data_item[primary],
		config: it.action['Common.openModal']!
	}

	render(<Modal {...props_modal}></Modal>, createModalContainer(namespace))
}

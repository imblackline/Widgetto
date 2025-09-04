import { useEffect, useState } from 'react'
import { useGeneralSetting } from '@/context/general-setting.context'

export interface InfoPanelData {
	birthdays: Array<{
		id: string
		name: string
		date: string
		avatar?: string
	}>
	notifications: Array<{
		content: string
		timestamp: Date | null
	}>
	emailMessages: Array<{
		id: string
		threadId: string
		subject: string
		sender: string
		snippet: string
	}>
}

export const useInfoPanelData = (): InfoPanelData => {
	const { selected_timezone: timezone } = useGeneralSetting()


	const [data, setData] = useState<InfoPanelData>({
		birthdays: [],
		notifications: [],
		emailMessages: [],
	})



	return data
}

import DOMPurify from 'dompurify'
import { type JSX, useEffect, useState } from 'react'
import { TbApps } from 'react-icons/tb'
import { VscSettings } from 'react-icons/vsc'
import { getFromStorage, setToStorage } from '@/common/storage'
import { listenEvent } from '@/common/utils/call-event'
import Tooltip from '@/components/toolTip'
import { useWidgetVisibility } from '@/context/widget-visibility.context'
import { getConfigData } from '@/services/config-data/config_data-api'
import { SettingModal } from '../setting/setting-modal'
import { useTranslation } from 'react-i18next'
import { SyncButton } from './sync/sync'

export interface PageLink {
	name: string
	to: string
}

export function NavbarLayout(): JSX.Element {
	const { t, i18n } = useTranslation()
	const [showSettings, setShowSettings] = useState(false)
	const { openWidgetSettings } = useWidgetVisibility()
	const [tab, setTab] = useState<string | null>(null)

	const [logoData, setLogoData] = useState<{
		logoUrl: string | null
		content: string | null
	}>({
		logoUrl: null,
		content: '<h1 class="text-xl text-gray-100">ویجتی‌فای</h1>',
	})

	useEffect(() => {
		const handleOpenSettings = (tab: any) => {
			if (tab) {
				setTab(tab)
			}
			setShowSettings(true)
		}

		const loadConfig = async () => {
			try {
				const storeData: any = await getFromStorage('configData')
				if (storeData) {
					setLogoData({
						content: storeData.logo?.content,
						logoUrl: storeData.logo?.url,
					})
				}

				const data = await getConfigData()
				if (data.logo) {
					if (
						(storeData?.logo && storeData.logo.id !== data.logo.id) ||
						!storeData?.logo
					) {
						const safeHTML = DOMPurify.sanitize(data.logo?.content || '', {
							ALLOWED_TAGS: [
								'div',
								'b',
								'i',
								'em',
								'strong',
								'a',
								'p',
								'br',
								'span',
								'ul',
								'li',
								'img',
								'h1',
							],
							ALLOWED_ATTR: [
								'href',
								'target',
								'rel',
								'class',
								'src',
								'alt',
							],
						})
						setLogoData({
							content: safeHTML,
							logoUrl: data.logo.url,
						})

						await setToStorage('configData', {
							...storeData,
							logo: {
								id: data.logo.id,
								content: safeHTML,
								url: data.logo.url,
							},
						})
					}
				}
			} catch {}
		}

		const openSettingEvent = listenEvent('openSettings', handleOpenSettings)
		loadConfig()
		return () => {
			openSettingEvent()
		}
	}, [])

	return (
		<>
			<nav className="flex items-center justify-start px-4 mt-0.5 md:mt-1.5">

				<div className="flex items-center gap-1">
					<SyncButton />
					<Tooltip content={t('app.manageWidgets')}>
						<div
							className="flex items-center w-8 h-8 gap-2 px-2 overflow-hidden transition-all border cursor-pointer border-content rounded-xl bg-content backdrop-blur-sm hover:opacity-80"
							onClick={() => openWidgetSettings()}
						>
							<TbApps size={18} className="text-muted" />
						</div>
					</Tooltip>
					<Tooltip content={t('app.settings')}>
						<div
							className="flex items-center w-8 h-8 gap-2 px-2 overflow-hidden transition-all border cursor-pointer border-content rounded-xl bg-content backdrop-blur-sm hover:opacity-80"
							onClick={() => setShowSettings(true)}
						>
							<VscSettings size={18} className="text-muted" />
						</div>
					</Tooltip>
					<Tooltip content={t('settings.language')}>
						<div
							className="flex items-center w-8 h-8 gap-2 px-2 overflow-hidden transition-all border cursor-pointer border-content rounded-xl bg-content backdrop-blur-sm hover:opacity-80"
							onClick={() => {
								setShowSettings(true)
								setTab('language')
							}}
						>
							<span className="text-muted">
								{i18n.language.startsWith('fa') ? 'فا' : 
								 i18n.language.startsWith('it') ? 'it' : 'en'}
							</span>
						</div>
					</Tooltip>
				</div>
			</nav>
			<SettingModal
				isOpen={showSettings}
				onClose={() => setShowSettings(false)}
				selectedTab={tab}
			/>
		</>
	)
}

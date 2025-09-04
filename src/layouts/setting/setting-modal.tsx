import { MdFingerprint, MdPets } from 'react-icons/md'
import {
	VscAccount,
	VscCloud,
	VscColorMode,
	VscInfo,
	VscMegaphone,
	VscPaintcan,
	VscRecordKeys,
	VscSettingsGear,
	VscCaseSensitive
} from 'react-icons/vsc'
import { useTranslation } from 'react-i18next'
import Analytics from '@/analytics'
import Modal from '@/components/modal'
import { type TabItem, TabManager } from '@/components/tab-manager'
import { UpdateReleaseNotesModal } from '@/components/UpdateReleaseNotesModal'
import { AboutUsTab } from './tabs/about-us/about-us'
import { AccountTab } from './tabs/account/account'
import { AppearanceSettingTab } from './tabs/appearance/appearance'
import { GeneralSettingTab } from './tabs/general/general'
import { LanguageTab } from './tabs/language/language'
import { PetsTab } from './tabs/pets/pets'
import { PrivacySettings } from './tabs/privacy/privacy-settings'
import { ShortcutsTab } from './tabs/shortcuts/shortcuts'
import { WallpaperSetting } from './tabs/wallpapers/wallpapers'
import { WeatherOptions } from './tabs/weather/weather'

interface SettingModalProps {
	isOpen: boolean
	onClose: () => void
	selectedTab: string | null
}

export const SettingModal = ({ isOpen, onClose, selectedTab }: SettingModalProps) => {
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
	const { t } = useTranslation()
	const tabs: TabItem[] = [
		{
			label: 'عمومی',
			value: 'general',
			icon: <VscSettingsGear size={20} />,
			element: <GeneralSettingTab />,
		},
		{
			label: t('settings.language'),
			value: 'language',
			icon: <VscCaseSensitive size={20} />,
			element: <LanguageTab />,
		},
		{
			label: 'حساب کاربری',
			value: 'account',
			icon: <VscAccount size={20} />,
			element: <AccountTab />,
		},
		{
			label: 'مدیریت دسترسی ها',
			value: 'access',
			icon: <MdFingerprint size={20} />,
			element: <PrivacySettings key="privacy" />,
		},
		{
			label: 'ظاهری',
			value: 'appearance',
			icon: <VscColorMode size={20} />,
			element: <AppearanceSettingTab />,
		},
		{
			label: 'تصویر زمینه',
			value: 'wallpapers',
			icon: <VscPaintcan size={20} />,
			element: <WallpaperSetting />,
		},
		{
			label: 'آب هوا',
			value: 'weather',
			icon: <VscCloud size={20} />,
			element: <WeatherOptions />,
		},
		{
			label: 'حیوان خانگی',
			value: 'pets',
			icon: <MdPets size={20} />,
			element: <PetsTab />,
		},

		{
			label: 'میانبرها',
			value: 'shortcuts',
			icon: <VscRecordKeys size={20} />,
			element: <ShortcutsTab />,
		},
		{
			label: 'درباره ما',
			value: 'about',
			icon: <VscInfo size={20} />,
			element: <AboutUsTab />,
		},
	]

	useEffect(() => {
		if (isOpen) {
			Analytics.event('open_settings_modal', {
				selected_tab: selectedTab,
			})
		}
	}, [isOpen])

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="xl"
			title={t('settings.title')}
			direction="rtl"
		>
			<TabManager
				tabOwner="setting"
				tabs={tabs}
				defaultTab="general"
				selectedTab={selectedTab}
				direction="rtl"
			/>
			<button
				className={`relative  items-center hidden md:flex gap-3 px-4 py-3 rounded-full transition-all duration-200 ease-in-out justify-start cursor-pointer whitespace-nowrap active:scale-[0.98] text-muted hover:bg-base-300 w-42`}
				onClick={() => setUpdateModalOpen(true)}
			>
				<VscMegaphone size={20} />
				<span className="text-sm font-bold">تغییرات اخیر</span>
			</button>
			<UpdateReleaseNotesModal
				isOpen={isUpdateModalOpen}
				onClose={() => setUpdateModalOpen(false)}
				counterValue={null}
			/>
		</Modal>
	)
}

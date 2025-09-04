import { useTranslation } from 'react-i18next'

export function LanguageTab() {
	const { i18n, t } = useTranslation()

	const languages = [
		{ code: 'en', name: 'English', flag: "gb"},
		{ code: 'it', name: 'Italiano', flag: "it"},
		{ code: 'fa', name: 'فارسی', flag: 'ir' },
	]

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold mb-4">{t('settings.language')}</h3>
				<p className="text-sm text-muted mb-6">
					{t('settings.languageDescription')}
				</p>
			</div>

			<div className="space-y-3">
				{languages.map((lang) => (
					<label
						key={lang.code}
						className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
							i18n.language.startsWith(lang.code)
								? 'border-primary bg-primary/10'
								: 'border-base-300 hover:border-base-content/20'
						}`}
					>
						<input
							type="radio"
							name="language"
							value={lang.code}
							checked={i18n.language.startsWith(lang.code)}
							onChange={() => i18n.changeLanguage(lang.code)}
							className="radio radio-primary mr-3"
						/>
						<span className={`fi fi-${lang.flag} mx-3`}></span>
						<span className="font-medium">{lang.name}</span>
					</label>
				))}
			</div>

			<div className="mt-8 p-4 bg-base-200 rounded-lg">
				<p className="text-sm text-muted">
					{t('settings.languageSaved')}
				</p>
			</div>
		</div>
	)
}

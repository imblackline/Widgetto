import { domAnimation, LazyMotion, m } from 'framer-motion'
import { useState } from 'react'
import { FaExternalLinkAlt, FaTrash } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import keepItImage from '@/assets/keep-it.png'
import { Button } from './button/button'
import Modal from './modal'

interface ExtensionInstalledModalProps {
	show: boolean
	onClose: () => void
	onGetStarted: () => void
}

type Step = number

export function ExtensionInstalledModal({
	show,
	onGetStarted,
}: ExtensionInstalledModalProps) {
	const { t } = useTranslation()
	const [currentStep, setCurrentStep] = useState<Step>(1)
	const totalSteps = 1

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				if (import.meta.env.FIREFOX) {
					return <StepFirefoxConsent setCurrentStep={setCurrentStep} />
				}
				return <StepOne onGetStarted={onGetStarted} />
			case 2:
				return <StepTwo onGetStarted={onGetStarted} />
			default:
				return null
		}
	}

	const StepIndicator = () => (
		<div
			className="flex items-center justify-center gap-3"
			role="progressbar"
			aria-valuenow={currentStep}
			aria-valuemin={1}
			aria-valuemax={totalSteps}
		>
			{Array.from({ length: totalSteps }).map((_, index) => (
				<button
					key={index}
					onClick={() =>
						import.meta.env.FIREFOX
							? undefined
							: setCurrentStep((index + 1) as Step)
					}
					aria-label={`${t('extensionModal.goToStep')} ${index + 1}`}
					aria-current={index + 1 === currentStep ? 'step' : undefined}
					className={`w-10 h-2 ${import.meta.env.FIREFOX ? 'cursor-default' : 'cursor-pointer'} rounded-full transition-all duration-300 ${
						index + 1 === currentStep
							? 'bg-blue-500 shadow-lg shadow-blue-500/30'
							: index + 1 < currentStep
								? 'bg-blue-600'
								: 'bg-gray-700 hover:bg-gray-600'
					}`}
				/>
			))}
		</div>
	)

	return (
		<Modal
			isOpen={show}
			onClose={() => {}}
			size="sm"
			direction="rtl"
			showCloseButton={false}
			closeOnBackdropClick={false}
		>
			<LazyMotion features={domAnimation}>
				<m.div
					className={'flex flex-col items-center p-2 text-center w-full'}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4 }}
				>
					{renderStepContent()}
				</m.div>
			</LazyMotion>

			<StepIndicator />
		</Modal>
	)
}

interface StepOneProps {
	onGetStarted: () => void
}
const StepOne = ({ onGetStarted }: StepOneProps) => {
	const { t } = useTranslation()
	
	return (
		<>
			<div className="mb-3">
				<h3 className={'mb-0 text-2xl font-bold text-content'}>
					{t('extensionModal.welcomeTitle')}
				</h3>
			</div>

			<div
				className={
					'relative p-1 mt-1 mb-3 border rounded-xl border-content bg-content'
				}
			>
				<div className="flex items-center justify-center">
					<img
						src={keepItImage}
						alt={t('extensionModal.activationImageAlt')}
						className="h-auto max-w-full rounded-lg shadow-xl"
						style={{ maxHeight: '220px' }}
					/>
				</div>
			</div>

			<div
				className={
					'p-3 mb-3 text-content rounded-lg border border-content  bg-content'
				}
			>
				<p className="font-bold text-muted">
					{t('extensionModal.activationWarning')}
				</p>
			</div>

			<button
				onClick={onGetStarted}
				className="px-8 py-3 font-light text-white transition-all cursor-pointer duration-300 transform bg-blue-600 bg-opacity-80 border border-blue-400/30 rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:bg-opacity-90 hover:shadow-xl backdrop-blur-sm"
			>
				{t('extensionModal.keepItButton')}
			</button>
		</>
	)
}

interface StepThreeProps {
	onGetStarted: () => void
}
const StepTwo = ({ onGetStarted }: StepThreeProps) => {
	const { t } = useTranslation()
	
	return (
		<>
			<m.div
				className="mb-6"
				initial={{ y: -20 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<h3 className={'mb-3 text-2xl font-bold text-content'}>
					{t('extensionModal.readyToStartTitle')}
				</h3>
			</m.div>

			<m.div
				className={
					'p-3 mb-6 border rounded-lg bg-content backdrop-blur-sm border-content'
				}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				<p className="text-muted">
					{t('extensionModal.readyToStartMessage')}
				</p>
			</m.div>

			<div className="flex flex-col w-full gap-4 mt-4 sm:flex-row">
				<button
					onClick={onGetStarted}
					className="px-6 py-3 font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 border border-blue-400/30 rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-opacity-90 hover:shadow-[0_12px_20px_rgba(0,0,0,0.25)] backdrop-blur-sm w-full sm:flex-1"
				>
					{t('extensionModal.getStartedButton')}
				</button>
			</div>
		</>
	)
}

interface StepFirefoxConsentProps {
	setCurrentStep: (step: Step) => void
}
const StepFirefoxConsent = ({ setCurrentStep }: StepFirefoxConsentProps) => {
	const { t } = useTranslation()
	
	const handleDecline = () => {
		if (browser.management?.uninstallSelf) {
			// @ts-expect-error
			browser.management.uninstallSelf({
				showConfirmDialog: true,
				dialogMessage:
					'بدون اجازه ارسال داده، افزونه نمی‌تواند کار کند. آیا می‌خواهید آن را حذف کنید؟',
			})
		}
	}

	return (
		<div className="w-full overflow-clip">
			<h3 className="mb-3 text-2xl font-bold text-content">{t('extensionModal.privacyNoticeTitle')}</h3>
			<p className="mb-2 font-semibold">{t('extensionModal.privacySummaryTitle')}</p>
			<div className="w-full px-2">
				<ul className="w-full h-56 space-y-1 overflow-y-auto text-xs list-disc list-inside border border-content rounded-2xl">
					<li>{t('extensionModal.privacyPoints.noPersonalData')}</li>
					<li>{t('extensionModal.privacyPoints.localStorage')}</li>
					<li>
						{t('extensionModal.privacyPoints.optionalSync')}
					</li>
					<li>
						{t('extensionModal.privacyPoints.googleOptional')}
					</li>
					<li>{t('extensionModal.privacyPoints.noThirdParty')}</li>
					<li>{t('extensionModal.privacyPoints.openSource')}</li>
					<li>
						{t('extensionModal.privacyPoints.dataDeletion')}
					</li>
				</ul>

				<p className="mt-2 text-sm text-content">
					{t('extensionModal.declineMessage')}
				</p>
				<a
					href="https://widgetify.ir/privacy"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center font-medium underline text-primary gap-0.5"
				>
					<FaExternalLinkAlt />
					{t('extensionModal.viewFullPrivacy')}
				</a>
			</div>

			<div className="flex gap-3 mt-4">
				<Button
					onClick={handleDecline}
					size="md"
					className="flex items-center justify-center w-40 btn btn-error rounded-xl"
				>
					<FaTrash /> {t('extensionModal.uninstallExtension')}
				</Button>
				<Button
					onClick={() => setCurrentStep(2)}
					size="md"
					className="w-40 btn btn-success rounded-xl"
				>
					{t('extensionModal.acceptPrivacy')}
				</Button>
			</div>
		</div>
	)
}

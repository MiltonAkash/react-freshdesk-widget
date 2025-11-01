import { useCallback } from "react";
import type { AuthenticateOptions, CustomerInfo, FormOptions, Labels, PrefillData } from "./types";

// Custom hook for widget management
export const useFreshdeskWidget = () => {
	const hideWidget = useCallback((hideLauncher = false) => {
		if (hideLauncher) {
			window.FreshworksWidget("hide", "launcher");
		} else {
			window.FreshworksWidget("hide");
		}
	}, []);

	const showWidget = useCallback((showLauncher = false) => {
		if (showLauncher) {
			window.FreshworksWidget("show", "launcher");
		} else {
			window.FreshworksWidget("show");
		}
	}, []);

	const openWidget = useCallback(() => {
		window.FreshworksWidget("open");
	}, []);

	const closeWidget = useCallback(() => {
		window.FreshworksWidget("close");
	}, []);

	const openContactForm = useCallback((formId?: number) => {
		window.FreshworksWidget(
			"open",
			"ticketForm",
			formId ? { formId } : undefined
		);
	}, []);

	const destroyWidget = useCallback(() => {
		window.FreshworksWidget("destroy");
	}, []);

	const bootWidget = useCallback(() => {
		window.FreshworksWidget("boot");
	}, []);

	const authenticateCustomer = useCallback((options: AuthenticateOptions) => {
		window.FreshworksWidget("authenticate", options);
	}, []);

	const logoutCustomer = useCallback(() => {
		window.FreshworksWidget("logout");
	}, []);

	const clearForm = useCallback(() => {
		window.FreshworksWidget("clear", "ticketForm");
	}, []);

	const setWidgetLabels = useCallback((labels: Labels) => {
		window.FreshworksWidget("setLabels", labels);
	}, []);

	const identifyCustomer = useCallback(
		(customerInfo: CustomerInfo, formOptions?: FormOptions) => {
			window.FreshworksWidget(
				"identify",
				"ticketForm",
				customerInfo,
				formOptions
			);
		},
		[]
	);

	const prefillForm = useCallback(
		(prefillData: PrefillData, formOptions?: FormOptions) => {
			window.FreshworksWidget(
				"prefill",
				"ticketForm",
				prefillData,
				formOptions
			);
		},
		[]
	);

	return {
		hideWidget,
		showWidget,
		openWidget,
		closeWidget,
		openContactForm,
		destroyWidget,
		bootWidget,
		authenticateCustomer,
		logoutCustomer,
		clearForm,
		setWidgetLabels,
		identifyCustomer,
		prefillForm,
	};
};

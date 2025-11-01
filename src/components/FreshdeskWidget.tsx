import React, { useEffect, useRef, useCallback } from "react";
import type { FreshdeskWidgetProps } from "./types";

const FreshdeskWidget: React.FC<FreshdeskWidgetProps> = ({
	widgetId,
	locale = "en",
	customerInfo,
	prefillData,
	formOptions,
	labels,
	autoLoad = true,
	className,
	style,
}) => {
	const scriptLoaded = useRef(false);
	const widgetInitialized = useRef(false);

	// Initialize widget settings
	useEffect(() => {
		window.fwSettings = {
			widget_id: widgetId,
			locale: locale,
		};
	}, [widgetId, locale]);

	// Initialize the widget
	const initializeWidget = useCallback(() => {
		if (widgetInitialized.current) return;

		// Check if FreshworksWidget is available
		if (typeof window.FreshworksWidget !== "function") {
			return;
		}

		// Set labels if provided
		if (labels) {
			window.FreshworksWidget("setLabels", labels);
		}

		// Identify customer if info provided
		if (customerInfo) {
			window.FreshworksWidget(
				"identify",
				"ticketForm",
				customerInfo,
				formOptions
			);
		}

		// Prefill form data if provided
		if (prefillData) {
			window.FreshworksWidget(
				"prefill",
				"ticketForm",
				prefillData,
				formOptions
			);
		}

		widgetInitialized.current = true;
	}, [customerInfo, prefillData, formOptions, labels]);

	// Load Freshdesk widget script
	const loadScript = useCallback(() => {
		if (scriptLoaded.current) return;

		// Initialize FreshworksWidget function
		if (typeof window.FreshworksWidget !== "function") {
			const queueFunction = (...args: unknown[]) => {
				queueFunction.q.push(args);
			};
			queueFunction.q = [] as unknown[];
			window.FreshworksWidget = queueFunction as typeof window.FreshworksWidget;
		}

		// Load the widget script
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = `https://ind-widget.freshworks.com/widgets/${widgetId}.js`;
		script.async = true;
		script.defer = true;

		script.onload = () => {
			scriptLoaded.current = true;
			if (autoLoad) {
				initializeWidget();
			}
		};

		document.head.appendChild(script);

		return () => {
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
		};
	}, [widgetId, autoLoad, initializeWidget]);

	// Load script on mount
	useEffect(() => {
		loadScript();
	}, [loadScript]);



	// Return a div that will contain the widget
	return (
		<div className={className} style={style} data-freshdesk-widget={widgetId} />
	);
};


export default FreshdeskWidget;


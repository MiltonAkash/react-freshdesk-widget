import React from "react";

// TypeScript interfaces for the Freshdesk Widget API
export interface FreshdeskWidgetSettings {
	widget_id: number;
	locale?: string;
}

export interface CustomerInfo {
	name: string;
	email: string;
}

export interface PrefillData {
	subject?: string;
	description?: string;
	priority?: number;
	status?: number;
	group_id?: number;
	product_id?: number;
	type?: string;
	custom_fields?: Record<string, unknown>;
}

export interface FormOptions {
	formId?: number;
}

export interface AuthenticateOptions {
	token: string;
	callback?: () => void;
}

export interface Labels {
	[languageCode: string]: {
		banner?: string;
		launcher?: string;
		contact_form?: {
			title?: string;
			submit?: string;
			confirmation?: string;
		};
		frustration_tracking?: {
			banner?: string;
			description?: string;
			confirmation?: string;
		};
	};
}

export interface FreshdeskWidgetProps {
	widgetId: number;
	locale?: string;
	customerInfo?: CustomerInfo;
	prefillData?: PrefillData;
	formOptions?: FormOptions;
	labels?: Labels;
	autoLoad?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

declare global {
	interface Window {
		fwSettings: FreshdeskWidgetSettings;
		FreshworksWidget: {
			(action: string): void;
			(action: string, target: string): void;
			(action: string, data: unknown): void;
			(action: string, target: string, data: unknown): void;
			(action: string, target: string, data: unknown, options: unknown): void;
			q?: unknown[];
		};
	}
}

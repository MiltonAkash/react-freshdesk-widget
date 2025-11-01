import React, { useState } from "react";
import FreshdeskWidget from "./FreshdeskWidget";
import { useFreshdeskWidget } from "./hooks";
import type {
	CustomerInfo,
	PrefillData,
	Labels,
} from "./types";

const FreshdeskWidgetDemo: React.FC = () => {
	const [widgetVisible, setWidgetVisible] = useState(true);
	const [customerLoggedIn, setCustomerLoggedIn] = useState(false);

	// Use the custom hook for widget control
	const {
		hideWidget,
		showWidget,
		openWidget,
		closeWidget,
		openContactForm,
		identifyCustomer,
		prefillForm,
		authenticateCustomer,
		logoutCustomer,
		clearForm,
	} = useFreshdeskWidget();

	// Sample customer data
	const customerInfo: CustomerInfo = {
		name: "John Doe",
		email: "john.doe@example.com",
	};

	// Sample prefill data
	const prefillData: PrefillData = {
		subject: "Need help with my order",
		description: "I have an issue with my recent order and need assistance.",
		priority: 1,
		type: "Question",
		custom_fields: {
			cf_order_id: 12345,
			cf_order_amount: 99.99,
		},
	};

	// Sample multilingual labels
	const labels: Labels = {
		en: {
			banner: "Contact our support team",
			launcher: "Support",
			contact_form: {
				title: "Contact Us",
				submit: "Submit",
				confirmation: "We'll get back to you soon!",
			},
		},
		es: {
			banner: "Contacta a nuestro equipo de soporte",
			launcher: "Apoyo",
			contact_form: {
				title: "Contáctenos",
				submit: "Enviar",
				confirmation: "¡Nos pondremos en contacto con usted pronto!",
			},
		},
	};

	const handleToggleWidget = () => {
		if (widgetVisible) {
			hideWidget();
		} else {
			showWidget();
		}
		setWidgetVisible(!widgetVisible);
	};

	const handleLoginCustomer = () => {
		identifyCustomer(customerInfo);
		setCustomerLoggedIn(true);
	};

	const handleLogoutCustomer = () => {
		logoutCustomer();
		setCustomerLoggedIn(false);
	};

	const handlePrefillForm = () => {
		prefillForm(prefillData);
	};

	const handleClearForm = () => {
		clearForm();
	};

	const handleAuthenticate = () => {
		// In a real app, you would generate this JWT token on your server
		const mockJWT =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiZXhwIjoxNzM1NzY4MDAwfQ.example";

		authenticateCustomer({
			token: mockJWT,
			callback: () => {
				console.log("Token expired, need to refresh");
				// In a real app, you would call your server to get a new token
			},
		});
	};

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>Freshdesk Widget Demo</h1>

			<div style={{ marginBottom: "20px" }}>
				<h2>Widget Controls</h2>
				<div
					style={{
						display: "flex",
						gap: "10px",
						flexWrap: "wrap",
						marginBottom: "10px",
					}}
				>
					<button onClick={handleToggleWidget}>
						{widgetVisible ? "Hide Widget" : "Show Widget"}
					</button>
					<button onClick={openWidget}>Open Widget</button>
					<button onClick={closeWidget}>Close Widget</button>
					<button onClick={() => openContactForm()}>Open Contact Form</button>
				</div>
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h2>Customer Management</h2>
				<div
					style={{
						display: "flex",
						gap: "10px",
						flexWrap: "wrap",
						marginBottom: "10px",
					}}
				>
					<button
						onClick={handleLoginCustomer}
						disabled={customerLoggedIn}
						style={{
							backgroundColor: customerLoggedIn ? "#ccc" : "#007bff",
							color: "white",
							border: "none",
							padding: "8px 16px",
							borderRadius: "4px",
							cursor: customerLoggedIn ? "not-allowed" : "pointer",
						}}
					>
						{customerLoggedIn ? "Customer Logged In" : "Login Customer"}
					</button>
					<button
						onClick={handleLogoutCustomer}
						disabled={!customerLoggedIn}
						style={{
							backgroundColor: !customerLoggedIn ? "#ccc" : "#dc3545",
							color: "white",
							border: "none",
							padding: "8px 16px",
							borderRadius: "4px",
							cursor: !customerLoggedIn ? "not-allowed" : "pointer",
						}}
					>
						Logout Customer
					</button>
					<button onClick={handleAuthenticate}>Authenticate with JWT</button>
				</div>
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h2>Form Management</h2>
				<div
					style={{
						display: "flex",
						gap: "10px",
						flexWrap: "wrap",
						marginBottom: "10px",
					}}
				>
					<button onClick={handlePrefillForm}>Prefill Form Data</button>
					<button onClick={handleClearForm}>Clear Form</button>
				</div>
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h2>Widget Configuration</h2>
				<p>
					Replace the widget ID below with your own from the Freshdesk admin panel to use your custom widget.
				</p>
				<p>Current configuration:</p>
				<ul>
					<li>
						Widget ID: <code>1120000000416</code>
					</li>
					<li>Locale: en</li>
					<li>Auto Load: true</li>
					<li>Multilingual Support: Enabled</li>
				</ul>
			</div>

			{/* The actual Freshdesk Widget component */}
			<FreshdeskWidget
				widgetId={1120000000416} // Replace with your actual widget ID
				locale="en"
				customerInfo={customerLoggedIn ? customerInfo : undefined}
				prefillData={prefillData}
				labels={labels}
				autoLoad={true}
			/>
		</div>
	);
};



export default FreshdeskWidgetDemo;


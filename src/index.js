import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { auth } from "./firebase";
import HandleAuth from "./HandleAuth";
import './index.css';

const Root = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Listen for authentication state changes
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			setUser(currentUser); // Update user state
		});

		// Cleanup the listener on unmount
		return () => unsubscribe();
	}, []);

	return user ? <App /> : <HandleAuth />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);

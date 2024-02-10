import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import * as Theme from "./theme";
import App from "./App";
import GlobalStyles from "./globalStyles";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={Theme}>
				<GlobalStyles />
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

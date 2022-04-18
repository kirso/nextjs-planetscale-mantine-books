import { MantineProvider } from "@mantine/core"

function App({ Component, pageProps }) {
	return (
		<MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
			<Component {...pageProps} />
		</MantineProvider>
	)
}

export default App

import { TextInput, Button, Group, Box, Container } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState, useEffect } from "react"

export default function Form() {
	const [APIResponse, setAPIResponse] = useState(null)

	useEffect(() => {
		console.log(APIResponse)
	}, [APIResponse])

	const form = useForm({
		initialValues: {
			bookTitle: "",
			bookAuthor: "",
			bookGenre: ""
		}
	})

	const readDB = async (e) => {
		try {
			const response = await fetch("/api/books", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
			setAPIResponse(await response.json())
			if (response.status !== 200) {
				console.log("something went wrong")
			} else {
				console.log(response)
			}
		} catch (error) {}
	}

	const handleSubmit = async () => {
		const body = { ...form.values }
		try {
			const response = await fetch("/api/books", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			})
			if (response.status !== 200) {
				console.log("something went wrong")
			} else {
				form.reset()
				readDB()
				console.log("form submitted")
			}
		} catch (error) {
			console.log("there was an error", error)
		}
	}

	return (
		<Box sx={{ maxWidth: 300 }} mx="auto">
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput
					label="book title"
					placeholder="Harry Potter"
					{...form.getInputProps("bookTitle")}
				/>
				<TextInput
					label="author"
					placeholder="J.K. Rowling"
					{...form.getInputProps("bookAuthor")}
				/>
				<TextInput
					label="genre"
					placeholder="fantasy"
					{...form.getInputProps("bookGenre")}
				/>

				<Group position="center" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
			<Container>
				{" "}
				{APIResponse?.map((book) => {
					return <p key={book.id}>{book.bookTitle}</p>
				})}
			</Container>
		</Box>
	)
}

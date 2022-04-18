import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
	if (req.method === "POST") {
		return await addBook(req, res)
	} else if (req.method === "GET") {
		return await readBook(req, res)
	} else {
		return res
			.status(405)
			.json({ message: "Method not allowed", success: false })
	}

	async function readBook(req, res) {
		const body = req.body
		try {
			const allbooks = await prisma.bookSuggestion.findMany()
			return res.status(200).json(allbooks, { success: true })
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ message: "Error reading from database", success: false })
		}
	}
	async function addBook(req, res) {
		const body = req.body
		try {
			const newEntry = await prisma.bookSuggestion.create({
				data: {
					bookTitle: body.bookTitle,
					bookAuthor: body.bookAuthor,
					bookGenre: body.bookGenre
				}
			})
			return res.status(200).json(newEntry, { success: true })
		} catch (error) {
			console.error("Request error", error)
			res.status(500).json({ error: "Error adding book", success: false })
		}
	}
}

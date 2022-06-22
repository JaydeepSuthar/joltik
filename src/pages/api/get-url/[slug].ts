import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query.slug;

	if (!slug || typeof slug !== "string") {
		return res
			.status(404)
			.json({ msg: `Please Provide Valid Slug`, data: {} });
	}

	const data = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if (!data) {
		return res.status(404).json({ msg: `Slug not Found`, data: {} });
	}

	return res.status(200).json(data);
};

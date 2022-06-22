import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
		console.log(`returining early`);
		return;
	}

	console.log(`Current Path is `, req.nextUrl.pathname);

	const slug = req.nextUrl.pathname.split("/").pop();

	const data = await (
		await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
	).json();

	if (data?.url) {
		return NextResponse.redirect(data.url);
	}

	console.log(`slug ==> `, slug);
}

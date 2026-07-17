import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // List resources in Cloudinary that start with "media-" (since we tag our media panel uploads with "media-")
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "media-",
      max_results: 100,
    });

    const images = result.resources.map((resource: any) => ({
      filename: resource.public_id,
      url: resource.secure_url,
    }));

    return NextResponse.json({ files: images });
  } catch (error: any) {
    console.error("Error reading Cloudinary resources:", error);
    return NextResponse.json({ error: "Failed to read media directory" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a unique filename matching our prefix
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const publicId = `media-${uniqueSuffix}`;

    // Upload buffer to Cloudinary
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(base64Data, {
      public_id: publicId,
      overwrite: true,
    });

    return NextResponse.json({ url: result.secure_url, filename: result.public_id });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

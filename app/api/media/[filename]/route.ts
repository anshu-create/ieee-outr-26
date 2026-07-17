import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  // Since images are stored on Cloudinary and we access them via their secure_url, 
  // this route is only called if someone tries to load `/api/media/[filename]` directly.
  // We can redirect them directly to the Cloudinary URL!
  try {
    const filename = (await params).filename;
    
    // Fetch image details from Cloudinary to get its URL
    const result = await cloudinary.api.resource(filename);
    
    if (result && result.secure_url) {
      return NextResponse.redirect(result.secure_url);
    }
    
    return new NextResponse("File not found", { status: 404 });
  } catch (error) {
    console.error("Error retrieving Cloudinary file details:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const filename = (await params).filename;
    
    // Delete the asset from Cloudinary using its public_id (which is filename)
    const result = await cloudinary.uploader.destroy(filename);
    
    if (result.result === "ok") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to delete file from Cloudinary" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error deleting Cloudinary file:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}

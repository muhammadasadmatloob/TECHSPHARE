import urllib.request
import os
import subprocess

video_url = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
temp_input = "temp_hero.mp4"
public_dir = os.path.join("client", "public")
output_path = os.path.join(public_dir, "hero_boomerang.mp4")

os.makedirs(public_dir, exist_ok=True)

print("Downloading original hero video...")
urllib.request.urlretrieve(video_url, temp_input)
print(f"Downloaded temp file ({os.path.getsize(temp_input)} bytes)")

print("Processing seamless boomerang loop with FFmpeg...")
ffmpeg_cmd = [
    "ffmpeg",
    "-y",
    "-i", temp_input,
    "-filter_complex", "[0:v]reverse[r];[0:v][r]concat=n=2:v=1:a=0[v]",
    "-map", "[v]",
    "-an",
    "-c:v", "libx264",
    "-crf", "18",
    "-preset", "fast",
    output_path
]

subprocess.run(ffmpeg_cmd, check=True)
print(f"Created seamless boomerang loop at: {output_path}")

if os.path.exists(temp_input):
    os.remove(temp_input)

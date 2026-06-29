"""Generate pixel-art cartoon avatars of Prarthana using Gemini Nano Banana."""
import asyncio
import os
import base64
import sys
import urllib.request
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv("/app/backend/.env")

REF_URL = "https://customer-assets.emergentagent.com/job_pixel-arjun-studio/artifacts/z7mpjvio_fxn%202025-12-06%20001740.041.jpeg"
OUT_DIR = Path("/app/frontend/public/avatars")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPTS = {
    "avatar_main": (
        "Create a cutesy 2000s pixel-art chibi character portrait based on the reference photo. "
        "Brown skin tone, long wavy dark brown hair with subtle layers, big sparkly dark eyes, "
        "rosy cheeks with visible dimples, glossy pink lips. Y2K teen girl aesthetic. "
        "Wearing a cute pastel pink crop top with a tiny heart. Sticker-cute style. "
        "Strict 64x64 chunky pixel-art aesthetic but rendered at high resolution. "
        "Solid transparent-style pastel pink (#FFD1DC) flat background with a thick black 4px pixel border around the canvas. "
        "Bright, saturated colors, dithering shadows, sharp edges, NO anti-aliasing, NO 3D, NO gradients. "
        "Standing pose, facing forward, full upper body waist-up."
    ),
    "avatar_book": (
        "Same cutesy 2000s pixel-art chibi character of a brown-skin girl with long wavy dark hair, dimples, "
        "glossy pink lips, wearing pastel pink top. Sitting cross-legged reading a giant open pink storybook. "
        "Pastel pink background, sparkles around. Chunky pixel-art style, thick black outlines, no anti-aliasing."
    ),
    "avatar_gamer": (
        "Same cutesy 2000s pixel-art chibi character of a brown-skin girl with long wavy dark hair, dimples. "
        "Holding a pink Gameboy-style handheld console, eyes glowing. Black background with pink scanlines. "
        "Chunky pixel-art Y2K arcade style, thick black outlines, no anti-aliasing."
    ),
}


async def gen_one(key: str, prompt: str, ref_b64: str):
    out_path = OUT_DIR / f"{key}.png"
    if out_path.exists():
        print(f"SKIP {key} (exists)")
        return
    api_key = os.getenv("EMERGENT_LLM_KEY")
    chat = LlmChat(api_key=api_key, session_id=f"avatar-{key}", system_message="Pixel-art generator.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt, file_contents=[ImageContent(ref_b64)])
    try:
        text, images = await chat.send_message_multimodal_response(msg)
        if images:
            data = base64.b64decode(images[0]["data"])
            with open(out_path, "wb") as f:
                f.write(data)
            print(f"OK {key} -> {out_path}")
        else:
            print(f"FAIL {key}: no images returned. text={text[:80] if text else ''}")
    except Exception as e:
        print(f"ERR {key}: {e}")


async def main():
    print("Downloading reference photo...")
    with urllib.request.urlopen(REF_URL) as r:
        ref_bytes = r.read()
    ref_b64 = base64.b64encode(ref_bytes).decode("utf-8")
    print(f"Ref bytes: {len(ref_bytes)}")
    for key, prompt in PROMPTS.items():
        await gen_one(key, prompt, ref_b64)


if __name__ == "__main__":
    asyncio.run(main())
